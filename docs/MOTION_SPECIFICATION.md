# TransitOps Motion Specification

This document defines TransitOps' transition curves, spring physics, durations, and animation behaviors.

---

## 1. Animation Timing & Easing Scales

Animations use specific timing curves to ensure transitions feel responsive and natural:

```
Easing Curves:
Standard (Expo)  : ───┬─────────────── (Initial acceleration, smooth settle)
Micro-Interaction: ──┬──────────────── (Fast response)
Exit             : ───────────────┬─── (Linear acceleration out)
```

### A. Easing Mappings
*   **Standard / Entry Easing**: `cubic-bezier(0.16, 1, 0.3, 1)` (Ease Out Expo) — Used for modal entries, drawer slides, and page crossfades.
*   **Micro-Interaction Easing**: `cubic-bezier(0.2, 0.8, 0.2, 1)` — Used for hover states, button presses, and focus shifts.
*   **Exit / Collapse Easing**: `cubic-bezier(0.3, 0, 0.8, 0.15)` — Used for drawer collapses and closed states.

### B. Timing Scale
*   **Fast** (`150ms`): Button states, hover lifts, checkbox checks.
*   **Normal** (`250ms`): Sidebar toggles, dropdown menu entries, input active ring expansions.
*   **Slow** (`400ms`): Modal slide-ins, layout transitions.
*   **Page Transitions** (`500ms`): Viewport crossfades.

---

## 2. Spring Physics Specifications

We use spring physics for elements with physical momentum (like cards, drag handles, and list sorting):

*   **Standard Spring (Interactive Cards, Slide Drawers)**:
    *   *Stiffness*: `300`
    *   *Damping*: `30`
    *   *Mass*: `1.0`
    *   *Framer Motion*: `type: "spring", stiffness: 300, damping: 30`
*   **Snappy Spring (Select items, Dropdowns, Hover elements)**:
    *   *Stiffness*: `400`
    *   *Damping*: `28`
    *   *Framer Motion*: `type: "spring", stiffness: 400, damping: 28`
*   **Soft Spring (Modals, Large alerts)**:
    *   *Stiffness*: `200`
    *   *Damping*: `22`
    *   *Framer Motion*: `type: "spring", stiffness: 200, damping: 22`

---

## 3. Component Animation Mappings

### A. Page Transitions
*   *Transition Type*: Crossfade with slight translation.
*   *Animation*: `opacity: 0` to `opacity: 1`, `y: 4px` to `y: 0px`.
*   *Values*: Duration set to `300ms`, easing set to `standard`.

### B. Navigation Sidebar
*   *Transition Type*: Slide-out overlay drawer on mobile.
*   *Animation*: `x: -100%` to `x: 0%`.
*   *Values*: Duration set to `250ms`, easing set to `standard` (entry) / `exit` (dismissal).

### C. Modals & Dialogs
*   *Transition Type*: Background backdrop fade and panel scale.
*   *Backdrop Overlay*: `opacity: 0` to `opacity: 0.6` with backdrop blur.
*   *Panel Content*: `opacity: 0`, `scale: 0.96` to `opacity: 1`, `scale: 1.0`.
*   *Values*: Soft spring physics config.

### D. Interactive Cards
*   *Transition Type*: Lift and shadow transition.
*   *Hover State*: `y: -2px`, box-shadow shifts from `shadow-m` to `shadow-l`.
*   *Values*: Duration set to `150ms` (Fast), easing set to `micro`.

### E. Forms & Inputs
*   *Transition Type*: Focus ring expansion.
*   *Focus State*: Border color changes to `var(--border-primary)`. A subtle focus outline ring expands using standard transitions.
*   *Values*: Duration set to `150ms`, easing set to `micro`.

---

## 4. Performance & Reduced Motion Settings

### A. GPU Acceleration
To prevent layout thrashing and maintain 60fps, we only animate GPU-accelerated CSS properties:
*   Use `transform` (e.g., `translate3d()`, `scale()`) instead of animating margins, heights, or widths.
*   Use `opacity` instead of changing display status or background visibility.
*   Enable `will-change: transform, opacity` for complex transitions (such as sidebar drawers).

### B. Reduced Motion Configuration
We check user motion preferences to adjust transitions accordingly:

```css
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
    transform: none !important;
  }
}
```
*When user motion reduction is active, slide-ins and scale animations are replaced with instant fades.*
