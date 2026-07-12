# TransitOps Backend Phase Plan (6-Hour Timebox, TDD Approach)

Given the strict **6-hour timebox**, this plan condenses the roadmap into **5 highly focused, action-oriented phases**. We will follow **Test-Driven Development (TDD)**: writing failing tests first, then writing the minimal code to make them pass, and finally refactoring. This ensures the complex business rules are strictly enforced.

---

## 🛠️ Technology Stack & TDD Libraries

- **Node.js & Express.js**: REST API framework.
- **Prisma ORM & PostgreSQL**: Database toolkit and relational database.
- **JWT & Bcrypt**: Authentication and password hashing.

### TDD Libraries (Backend)
To follow a Test-Driven Development workflow, we will use the following testing stack:
- **Vitest**: Our primary test runner and assertion library. It is extremely fast, compatible with modern JS modules, and matches the project spec.
- **Supertest**: A library for testing Express HTTP endpoints without needing to spin up a live server instance on a port.
- *(Optional)* **dotenv-cli**: Useful for loading a `.env.test` file specifically when running test commands.

**Architectural Rule:** *Controllers must NEVER contain business logic. The flow is always: Routes → Controllers → Services (Business Logic) → Prisma.*

**TDD Workflow per Phase:**
1. **Red**: Write a failing test in `vitest` for the specific requirement (e.g., in a `tests/unit/` or `tests/integration/` folder).
2. **Green**: Write the minimal Express/Service code to make the test pass.
3. **Refactor**: Clean up the code while keeping the tests green.

---

## ⏱️ The 6-Hour TDD Execution Plan

### Phase 1: Setup, Schema, & Test Environment (Timebox: 1 Hour)
*Goal: Scaffold the backend, database, and TDD environment.*

1. **Folder Structure & Tools:** Scaffold the backend (`controllers/`, `routes/`, `services/`, `middleware/`, `prisma/`, `tests/`). Install `vitest` and `supertest` as dev dependencies.
2. **Database Schema:** Write the `schema.prisma` mapping out all entities (`Users`, `Roles`, `Vehicles`, `Drivers`, `Trips`, `Maintenance`, `FuelLogs`, `Expenses`).
3. **TDD Setup:** Write a simple `healthcheck.test.js` using Supertest to verify the Express server is testable. Write the `GET /health` route to make it pass.

### Phase 2: Authentication & RBAC Guard (Timebox: 1 Hour)
*Goal: Secure the API via TDD.*

1. **Test-First Auth:** Write tests in `tests/integration/auth.test.js` asserting that `POST /login` returns a JWT for valid credentials and 401 for invalid ones.
2. **Implementation:** Build the login controller and service (using Bcrypt and JWT) to pass the tests.
3. **Test-First RBAC:** Write tests verifying that a Fleet Manager token can access a restricted route, while a Driver token gets a `403 Forbidden`.
4. **Implementation:** Build the RBAC middleware to pass the authorization tests.

### Phase 3: Core Assets - Vehicles, Drivers, & Maintenance (Timebox: 1.5 Hours)
*Goal: TDD the CRUD operations and their status transitions.*

1. **Asset Tests:** Write tests for Vehicle/Driver CRUD. Specifically, write a test asserting that vehicle registration numbers must be unique (expecting a 400 error on duplicate).
2. **Asset Implementation:** Implement standard GET, POST, PUT, DELETE routes to pass the tests.
3. **Maintenance Business Logic Test:** Write a test asserting that creating an active maintenance record automatically changes the Vehicle status to "In Shop".
4. **Maintenance Implementation:** Implement the Service layer logic to satisfy this requirement and pass the test.

### Phase 4: Trip Management Engine (Timebox: 1.5 Hours)
*Goal: TDD the core state machine for the application.*

1. **Trip Validation Tests:** Write extensive tests in `tests/unit/tripService.test.js` or `tests/integration/trip.test.js`:
   - *Test:* Disallow dispatch if Cargo weight > Vehicle Capacity (expect 400).
   - *Test:* Disallow dispatch if Driver license is `Suspended` (expect 400).
   - *Test:* Disallow dispatch if Vehicle is `In Shop` (expect 400).
   - *Test:* Disallow dispatch if Driver or Vehicle is already `On Trip` (expect 400).
2. **Trip Implementation:** Build the validation engine in the Service layer to pass all edge cases.
3. **State Transition Tests & Implementation:** Write tests asserting that Dispatching sets both Vehicle and Driver to `On Trip`, and Completing sets them to `Available`. Build the logic to pass.

### Phase 5: Financials, Analytics & Polish (Timebox: 1 Hour)
*Goal: Financial tracking and dashboard KPIs.*

1. **Financial Tests:** Write basic tests for CRUD operations on `FuelLogs` and `Expenses`.
2. **Financial Implementation:** Build the routes and controllers.
3. **Analytics Tests:** Write a test asserting that `GET /dashboard` returns the correct aggregated `Fleet Utilization %` and `Operational Costs`.
4. **Analytics Implementation:** Implement the Prisma aggregation queries to calculate these KPIs and pass the tests.
