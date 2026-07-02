# Stage 1 - Build
FROM node:22.13-alpine AS builder

WORKDIR /app

RUN npm install -g pnpm@9.15.4

COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile

COPY . .

RUN if [ ! -f "prisma/schema.prisma" ]; then echo "ERRO: schema.prisma não encontrado! Verifique o .dockerignore"; exit 1; fi

RUN pnpm prisma generate

RUN pnpm run build

# Stage 2 - Production
FROM node:22.13-alpine

WORKDIR /app

RUN npm install -g pnpm@9.15.4

COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/package.json ./
COPY --from=builder /app/prisma ./prisma

RUN ls -la /app/prisma && ls -la /app/dist

EXPOSE 3000

CMD ["sh", "-c", "pnpm prisma migrate deploy --schema /app/prisma/schema.prisma && node dist/src/main.js"]