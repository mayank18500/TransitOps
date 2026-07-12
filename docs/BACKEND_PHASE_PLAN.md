# TransitOps Backend Phase Plan (6-Hour Timebox)

Given the strict **6-hour timebox**, this plan condenses the 15-phase roadmap from the docs into **5 highly focused, action-oriented phases**. It groups related features so the developer can stay in flow and tackle the most critical business logic efficiently.

---

## 🛠️ Technology Stack & Clarifications

Before starting, here is the curated backend stack according to the `TECH_STACK.md` and `ARCHITECTURE.md` docs. Ensure you are familiar with them:

- **Node.js & Express.js**: The runtime and lightweight web framework for handling REST API requests.
- **PostgreSQL**: The robust relational database storing all our entities. 
- **Prisma ORM**: The database toolkit. Use it for defining your schema, generating migrations, and writing type-safe DB queries.
- **JWT (JSON Web Tokens) & Bcrypt**: For secure session management. Bcrypt hashes passwords, and JWT issues session tokens.
- **Multer**: Middleware for handling `multipart/form-data` (useful if you tackle the bonus "Vehicle document management" feature).
- **Nodemailer**: For sending emails (useful if you tackle the bonus "Email reminders for expiring licenses").

**Architectural Rule:** *Controllers must NEVER contain business logic. The flow is always: Routes → Controllers → Services (Business Logic) → Prisma.*

---

## ⏱️ The 6-Hour Execution Plan

### Phase 1: Setup, Schema, & Seeding (Timebox: 1 Hour)
*Goal: Have a running Express server with a fully migrated and seeded PostgreSQL database.*

1. **Folder Structure:** Scaffold the backend (`controllers/`, `routes/`, `services/`, `middleware/`, `prisma/`).
2. **Database Schema:** Write the `schema.prisma` mapping out all entities: `Users`, `Roles`, `Vehicles`, `Drivers`, `Trips`, `Maintenance`, `FuelLogs`, and `Expenses`. Define all relations.
3. **Migrations & Seed:** Run Prisma migrations. Write a quick seed script to populate a few users (for each role), vehicles, and drivers so the API can be tested immediately.

### Phase 2: Authentication & RBAC Guard (Timebox: 1 Hour)
*Goal: Secure the API and ensure users can only access what their role permits.*

1. **Auth Endpoints:** Build `POST /login` and `GET /me`. (User registration can be seeded or limited to a super-admin script, as roles are assigned at creation).
2. **Auth Middleware:** Build a middleware to verify JWTs.
3. **RBAC Middleware:** Build a secondary middleware to enforce permissions per route based on `RBAC.md`:
   - *Fleet Manager:* Vehicles, Maintenance, Reports
   - *Dispatcher:* Trips, View Vehicles/Drivers
   - *Safety Officer:* Drivers
   - *Financial Analyst:* Fuel, Expenses, Analytics

### Phase 3: Core Assets - Vehicles, Drivers, & Maintenance (Timebox: 1.5 Hours)
*Goal: Build the CRUD operations for the physical assets and their status transitions.*

1. **Vehicles & Drivers API:** Implement standard GET, POST, PUT, DELETE routes. Ensure vehicle registration numbers are unique.
2. **Maintenance API:** Implement maintenance record creation.
3. **Business Logic Integration:** Inside the Service layer, enforce the rule: *Creating an active maintenance record automatically changes the Vehicle status to "In Shop"* (removing it from the dispatch pool).

### Phase 4: Trip Management Engine (Timebox: 1.5 Hours)
*Goal: Build the core state machine for the application.*

1. **Trip Endpoints:** `POST /trips` (Create Draft), `PATCH /trips/:id/dispatch`, `PATCH /trips/:id/complete`, `PATCH /trips/:id/cancel`.
2. **Validation Engine:** Before a trip is dispatched, the Service layer must validate:
   - Cargo weight ≤ Vehicle's Max Load Capacity.
   - Driver's license is valid and status is NOT `Suspended`.
   - Vehicle status is NOT `In Shop` or `Retired`.
   - Neither Driver nor Vehicle is currently `On Trip`.
3. **State Transitions:** 
   - Dispatching flips both Vehicle and Driver status to `On Trip`.
   - Completing/Canceling flips them back to `Available`.

### Phase 5: Financials, Analytics & Bonus Polish (Timebox: 1 Hour)
*Goal: Complete the financial tracking and wire up the dashboard KPIs.*

1. **Financials API:** Standard CRUD for `FuelLogs` and `Expenses`.
2. **Dashboard/Analytics Endpoints:** Build `GET /dashboard`, `GET /analytics`, `GET /reports`.
   - Aggregate data using Prisma to return: Fleet Utilization %, Operational Costs (Fuel + Maintenance), Active Vehicles, Drivers on Duty.
3. **Bonus Features (If Time Permits):** Implement CSV export for reports, or wire up `Nodemailer` for expiring license alerts, or `Multer` for document uploads.
