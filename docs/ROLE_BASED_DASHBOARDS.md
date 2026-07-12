# TransitOps Role-Based Dashboards Plan

This document details the layout, data metrics, interactive charts, and widgets designed specifically for each of the four target user roles.

---

## 1. Fleet Manager Dashboard

*   **Objective**: Monitor vehicle status, coordinate repairs, and ensure high fleet availability.
*   **Layout Grid**: Split Dashboard (Main Grid Left, Action Widget Right).

### Left Section Widgets (Main Analysis)
1.  **Fleet Availability & Status Chart**:
    *   *Type*: Stacked Area Chart.
    *   *Data Series*: `Available`, `On Trip`, `In Shop`, `Retired`.
    *   *Visuals*: Soft transitions, semi-transparent overlays. No grid ticks.
2.  **Overdue Maintenance Table**:
    *   *Columns*: Vehicle plate, scheduled date, maintenance type, severity indicator.
    *   *Interaction*: Clicking a row opens a slide-out drawer to log resolving actions.

### Right Section Widgets (Quick Action)
3.  **Fleet Health KPI Summary**:
    *   *KPI 1*: Active Fleet (e.g., `42 / 45` operational).
    *   *KPI 2*: In-Shop Rate (e.g., `4.5%`).
    *   *KPI 3*: Fleet Utilization (e.g., `82%`).
4.  **Quick Action Widget**:
    *   *CTAs*: `Schedule Maintenance` and `Register Vehicle`.

---

## 2. Dispatcher Dashboard

*   **Objective**: Manage driver scheduling and monitor ongoing dispatches.
*   **Layout Grid**: Split Dashboard (Main Grid Left, Live Feeds Right).

### Left Section Widgets (Main Analysis)
1.  **Trip Capacity Utilization**:
    *   *Type*: Horizontal stacked bar charts showing current cargo weight vs max weight capacity.
    *   *Indicator*: Bar color turns warning-yellow above 85% capacity. It blocks submission above 100%.
2.  **Live Trips Log**:
    *   *Columns*: Trip ID, Driver, Vehicle, Destination, Dispatch Time, Progress % (calculated using odometer targets).
    *   *Interaction*: Right-click row for context menu options: `Complete Trip` or `Cancel Trip`.

### Right Section Widgets (Live Feeds)
3.  **Active Driver & Vehicle Pool**:
    *   *Driver List*: Displays available drivers. Drivers with suspensive flags or expired licenses are hidden.
    *   *Vehicle List*: Lists available vehicles.
4.  **Pending Dispatches Log**:
    *   *Status*: Displays draft trips awaiting final driver assignment or dispatch execution.

---

## 3. Safety Officer Dashboard

*   **Objective**: Manage compliance, track license expirations, and monitor safety scores.
*   **Layout Grid**: Standard List Grid with high-visibility alert headers.

### Alert Headers (Top of View)
1.  **Critical License Expiry Panel**:
    *   *Alert*: Displays active drivers whose licenses will expire in less than 30 days. Highlighted in warning-amber.
    *   *Action*: Direct `Send Alert` message command triggers.

### Main Content Area
2.  **Drivers Compliance Index**:
    *   *Columns*: Driver Name, License Number, Expiry Date, Safety Score (0-100), Status badge (`Available`, `On Trip`, `Off Duty`, `Suspended`).
    *   *Details*: Driver profile details can be expanded inline. Contains links to view historical incident logs.
3.  **Safety Score Trend Analysis**:
    *   *Type*: Horizontal bar chart displaying average compliance metrics across the team.

---

## 4. Financial Analyst Dashboard

*   **Objective**: Audit operational expenses, track fuel efficiency, and monitor vehicle ROI.
*   **Layout Grid**: Grid-based dashboard.

### Top Row Widgets (Primary Metrics)
1.  **Running Costs Overview**:
    *   *KPI 1*: Month-To-Date Spending.
    *   *KPI 2*: Average Fuel Cost per Kilometer.
    *   *KPI 3*: Cost per Vehicle.
    *   *KPI 4*: Average Maintenance Cost.

### Main Content Row
2.  **Expense Breakdown Chart**:
    *   *Type*: Area Chart comparing cumulative revenue vs operational costs (fuel + repairs + parking) over time.
3.  **Category Distribution**:
    *   *Type*: Donut Chart showing spending by category (Fuel, Repairs, Insurance, Misc).
4.  **Vehicle ROI Table**:
    *   *Columns*: Vehicle plate, total fuel logged, repair expense, total mileage, calculated ROI score.
