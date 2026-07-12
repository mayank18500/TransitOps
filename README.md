# TransitOps: Smart Transport Operations Platform

TransitOps is a centralized logistics and fleet management platform designed to replace legacy spreadsheets and manual logbooks. The application manages the complete lifecycle of transport operations—from vehicle registration and driver onboarding to real-time dispatch checks, maintenance scheduling, and fuel cost analytics.

---

## 🚀 Key Features

* **Role-Based Access Control (RBAC)**: Custom operational dashboards tailored to four target personas: **Fleet Managers**, **Drivers/Dispatchers**, **Safety Officers**, and **Financial Analysts**.
* **Pre-Dispatch Verification Engine**: Enforces business rules in real-time, blocking dispatches for overloaded cargo, expired driver licenses, suspended profiles, or double-booked vehicles.
* **Maintenance & Shop Interlocking**: Automatically flags vehicles as `In Shop` upon maintenance ticket entry, preventing dispatch selection until repairs are closed.
* **Comprehensive Financial Analysis**: Automatically computes operating costs, vehicle fuel efficiency, and asset Return on Investment (ROI) with support for CSV reporting exports.

---

## 🛠️ Technology Stack

* **Frontend**: React, Next.js (TypeScript)
* **Styling**: Vanilla CSS (using HSL variable-based dark/light themes)
* **Database**: PostgreSQL (Prisma ORM)
* **API Layer**: Next.js Serverless API routes (with transaction safeguards)

---

## 📂 Project Structure & Documentation

Detailed system documentation is located in the **[documentation](file:///home/akshay/Desktop/odoo%20hackathon/documentation)** folder:

### 1. System Specifications & Logic
* **[architecture.md](file:///home/akshay/Desktop/odoo%20hackathon/documentation/architecture.md)**: Entity Relationship Diagram (ERD), state machines (Trip & Maintenance lifecycles), and KPI formulas.
* **[operational_flow.md](file:///home/akshay/Desktop/odoo%20hackathon/documentation/operational_flow.md)**: End-to-end trip operational flow diagram accompanied by a detailed sequence walkthrough based on the project specification.
* **[project_structure.md](file:///home/akshay/Desktop/odoo%20hackathon/documentation/project_structure.md)**: Detailed folder layout mappings for developers.
* **[llm_prompts.md](file:///home/akshay/Desktop/odoo%20hackathon/documentation/llm_prompts.md)**: Structured developer instructions to generate schemas, components, and logic validation modules.

### 2. Persona Specific Operation Manuals
* **[fleet_manager.md](file:///home/akshay/Desktop/odoo%20hackathon/documentation/fleet_manager.md)**: Asset onboarding, lifecycle tracking, and maintenance logs guide.
* **[driver_dispatcher.md](file:///home/akshay/Desktop/odoo%20hackathon/documentation/driver_dispatcher.md)**: Creating trips, dispatching, and logging odometer returns.
* **[safety_officer.md](file:///home/akshay/Desktop/odoo%20hackathon/documentation/safety_officer.md)**: Driver registry compliance audits, license alerts, and performance grading.
* **[financial_analyst.md](file:///home/akshay/Desktop/odoo%20hackathon/documentation/financial_analyst.md)**: Fleet OpEx logs, fuel logs, ROI monitoring, and CSV ledger downloads.

---

## ⚙️ Getting Started

### Prerequisites
* Node.js (v18+)
* PostgreSQL instance

### Quick Start
1. Clone the repository and navigate to the project directory:
   ```bash
   git clone <your-repo-url> transitops
   cd transitops
   ```
2. Install project dependencies:
   ```bash
   npm install
   ```
3. Configure environment parameters:
   * Copy the template config file:
     ```bash
     cp .env.example .env
     ```
   * Open `.env` and fill in your connection variables:
     ```env
     DATABASE_URL="postgresql://username:password@localhost:5432/transitops"
     NEXTAUTH_SECRET="your-session-secret"
     ```
4. Push database migrations and seed default roles:
   ```bash
   npx prisma migrate dev --name init
   npx prisma db seed
   ```
5. Spin up the development server:
   ```bash
   npm run dev
   ```
6. Open your browser and navigate to `http://localhost:3000`.
