# TransitOps Design System & UX Foundation

This document defines the comprehensive visual language, design system tokens, and UX guidelines for the **TransitOps** platform. This specification guarantees visual harmony, premium aesthetic execution, and consistent interactions across all application views.

---

## 1. Design Philosophy

TransitOps follows a **calm, minimal, dark-first, and highly-focused** design philosophy. It is inspired by the interfaces of *Linear*, *Stripe*, *Vercel*, and *Arc Browser*.
*   **Confident Spacing**: Generous margins, clean alignments, and intentional layouts to prevent visual fatigue.
*   **Depth & Layering**: Visual depth created through layered dark surfaces, subtle borders, and soft shadows rather than flat black boxes.
*   **Purposeful Motion**: Smooth micro-interactions and transitions (150ms to 400ms) that explain and guide rather than distract.

---

## 2. Design Tokens

### A. Color System (Layered Dark Surfaces)
Colors are defined using RGB triplets in CSS variables to support Tailwind CSS opacity modifiers (e.g., `bg-base/80`).

| Token | CSS Variable / CSS Value | Semantic Meaning / Usage |
| :--- | :--- | :--- |
| **Base Background** | `var(--bg-base)` (`rgb(10, 10, 12)`) | Main application viewport canvas background. |
| **Surface** | `var(--bg-surface)` (`rgb(18, 18, 22)`) | Default container background (cards, sidebars, main content areas). |
| **Elevated Surface** | `var(--bg-surface-elevated)` (`rgb(26, 26, 32)`) | Layered containers (inner sections, inputs, dropdown items). |
| **Floating Surface** | `var(--bg-surface-floating)` (`rgb(34, 34, 42)`) | Popovers, tooltips, toasts, and dropdown containers. |
| **Primary Text** | `var(--text-primary)` (`rgb(243, 244, 246)`) | Main headings, form inputs, primary button text. |
| **Secondary Text** | `var(--text-secondary)` (`rgb(156, 163, 175)`) | Paragraphs, labels, and secondary details. |
| **Muted Text** | `var(--text-muted)` (`rgb(107, 114, 128)`) | Captions, helper texts, table headers. |
| **Disabled Text** | `var(--text-disabled)` (`rgb(75, 85, 99)`) | Blocked fields, deactivated menu items. |

#### Semantic Status & Brand Colors

*   **Primary (Brand)**:
    *   Base: `var(--primary)` (`rgb(99, 102, 241)` / Indigo-500)
    *   Hover: `var(--primary-hover)` (`rgb(129, 140, 248)` / Indigo-400)
    *   Active: `var(--primary-active)` (`rgb(79, 70, 229)` / Indigo-600)
    *   Foreground: `var(--primary-fg)` (`rgb(255, 255, 255)`)
*   **Success**:
    *   Base: `var(--success)` (`rgb(16, 185, 129)` / Emerald-500)
    *   Foreground: `var(--success-fg)` (`rgb(52, 211, 153)`)
    *   Soft BG: `var(--success-soft)` (`rgba(16, 185, 129, 0.1)`)
*   **Warning**:
    *   Base: `var(--warning)` (`rgb(245, 158, 11)` / Amber-500)
    *   Foreground: `var(--warning-fg)` (`rgb(251, 191, 36)`)
    *   Soft BG: `var(--warning-soft)` (`rgba(245, 158, 11, 0.1)`)
*   **Danger**:
    *   Base: `var(--danger)` (`rgb(239, 68, 68)` / Red-500)
    *   Foreground: `var(--danger-fg)` (`rgb(248, 113, 113)`)
    *   Soft BG: `var(--danger-soft)` (`rgba(239, 68, 68, 0.1)`)
*   **Info**:
    *   Base: `var(--info)` (`rgb(59, 130, 246)` / Blue-500)
    *   Foreground: `var(--info-fg)` (`rgb(96, 165, 250)`)
    *   Soft BG: `var(--info-soft)` (`rgba(59, 130, 246, 0.1)`)

#### Borders & Outlines

*   **Default Border**: `var(--border-default)` (`rgba(255, 255, 255, 0.08)`) — Standard divider lines.
*   **Muted Border**: `var(--border-muted)` (`rgba(255, 255, 255, 0.04)`) — Subtle grids and secondary structures.
*   **Focus Ring**: `var(--border-focus)` (`rgba(255, 255, 255, 0.20)`) — Active keyboard selection outline.
*   **Primary Border**: `var(--border-primary)` (`rgba(99, 102, 241, 0.40)`) — Active input borders.

---

### B. Typography Scale
Typography is built upon the **Inter** font family (imported globally via `index.css`).

| Token Name | Font Size | Line Height | Letter Spacing | Font Weight | Tailwind Class |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Display** | `3.5rem` (56px) | `1.1` | `-0.02em` | `700` (Bold) | `text-display` |
| **Hero** | `2.5rem` (40px) | `1.2` | `-0.02em` | `600` (Semi-Bold) | `text-hero` |
| **H1** | `2.0rem` (32px) | `1.25` | `-0.015em` | `600` (Semi-Bold) | `text-h1` |
| **H2** | `1.5rem` (24px) | `1.3` | `-0.015em` | `500` (Medium) | `text-h2` |
| **H3** | `1.25rem` (20px) | `1.35` | `-0.01em` | `500` (Medium) | `text-h3` |
| **H4** | `1.125rem` (18px) | `1.4` | `-0.005em` | `500` (Medium) | `text-h4` |
| **Body Large** | `1.0rem` (16px) | `1.5` | `0` | `400` (Regular) | `text-body-lg` |
| **Body** | `0.875rem` (14px) | `1.5` | `0` | `400` (Regular) | `text-body` |
| **Caption** | `0.75rem` (12px) | `1.4` | `0.01em` | `400` (Regular) | `text-caption` |
| **Tiny** | `0.6875rem` (11px)| `1.4` | `0.02em` | `500` (Medium) | `text-tiny` |

---

### C. Spacing System (8px Grid)
No ad-hoc spacing values are allowed. Padding, margins, heights, and layout gaps must strictly follow this scale:

| Pixels | Rem Value | Tailwind Class | Typical Application |
| :--- | :--- | :--- | :--- |
| **4px** | `0.25rem` | `p-1`, `m-1`, `gap-1` | Micro adjustments, badge padding. |
| **8px** | `0.5rem` | `p-2`, `m-2`, `gap-2` | List items gap, small button padding. |
| **12px** | `0.75rem` | `p-3`, `m-3`, `gap-3` | Input padding, button padding. |
| **16px** | `1.0rem` | `p-4`, `m-4`, `gap-4` | Main card padding, layout gutters. |
| **24px** | `1.5rem` | `p-6`, `m-6`, `gap-6` | Modals, table padding, page header margins. |
| **32px** | `2.0rem` | `p-8`, `m-8`, `gap-8` | Large section headers, empty state padding. |
| **40px** | `2.5rem` | `p-10`, `m-10` | Main layouts gap. |
| **48px** | `3.0rem` | `p-12`, `m-12` | Core hero sections. |
| **64px** | `4.0rem` | `p-16`, `m-16` | Hero spacing, extreme layout splits. |
| **80px** | `5.0rem` | `p-20`, `m-20` | Landing layout margins. |
| **96px** | `6.0rem` | `p-24`, `m-24` | Giant hero layouts. |

---

### D. Border Radius System
To maintain a modern, soft design and avoid sharp edges:
*   **Radius-S** (`6px` / `rounded-s`): Small interactive widgets, search inputs, badges.
*   **Radius-M** (`8px` / `rounded-m`): Default form inputs, buttons, list groups.
*   **Radius-L** (`12px` / `rounded-l`): Cards, select dropdown menus, menu surfaces.
*   **Radius-XL** (`16px` / `rounded-xl`): Modals, alerts, large panels.
*   **Radius-Full** (`rounded-full`): Circular elements, status pills, user avatars.

---

### E. Shadow System
Shadows are tuned for dark backgrounds (combining soft color casts with deep ambient occlusion):
*   **Shadow-S** (`shadow-s`): `0 1px 2px 0 rgba(0, 0, 0, 0.4)` — Inline controls.
*   **Shadow-M** (`shadow-m`): `0 4px 6px -1px rgba(0, 0, 0, 0.5), 0 2px 4px -2px rgba(0, 0, 0, 0.5)` — Cards, small boxes.
*   **Shadow-L** (`shadow-l`): `0 10px 15px -3px rgba(0, 0, 0, 0.6), 0 4px 6px -4px rgba(0, 0, 0, 0.6)` — Navigation panels, sidebars.
*   **Shadow-Floating** (`shadow-floating`): `0 20px 25px -5px rgba(0, 0, 0, 0.7), 0 8px 10px -6px rgba(0, 0, 0, 0.7), inset 0 1px 0 0 rgba(255, 255, 255, 0.05)` — Dropdowns, popovers.
*   **Shadow-Modal** (`shadow-modal`): `0 25px 50px -12px rgba(0, 0, 0, 0.8), inset 0 1px 0 0 rgba(255, 255, 255, 0.05)` — Modal panels.

---

### F. Z-Index Stack
*   `z-behind` (`-1`): Background grids, background illustrations.
*   `z-base` (`0`): Normal text layouts.
*   `z-sidebar` (`10`): Main navigation sidebar container.
*   `z-sticky` (`20`): Sticky layout dividers or table column heads.
*   `z-topbar` (`30`): Floating header dashboard navigation bar.
*   `z-popover` (`40`): Tooltips, select options list, custom contextual dropdowns.
*   `z-toast` (`50`): React Hot Toast alerts.
*   `z-modal` (`60`): Modal popups, lightbox displays.
*   `z-tooltip` (`70`): Overlay description tags.

---

## 3. Motion & Animation Guidelines

Motion must feel responsive, organic, and elegant. Every transition uses GPU-accelerated attributes (`transform` / `opacity`) to prevent layout thrashing and maintain 60fps.

### A. Easing Functions
*   **Standard / Entry Easing**: `cubic-bezier(0.16, 1, 0.3, 1)` (Ease Out Expo) — Responsive slide-ins.
*   **Micro-Interaction Easing**: `cubic-bezier(0.2, 0.8, 0.2, 1)` — Quick hover animations, button presses.
*   **Exit Easing**: `cubic-bezier(0.3, 0, 0.8, 0.15)` — Elements exiting or collapsing.

### B. Transition Speeds
*   **Fast** (`150ms`): Button states, hover lift, checkbox animations.
*   **Normal** (`250ms`): Sidebar toggling, dropdown open/close, inputs active ring expansion.
*   **Slow** (`400ms`): Overlay screens, full cards switching.
*   **Page Transitions** (`500ms`): Viewport crossfades.

### C. Smooth Scrolling Integration
TransitOps integrates **Lenis** to unify scrolling across all viewports.
*   Scrolling uses a physics-based, velocity-sensitive curve resembling macOS native touch scroll.
*   **GSAP** animations are strictly reserved for scroll-triggered timeline reveals in heavy dashboard/report visualizations.
*   Never animate every element on scroll. Reveal cards, charts, and metrics incrementally.

---

## 4. Interaction States

Every interactive element must present clear visual feedback:
*   **Hover**: Card elevations rise by `y: -2px`, light reflection glow becomes visible, backgrounds change slightly.
*   **Focus**: Solid `2px` focus ring around elements (`var(--border-focus)`) with a custom offset.
*   **Press**: Brief `scale: 0.98` scale down to signify click registration.
*   **Selection**: Left border selection pill moves smoothly to index positions.
*   **Loading**: Pulse shimmer overlay with a wave reflection from left to right.
*   **Success/Error**: Contextual color transforms using smooth `transition-colors`.

---

## 5. UI Component Specifications

### A. Button System
Buttons have a fixed height matching our 8px grid and custom typography scales.

*   **Primary Button**: Full solid color (`bg-brand-primary` / `text-brand-primary-fg`). Soft internal inset top-border. Hover elevates, focus outlines, press scales down.
*   **Secondary Button**: Background `bg-bg-surface-elevated` with a subtle outline border. Text color is primary.
*   **Ghost Button**: Transparent background, text is secondary color. Background changes to hover gray on interaction.
*   **Outline Button**: Transparent background, border is `border-default`. Hover flips background to surface grey.
*   **Danger Button**: Background `bg-danger` with foreground light text.
*   **Sizes**:
    *   *Small*: `h-8px` padding-x `12px` (text-tiny)
    *   *Medium*: `h-12px` padding-x `16px` (text-caption/body)
    *   *Large*: `h-16px` padding-x `24px` (text-body-lg)
    *   *Extra Large*: `h-24px` padding-x `32px` (text-h4)

### B. Input System
Inputs use `bg-bg-surface` as default, surrounded by a thin `var(--border-default)`.

*   **Text/Password/Search**: Medium corner radius (`rounded-m`). Custom placeholder text color (`var(--text-disabled)`).
*   **Focus State**: Active input shifts border color to `var(--border-primary)` and displays a soft focus glow ring.
*   **Validation Error State**: Outline turns to `var(--danger)` with helper message fading in at the bottom.
*   **Select/Dropdown**: Native/styled selections with custom chevron rotation on click.

### C. Enterprise Card System
Cards are the primary structural building blocks.
*   **Structure**: Padding is `p-16px` or `p-24px`. Rounded corners are large (`rounded-l`).
*   **Border**: `border-default` (`rgba(255, 255, 255, 0.08)`).
*   **Elevation**: Soft shadows `shadow-m`. Hover elevates the card by `y: -2px` with a subtle border highlight transition.
*   **Glass Card Option**: Used for float elements over page headers. Background `glass-bg` with `backdrop-filter: blur(12px)`.

### D. Enterprise Table System
Tables represent operations, not spreadsheets.
*   **Alignment**: Generous line height. Cells use `p-16px` vertically.
*   **Headers**: uppercase `text-tiny` tracking `0.02em` in `var(--text-muted)`.
*   **Alternating Rows**: No hard striping. Subtle hover highlight `bg-bg-surface-elevated` transitions on hover.
*   **Expandable Rows**: Icon rotates 90 degrees; content slides down using exit/entry easing.
*   **Sticky Headers**: Keep headers fixed at `z-sticky` while scrolling.

### E. Chart System
Recharts widgets must integrate natively with our dark-first scheme.
*   **Grid**: Only horizontal dash grid lines (`stroke="rgba(255,255,255,0.04)"`). No vertical lines.
*   **Tooltips**: Custom floating glass card layout (`bg-glass-bg`, border, shadow).
*   **Transitions**: Charts animate on initial load using a custom speed indicator (`duration={1200}`).

### F. Loading Experience & Skeletons
*   **Pulse Shimmer**: Skeletons use `bg-bg-surface-elevated` background with a sliding horizontal linear-gradient reflection (`rgba(255,255,255,0.03)`).
*   **Typography Skeletons**: Emulate paragraphs with lines of varied width (e.g., `w-3/4`, `w-1/2`).
*   **Placeholders**: Structured grid blocks pulsing synchronously.

### G. Empty States
Every empty list, table, or section must include:
1.  **Icon/Illustration**: Muted gray icon, centered.
2.  **Friendly Message**: A clear heading explaining why there is no content.
3.  **Helpful Description**: A brief subtitle teaching the user how to populate the view.
4.  **Primary Action Button**: A call to action button (e.g., "Register Vehicle").

### H. Modals
*   **Overlay**: Dark, blurred container overlay (`bg-bg-base/60 backdrop-blur-md`).
*   **Transition**: Fade-in overlay with scale-up content panel (`scale-95` to `scale-100` in `300ms`).
*   **Accessibility**: Escape key listener and focus traps included.

### I. Navigation (Sidebar & Topbar)
*   **Sidebar**: Collapsible, dark-surface container (`bg-bg-surface`). Hover selection indicators use a floating selection pill moving vertically behind target link links.
*   **Topbar**: Floating glass panel (`backdrop-blur-md bg-bg-base/70`) with integrated search inputs and notification badges.

---

## 6. Responsive Breakpoints

TransitOps uses standard, mobile-first breakpoints. All grid columns and layout margins change proportionally:
*   **Mobile (xs / sm)**: `< 640px` — Full layout stacking, sliding panels.
*   **Tablet (md)**: `640px` to `1024px` — Sidebar shifts to drawer, columns merge.
*   **Laptop (lg)**: `1024px` to `1280px` — Default dashboard side-by-side splits.
*   **Desktop (xl / 2xl)**: `> 1280px` — Maximum margins, full layouts.

---

## 7. Accessibility (A11y) Foundation

*   **Keyboard Navigation**: All button systems, links, input fields, and modal containers are fully accessible via `Tab` with visible focus rings.
*   **Motion Reduction**: Media queries support `prefers-reduced-motion: reduce`, disabling decorative sliding animations and replacing them with instant changes.
*   **Contrast**: Text and foreground elements satisfy a minimum 4.5:1 ratio (against dark backgrounds).
