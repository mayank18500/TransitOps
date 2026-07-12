# TransitOps Screen Hierarchy & Layout System

This document outlines the content structure, UI zoning, information priority, and interactive behavior mappings for all primary views in the TransitOps application.

---

## 1. Global View Grid Standards

Every page is structured around a consistent spacing system:
*   **Page Header**: Left-aligned page title with Breadcrumbs. Right-aligned Single Primary Action button.
*   **KPI Grid (Above Fold)**: 3 to 4 horizontal metric cards displaying key performance data.
*   **Main Section**: Stretches across the full screen width. Contains the primary interactive element (e.g., Table or Chart grid).
*   **Sidebar Drawer (Overlays)**: Slide-out panels from the right edge for forms and configurations.

---

## 2. Information Priority (Above the Fold)

We rank information across all screens to ensure critical data is immediately visible:

| Rank Level | UI Component | Content Scope | Placement |
| :--- | :--- | :--- | :--- |
| **Critical** | Alert Banners / Badges | Suspended drivers, overdue maintenance, active system errors | Very top, overlay, or high-contrast badge. |
| **High** | KPI Cards | Active status counts, utilization %, total costs | Directly below the page header. |
| **Medium** | Main Table / List | Complete roster of vehicles, trips, or logs | Content area (scroll-bound). |
| **Low** | Pagination / Details | Entry creation date, ID strings, meta logs | Bottom of tables, popovers, details tabs. |

---

## 3. Layout Hierarchy by Screen

### A. Dashboard View (Role-Specific)
*   **Primary Content**: Main performance chart (Fleet Utilization or Financial ROI).
*   **Secondary Content**: Recent activities log list, active notifications alert card.
*   **KPI Panel**: 4 metrics (e.g., Active Trips, Vehicles Available, Driver Status, Running Cost).
*   **Actions**: `View Detailed Report` link.

### B. Vehicles Portal (Fleet Manager)
*   **Primary Content**: List of registered vehicles in a card layout.
*   **Secondary Content**: Active maintenance warnings list.
*   **KPI Panel**: Total Fleet Count, Available count, In Shop count, Retired count.
*   **Actions**:
    *   *Primary Action*: `+ Register Vehicle` button.
    *   *Row Action*: `Schedule Maintenance` or `Edit Details` (via Context Menu).
*   **Filters**: Dropdown filter by Status (`Available`, `On Trip`, `In Shop`, `Retired`).
*   **Search**: Inline local text filter by Registration Number.
*   **Empty State**: Centered illustration, text explaining how to add a vehicle, and `Register Vehicle` button.

### C. Drivers Portal (Safety Officer)
*   **Primary Content**: Drivers compliance roster table.
*   **Secondary Content**: Compliance alerts (expiring licenses list).
*   **KPI Panel**: Total Drivers, Suspended count, Compliant %, Off Duty count.
*   **Actions**:
    *   *Primary Action*: `+ Add Driver` button.
    *   *Row Action*: `Suspend Driver` / `Verify License`.
*   **Search**: Text input filtering by License number or name.
*   **Filters**: Toggle filter by Status (`Available`, `On Trip`, `Off Duty`, `Suspended`).

### D. Trips Portal (Dispatcher)
*   **Primary Content**: Live trips status dashboard table.
*   **Secondary Content**: Available capacity summary panel.
*   **KPI Panel**: Draft Trips, Dispatched Trips, Completed Today, Cancelled.
*   **Actions**:
    *   *Primary Action*: `+ Create Trip` button.
    *   *Row Action*: `Dispatch` (for drafts) or `Complete` (for active trips).
*   **Filters**: Category filter (`Draft`, `Dispatched`, `Completed`, `Cancelled`).
*   **Search**: Filter by Trip Destination or Plate Number.

### E. Expenses & Fuel (Financial Analyst)
*   **Primary Content**: Ledger table of fuel and operational expenses.
*   **Secondary Content**: Budget utilization bar charts.
*   **KPI Panel**: Month-to-date Spending, Fuel costs, Maintenance costs, Miscellaneous.
*   **Actions**:
    *   *Primary Action*: `+ Log Expense` button.
    *   *Row Action*: `View Invoice File` or `Delete Transaction`.

---

## 4. Universal Interaction Mappings

These interactive patterns apply across the entire application:

*   **Hover**:
    *   *Buttons*: Shift to hover state (background color changes, shadow deepens, 150ms transition).
    *   *Cards*: Elevation lift (`translate-y-[-2px]`), border color brightens, cursor becomes pointer.
    *   *Table Rows*: Subtle background highlight (`bg-bg-hover`).
*   **Click**:
    *   *Dropdowns*: List slides down using standard easing.
    *   *Row*: Details slide out in a right-aligned drawer.
*   **Double Click**:
    *   *Table Rows*: Opens the full detail page of the corresponding entity.
*   **Keyboard**:
    *   `Tab` key shifts focus through all inputs with a visible outline ring.
    *   `Esc` closes modals, search command boxes, and dropdown menus.
*   **Touch**:
    *   Tapping cards triggers micro-hover states instantly before navigation.
    *   Swiping left on lists opens context actions.
