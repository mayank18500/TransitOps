# TransitOps Micro-Interactions Guide

This document defines the hover, focus, pressed, and success transitions for each reusable UI component in the TransitOps framework.

---

## 1. Interactive Button Components

*   **Buttons (Primary / Secondary / Outline / Ghost)**:
    *   *Hover*: Elevate `y: -1px`, background transitions to hover variants, shadow transitions to `shadow-m`. Duration set to `120ms` (Very Fast), easing set to `micro`.
    *   *Focus*: `2px` focus ring expands around the button container with a `2px` offset.
    *   *Pressed*: Scale down to `0.98` instantly.
    *   *Success*: Button text fades out, showing a green checkmark icon that pulses once before resetting.
*   **Icon Buttons**:
    *   *Hover*: Background color shifts to `bg-bg-hover`, icon shifts up `y: -1px`.
    *   *Pressed*: scale down (`scale-98`).

---

## 2. Interactive Cards

*   **Cards**:
    *   *Hover*: Elevate `y: -2px`, box-shadow transitions to `shadow-l`, border shifts to `rgba(255, 255, 255, 0.12)`. Easing set to `micro` over `180ms` (Fast).
    *   *Focus (Keyboard)*: Card displays a primary border color and standard focus outline ring.
    *   *Pressed (Clickable Cards)*: Scale down to `0.99`.

---

## 3. Sidebar & Navigation Links

*   **Menu Navigation Items**:
    *   *Hover*: Background changes to `bg-bg-hover`, text color shifts to `var(--text-primary)`.
    *   *Active / Selection*: A background capsule moves to the active item's position. Text color turns to `var(--text-primary)`.
    *   *Focus*: The menu item shows a visible focus outline.

---

## 4. Dropdown Menus & Popovers

*   **Dropdown Menu Index**:
    *   *Open*: Popover panel slides down from the trigger (`y: -4px` to `y: 0px`) and fades in. Easing set to `standard` over `180ms`.
    *   *Item Hover*: Background shifts to `bg-bg-hover` and text turns to `var(--text-primary)`.

---

## 5. Overlay Screens (Modals & Drawers)

*   **Modal Container**:
    *   *Open*: Backdrop overlay fades in (`opacity: 0` to `opacity: 0.6`). The modal panel scales up (`scale: 0.96` to `scale: 1`) and fades in. Duration set to `250ms` (Normal) with standard easing.
    *   *Close*: The backdrop and modal panel fade out, and the modal panel scales down (`scale: 0.96`). Easing set to `exit` over `180ms`.
*   **Drawer Container**:
    *   *Open*: Backdrop fades in. The drawer panel slides in from the right edge (`x: 100%` to `x: 0%`). Easing set to `standard` over `250ms`.

---

## 6. Form Controls

*   **Text Inputs / Select Menus / Textareas**:
    *   *Hover*: Border shifts to `rgba(255, 255, 255, 0.16)`.
    *   *Focus*: Border shifts to `var(--border-primary)` and a soft focus glow ring expands around the input. Easing set to `micro` over `120ms` (Very Fast).
    *   *Error*: Border turns to `var(--danger)` (`#ef4444`). Focus ring changes to red.
*   **Checkbox / Radio**:
    *   *Checked*: Container transitions to `bg-brand-primary` and a checkmark/dot fades in.
*   **Switch (Toggles)**:
    *   *Toggled*: Track shifts to `bg-brand-primary`. Toggle knob slides horizontally (`x: 2px` to `x: 20px`) using standard spring physics.

---

## 7. Interactive Data Displays

*   **Data Table Rows**:
    *   *Hover*: Row background transitions to `bg-bg-hover`. Easing set to `micro` over `120ms` (Very Fast).
    *   *Selection Checkbox*: Checked rows display a subtle background tint (`bg-bg-hover/40`).
*   **Tabs (Sub-Navigation)**:
    *   *Change*: Active tab text turns primary-colored. An underline bar slides horizontally to the active tab's position.
*   **Pagination Buttons**:
    *   *Disabled*: Buttons are hidden or skipped in tab navigation.
