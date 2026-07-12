# TransitOps Component Visual Guide

This document defines the structural composition, states, classes, and layouts for all core design elements in TransitOps.

---

## 1. Button System

Buttons use a default height matching our 8px grid:

```
┌────────────────────────────────────────────────────────┐
│ PRIMARY CTA BUTTON STRUCTURE                           │
│                                                        │
│  [Icon] Text Label                                     │
│  ┌──────────────────────────────────────────────────┐  │
│  │ ├─px-16px─┤                                      │  │
│  │            [Inter Semi-Bold] h-40px              │  │
│  └──────────────────────────────────────────────────┘  │
│                                                        │
└────────────────────────────────────────────────────────┘
```

### A. Primary Button
*   **Default State**: `bg-brand-primary` (`#6366f1`), text primary color, `rounded-m` (`8px`), shadow-s.
*   **Hover State**: `bg-brand-primary-hover` (`#818cf8`), shadow-m.
*   **Pressed State**: `bg-brand-primary-active` (`#4f46e5`), scale down (`scale-98`).
*   **Focus State**: Focus ring expands around the button container.
*   **Disabled State**: `bg-bg-disabled`, `text-text-disabled`, pointer events disabled.

### B. Secondary Button
*   **Default State**: `bg-bg-surface-elevated` (`#1a1a20`), `border-border-default`, text primary color.
*   **Hover State**: Border shifts to `rgba(255,255,255,0.16)`.
*   **Pressed State**: scale down (`scale-98`).

### C. Ghost Button
*   **Default State**: Transparent background, text secondary color.
*   **Hover State**: `bg-bg-hover` (`rgba(255,255,255,0.04)`), text primary color.

### D. Outline Button
*   **Default State**: Transparent background, `border-border-default`, text primary color.
*   **Hover State**: `bg-bg-surface` (`#121216`), border shifts to `rgba(255,255,255,0.16)`.

### E. Danger Button
*   **Default State**: `bg-danger` (`#ef4444`), text primary color.
*   **Hover State**: `bg-danger-fg` (`#f87171`).

### F. Loading Button
*   **State**: The text shifts to `opacity-0` and is replaced by a centered loading indicator (`w-16px h-16px border-2px border-t-transparent animate-spin`).

---

## 2. Form & Input System

Form inputs use a default height of `40px`.

*   **TextInput/Password/Search/Dropdown**:
    *   *Default*: `bg-bg-surface-elevated` (`#1a1a20`), `border-border-default`, `rounded-m` (`8px`), text primary color, `h-40px`, `px-12px`.
    *   *Focus State*: Border color changes to `var(--border-primary)` and a soft focus glow ring expands around the input.
    *   *Error State*: Border turns to `var(--danger)` (`#ef4444`). A validation error text fades in below.
    *   *Disabled State*: `bg-bg-disabled`, `text-text-disabled`, border defaults to `var(--border-muted)`.
*   **Checkbox / Radio**:
    *   *Default*: `w-16px h-16px`, `rounded-s` (`6px`) for checkbox / `rounded-full` for radio. Background set to `bg-bg-surface-elevated`.
    *   *Checked*: Background turns to `bg-brand-primary` (`#6366f1`) with a centered checkmark or dot.
*   **Textarea**:
    *   *Default*: Identical borders and focus styles as TextInput. Height set to `min-h-[100px]`, `py-8px px-12px`.

---

## 3. Enterprise Tables

Tables are configured to remain readable in dense data views:
*   **Layout Grid**:
    *   Header height: `h-44px` (`py-12px px-24px`).
    *   Row height: `h-56px` (`py-16px px-24px`).
*   **Row Styling**:
    *   Alternating rows use a subtle background change. Rows fade to `bg-bg-hover` on hover.
    *   A thin divider line (`border-b-[1px] border-border-default`) runs between rows.
*   **Selection Checkbox**: Left-aligned checkbox for selecting single or multiple rows. Selecting rows highlights them in `bg-bg-hover`.
*   **Expandable Rows**: Clicking the row expand toggle rotates the arrow indicator and reveals hidden details in an inline drawer.
*   **Sticky Header**: Table headers are fixed at `z-sticky` during scrolling, using a glass backdrop blur (`backdrop-blur-md bg-bg-surface/80`).

---

## 4. Charts System (Recharts Integration)

*   **Grid Lines**: Only horizontal dash lines are visible (`strokeDasharray="3 3"` with color `rgba(255,255,255,0.04)`).
*   **Data Lines**: Chart paths use thick strokes (`strokeWidth={2.5}`) and a soft drop shadow beneath the line.
*   **Tooltip Container**: Floating card layout using `bg-glass-bg`, backdrop blur, and custom border/shadow systems.
*   **Animations**: Chart paths draw from left to right using Entry Easing over `1200ms`.

---

## 5. Overlay Systems (Modals & Toasts)

*   **Modal Containers**:
    *   *Background Overlay*: `bg-bg-base/60 backdrop-blur-md` (fades in over `300ms`).
    *   *Modal Card*: Centered layout using `rounded-xl` (`16px`), `bg-bg-surface`, `border-border-default`, `shadow-modal`.
*   **Toast Notifications**:
    *   *Style*: Floating notifications (`rounded-l`, `bg-bg-surface-floating`, `border-border-default`, `shadow-floating`).
    *   *Entrance*: Drops down from top right using spring physics.
