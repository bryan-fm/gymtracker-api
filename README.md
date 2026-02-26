# 🏋️ GymTracker API

Event-driven backend for a Gym & Diet tracking application built with **NestJS**, following **Clean Architecture principles**.

This project demonstrates production-ready backend patterns including authentication, caching, messaging, CI/CD and GitOps deployment.

---

## 🏗 Architecture Overview

The application follows a simplified Clean Architecture:


src/
├── domain/ # Business entities & repository interfaces
├── application/ # Use cases
├── infrastructure/ # Database, cache, pubsub implementations
├── interfaces/ # Controllers & DTOs


### Architectural Principles Applied

- Dependency Inversion
- Separation of Concerns
- Framework-independent business logic
- Repository Pattern
- Service Layer Pattern
- Explicit DTO usage

---

## 🚀 Features

### 🔐 Authentication

- JWT access token
- Refresh token
- Role-Based Access Control (RBAC)

### 🏋️ Workouts

- Create workout
- List workouts (cursor-based pagination)
- Workout check-in
- Workout session tracking

### 🥗 Diet Plans

- Create diet plan
- Register meals
- Nutritional tracking

---

## ⚡ Performance & Scalability

- Redis cache-aside strategy
- Strategic TTL configuration
- Cache invalidation on mutation
- Indexed database queries
- Avoidance of N+1 queries
- Structured logging

---

## 📡 Event-Driven Check-in

When a workout check-in occurs:

1. Workout session is persisted
2. `WORKOUT_CHECKED_IN` event is published to Google Cloud Pub/Sub
3. Consumer service processes the event asynchronously

This design enables decoupled processing and horizontal scalability.

---

## 🛠 Tech Stack

- NestJS
- PostgreSQL
- Redis
- Google Cloud Pub/Sub
- Docker
- GitHub Actions
- Kubernetes (GKE)
- ArgoCD
- Pino (structured logging)

---

## 🐳 Running Locally

bash
docker-compose up --build

## Services started:

 - API → http://localhost:3000
 - PostgreSQL
 - Redis
 - Check-in Consumer

## 🧪 Running Tests
 - npm run test
 # Includes:

 - Unit tests (use cases)
 - Integration tests (HTTP layer)
 - Repository mocking
 - Error scenario coverage

## Deployment
# Deployment strategy:
 - Docker multi-stage builds
 - GitHub Actions CI pipeline
 - Image push to Artifact Registry
 - GitOps deployment using ArgoCD
 - Running on GKE

## 📊 Logging & Observability

 - Structured JSON logs including:
 - traceId
 - userId
 - event type
 - timestamp
 - Logs are centralized in Google Cloud Logging.

## 🧠 Architectural Decisions

 - Clean Architecture for maintainability
 - Pub/Sub for asynchronous decoupling
 - Cache-aside for read-heavy endpoints
 - Modular monolith design
 - Local Docker environment mirroring production setup