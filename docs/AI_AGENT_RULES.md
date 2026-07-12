# AI_AGENT_RULES.md

# TransitOps - AI Agent Development Rules

Version: 1.0

Last Updated: July 2026

---

# Purpose

This document defines the mandatory development rules that every AI coding agent working on the TransitOps project must follow.

These rules are considered the highest priority after the project requirements.

Every generated file, component, API, page, animation, database model, and business logic must comply with this document.

Failure to follow these rules will result in inconsistent code, merge conflicts, poor user experience, and reduced maintainability.

---

# Project Vision

TransitOps is **NOT** a CRUD dashboard.

TransitOps is a premium enterprise SaaS platform designed for fleet management.

The final product should feel comparable to:

- Linear
- Stripe Dashboard
- Vercel Dashboard
- Notion
- Arc Browser

The project must prioritize

- Premium UI
- Premium UX
- Smooth animations
- Clean architecture
- Enterprise scalability
- Excellent user experience

before adding unnecessary features.

---

# Primary Goals

Priority Order

1. User Experience
2. User Interface
3. Performance
4. Business Logic
5. Code Quality
6. Scalability

Never sacrifice UX for additional features.

---

# Development Philosophy

Every screen should answer these questions.

Does this feel premium?

Would this impress judges?

Is this easy to understand?

Can a first-time user immediately understand what to do?

Does this feel smooth?

Would this feel like a production SaaS?

If the answer is no,

improve the implementation.

---

# Design Philosophy

Avoid

❌ Bootstrap look

❌ Default Admin Dashboard

❌ Typical CRUD interfaces

❌ Generic tables everywhere

❌ Dense layouts

❌ Sharp corners

❌ Bright colors

❌ Unnecessary gradients

Prefer

✅ Spacious layouts

✅ Large typography

✅ Floating cards

✅ Soft shadows

✅ Smooth motion

✅ Glassmorphism

✅ Rounded corners

✅ Minimal interface

---

# Tech Stack

Frontend

React

Vite

JavaScript

TailwindCSS

React Router

Axios

Framer Motion

GSAP

Lenis

React Hook Form

Zod

Recharts

Lucide React

React Hot Toast

Backend

NodeJS

ExpressJS

Prisma ORM

JWT

Bcrypt

PostgreSQL

---

# Folder Ownership

Frontend Agent

Allowed

frontend/

Never modify

backend/

database/

Backend Agent

Allowed

backend/

Never modify

frontend/

Animation Agent

Allowed

animations/

components/

styles/

Never modify

backend/

Database Agent

Allowed

Prisma Schema

Database

Seed

Migration

Never modify

Frontend Components

Testing Agent

Allowed

Entire Project

Bug Fixes

Tests

Performance Improvements

---

# Project Architecture

Frontend

↓

REST API

↓

Controllers

↓

Services

↓

Prisma

↓

PostgreSQL

Business logic MUST exist only inside Services.

Never place business logic inside Controllers.

Never place database queries inside React components.

---

# UI Rules

Every page must contain

Loading State

Error State

Empty State

Success State

Responsive Design

Dark Theme

Keyboard Accessibility

Mobile Layout

Hover Effects

Transitions

---

# Component Rules

Always

Create reusable components.

Never duplicate code.

Never create page-specific buttons.

Instead

Button

Card

Modal

Badge

Table

Avatar

Search

Filter

must all be reusable.

---

# Component Size

Maximum

250 lines

If larger

Split into smaller components.

---

# Naming Convention

Components

PascalCase

VehicleCard.jsx

TripTable.jsx

FuelChart.jsx

Hooks

camelCase

useVehicle.js

useTrips.js

Utilities

camelCase

formatDate.js

calculateFuel.js

Constants

UPPER_CASE

MAX_UPLOAD_SIZE

DEFAULT_PAGE_SIZE

---

# Styling Rules

Never

Inline CSS

Never

CSS Modules

Never

Hardcoded Colors

Always

TailwindCSS

Use design tokens.

Spacing

Use

8px Grid System

Examples

p-2

p-4

p-6

p-8

Gap

gap-2

gap-4

gap-6

gap-8

Avoid random spacing values.

---

# Color Rules

Never hardcode colors.

Always use semantic colors.

Example

Primary

Background

Surface

Success

Warning

Danger

Muted

Future theme updates should require changing only design tokens.

---

# Animation Rules

Every animation must have purpose.

Avoid decorative motion.

Allowed

Fade

Slide

Scale

Opacity

Layout

Count Up

Hover Lift

Card Elevation

Chart Draw

Not Allowed

Bounce

Elastic

Shake

Flash

Random Rotation

Spinning Elements

Animation Duration

Fast

150ms

Normal

250ms

Slow

400ms

Page Transition

500ms

Always use easing.

---

# Scroll Rules

Use Lenis.

Scrolling should feel smooth.

Sections should reveal naturally.

Never animate everything simultaneously.

Only animate visible elements.

---

# Performance Rules

Always lazy load pages.

Memoize expensive components.

Use React.memo where appropriate.

Avoid unnecessary re-renders.

Images

Use WebP

Lazy Loading

Responsive Sizes

Initial page should load quickly.

---

# Forms

Always validate.

Client Validation

Server Validation

Display helpful error messages.

Never use alert().

Always use toast notifications.

---

# Tables

Every table should support

Search

Sorting

Pagination

Responsive Layout

Loading Skeleton

Empty State

Hover Effect

---

# API Rules

Never call APIs directly inside UI.

Always create Service Layer.

Example

VehicleService

TripService

DriverService

FuelService

ExpenseService

---

# Error Handling

Never ignore errors.

Always

Log

Display toast

Show retry option

Handle gracefully

---

# Business Logic Rules

Business rules belong only inside backend services.

Never

Inside React

Never

Inside Controllers

Never

Inside Routes

---

# Accessibility

Keyboard Navigation

Visible Focus

Proper Labels

ARIA Support

Readable Contrast

Large Click Targets

---

# Responsiveness

Desktop

Laptop

Tablet

Mobile

All pages must work correctly.

Never ignore mobile layouts.

---

# Empty States

Never leave blank pages.

Always show

Illustration

Helpful Message

Primary Action Button

---

# Loading States

Never use only spinner.

Prefer

Skeleton Loaders

Animated Placeholders

Progress Indicators

---

# Notifications

Use React Hot Toast.

Success

Error

Warning

Info

Keep notifications short.

---

# Icons

Use Lucide React only.

Never mix icon libraries.

---

# Charts

Use Recharts.

Animated

Responsive

Minimal

Readable

---

# Security

Never expose secrets.

Never trust frontend validation.

Always validate backend requests.

Hash passwords.

Protect routes.

Check permissions.

---

# Git Rules

Small commits.

Meaningful commits.

Examples

feat: add vehicle management

fix: resolve trip validation

style: improve dashboard spacing

Never commit broken code.

---

# Code Review Checklist

Before finishing any task verify

✅ No console.log

✅ No unused imports

✅ No duplicate code

✅ No lint errors

✅ Responsive

✅ Accessible

✅ Loading State

✅ Error State

✅ Empty State

✅ Smooth Animation

✅ Reusable Components

✅ Business Rules Followed

✅ API Properly Structured

✅ Folder Structure Correct

---

# Definition of Done

A feature is complete only if

✓ Functional

✓ Responsive

✓ Accessible

✓ Animated

✓ Error Handled

✓ Loading State

✓ Empty State

✓ Production Ready

✓ Reusable

✓ Documented

---

# Things AI Agents Must Never Do

❌ Write business logic inside components

❌ Hardcode colors

❌ Duplicate components

❌ Ignore responsiveness

❌ Ignore accessibility

❌ Create giant files

❌ Use inline CSS

❌ Ignore loading states

❌ Ignore empty states

❌ Skip backend validation

❌ Use multiple icon libraries

❌ Use multiple chart libraries

❌ Break folder structure

❌ Modify unrelated files

---

# Judge First Mentality

Every change should improve at least one of

User Experience

Visual Appeal

Performance

Maintainability

Accessibility

Business Logic

If a feature does not improve the product,

do not implement it.

---

# Final Rule

Every AI agent working on this repository should behave as if they are a Senior Software Engineer building a production SaaS product, not a hackathon prototype.

Quality always wins over quantity.

The objective is not to build the fastest project.

The objective is to build the most polished product.

End of Document.