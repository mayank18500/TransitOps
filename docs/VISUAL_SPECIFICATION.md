# TransitOps Visual Specifications

This document outlines the detailed specs, hex color codes, typography sizing, border radii, and shadows for the TransitOps design system.

---

## 1. Visual Hierarchy & Spacing Systems

We use a fixed 8px grid system to structure layouts and maintain consistent proportions:
*   **Marginal Padding**: Topbar uses `h-64px` with `px-24px`. Sidebar uses `w-256px` with `p-24px`.
*   **Layout Gutters**: Gaps between cards are set to `gap-24px` on desktop and `gap-16px` on tablet layouts.
*   **Content Rhythm**: Section headers use `mb-16px`, lists use `gap-8px`, and form inputs use `mb-12px`.

---

## 2. Color System Specifications (Dark Palette)

Colors are defined using hex values and RGB equivalents for Tailwind variables:

```
┌──────────────────────────────────────────────────────────┐
│ COLOR LAYERS                                             │
│                                                          │
│  [Floating Surface] #22222a (RGB: 34 34 42)              │
│       ▲                                                  │
│  [Elevated Surface] #1a1a20 (RGB: 26 26 32)              │
│       ▲                                                  │
│  [Surface]          #121216 (RGB: 18 18 22)              │
│       ▲                                                  │
│  [Base Canvas BG]   #0a0a0c (RGB: 10 10 12)              │
│                                                          │
└──────────────────────────────────────────────────────────┘
```

### A. Primary Canvas Layers
*   **Base Canvas BG**: `#0a0a0c` (`rgb(10, 10, 12)`)
*   **Surface BG**: `#121216` (`rgb(18, 18, 22)`)
*   **Elevated Surface BG**: `#1a1a20` (`rgb(26, 26, 32)`)
*   **Floating Surface BG**: `#22222a` (`rgb(34, 34, 42)`)

### B. Typography Colors
*   **Primary Text**: `#f3f4f6` (`rgb(243, 244, 246)`) — Content titles, inputs.
*   **Secondary Text**: `#9ca3af` (`rgb(156, 163, 175)`) — Subheadings, default labels.
*   **Muted Text**: `#6b7280` (`rgb(107, 114, 128)`) — Table headers, help text.
*   **Disabled Text**: `#4b5563` (`rgb(75, 85, 99)`) — Disabled inputs, inactive items.

### C. Brand & Status Colors
*   **Primary Brand**: `#6366f1` (`rgb(99, 102, 241)`)
*   **Success**: `#10b981` (`rgb(16, 185, 129)`)
*   **Warning**: `#f59e0b` (`rgb(245, 158, 11)`)
*   **Danger**: `#ef4444` (`rgb(239, 68, 68)`)
*   **Info**: `#3b82f6` (`rgb(59, 130, 246)`)

---

## 3. Typography Hierarchy

*   **Display Font**: Inter, Sans-Serif.

| Level | Size (px) | Size (rem) | Line Height | Letter Spacing | Font Weight |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Display** | 56px | `3.5rem` | `1.1` | `-0.02em` | `700` (Bold) |
| **Hero** | 40px | `2.5rem` | `1.2` | `-0.02em` | `600` (Semi-Bold) |
| **H1** | 32px | `2.0rem` | `1.25` | `-0.015em` | `600` (Semi-Bold) |
| **H2** | 24px | `1.5rem` | `1.3` | `-0.015em` | `500` (Medium) |
| **H3** | 20px | `1.25rem` | `1.35` | `-0.010em` | `500` (Medium) |
| **H4** | 18px | `1.125rem` | `1.4` | `-0.005em` | `500` (Medium) |
| **Body Large**| 16px | `1.0rem` | `1.5` | `0` | `400` (Regular) |
| **Body** | 14px | `0.875rem` | `1.5` | `0` | `400` (Regular) |
| **Caption** | 12px | `0.75rem` | `1.4` | `0.01em` | `400` (Regular) |
| **Tiny** | 11px | `0.6875rem`| `1.4` | `0.02em` | `500` (Medium) |

---

## 4. Border Radius System

*   **Radius-S** (`6px`): Small badges, system tags, and checkboxes.
*   **Radius-M** (`8px`): Form inputs, default button elements, list groups.
*   **Radius-L** (`12px`): Dashboard widgets, card containers, context dropdowns.
*   **Radius-XL** (`16px`): Modals, confirmation dialogs, primary notifications.

---

## 5. Shadow System

*   **Shadow-S**: `0 1px 2px 0 rgba(0, 0, 0, 0.4)`
*   **Shadow-M**: `0 4px 6px -1px rgba(0, 0, 0, 0.5), 0 2px 4px -2px rgba(0, 0, 0, 0.5)`
*   **Shadow-L**: `0 10px 15px -3px rgba(0, 0, 0, 0.6), 0 4px 6px -4px rgba(0, 0, 0, 0.6)`
*   **Shadow-Floating**: `0 20px 25px -5px rgba(0, 0, 0, 0.7), 0 8px 10px -6px rgba(0, 0, 0, 0.7), inset 0 1px 0 0 rgba(255, 255, 255, 0.05)`
*   **Shadow-Modal**: `0 25px 50px -12px rgba(0, 0, 0, 0.8), inset 0 1px 0 0 rgba(255, 255, 255, 0.05)`

---

## 6. Card & Border Specifications

*   **Container Borders**:
    *   *Default Border*: `1px solid rgba(255, 255, 255, 0.08)`.
    *   *Muted Divider*: `1px solid rgba(255, 255, 255, 0.04)`.
*   **Premium Interactive Card**:
    *   *Default*: `bg-bg-surface` (`#121216`), `rounded-l` (`12px`), `border-border-default`.
    *   *Glow Edge*: A subtle top border `rgba(255, 255, 255, 0.03)` mimics ambient light reflection.
    *   *Hover State*: Shift to `translate-y-[-2px]`, shadow transition to `shadow-l`, border transition to `rgba(255, 255, 255, 0.12)`.
*   **Glass Card**:
    *   *Usage*: Topbar headers and drop overlays.
    *   *Style*: `bg-glass-bg` (`rgba(10, 10, 12, 0.7)`), `backdrop-filter: blur(12px)`, `border-glass-border`.
