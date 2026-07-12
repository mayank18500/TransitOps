# User Persona Guide: Fleet Manager

This guide details the operational workspace, core responsibilities, and application workflows designed specifically for the **Fleet Manager** persona in TransitOps.

---

## 1. Persona Profile & Objectives

The Fleet Manager is responsible for overseeing the physical assets of the logistics operation, ensuring vehicle uptime, managing maintenance lifecycle processes, and maintaining overall fleet efficiency.

### Key Objectives
* **Maximize Fleet Utilization**: Track and improve the ratio of active trips to available assets.
* **Control Vehicle Lifecycle**: Manage vehicles from initial registration to retirement.
* **Minimize Maintenance Downtime**: Schedule preventive maintenance and track repair turnaround times.
* **Maintain Odometer Accuracy**: Audit vehicle mileage logs to prompt scheduled servicing.

---

## 2. Main Workspaces & Views

### 2.1 The Vehicle Registry (`/vehicles`)
The primary asset database dashboard.
* **Add New Vehicle**: Input a unique Registration Number, Model Name, Vehicle Type (Van, Heavy Truck, Light Truck, Sedan), Maximum Cargo Weight Capacity (kg), Current Odometer (km), and Acquisition Cost.
* **Asset Lifecycle Control**: Manually transition status to `Retired` when a vehicle is decommissioned.
* **Status Indicators**:
  * <span style="color:green; font-weight:bold;">● Available</span>: Ready for driver assignment/trips.
  * <span style="color:blue; font-weight:bold;">● On Trip</span>: Currently out on dispatch.
  * <span style="color:orange; font-weight:bold;">● In Shop</span>: Undergoing active maintenance.
  * <span style="color:red; font-weight:bold;">● Retired</span>: Decommissioned; permanently hidden from trip dispatch selection.

### 2.2 The Maintenance Log (`/maintenance`)
Where all repair and service records are initiated.
* **Log Maintenance Action**: Create a ticket by selecting a vehicle, entering description details (e.g., "50k Mile Engine Service", "Replace Brake Pads"), maintenance category (Preventative, Corrective, Routine), estimated cost, and start date.
* **Automatic Availability Interlocking**: The moment a maintenance record is saved as **Active**, the system automatically changes the vehicle's status to `In Shop`. This immediately prevents it from appearing in any driver/dispatcher's selection pool.
* **Close Maintenance**: Input the actual completion date and final repair cost. Saving this restores the vehicle status to `Available` (unless marked `Retired` in the interim).

---

## 3. Operational Workflows & Instructions

### Scenario A: Registering a New Vehicle
1. Navigate to **Vehicle Registry** -> Click **Register Vehicle**.
2. Enter the details (e.g., Registration: `MH-12-PQ-9876`, Model: `Toyota Hiace 2024`, Type: `Van`, Max Load: `1200` kg, Odometer: `150` km).
3. Click **Submit**. The vehicle status defaults to `Available`.

### Scenario B: Scheduling a Vehicle for Engine Repairs
1. Navigate to **Maintenance Logs** -> Click **Schedule Maintenance**.
2. Select the vehicle (e.g., `MH-12-PQ-9876`) from the dropdown.
3. Choose Type: `Corrective`, enter cost `350`, start date `Today`, and description: `Fix transmission slippage`.
4. Click **Create Log**.
5. *System Event Check*: Go to the **Vehicle Registry**. Note that the status of `MH-12-PQ-9876` has automatically shifted to `In Shop`. Drivers can no longer select it for new dispatches.

### Scenario C: Completing Repairs and Returning to Service
1. Locate the active log for the vehicle in the **Maintenance Logs** screen.
2. Click **Close Ticket** / **Edit**.
3. Input the completion date (e.g., `Tomorrow`) and adjust the final cost if necessary.
4. Click **Submit/Save**.
5. *System Event Check*: The vehicle status is automatically restored to `Available`.
