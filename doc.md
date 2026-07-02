# Documentação do projeto — gymtracker-api

Resumo curto, stack e instruções rápidas para desenvolvedores.

## Visão geral
Aplicação backend em TypeScript usando NestJS, GraphQL e Prisma. Arquitetura inspirada em Clean Architecture / Hexagonal com separação entre domínio, casos de uso e adaptadores (infra).

## Stack
- Node.js + TypeScript
- NestJS (módulos, DI)
- GraphQL (Apollo via `@nestjs/graphql`)
- Prisma ORM (Postgres via `DATABASE_URL`)
- pnpm (scripts), jest (testes)

## Arquitetura / padrões
- Clean Architecture / Hexagonal + DDD
- Dependency Injection (Nest)
- Repository Pattern (ex.: `IWorkoutRepository` + `PrismaWorkoutRepository`)
- Casos de uso (use-cases) como entrada para lógica de negócio

## Modelos principais (Prisma)
Arquivo: `prisma/schema.prisma`

- Enum `Kind`: BICEPS, TRICPES, LEGS, CHEST, SHOULDER, BACK, CARDIO
- Model `Workout`:
  - id: Int @id @default(autoincrement())
  - createdAt: DateTime @default(now())
  - name: String
  - description: String
  - image: String
  - kind: Kind
  - reps: Int
  - weight: Float
  - sets: Int

## GraphQL — operações disponíveis
Arquivo: `src/modules/workouts/infra/graphql/resolvers/workout.resolver.ts`

- Mutation: `createWorkout(input: CreateWorkoutInput): WorkoutModel`
  - Input fields: name, description, image, kind (Kind enum), reps, weight
- Query: `workouts(): [WorkoutModel]` (atualmente retorna array vazio — placeholder)

Exemplo de mutation GraphQL:

```graphql
mutation CreateWorkout($input: CreateWorkoutInput!) {
  createWorkout(input: $input) {
    id
    name
    description
    kind
    reps
    weight
    sets
  }
}

# Variáveis (exemplo)
{
  "input": {
    "name": "Barbell Curl",
    "description": "Bicep exercise",
    "image": "https://...",
    "kind": "BICEPS",
    "reps": 12,
    "weight": 20.5
    "sets: 3
  }
}
```

## Arquivos importantes
- `src/main.ts` — bootstrap da app
- `src/shared/infra/http/app.module.ts` — módulo principal (HTTP/GraphQL)
- `src/shared/infra/database/prisma.service.ts` — provedor do PrismaClient
- `src/modules/workouts/*` — domínio, use-cases, adapter Prisma e GraphQL
- `prisma/schema.prisma` — esquema do banco
- `generated/prisma` — client Prisma gerado

## Como executar localmente
1. Instalar dependências
   - pnpm install
2. Gerar Prisma Client (sempre que alterar `schema.prisma`)
   - npx prisma generate
3. Build / Start
   - pnpm build
   - pnpm start
4. Dev
   - pnpm start:dev

## Observações / problemas conhecidos
- O resolver `workouts()` é um placeholder e não busca dados reais.
- Assegure que `DATABASE_URL` esteja definido no ambiente antes de executar.
- Se ocorrer erro relacionado ao `PrismaClientConstructorValidationError` ao iniciar, tente:
  - Remover possíveis artefatos antigos: `rm -rf generated/prisma` (se aplicável)
  - Regenerar: `npx prisma generate`
  - Verificar `generator` em `prisma/schema.prisma` e compatibilidade da versão de `@prisma/client` em `package.json`.

## Próximos passos sugeridos
- Implementar leitura real em `workouts()` usando `PrismaWorkoutRepository`.
- Adicionar testes unitários para `CreateWorkoutUseCase` e para o repositório Prisma (mock ou test DB).
- Revisar inicialização do Prisma (`PrismaService`) caso persista erro de engine/adapter.

---
Arquivo gerado automaticamente: `doc.md` (resumo). Se quiser, gero um `README.md` mais completo ou adiciono exemplos de queries e scripts CI.
