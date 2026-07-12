# TransitOps: LLM Prompts & Code Generation Guide

This document contains a set of pre-structured, high-context LLM prompts that developers can use to generate code, components, schemas, and test suites for the **TransitOps Platform**.

---

## 1. Database Schema Prompt
Use this prompt to generate the database schema and migrate script.

```text
Act as a senior data engineer. Generate a Prisma schema (`schema.prisma`) for a Postgres database supporting "TransitOps", a smart transport operations platform.
Include the following models with exact types, indexes, and constraints:
1. User (id, email, password_hash, name, role_id FK)
2. Role (id, name: Fleet Manager, Driver, Safety Officer, Financial Analyst)
3. Vehicle (id, registration_number UK, name_model, type, max_load_capacity in kg, odometer in km, acquisition_cost, status: Available/On Trip/In Shop/Retired)
4. Driver (id, name, license_number UK, license_category, license_expiry_date, contact_number, safety_score, status: Available/On Trip/Off Duty/Suspended)
5. Trip (id, source, destination, vehicle_id FK, driver_id FK, cargo_weight, planned_distance, actual_distance, fuel_consumed, status: Draft/Dispatched/Completed/Cancelled, timestamps)
6. MaintenanceLog (id, vehicle_id FK, issue_description, maintenance_type, cost, start_date, end_date, status: Active/Closed)
7. FuelLog (id, vehicle_id FK, liters, cost, log_date)
8. Expense (id, vehicle_id FK, expense_category, cost, expense_date, description)

Ensure cascading deletes are handled appropriately and add appropriate unique constraints and indexes for frequent search filters (e.g., vehicle registration, driver status, trip dates).
```

---

## 2. Business Rules Validation Engine Prompt
Use this prompt to generate the core business rules validation functions.

```text
Write a TypeScript validation library (`validations.ts`) for the TransitOps transport operations platform that enforces the following mandatory rules before dispatching a trip:
1. Vehicle registration number must be unique (checked in db, but include signature).
2. "Retired" or "In Shop" vehicles must never be selected for dispatch.
3. Drivers with expired licenses (license_expiry_date < current_date) or "Suspended" status cannot be assigned to trips.
4. A driver or vehicle already marked "On Trip" cannot be assigned to another trip.
5. Cargo Weight must not exceed the vehicle's maximum load capacity.

Implement these as clean, reusable functions that return an object `{ valid: boolean, error?: string }`. Write corresponding unit tests using Jest or Vitest to verify edge cases for each rule (e.g. driver license expiring today, weight exactly matching capacity).
```

---

## 3. UI Dashboard & KPI Layout Prompt
Use this prompt to construct a dashboard with premium aesthetics.

```text
Generate a Next.js React functional component (`Dashboard.tsx`) with vanilla CSS styles embedded in a CSS module. The dashboard must look modern, premium, and clean (using dark glassmorphism, HSL CSS variables, outfit/inter typography).
It must display the following metrics as interactive cards:
1. Active Vehicles (status = 'On Trip')
2. Available Vehicles (status = 'Available')
3. Vehicles in Maintenance (status = 'In Shop')
4. Active Trips (status = 'Dispatched')
5. Pending Trips (status = 'Draft')
6. Drivers On Duty (status = 'Available' or 'On Trip')
7. Fleet Utilization (Formula: [On Trip Vehicles / (Total - Retired)] * 100)

Include a filter bar at the top with dropdowns for "Vehicle Type", "Status", and "Region". Ensure metric cards have subtle hover micro-animations and gradients. Do not use external UI component libraries like Tailwind or shadcn; write pure HTML and vanilla CSS.
```

---

## 4. Trip Status State Machine Prompt
Use this prompt to generate the API handler managing trip transitions.

```text
Act as a backend developer. Generate an Express/Next.js API route handler to update a Trip status (`/api/trips/[id]/status`). The API accepts the target status in the request body ('Dispatched', 'Completed', 'Cancelled').
Implement the following database transaction logic:
1. Transition to 'Dispatched':
   - Validate weight limits, driver license expiration, and status checks.
   - Update Trip status to 'Dispatched'.
   - Update Vehicle status to 'On Trip' and Driver status to 'On Trip'.
2. Transition to 'Completed':
   - Accept `final_odometer` and `fuel_consumed` in request.
   - Update Trip status to 'Completed', and save distance/fuel parameters.
   - Update Vehicle status to 'Available', update Vehicle's current odometer to `final_odometer`.
   - Update Driver status to 'Available'.
3. Transition to 'Cancelled':
   - Update Trip status to 'Cancelled'.
   - Restore Vehicle status to 'Available' (unless retired).
   - Restore Driver status to 'Available' (unless suspended).

Wrap all db changes inside a single ACID-compliant database transaction. Return detailed errors if validations fail.
```
