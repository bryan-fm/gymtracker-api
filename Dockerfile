# Stage 1 - Build
FROM node:22.13-alpine AS builder

WORKDIR /app

# Ativa o pnpm
RUN corepack enable && corepack prepare pnpm@latest --activate

# Copia arquivos de dependências
COPY package.json pnpm-lock.yaml ./
RUN pnpm install

# Copia todo o projeto
COPY . .

# --- VALIDAÇÃO NO BUILD (Stage 1) ---
# Se a pasta prisma não existir aqui, o build vai travar e avisar!
RUN if [ ! -f "prisma/schema.prisma" ]; then echo "ERRO: schema.prisma não encontrado! Verifique o .dockerignore"; exit 1; fi

# Gera o Prisma Client
RUN pnpm prisma generate

# Build do NestJS
RUN pnpm run build

# Stage 2 - Production
FROM node:22.13-alpine
WORKDIR /app

RUN corepack enable && corepack prepare pnpm@latest --activate

# Copia apenas o necessário do Stage 1
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/package.json ./
# Copia a pasta prisma explicitamente para a raiz do WORKDIR
COPY --from=builder /app/prisma ./prisma 

# --- VALIDAÇÃO FINAL (Stage 2) ---
# Garante que os arquivos chegaram no estágio de produção
RUN ls -la /app/prisma && ls -la /app/dist

EXPOSE 3000

# CMD com caminhos absolutos para evitar erro de contexto
CMD ["sh", "-c", "npx prisma migrate deploy --schema /app/prisma/schema.prisma && node dist/src/main.js"]