# TransitOps: System Architecture & Business Logic

This document describes the core architecture, data models, state transitions, and business logic rules of the **TransitOps Smart Transport Operations Platform**.

---

## 1. System Architecture Diagram

```mermaid
graph TD
    Client[Web Interface / Dashboard] -->|REST API / HTTP| Controller[API / Controller Layer]
    Controller -->|Use Cases / Services| Logic[Business Logic Layer]
    Logic -->|Rules Engine| Rules[Compliance & Business Rules]
    Logic -->|Queries / Mutations| ORM[ORM / Data Access Layer]
    ORM -->|Read/Write| DB[(Database)]
```

---

## 2. Database Schema (Entities & Relationships)

The database consists of 8 core entities. Below is the Entity-Relationship Diagram (ERD) defining their associations.

```mermaid
erDiagram
    User ||--o{ Role : has
    User ||--o{ Trip : "assigns/creates"
    Vehicle ||--o{ Trip : "assigned_to"
    Vehicle ||--o{ MaintenanceLog : "has_logs"
    Vehicle ||--o{ FuelLog : "has_logs"
    Vehicle ||--o{ Expense : "incurs"
    Driver ||--o{ Trip : "operates"
    
    User {
        int id PK
        string email
        string password_hash
        string name
        int role_id FK
    }
    
    Role {
        int id PK
        string name "Fleet Manager, Driver, Safety Officer, Financial Analyst"
    }

    Vehicle {
        int id PK
        string registration_number UK "Unique Registration Number"
        string name_model
        string type "Van, Truck, Sedan, etc."
        float max_load_capacity "in kg"
        float odometer "Current odometer in km"
        float acquisition_cost
        string status "Available, On Trip, In Shop, Retired"
    }

    Driver {
        int id PK
        string name
        string license_number UK
        string license_category "Class A, B, C, etc."
        date license_expiry_date
        string contact_number
        float safety_score "0.0 to 100.0"
        string status "Available, On Trip, Off Duty, Suspended"
    }

    Trip {
        int id PK
        string source
        string destination
        int vehicle_id FK
        int driver_id FK
        float cargo_weight "in kg"
        float planned_distance "in km"
        float actual_distance "in km (optional, set on complete)"
        float fuel_consumed "in liters (optional, set on complete)"
        string status "Draft, Dispatched, Completed, Cancelled"
        datetime created_at
        datetime dispatched_at
        datetime completed_at
    }

    MaintenanceLog {
        int id PK
        int vehicle_id FK
        string issue_description
        string maintenance_type "Routine, Corrective, Preventative"
        float cost
        date start_date
        date end_date "null if active"
        string status "Active, Closed"
    }

    FuelLog {
        int id PK
        int vehicle_id FK
        float liters
        float cost
        date log_date
    }

    Expense {
        int id PK
        int vehicle_id FK
        string expense_category "Toll, Insurance, Maintenance, Permit"
        float cost
        date expense_date
        string description
    }
```

---

## 3. Core Business Rules

The following mandatory rules are enforced at the service level and database constraint layer:

1. **Unique Registration**: The vehicle `registration_number` and driver `license_number` must be unique.
2. **Dispatch Availability**:
   - Vehicles marked as `Retired` or `In Shop` are excluded from the dispatch selection pool.
   - Drivers with an expired license (current date > `license_expiry_date`) or marked as `Suspended` are excluded from dispatch.
3. **Double-Booking Prevention**:
   - A driver or vehicle with the status `On Trip` cannot be assigned to another trip.
4. **Capacity Enforcement**:
   - The cargo weight of a trip must not exceed the selected vehicle's `max_load_capacity` ($CargoWeight \le MaxLoadCapacity$).

---

## 4. State Transition Workflows

### Trip Lifecycle Status Transitions
The trip status lifecycle dictates the status changes of both the associated `Vehicle` and `Driver`.

```mermaid
stateDiagram-v2
    [*] --> Draft : Create Trip
    Draft --> Dispatched : Dispatch (Validates weight, licenses, status)
    note right of Dispatched
        Vehicle & Driver status 
        automatically set to "On Trip"
    end note
    
    Dispatched --> Completed : Complete Trip (Record final odometer & fuel)
    note right of Completed
        Vehicle & Driver status 
        restored to "Available"
    end note
    
    Dispatched --> Cancelled : Cancel Trip
    note right of Cancelled
        Vehicle & Driver status 
        restored to "Available"
    end note
```

### Maintenance Workflows
Creating a maintenance record automatically overrides the vehicle's availability.

```mermaid
stateDiagram-v2
    [*] --> ActiveMaintenance : Create Maintenance Log
    note right of ActiveMaintenance
        Vehicle status set to "In Shop"
        (Unavailable for dispatch selection)
    end note
    
    ActiveMaintenance --> ClosedMaintenance : Close Log
    note right of ClosedMaintenance
        Vehicle status set to "Available"
        (or remains "Retired" if retired during shop time)
    end note
```

---

## 5. Calculations and KPI Formulas

### 1. Fleet Utilization (%)
$$\text{Fleet Utilization (\%)} = \left( \frac{\text{Number of Vehicles marked 'On Trip'}}{\text{Total Registered Vehicles - Retired Vehicles}} \right) \times 100$$

### 2. Fuel Efficiency (km/L)
$$\text{Fuel Efficiency} = \frac{\text{Total Distance Travelled (km)}}{\text{Total Fuel Consumed (L)}}$$

### 3. Total Operational Cost per Vehicle ($)
$$\text{Total Operational Cost} = \sum(\text{Fuel Log Cost}) + \sum(\text{Maintenance Log Cost}) + \sum(\text{Other Expense Costs})$$

### 4. Vehicle Return on Investment (ROI)
$$\text{Vehicle ROI} = \frac{\text{Revenue generated by Vehicle} - \text{Total Operational Cost}}{\text{Acquisition Cost}}$$
*Note: Revenue can be calculated based on a fixed rate per km or contract value per completed trip.*
