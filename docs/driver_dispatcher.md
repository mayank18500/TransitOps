# User Persona Guide: Driver & Dispatcher

This guide details the operational workspace, core responsibilities, and application workflows designed for **Drivers and Dispatchers** managing trip routing, cargo allocation, and dispatches in TransitOps.

---

## 1. Persona Profile & Objectives

The Driver and Dispatcher roles coordinate the logistics pipeline. They assign tasks to vehicles and drivers, validate that load sizes are legal, track real-time delivery status, and close tickets once delivery is completed.

### Key Objectives
* **Efficient Route Dispatching**: Create and authorize trips quickly with real-time driver and vehicle matches.
* **Enforce Safety Capacities**: Prevent vehicle overloading by checking cargo weights before scheduling.
* **Track Live Trips**: Monitor all active routes and address delayed dispatches.
* **Accurate Completion Logs**: Ensure actual fuel usage and odometer details are logged upon vehicle return.

---

## 2. Main Workspaces & Views

### 2.1 The Dispatch & Trip Board (`/trips`)
The primary operation room where routes are planned and dispatched.
* **Create Trip Form**: Select Source, Destination, Driver, Vehicle, Cargo Weight (kg), and Planned Distance (km).
* **Trip List Grid**: A list containing all trips in different phases:
  * <span style="color:gray; font-weight:bold;">● Draft</span>: Planned routes, editable and not yet dispatched.
  * <span style="color:blue; font-weight:bold;">● Dispatched</span>: Live routes currently in transit.
  * <span style="color:green; font-weight:bold;">● Completed</span>: Closed routes showing recorded actual distances and fuel.
  * <span style="color:red; font-weight:bold;">● Cancelled</span>: Aborted dispatches.

---

## 3. Operational Workflows & Instructions

### Scenario A: Creating and Dispatching a Trip
1. Navigate to the **Trips Board** -> Click **New Trip**.
2. Fill in Source (e.g., `Warehouse A`) and Destination (e.g., `Distribution Center B`).
3. Select an **Available Driver** (the dropdown automatically filters out Suspended drivers or those with expired licenses).
4. Select an **Available Vehicle** (the dropdown automatically filters out Retired or In Shop vehicles).
5. Enter **Cargo Weight** (e.g., `450` kg).
6. Enter **Planned Distance** (e.g., `120` km).
7. Click **Save as Draft**.
8. Click **Dispatch** next to the Draft.
   - *System Validation check*: The system validates that Cargo Weight ($450$ kg) $\le$ Vehicle's Max Load Capacity (e.g., `500` kg). If valid, the transition succeeds.
   - *Status Change Update*: The Trip status transitions to `Dispatched`. Both the driver's status and the vehicle's status instantly transition to `On Trip`.

> [!WARNING]
> If you enter a cargo weight of `600` kg for a vehicle with a `500` kg limit, the system will block dispatch and throw an error: `Cargo Weight exceeds vehicle maximum capacity`. You must select a larger vehicle or reduce the weight.

---

### Scenario B: Completing a Live Trip
1. Once the driver returns from a route, locate the trip marked `Dispatched` on the **Trips Board**.
2. Click the **Complete** button.
3. A modal will open. Enter:
   - **Final Odometer** (e.g., `5120` km).
   - **Fuel Consumed** (e.g., `15` Liters).
4. Click **Log and Complete**.
5. *System Events*:
   - Trip status updates to `Completed`.
   - Vehicle and Driver statuses are reset to `Available`.
   - The vehicle's main odometer reading is updated to the `Final Odometer` value.
   - The fuel metrics are recorded and sent to the reports compiler.

---

### Scenario C: Cancelling a Dispatched Trip
1. If a trip must be aborted mid-journey (e.g., due to breakdown or road closure), locate the active `Dispatched` trip.
2. Click **Cancel Trip**.
3. Confirm the action.
4. *System Events*:
   - Trip status is set to `Cancelled`.
   - Vehicle and Driver status instantly return to `Available` (so they are immediately available for new assignments).
