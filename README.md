# GymTracker API

## Status

🚧 Em desenvolvimento

Este projeto está sendo utilizado para estudo e aplicação prática de conceitos de arquitetura backend, GraphQL e engenharia de software.

API GraphQL para gerenciamento de treinos desenvolvida com NestJS, Prisma e PostgreSQL.

O projeto foi criado para estudo de arquitetura backend, GraphQL e boas práticas de organização de código.

## Funcionalidades

### Workouts

- Cadastro de treinos
- Listagem de treinos
- Classificação por grupo muscular
- Persistência em PostgreSQL

## Tecnologias

- NestJS
- GraphQL
- Prisma
- PostgreSQL
- Pino Logger
- Docker

## Arquitetura

O projeto utiliza uma estrutura inspirada em Clean Architecture:

src/
├── modules
│ ├── workouts
│ │ ├── application
│ │ ├── domain
│ │ ├── infra

Principais conceitos:

- Repository Pattern
- Use Cases
- DTOs
- Dependency Injection

## Próximos Passos

- Autenticação JWT
- Redis
- Check-ins
- Dietas
- Testes automatizados
- Mensageria
