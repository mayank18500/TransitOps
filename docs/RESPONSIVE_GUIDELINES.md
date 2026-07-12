# TransitOps Responsive Design Guidelines

This document defines layout adjustments, column wrapping rules, and element visibility behaviors across different screen sizes.

---

## 1. Breakpoint Reference Directory

We use standard Tailwind CSS breakpoints:

| Code Token | Min Width | Target Devices | Page Margins | Layout Constraints |
| :--- | :--- | :--- | :--- | :--- |
| **sm** | `640px` | Large Phones / Small Tablets | `px-16px` | Stacked grids, floating actions. |
| **md** | `768px` | Medium Tablets (iPad) | `px-20px` | Sidebar hidden, navigation drawers. |
| **lg** | `1024px` | Laptops / Desktop | `px-24px` | Pinned sidebar, 2-column grids. |
| **xl** | `1280px` | High-Res Desktop Monitors | `px-24px` | Maximum layouts (`max-w-[1440px]`). |

---

## 2. Layout Wrapping Behaviors

We use CSS Grid and Flexbox wrapping to make layouts responsive:

### A. Grids & Columns Wrapping
*   **KPI Grid**:
    *   *Desktop (`>= 1024px`)*: 4 columns (`grid-cols-4`, `gap-24px`).
    *   *Tablet (`768px - 1024px`)*: 2 columns (`grid-cols-2`, `gap-16px`).
    *   *Mobile (`< 768px`)*: 1 column (`grid-cols-1`, `gap-12px`) or a horizontally scrollable container.
*   **Split Panels (2-Column Main/Sidebar)**:
    *   *Desktop*: 2 columns (`grid-cols-12`, with main `col-span-8` and sidebar `col-span-4`).
    *   *Tablet/Mobile*: Single-column stacked grid (`col-span-12`). The main panel displays first, and sidebar widgets are pushed below.

### B. Navigation Responsiveness
*   **Sidebar Navigation**:
    *   *Desktop (`>= 1024px`)*: Sidebar is permanently visible and pinned.
    *   *Tablet & Mobile (`< 1024px`)*: Sidebar collapses into a drawer, accessible via a hamburger menu.
*   **Topbar Navigation**:
    *   *Desktop*: Breadcrumbs, search, quick actions, notifications, and profile details are fully visible.
    *   *Mobile*: Breadcrumbs are hidden. Search bar collapses into a simple search icon.

---

## 3. Element Wrapping & Layout Collapsing

### A. Tables
On mobile, tables collapse into vertical list cards to prevent horizontal scrolling:

```
┌────────────────────────────────────────────────────────┐
│ DESKTOP TABLE VIEW                                     │
│  Reg Plate   Model       Payload    Status             │
│  ──────────  ──────────  ─────────  ─────────          │
│  Van-05      Ford Transit 500 kg    Available          │
└────────────────────────────────────────────────────────┘

┌────────────────────────────────────────────────────────┐
│ MOBILE CARD VIEW                                       │
│  ┌──────────────────────────────────────────────────┐  │
│  │ Van-05                                           │  │
│  │ ──────────────────────────────────────────────── │  │
│  │ Model: Ford Transit                              │  │
│  │ Payload: 500 kg                                  │  │
│  │ Status: [Available]                              │  │
│  └──────────────────────────────────────────────────┘  │
└────────────────────────────────────────────────────────┘
```

### B. Charts
*   **Grid Scaling**: Charts use Recharts `<ResponsiveContainer width="100%" height={320} />` to automatically adjust to parent container sizes.
*   **Mobile Optimizations**: We hide grid lines, secondary legends, and axis labels on mobile views to maximize line and area display space.

### C. Cards
*   **Internal Margins**: Padding drops from `p-24px` on desktop to `p-16px` on tablet and mobile layouts.
*   **Card Groups**: Multi-card grids wrap dynamically using `grid-cols-[repeat(auto-fit,minmax(280px,1fr))]`.

---

## 4. Touch & Tap Interactions

*   **Target Dimensions**: Interactive elements (buttons, inputs, menu list items) have a minimum height of `40px` and a minimum width of `40px` to support touch inputs.
*   **Interaction Adjustments**: Hover states (like card elevations or color changes) only trigger on devices with hover capabilities: `@media (hover: hover)`. Touch devices trigger active states instantly on press.
