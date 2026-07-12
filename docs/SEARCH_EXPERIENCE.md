# TransitOps Search Experience & Command Palette

This document defines the layout, keyboard shortcuts, animations, and results formatting for the TransitOps search system.

---

## 1. Global Command Palette (`Cmd + K`)

The primary search mechanism in TransitOps is the global Command Palette, accessible via `Cmd + K` or `Ctrl + K`.

```
┌────────────────────────────────────────────────────────┐
│ COMMAND PALETTE (`Cmd + K`)                            │
│                                                        │
│  [Search Icon] Type a command, driver, or plate...    │
│  ────────────────────────────────────────────────────  │
│  RECENT SEARCHES                                       │
│  🕐 Van-05 Detail                                      │
│  🕐 Active Trips                                       │
│                                                        │
│  SUGGESTED ACTIONS                                     │
│  ⚙️ Go to Settings       (Shortcut: g then s)           │
│  🚚 Register Vehicle    (Shortcut: + v)                │
└────────────────────────────────────────────────────────┘
```

### Layout Specifications
*   **Overlay**: A centered modal panel (`w-full max-w-lg`) with background blur (`backdrop-blur-sm`).
*   **Search Input**: A prominent input field with a search icon and custom placeholder text ("Type a command, driver, or plate...").
*   **Search Scope**: Searches across all entities (vehicles, drivers, trips) and system actions (settings, logout).

---

## 2. Keyboard Navigation & Shortcuts

The search experience is designed to be fully keyboard-accessible:

*   `Cmd + K` / `Ctrl + K`: Opens/Closes the Command Palette.
*   `Up / Down Arrow`: Move selection between list items.
*   `Enter`: Select currently focused item.
*   `Esc`: Close search palette.

---

## 3. Results Formatting & Transitions

*   **Result Items**: Grouped by category (e.g., Vehicles, Drivers, Commands).
*   **Highlighting**: Matching search queries are highlighted in bold.
*   **No Results State**: Displays an illustration and helper text suggesting alternative queries if no results are found.
*   **Transitions**: Result lists fade in and slide up (`y: 4px` to `y: 0px`) over `180ms` (Fast) using standard easing.
