# TransitOps: Project Structure & Setup

This document describes the recommended directory layout and project structure for the **TransitOps Smart Transport Operations Platform**, assuming a modern full-stack TypeScript/JavaScript stack (Next.js with Node.js/Express or Fastify, and PostgreSQL with Prisma ORM).

---

## 1. Project Directory Layout

```
transitops/
├── .github/                  # CI/CD Workflows (GitHub Actions)
│   └── workflows/
│       ├── test.yml
│       └── deploy.yml
├── prisma/                   # Database Schema & Migrations
│   ├── schema.prisma         # Prisma Schema (Entities & Constraints)
│   └── migrations/           # Auto-generated SQL Migrations
├── public/                   # Static Assets (Images, Icons, Fonts)
│   └── favicon.ico
├── src/                      # Source Code
│   ├── components/           # Reusable Frontend Components
│   │   ├── ui/               # Base UI Components (buttons, inputs, cards)
│   │   ├── dashboard/        # Dashboard KPIs & Charts
│   │   ├── vehicles/         # Vehicle lists, registration form
│   │   ├── drivers/          # Driver compliance list
│   │   └── trips/            # Trip dispatch form & list
│   ├── pages/                # Frontend Pages & Serverless API Routes
│   │   ├── api/              # API Endpoint Controllers (RBAC-enforced)
│   │   │   ├── auth/         # Login/Logout / Session endpoints
│   │   │   ├── vehicles/     # CRUD & Status check routes
│   │   │   ├── drivers/      # Driver CRUD, License alert endpoints
│   │   │   ├── trips/        # Dispatch validation, status transition routes
│   │   │   ├── maintenance/  # In-shop automatic transitions
│   │   │   └── reports/      # Fuel logs, Expenses, CSV Export
│   │   ├── _app.tsx          # App wrapper (Global styles & Auth Provider)
│   │   ├── index.tsx         # Dashboard View (Fleet Manager / Analyst)
│   │   ├── login.tsx         # Login Page
│   │   ├── vehicles.tsx      # Vehicles List & Registry View
│   │   ├── drivers.tsx       # Driver Management View (Safety Officer)
│   │   ├── trips.tsx         # Dispatch & Live Deliveries View (Driver/Dispatcher)
│   │   └── reports.tsx       # Expense & ROI Charts View (Financial Analyst)
│   ├── hooks/                # Custom React Hooks (useAuth, useFetch)
│   ├── lib/                  # Library configurations (Prisma Client, Excel/PDF utils)
│   │   ├── db.ts             # Instantiated database client
│   │   └── email.ts          # Email dispatch helper (reminders)
│   ├── middleware.ts         # Edge middleware (Authentication & Route-level RBAC)
│   ├── styles/               # CSS & Theme Files
│   │   └── globals.css       # Design System tokens & Vanilla CSS styles
│   └── utils/                # Helper utilities (compliance, date formatting)
│       └── validations.ts    # Business logic validations (weight, license checks)
├── .env.example              # Template for Environment variables
├── package.json              # Package manifest and script definitions
├── README.md                 # Project introduction and boot instructions
└── tsconfig.json             # TypeScript configuration
```

---

## 2. File Component Breakdown

### 2.1 Schema Definition (`prisma/schema.prisma`)
Contains the entity relations, mapping database tables directly to application types.

### 2.2 Global CSS (`src/styles/globals.css`)
Houses vanilla CSS styling, using HSL variable definitions for a dark mode responsive UI. Includes transitions for smooth hover states and animated loaders.

### 2.3 Validations Middleware (`src/utils/validations.ts`)
The logical gatekeeper for dispatch operations. Implements functions like:
- `validateCargoCapacity(vehicleId, cargoWeight)`: Throws error if cargo > capacity.
- `validateDriverLicense(driverId)`: Returns false if driver license is expired or status is Suspended.
- `validateStatusForTrip(driverId, vehicleId)`: Checks that neither is already `On Trip`.

---

## 3. Recommended Development Stack

| Layer | Technology | Rationale |
| :--- | :--- | :--- |
| **Frontend** | React / Next.js (TypeScript) | Server-side rendering, fast routing, and structured pages. |
| **Styling** | Vanilla CSS (with CSS variables) | Highly customizable, performs exceptionally, no heavy tailwind configs. |
| **Backend / API** | Next.js API Routes | Colocated endpoints, lightweight backend setup. |
| **Database** | PostgreSQL | Robust relation capabilities, transactional integrity. |
| **ORM** | Prisma | Typesafe database client, simplified schema migrations. |
| **Auth** | NextAuth.js (or JWT) | Built-in provider for session management and RBAC. |
| **Charts** | Chart.js / Recharts | Canvas-based beautiful responsive visual reporting. |
