# User Persona Guide: Financial Analyst

This guide details the operational workspace, core responsibilities, and application workflows designed specifically for the **Financial Analyst** persona in TransitOps.

---

## 1. Persona Profile & Objectives

The Financial Analyst reviews and optimizes the financial performance of the transport operations, assessing fuel expenses, repair invoices, route profitability, and vehicle asset ROI.

### Key Objectives
* **Control Operating Costs**: Audit fuel logs, tolls, and maintenance expenditures to identify cost overruns.
* **Assess Asset Yield (ROI)**: Calculate whether vehicle revenue outweighs operating costs and acquisition expenses.
* **Analyze Fuel Efficiency**: Monitor Fuel Efficiency metrics (distance/fuel) across vehicle classes.
* **Generate Financial Export Audits**: Export trip and expense data sets for corporate accounting.

---

## 2. Main Workspaces & Views

### 2.1 The Finance & Expense Board (`/expenses`)
Where non-maintenance logistics overhead is recorded.
* **Record Expense Form**: Select vehicle, date, category (Toll, Permit, Insurance, Other), cost, and description.
* **Fuel Logging Form**: Log liters, unit cost, date, and vehicle ID. (Automatically calculated on trip completions, but can also be manually corrected/entered here).

### 2.2 Reports & Visual Analytics (`/reports`)
The reporting center for graphing expenses.
* **KPI Calculations Panels**:
  * **Fuel Efficiency**: Displays km per Liter.
  * **Vehicle ROI**: Computed using the standard formula:
    $$ROI = \frac{\text{Trip Revenue} - (\text{Maintenance Cost} + \text{Fuel Cost})}{\text{Acquisition Cost}}$$
  * **Total Operational Cost**: Sum of fuel, maintenance, and auxiliary expenses per asset.
* **Charts/Analytics View**: Render bar charts comparing operational costs by vehicle type (e.g., Heavy Trucks vs. Light Vans) or monthly fuel spend.
* **CSV Export Tool**: Select a date range and click **Export CSV** to download complete datasets for further Excel/spreadsheet manipulation.

---

## 3. Operational Workflows & Instructions

### Scenario A: Recording Tolls and Trip Fees
1. Navigate to the **Finance & Expense Board** -> Click **Log Expense**.
2. Select the target vehicle (e.g., `MH-12-PQ-9876`).
3. Enter category: `Toll`, amount: `45`, date: `Today`, and description: `State Line Toll Plaza Fee`.
4. Click **Save Expense**.
5. *System Event*: This expense is added to the vehicle's profile, immediately incrementing the calculated `Total Operational Cost` for that asset.

---

### Scenario B: Calculating and Reviewing Vehicle ROI
1. Navigate to **Reports & Analytics**.
2. Scroll to the **Asset ROI Table**.
3. View the calculated metrics for any vehicle (e.g., `MH-12-PQ-9876`):
   - *Acquisition Cost*: `$45,000`
   - *Logged Revenue*: `$6,200`
   - *Maintenance Cost*: `$350` (from closed maintenance logs)
   - *Fuel Costs*: `$850` (from trip fuel logs)
   - *Other Expenses*: `$45` (from toll logs)
   - *Total Operational Cost*: `$1,245` ($350 + $850 + $45$)
   - *Net Profit*: `$4,955` ($6,200 - $1,245$)
   - *Calculated ROI*:
     $$ROI = \frac{4955}{45000} \approx 11\%$$
4. Check if the ROI color indicator represents a healthy positive margin.

---

### Scenario C: Exporting Reports to Accounting
1. Navigate to **Reports & Analytics**.
2. In the **Export Manager** card, select the date range (e.g., `2026-07-01` to `2026-07-12`).
3. Choose the export entity (e.g., `Trips & Fuel Log Details`).
4. Click **Download CSV**.
5. *System Event*: The application generates a comma-separated values file containing headers (TripID, Date, VehicleReg, DriverName, OdometerDiff, LitersFuel, TotalCost) and downloads it directly to your machine.
