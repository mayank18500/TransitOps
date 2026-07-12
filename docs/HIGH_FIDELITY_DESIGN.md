# TransitOps High-Fidelity UI Design Specifications

This document defines the high-fidelity visual layouts, content regions, and widget details for every view in TransitOps, reflecting a dark-first, calm, and premium enterprise aesthetic.

---

## 1. Authentication View (Sign-In)

*   **Visual Structure**: Centered single-column canvas card. A subtle vertical glow (`bg-indigo-500/5 blur-[120px]`) is positioned directly behind the card.
*   **Sign-In Container**:
    *   *Dimensions*: `w-[400px]`, `rounded-xl`, `bg-bg-surface`, `border-[1px] border-border-default`.
    *   *Logo Section*: Center-aligned `h-32px` minimal TransitOps emblem (Inter bold, indigo color fill).
    *   *Typography*:
        *   Heading: `text-h3` ("Welcome back") in `var(--text-primary)`.
        *   Subtitle: `text-body` ("Enter your credentials to manage your fleet") in `var(--text-secondary)`.
    *   *Forms*: Input containers stacked vertically with a `gap-16px` grid. Label texts are `text-tiny` tracking `0.02em` in `var(--text-muted)`.
*   **Actions**:
    *   *Primary Button*: Full-width `h-40px` Primary CTA ("Sign In") with active scale transitions.
*   **Feedback & Validation**: Errors (such as invalid login credentials) fade in below inputs in `var(--danger-fg)` with a micro-shake animation.

---

## 2. Fleet Manager Dashboard

*   **Layout Grid**: Split Panel Layout (Left 2/3 main, Right 1/3 sidebar).
*   **Top Row Metrics (KPIs)**:
    *   4-column layout card display: Total Fleet Count, Available vehicles, In-Shop Vehicles, Active Utilization %.
*   **Main Section (Left)**:
    *   *Fleet Availability Chart*: Area chart mapping vehicle usage trends. Grid lines are configured with `var(--border-muted)`. Area fill uses `var(--primary)/10` fading to transparent.
    *   *Overdue Maintenance Workorders*: Minimalist table listing vehicles with active faults, displaying severity indicator dots (red for critical, amber for scheduled).
*   **Sidebar Section (Right)**:
    *   *Critical Alerts Widget*: Elevated card listing vehicles approaching compliance limits.
    *   *Recent Logs Feed*: Vertical timeline showing resolved maintenance tickets.
*   **Actions**: Primary Topbar button `+ Register Vehicle`.

---

## 3. Dispatcher Dashboard

*   **Layout Grid**: Split Panel Layout (Left 2/3 main, Right 1/3 sidebar).
*   **Top Row Metrics (KPIs)**:
    *   4-column cards: Today's Active Trips, Active Drivers, Available Vehicles, Pending Dispatches.
*   **Main Section (Left)**:
    *   *Active Cargo Load Monitor*: Horizontal bars showing cargo weight vs vehicle payload capacity.
    *   *Ongoing Trips table*: Logs trip progress, estimated arrival, and driver/vehicle assignments.
*   **Sidebar Section (Right)**:
    *   *Available Pool Feed*: Quick tabs to search available drivers and vehicles.
*   **Actions**: Primary Topbar button `+ Create Trip`.

---

## 4. Safety Dashboard

*   **Layout Grid**: Standard List Layout (Full width).
*   **Top Row Metrics (KPIs)**:
    *   4-column cards: Total Roster, Compliant Drivers %, Expiring Licenses (<30 days), Active Suspensions.
*   **Main Section**:
    *   *Drivers Roster Table*: Name, License ID, License Expiry Date, Safety Rating Score (0-100), Status badge.
    *   *Safety Alerts Panel*: Expiring license alerts with a direct warning action button.
*   **Actions**: `+ Add Driver` in Topbar.

---

## 5. Financial Dashboard

*   **Layout Grid**: Split Panel Layout (Left 2/3 main, Right 1/3 sidebar).
*   **Top Row Metrics (KPIs)**:
    *   4-column cards: Running Cost (MTD), Fuel Expense, Maintenance Cost, Overall ROI Score.
*   **Main Section (Left)**:
    *   *Cumulative Expenses vs Revenue Chart*: Multi-line area chart showing financial metrics over time.
    *   *High-Expense Vehicles List*: Table highlighting vehicles with the highest operating costs.
*   **Sidebar Section (Right)**:
    *   *Category Distribution*: Donut chart splitting costs (Fuel, Repair, Insurance, Misc).
*   **Actions**: `+ Log Expense` and `Export Report` dropdown.

---

## 6. Module Index & Detail Sub-Views

### A. Vehicles Module
*   *Index View*: Grid of vehicle cards showing plate number, status badge, payload progress, and active tasks.
*   *Detail View*: Tabbed panel showing Trip History, Maintenance Logs, and Cost ROI Breakdown.

### B. Drivers Module
*   *Index View*: Driver roster table.
*   *Detail View*: Driver record card detailing safety performance, license documents, and assigned vehicles.

### C. Trips Module
*   *Index View*: Trips index table (Draft, Dispatched, Completed, Cancelled).
*   *Detail View*: Trip timeline tracking dispatch, cargo validation records, and fuel completion logs.

### D. Maintenance Module
*   *Index View*: Workorders directory.
*   *Detail View*: Detailed repair logs, service provider details, and invoices.

### E. Fuel & Expenses Module
*   *Index View*: Combined transaction ledger showing category badges, dates, costs, and link references.
*   *Log Panel*: Slide-out drawer with input forms for logged expenses.

---

## 7. System Sub-Views & Edge States

### A. Analytics & Reports Portal
*   *Analytics View*: Grid of charts tracking fleet metrics (Fuel efficiency curve, maintenance ROI).
*   *Reports Index*: Export interface with checklists to select categories for CSV generation.

### B. Settings & Profile Editor
*   *Settings View*: Centered form panel with sections for Profile Details, Security, and Session Logs.

### C. 404 View (Not Found)
*   *Visual*: Centered layout displaying a faded graphic, a `text-hero` header ("Destination Not Found"), a brief subtitle, and a primary return button ("Back to Dashboard").

### D. Empty States
*   *Visual*: Centered inside the main content area. Includes a muted icon, a concise title, a brief helper subtitle, and a primary action button (e.g., `+ Register Vehicle`).

### E. Loading States
*   *Visual*: Renders a skeleton overlay layout replicating dashboard widgets and table rows using soft background shimmers.
