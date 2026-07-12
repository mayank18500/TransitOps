# TransitOps Loading Experience & Skeletons

This document defines the loading indicators, progress indicators, skeleton grids, and optimistic updates for TransitOps views.

---

## 1. Pulse Shimmer Specifications

We use structured skeletons with a pulse shimmer to indicate loading states:

```
[Skeleton Card] ───▶ [Pulsing Shimmer Overlay] ───▶ [Data Loaded]
  (bg-bg-surface)       (linear-gradient overlay)      (fade-in content)
```

### Animation Attributes
*   **Base Color**: `bg-bg-surface-elevated` (`#1a1a20`).
*   **Shimmer Overlay**: A sliding horizontal gradient (`linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.03), transparent)`).
*   **Timing**: The shimmer transitions from left to right over `1.5s` and loops infinitely.

---

## 2. Skeleton Implementations

We use custom skeletons to match the expected page layouts:

### A. Table Placeholders (Index Views)
*   **Structure**: Table headers remain visible at `z-sticky`.
*   **Row Skeletons**: Row lines display horizontal shimmer bars representing cell text.
    *   *Col 1 (Primary)*: `w-2/3` bar width.
    *   *Col 2 & Col 3 (Secondary)*: `w-1/2` bar width.
*   **Count**: 5 rows are displayed by default.

### B. Card Placeholders (Vehicles Grid)
*   **Structure**: Replicates card sizes (`rounded-l` corner radius).
*   **Content**: Renders a circular skeleton for the icon, a header bar (`w-1/2`), a sub-bar (`w-1/3`), and a full-width progress bar skeleton.

### C. Chart Placeholders (Dashboards)
*   **Structure**: Replicates the layout of the chart card.
*   **Graphic Placeholder**: A pulsing wireframe grid background.
*   **Interaction**: Tooltips and hover states are disabled.

---

## 3. Inline Indicators & Button Loading

*   **Buttons**: The text fades out, showing a centered loading spinner (`animate-spin h-4 w-4 text-current`) in its place. The button is disabled during loading.
*   **Inputs**: A loading spinner is displayed on the right edge of inputs (in place of search or password icons).

---

## 4. Optimistic UI Updates

Optimistic UI updates are used to keep the interface feeling fast:
1.  **Trigger**: User performs an action (e.g., toggle status or delete log).
2.  **Visual Change**: The UI updates immediately, assuming the action will succeed.
3.  **API Call**: The API request is sent in the background.
4.  **Resolve**:
    *   *Success*: The final state is confirmed.
    *   *Error*: The UI rolls back to the previous state, and a warning toast appears.
