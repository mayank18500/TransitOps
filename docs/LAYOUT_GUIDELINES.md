# TransitOps Layout Guidelines

This document defines page layout parameters, grids, alignments, and spacing rules for TransitOps views.

---

## 1. Grid & Page Layout System

We use a 12-column layout grid to maintain structural alignment across the platform:

```
┌────────────────────────────────────────────────────────────────────────┐
│ PAGE CONTAINER (max-w-[1440px] px-24px py-32px)                        │
│                                                                        │
│ ┌────────────────────────────────────────────────────────────────────┐ │
│ │ PAGE HEADER (mb-32px)                                              │ │
│ ├──────┬──────┬──────┬──────┬──────┬──────┬──────┬──────┬──────┬──────┤ │
│ │ Col1 │ Col2 │ Col3 │ Col4 │ Col5 │ Col6 │ Col7 │ Col8 │ Col9 │ Col10│ │
│ ├──────┴──────┴──────┴──────┼──────┴──────┴──────┴──────┴──────┴──────┤ │
│ │ 4-Column KPI Grid         │ 8-Column Data Content Grid              │ │
│ │ (gap-24px)                │ (gap-24px)                              │ │
│ └───────────────────────────┴─────────────────────────────────────────┘ │
└────────────────────────────────────────────────────────────────────────┘
```

### Layout Breakdown
*   **Page Container Limits**:
    *   Maximum width: `1440px` (centered).
    *   Outer horizontal padding: `px-24px` on desktop, `px-16px` on mobile.
    *   Vertical padding: `py-32px` on desktop, `py-24px` on mobile.

---

## 2. Core Layout Architectures

### Layout A: Split Dashboard (Dashboards, Analytics)
*   **Structure**: 2-column layout.
    *   *Column 1 (Main/Left)*: `col-span-8` (2/3 width) — Hosts charts, main lists.
    *   *Column 2 (Sidebar/Right)*: `col-span-4` (1/3 width) — Hosts secondary stats and logs.
*   **Spacing**: Grid spacing set to `gap-24px`.

### Layout B: Standard List Index (Vehicles, Drivers, Trips)
*   **Structure**: 1-column layout.
    *   *Header Section*: Page titles, breadcrumbs, search, filters.
    *   *Main Roster Table*: Full width (`col-span-12`).
*   **Spacing**: Grid spacing set to `gap-24px`.

### Layout C: Focus Form / Profile View
*   **Structure**: Centered single container.
    *   *Width*: `max-w-xl` (`576px`) or `max-w-2xl` (`672px`).
*   **Spacing**: Spacing between form input groups set to `space-y-16px`.

---

## 3. Sidebar & Topbar Proportions

### The Sidebar
*   **Width**:
    *   Expanded: `w-256px` (`16rem`).
    *   Collapsed: `w-64px` (`4rem`).
*   **Spacing**: Padding set to `p-24px` (top, bottom, left, right).
*   **Rhythm**: Link lists are spaced with `space-y-8px`. Link item heights are set to `h-40px`.

### The Topbar
*   **Height**: Pinned height of `h-64px` (`4rem`).
*   **Gutter**: Inner padding set to `px-24px`.
*   **Element Gaps**: Spacing between breadcrumbs, search bars, notifications, and profile menus set to `gap-16px`.

---

## 4. Spacing Rules & Rhythms

To prevent inconsistent layouts, we use standard vertical and horizontal spacing:
*   **Header Margin**: Margin below the page header is set to `mb-32px`.
*   **KPI Grid Margin**: Margin below KPI cards is set to `mb-24px`.
*   **Section Spacing**: Vertical spacing between sections in a scroll area is set to `space-y-32px`.
*   **Card Internal Spacing**: Padding inside cards is set to `p-24px`. Small cards can use `p-16px`.
*   **Table Cell Padding**: Table headers and rows use `py-16px px-24px` to keep rows readable.
*   **Form Field Gaps**: Labels are spaced `mb-6px` above inputs, and inputs are spaced `mb-16px` from other form elements.
