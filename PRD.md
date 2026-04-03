# Product Requirements Document (PRD)
**Product Name:** Zorvyn Finance Dashboard
**Target Audience:** Young professionals looking to track their income, expenses, and financial habits.

---

## 1. Purpose & Vision
The Zorvyn Finance Dashboard aims to provide an instant, frictionless, and visually appealing way for users to understand their financial health. 

Unlike traditional bulky spreadsheet tools or dated financial software, Zorvyn relies on a "SaaS-like" premium design aesthetic—minimizing cognitive load while maximizing data clarity. Our fundamental vision is to help users intuitively track spending habits and highlight anomalies, ultimately leading to smarter financial decisions.

---

## 2. Core Features & Capabilities

### 2.1 Dashboard Overview
- **Summary Cards**: At-a-glance metrics for *Total Balance*, *Total Income*, *Total Expenses*, complete with month-over-month trend indicators (e.g. "+12.4% vs last month").
- **Balance Trend Chart**: An interactive Area chart tracking cumulative financial growth across the months.
- **Spending Donut Chart**: A breakdown of the user's expenses by category (Food, Transport, Housing, etc.) featuring an interactive tooltip showing precise category subtotals.
- **Recent Transactions List**: A quick-view list revealing the 5 most recent transactions.

### 2.2 Transaction Management (CRUD)
- **Adding / Editing / Deleting**: An intuitive slide-up Modal allows users to quickly log expenses with specific details (Date, Description, Amount, Formatted Type, and Category). Full Delete functionality features an inline confirmation flow to prevent accidental data loss.
- **Advanced Filtering**: 
  - Dynamic `FilterBar` enables string-based Search functionality.
  - Dropdowns for Category Filter and Type Filter (Income vs. Expense).
  - Date Range Filtering for specific period analysis.
  - Generates interactive, dismissible filter "chips" showing currently active filter rules.
- **Interactive Data Table**: View all listed transactions. Clickable table headers dynamically sort the dataset in Ascending / Descending order. Built-in pagination ensures smooth UX when histories grow long.

### 2.3 Financial Insights Engine
- **Month-Over-Month Comparison**: A grouped bar chart directly comparing the present month's income and spending to previous parameters.
- **Top Spending Highlights**: Visually ranks the sector where users spent the most (coupled with visual progress bars).
- **Smart Anomalies Tracking**: Automatically spots and alerts on abnormal spending (e.g., spending 2x more on 'Food' than the historical average). Users can acknowledge and dismiss these alerts.
- **Smart Financial Tips**: Rule-based dynamic insights (e.g. notifying the user when their Savings Rate is above a 20% healthy threshold, or advising meal prepping if 'Food' consumes more than 30% of total expenses).

### 2.4 System Functionality & Admin UX
- **Data Persistence**: Uses frontend local storage via Zustand to ensure offline capability and persistent sessions without an active backend.
- **Role-Based Access Control (RBAC)**: Supports UI view-switching between 'Admin' (editing enabled) and 'Viewer' (read-only mode). Action buttons (like Delete / Edit / Export) gracefully hide when in Viewer mode.
- **Data Exporting**: Direct client-side exporting of filtered transactional data out to neatly formatted CSV files.
- **Themes**: A fully fledged Dark/Light mode toggle switch.

---

## 3. UI / UX Design Principles
- **Aesthetic**: Premium, dark-mode native themes mimicking leading software (Stripe, Vercel, Linear). Heavy utilization of glassmorphism variants, micro-animations on hover states, and smooth scalable typography.
- **Color Palettes**: Indigo (#6366F1) for main UI accents. Emerald for Income, Rose for Expenses/Danger, Amber for Warnings. Background states heavily lean towards Deep Slate (#0F1117) to provide high contrast pop to graphs.
- **Frictionless Usage**: Inline dismissals (no jarring browser `alert` boxes), skeleton loaders while rendering data layers, and slide-in Toasts to confirm successful user actions. 
- **Responsive Layout**: Designed specifically across Mobile, Tablet, and Desktop tiers. Utilizes condensed mobile-bottom-navigation bars to reclaim screen real-estate.

---

## 4. Technical Stack
- **Library**: React 18 
- **Build Tool**: Vite
- **Styling Matrix**: Tailwind CSS v4 (Custom theme variables).
- **Client State Configuration**: Zustand
- **Charting**: Recharts
- **Routing**: React Router DOM (v6)
