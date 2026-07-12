# TransitOps Motion Tokens Specification

This document defines the token values, transition speeds, easing functions, and spring physics coefficients for the TransitOps animation system.

---

## 1. Timing & Duration Tokens

Transitions use a consistent set of duration tokens:

| Token Name | Duration Value | Typical Layout Application |
| :--- | :--- | :--- |
| **`duration-very-fast`** | `120ms` | Checkbox toggles, button hover lifts, icon transitions, tab underlines. |
| **`duration-fast`** | `180ms` | Input focus highlights, dropdown entries, list selection shifts. |
| **`duration-normal`** | `250ms` | Modal overlays, slide drawers, accordion expansions, sidebar toggles. |
| **`duration-slow`** | `400ms` | Deep page transitions, large alert warnings, empty state reveals. |
| **`duration-page`** | `500ms` | Initial application load fades. |

---

## 2. Easing Curve Tokens

Easing curves define the acceleration and deceleration of transitions:
*   **`ease-standard` (Entry)**: `cubic-bezier(0.16, 1, 0.3, 1)` (Ease Out Expo) — Responsive slide-ins.
*   **`ease-micro` (Interactions)**: `cubic-bezier(0.2, 0.8, 0.2, 1)` — Quick hover animations, button presses.
*   **`ease-exit` (Exits)**: `cubic-bezier(0.3, 0, 0.8, 0.15)` — Drawer collapses and closed states.

---

## 3. Spring Physics Tokens

We use spring physics for elements with physical momentum (like cards, drag handles, and list sorting):

*   **`spring-default`**:
    *   *Stiffness*: `300`
    *   *Damping*: `30`
    *   *Mass*: `1.0`
    *   *Framer Motion*: `{ type: "spring", stiffness: 300, damping: 30 }`
    *   *Usage*: Pinned sidebars, list sorting.
*   **`spring-snappy`**:
    *   *Stiffness*: `400`
    *   *Damping*: `28`
    *   *Framer Motion*: `{ type: "spring", stiffness: 400, damping: 28 }`
    *   *Usage*: Hover popovers, select dropdown menus, switch indicators.
*   **`spring-soft`**:
    *   *Stiffness*: `200`
    *   *Damping*: `22`
    *   *Framer Motion*: `{ type: "spring", stiffness: 200, damping: 22 }`
    *   *Usage*: Modal dialogs, warning notifications.

---

## 4. GPU Rendering & Optimization Rules

To prevent layout thrashing and maintain 60fps, we only animate GPU-accelerated CSS properties:
*   **Property Lock**: Only animate `transform` (e.g., `translate3d()`, `scale()`) and `opacity`.
*   **Avoid Layout Changes**: Never animate height, width, padding, margin, top, left, bottom, or right. Use scale or translation transforms instead.
*   **Optimizations**: Add `will-change: transform, opacity` to elements with active animations (such as drawers and sidebars) to instruct the browser to offload rendering to the GPU.
