# TransitOps Navigation System

This document outlines the layout, component placement, keyboard mappings, and responsive transition states of the TransitOps navigation system. The navigation is designed to remain context-aware, accessible, and fast across Desktop, Tablet, and Mobile layouts.

---

## 1. Responsive Navigation Framework

TransitOps adapts its navigation container layout based on screen width breakpoints:

```
┌────────────────────────────────────────────────────────┐
│ DESKTOP (> 1024px)                                     │
│ ┌──────────────┬─────────────────────────────────────┐ │
│ │              │ TOPBAR (Breadcrumbs, Search, Profile)│ │
│ │              ├─────────────────────────────────────┤ │
│ │ SIDEBAR      │                                     │ │
│ │ (Role-based  │ MAIN VIEW AREA                      │ │
│ │  Navigation) │                                     │ │
│ │              │                                     │ │
│ └──────────────┴─────────────────────────────────────┘ │
└────────────────────────────────────────────────────────┘

┌────────────────────────────────────────────────────────┐
│ TABLET & MOBILE (< 1024px)                             │
│ ┌────────────────────────────────────────────────────┐ │
│ │ TOPBAR (Hamburger Menu, Title, Search, Avatar)      │ │
│ ├────────────────────────────────────────────────────┤ │
│ │                                                    │ │
│ │ MAIN VIEW AREA                                     │ │
│ │ (Sidebar collapses to absolute overlay drawer)      │ │
│ │                                                    │ │
│ └────────────────────────────────────────────────────┘ │
└────────────────────────────────────────────────────────┘
```

### Transition Mechanics
*   **Desktop Layout**: The Sidebar is permanently pinned. It can be collapsed into a narrow icon-only bar (`w-16px` from `w-32px`) via a sidebar toggle.
*   **Tablet Layout**: The Sidebar is hidden. Swiping from the left edge or clicking the Topbar's hamburger icon slides the Sidebar into view as an overlay with background dimming (`bg-bg-base/60 backdrop-blur-md`).
*   **Mobile Layout**: Sidebar is fully overlay-driven. The Topbar header icons stack, exposing only Search, Notifications, and the Profile Avatar.

---

## 2. Navigation Layout Elements

### A. The Premium Sidebar
The Sidebar acts as the primary anchor.
*   **Brand Section**: Displaying the TransitOps wordmark and logo with a subtle hover opacity transition.
*   **Navigation Links Group**: Links specific to the logged-in role. The active link is highlighted by a floating background capsule.
*   **User Segment Block**: Displays user info and a logout button at the bottom of the sidebar.

### B. The Contextual Topbar
The Topbar provides utility actions and hierarchy details.
*   **Breadcrumbs**: Displays the location in the format `Module / Current Section` (e.g., `Vehicles / Van-05 Profile`). Clicking on parent tokens acts as links.
*   **Global Command Bar**: Clicking the global search shortcut (`Cmd+K` or `Ctrl+K`) opens a modal command bar.
*   **Notification Icon & Badge**: Exposes recent logs with a subtle pulsing count dot.
*   **Profile Dropdown**: Access to Settings and Log out.

### C. Context Menus & Action Menus
*   **Context Menus**: Clicking an item in a list or table opens a context menu with options like Edit, View Profile, and Change Status.
*   **Quick Actions Menu**: A global button next to search to trigger actions like "New Trip", "Register Vehicle", or "Log Expense" depending on user role.

---

## 3. Search Strategy

TransitOps uses a multi-tier search architecture:

1.  **Global Command Bar (`Cmd+K` / `Ctrl+K`)**:
    *   *Experience*: A search dialog overlay with background blur.
    *   *Search Scope*: Cross-entity search (e.g., typing a driver's name, trip ID, or vehicle plate number).
    *   *Keyboard Navigation*: Navigate results using `Up/Down` arrow keys, and select using `Enter`.
2.  **Local Index Search**:
    *   *Experience*: Stretched inline input box above tables.
    *   *Search Scope*: Local filtering inside index tables (e.g., search text inside "Vehicles" page only queries vehicles).

---

## 4. Notifications System

Notifications use **React Hot Toast** and are styled as floating alerts in the top-right corner.

| Level | Background Color | Border Color | Icon | Behaviour |
| :--- | :--- | :--- | :--- | :--- |
| **Success** | `bg-bg-surface-elevated` | `border-success-soft` | CheckCircle2 (Green) | Dismisses automatically in 3 seconds. |
| **Warning** | `bg-bg-surface-elevated` | `border-warning-soft` | AlertTriangle (Amber) | Dismisses automatically in 5 seconds. |
| **Info** | `bg-bg-surface-elevated` | `border-info-soft` | Info (Blue) | Dismisses automatically in 4 seconds. |
| **Danger** | `bg-bg-surface-elevated` | `border-danger-soft` | XCircle (Red) | Requires manual dismissal (click 'x'). |

---

## 5. Keyboard Navigation Mappings

For keyboard-only operations, TransitOps supports the following shortcuts:

| Keys | Scope | Action |
| :--- | :--- | :--- |
| `Cmd + K` / `Ctrl + K` | Universal | Opens/Closes Global Command Bar |
| `Esc` | Modal / Menu | Closes any open Modal, Dropdown, or command overlay |
| `g` then `d` | Navigation | Navigate to Home Dashboard |
| `g` then `v` | Navigation | Navigate to Vehicles index (Fleet Manager) |
| `g` then `t` | Navigation | Navigate to Trips index (Dispatcher) |
| `Up / Down Arrow` | Lists / Menus | Move focus between list options or search results |
| `Enter` | Lists / Menus | Select currently focused list item |
| `/` | Index Views | Focus local index table search input |
