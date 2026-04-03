# Zorvyn Finance Dashboard

A production-quality Finance Dashboard web application built with modern React tools. Designed to help young professionals track their income, expenses, and financial habits with a clean, SaaS-like interface inspired by Stripe, Linear, and Notion.

## Features

- **Instant Overview**: Dashboard with summary cards, balance trends, and expense breakdown (donut chart).
- **Frictionless Tracking**: Full CRUD support for transactions via a responsive, validated modal.
- **Advanced Filtering**: Filter transactions by category, type, date range, and search query.
- **Actionable Insights**: Month-over-month comparisons, top spending categories, anomaly detection, and smart financial tips.
- **Role-Based Access (RBAC)**: Switch between 'Admin' (full access) and 'Viewer' (read-only) modes instantly.
- **Beautiful UI/UX**: Custom design system using Tailwind CSS (v4) with dark mode, smooth micro-animations, skeleton loaders, and toast notifications.
- **Responsive**: Fully optimized for mobile, tablet, and desktop screens with adaptive navigation.
- **Data Export**: Export your transactions to CSV in one click.

## Architecture & Tech Stack

- **Framework**: React 18 / Vite
- **Styling**: Tailwind CSS v4 (using CSS Variables for theme tokens)
- **State Management**: Zustand (with localStorage persistence)
- **Routing**: React Router v6
- **Charts**: Recharts
- **Icons**: React/Lucide style SVG icons inline

## Folder Structure

```
src/
├── components/          # Reusable UI elements
│   ├── dashboard/       # Dashboard specific components
│   ├── insights/        # Insights page components
│   ├── layout/          # Sidebar, TopBar, MobileNav
│   ├── transactions/    # FilterBar, TransactionTable, AddEditModal
│   └── ui/              # Buttons, Badges, Modals, Skeletons, Toasts
├── data/                # Mock data seed
├── hooks/               # Custom hooks (e.g., usePermission, useFilteredTransactions)
├── pages/               # Main route pages
├── store/               # Zustand state stores (transactions, ui, roles)
└── utils/               # Formatters, aggregators, and export utilities
```

## Setup Instructions

1. **Clone the repository** (if applicable) or navigate to the project folder.
2. **Install dependencies**:
   ```bash
   npm install
   ```
3. **Run the development server**:
   ```bash
   npm run dev
   ```
4. **Build for production**:
   ```bash
   npm run build
   ```

## Development Decisions & Polish

- **State Management**: Chose Zustand for global state to avoid prop drilling and provide easy `localStorage` persistence. Stores are separated by domain (`transaction`, `ui`, `role`).
- **Styling**: Instead of basic utility classes scattered everywhere, `index.css` defines a strict set of design tokens (colors, shadows, radiuses) using Tailwind v4's `@theme` directive. Dark mode is fully integrated across all components.
- **Animations**: Added CSS keyframe animations for modals, toasts, page transitions, and filter chips to give the app a premium feel.
- **Derived State**: Used `useMemo` heavily in the custom `useFilteredTransactions` hook and analytical aggregators to ensure high performance even with large transaction lists.
- **RBAC Mocking**: The `useRoleStore` and TopBar switcher simulate a robust permission system, demonstrating how features can be conditionally rendered based on user roles.

## Screenshots

*(You can add screenshots of the light/dark modes here to complete the documentation)*
