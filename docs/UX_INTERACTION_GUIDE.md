# TransitOps UX Interaction Guide

This document establishes the universal interaction states, behavior guidelines, and user feedback loops for the TransitOps platform. It details how the interface responds to user actions to minimize cognitive load and provide a premium, calm, and responsive experience.

---

## 1. Global Interaction Language

TransitOps follows a clear, structured set of interactive feedback rules across all UI components:

```
[User Action] ───▶ [Micro-Interactive State Change] ───▶ [System Feedback]
  (e.g., hover)       (e.g., lift, border glow)             (e.g., toast, table update)
```

| Interactive State | State Indicator / Visual Transition | Accessibility (A11y) Rule |
| :--- | :--- | :--- |
| **Hover** | Background color shifts slightly (`bg-bg-hover`). Cards lift `y: -2px` with a subtle glow. Cursor turns to `pointer`. | Avoid flashing elements. Only trigger on hover-capable pointer devices (`@media (hover: hover)`). |
| **Pressed / Active** | Container scales down (`scale: 0.98`), background deepens (`bg-bg-active`). | Scale transitions must bypass user reduced motion overrides. |
| **Focused** | High-contrast outline ring (`var(--border-focus)`) with a `2px` offset. | Focus rings must be visible on tab navigation. |
| **Disabled** | Element opacity falls to `50%`, cursor turns to `not-allowed`, and pointer events are deactivated. | Elements are skipped in tab navigation (`tabIndex={-1}`). |
| **Loading** | Interactive text is hidden. An inline spinner or a pulsing shimmer overlay is rendered. | `aria-busy="true"` is set on containers. |
| **Selected** | Primary color borders are applied. Background changes to active levels. | `aria-selected="true"` is added to targeted items. |

---

## 2. Page & Detail Level Interaction Patterns

### A. Creating & Saving Records
1.  **Initiation**: Clicking primary action buttons (e.g., `+ Create Trip`) slides out a drawer from the right edge. Focus is set on the first input.
2.  **Validation Loop**: Inlines check values. Input boundaries display green borders for validated entries and red borders for validation errors.
3.  **Submission**: Saving locks the drawer, shows a loading state on the button, and displays a spinner.
4.  **Resolve**: The drawer slides away, the main grid updates with a fade-in transition, and a success toast appears.

### B. Deleting Records (Danger Flows)
1.  **Initiation**: Clicking delete triggers a centered confirm modal overlay.
2.  **Validation**: A prompt specifies the action and details the impact. The primary button is styled as a danger-red CTA ("Confirm Delete").
3.  **Resolve**: Tapping confirm closes the modal, removes the record from the page layout, and shows a success toast.

### C. Dragging & Dropping
*   *Interaction*: Drag targets lift `y: -4px`, shadows deepen, and the cursor changes to `grabbing`. Drop targets show dashed borders that turn primary-colored on hover.
*   *Accessibility*: Dragging actions can be completed via keyboard commands (e.g., select item, tap `Space` to grab, tap `Arrows` to move, tap `Enter` to drop).
