# System Architecture

Frontend

↓

REST API

↓

Express Backend

↓

Business Logic Layer

↓

Prisma ORM

↓

PostgreSQL

---

Every business rule must be implemented inside the Service Layer.

Controllers must never contain business logic.

Controllers

↓

Services

↓

Prisma

↓

Database

---

Frontend communicates only using REST APIs.

No direct database access.