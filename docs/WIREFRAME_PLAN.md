# TransitOps Wireframe Plan

This document defines the layout specifications, structural grids, widget placements, and responsive behaviors for the core screens of the TransitOps platform. It acts as the structural design blueprint for Phase 3 components.

---

## 1. Universal Layout Grids

*   **Grid A (Standard List Page)**:
    *   *Desktop*: Single-column layout. Page Header (top), 4-column KPI cards (middle), Table/List with sidebar filters (bottom).
    *   *Mobile*: Stacked layout. Header (top), Scrollable horizontal KPI bar (middle), Stacked cards list (bottom).
*   **Grid B (Split Dashboard)**:
    *   *Desktop*: 2/3 width main grid for charts and data tables, 1/3 width sidebar grid for activities and alert notifications.
    *   *Mobile*: Single-column vertical stack (Main grid first, sidebar components pushed below).
*   **Grid C (Focus Entry Page)**:
    *   *Desktop*: Centered `max-w-xl` single container card for forms and profile editors.

---

## 2. Wireframe Specifications

### A. Authentication View (Login)
*   **Structure**: Centered single-column card (`Grid C`).
*   **Header**: TransitOps Logo, title ("Sign in to platform"), and subtitle.
*   **Form Controls**:
    *   Email Input (focus outline, placeholder).
    *   Password Input (hide/show toggle, forgot password link).
*   **Actions**: Primary CTA button ("Sign In") and Google/SSO alternative.
*   **Responsive**: Centered layout fits mobile screens with adjusted margins.

### B. Fleet Manager Dashboard
*   **Layout**: `Grid B` (Split Dashboard).
*   **Main Section (Left 2/3)**:
    *   *Widget 1 (Top)*: Fleet Health chart (Line/Area representation of Active vs In Shop vehicles over time).
    *   *Widget 2 (Bottom)*: Upcoming maintenance schedule calendar index list.
*   **Sidebar Section (Right 1/3)**:
    *   *Widget 3 (Top)*: Quick Stats list (Active Workorders count, Suspended Vehicles, Available pool count).
    *   *Widget 4 (Bottom)*: Recent activity log.
*   **Actions**: `+ Register Vehicle` button.

### C. Dispatcher Dashboard
*   **Layout**: `Grid B` (Split Dashboard).
*   **Main Section (Left 2/3)**:
    *   *Widget 1 (Top)*: Horizontal progress bars for cargo capacities on today's active trips.
    *   *Widget 2 (Bottom)*: Today's Active Trips list with status indicators.
*   **Sidebar Section (Right 1/3)**:
    *   *Widget 3 (Top)*: Available Drivers widget (avatars with checkmarks).
    *   *Widget 4 (Bottom)*: Available Vehicles list.
*   **Actions**: `+ Create Trip` button.

### D. Safety Dashboard
*   **Layout**: `Grid A` (Standard List).
*   **KPI Bar**: Compliance Rate %, Driver Count, Expiring Licenses count, Pending Suspensions.
*   **Main Section**: Drivers compliance table displaying Name, License Status, License Expiry, Safety Score, and status toggle.
*   **Actions**: `+ Add Driver` button.

### E. Finance Dashboard
*   **Layout**: `Grid B` (Split Dashboard).
*   **Main Section**: Combined Operating Expense vs Fuel Trend area chart.
*   **Sidebar Section**: Category spending donut chart, transaction logs.
*   **Actions**: `+ Log Expense` button, `Export CSV` dropdown.

### F. Vehicle Details Page
*   **Layout**: `Grid B` (Split Dashboard).
*   **Main Section**:
    *   *Card 1 (Top)*: Vehicle Identity profile card (Plate, Model, status badge, odometer count).
    *   *Card 2 (Bottom)*: Complete historical trip log.
*   **Sidebar Section**:
    *   *Card 3 (Top)*: Active Maintenance workorder card.
    *   *Card 4 (Bottom)*: Cumulative Fuel Efficiency and ROI metrics.

---

## 3. Responsive Layout Adjustments

*   **Tables**: On Mobile layouts, tables collapse into vertical cards. Each card displays the primary column as a bold header, with secondary columns displayed as label-value pairs.
*   **KPI Cards**: On mobile screens, cards shrink to fit, displaying the numeric metric in a bold font size (`text-h2`) next to a small, descriptive icon.
*   **Split Panels**: Main-to-sidebar columns wrap from two-column inline grids to stacked layout containers.
