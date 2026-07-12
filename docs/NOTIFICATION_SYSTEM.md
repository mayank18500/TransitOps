# TransitOps Notification & Alert System

This document outlines the visual structure, stacking order, timings, and alert states for the notification system.

---

## 1. Notification Types & Visual Styling

Notifications are displayed as styled floating alerts in the top-right corner of the interface.

```
┌──────────────────────────────────────────────┐
│ TOAST NOTIFICATION CONTAINER                 │
│                                              │
│  [Success Icon] Action completed!            │
│  The trip has been dispatched successfully.  │
│                                              │
└──────────────────────────────────────────────┘
```

### Visual Specifications
*   **Dimensions**: `w-[320px]` to `w-[380px]`.
*   **Container**: Rounded corners (`rounded-m`), floating background (`bg-bg-surface-floating`), and a default border (`border-border-default`).
*   **Shadow**: Floating shadow (`shadow-floating`).

---

## 2. Notification Levels

| Alert Level | Icon (Lucide) | Accent Border | Behavior |
| :--- | :--- | :--- | :--- |
| **Success** | `CheckCircle2` | `border-success/20` | Auto-dismisses in 3 seconds. |
| **Warning** | `AlertTriangle` | `border-warning/20` | Auto-dismisses in 5 seconds. |
| **Info** | `Info` | `border-info/20` | Auto-dismisses in 4 seconds. |
| **Danger** | `XCircle` | `border-danger/20` | Requires manual dismissal (click 'x'). |

---

## 3. Stacking & Position Behavior

*   **Location**: Fixed at top-right on desktop. Centered at the top of the viewport on mobile.
*   **Stacking**: New notifications appear at the top. Older notifications are pushed down, with a maximum of 3 notifications visible at once.
*   **Entrance**: Notifications drop down from the top right edge (`y: -20px` to `y: 0px`) and fade in using spring physics.
*   **Exit**: Notifications slide to the right and fade out over `150ms` (Very Fast).
