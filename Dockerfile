# Stage 1 - build
FROM node:20-alpine AS builder

WORKDIR /app

RUN corepack enable
RUN corepack prepare pnpm@latest --activate

COPY package.json pnpm-lock.yaml ./
RUN pnpm install

COPY . .

# gera prisma client
RUN pnpm prisma generate

# build nest
RUN pnpm run build


# Stage 2 - production
# Stage 2 - production
FROM node:20-alpine
WORKDIR /app

RUN corepack enable && corepack prepare pnpm@latest --activate

# Copia as dependências e o código compilado
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/package.json ./

# --- ADICIONE ESTA LINHA ---
# O Prisma precisa do schema para funcionar no runtime
COPY --from=builder /app/prisma ./prisma 

EXPOSE 3000

# Ajuste o CMD para rodar as migrations antes do app
# O caminho dist/src/main.js depende de como o Nest compila (geralmente é dist/main.js ou dist/src/main.js)
CMD ["sh", "-c", "pnpm prisma migrate deploy && node dist/src/main.js"]