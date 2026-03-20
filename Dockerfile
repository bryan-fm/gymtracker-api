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
FROM node:20-alpine

WORKDIR /app

RUN corepack enable
RUN corepack prepare pnpm@latest --activate

# copia tudo já pronto
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/package.json ./

EXPOSE 3000

CMD ["sh", "-c", "pnpm prisma migrate deploy && node dist/src/main.js"]