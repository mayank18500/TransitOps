# TransitOps Page & View Transitions

This document defines page transition durations, translations, scale shifts, and backdrop overlays for all routing events in the TransitOps application.

---

## 1. Global Page Transition (Route Changes)

TransitOps uses a standard slide-and-crossfade transition on route changes to ensure the interface feels smooth and fast.

```
Exit Page  :  [Opacity: 1 ──▶ 0]  [Translate-X: 0 ──▶ -8px]
  (Duration: 180ms, Easing: Exit)
  
Entry Page :  [Opacity: 0 ──▶ 1]  [Translate-X: 8px ──▶ 0]
  (Duration: 250ms, Delay: 100ms, Easing: Standard)
```

### Transition Specifications
*   **Duration**: `250ms` (Normal) for entry, `180ms` (Fast) for exit.
*   **Exit State**: `opacity: 0`, `translate-x: -8px`, easing set to `exit`.
*   **Entry State**: `opacity: 1`, `translate-x: 0px` (from `8px` initial offset), easing set to `standard`.
*   **Framer Motion Settings**:
    ```javascript
    const pageVariants = {
      initial: { opacity: 0, x: 8 },
      animate: { opacity: 1, x: 0, transition: { duration: 0.25, ease: [0.16, 1, 0.3, 1] } },
      exit: { opacity: 0, x: -8, transition: { duration: 0.18, ease: [0.3, 0, 0.8, 0.15] } }
    };
    ```

---

## 2. Navigation State Mappings

### A. Initial Application Load
*   **Transition**: Main wrapper container fades in (`opacity: 0` to `opacity: 1`) over `400ms` (Slow) using standard easing.
*   **Delays**: Sidebar links animate sequentially with a `50ms` stagger delay.

### B. Back & Forward Navigation
*   **Forward**: Page slides in from the right (`x: 12px` to `x: 0px`) and fades in.
*   **Backward**: Page slides in from the left (`x: -12px` to `x: 0px`) and fades in.
*   **Values**: Duration set to `250ms`, easing set to `standard`.

### C. Nested Navigation (Tab Switches)
*   **Transition**: Sub-layouts fade in instantly (`opacity: 0` to `opacity: 1`) over `150ms` (Very Fast) using micro-easing. No horizontal translation is applied to avoid visual clutter.

---

## 3. Overlay View Transitions

### A. Modal Dialogs
*   **Backdrop Overlay**: Fades in (`opacity: 0` to `opacity: 0.6`).
*   **Panel Content**: Scales up (`scale: 0.96` to `scale: 1.0`) and fades in.
*   **Values**: Duration set to `250ms` (Normal) using standard entry easing / exit curves.

### B. Slide-Out Drawers
*   **Transition**: Right-aligned drawers slide in from the screen edge (`x: 100%` to `x: 0%`).
*   **Values**: Duration set to `250ms` (Normal), easing set to `standard` (entry) / `exit` (exit).

### C. Popover menus / Context Options
*   **Transition**: Scale up (`scale: 0.95` to `scale: 1.0`) and fade in.
*   **Values**: Duration set to `120ms` (Very Fast), easing set to `micro`.
