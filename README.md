# Zorvyn Finance Dashboard

A production-quality Finance Dashboard web application built with modern React tools. Designed to help users track their income, expenses, and financial habits with a clean, SaaS-like interface inspired by modern enterprise tooling.

## Assignment Requirements Fulfillment

This repository has been comprehensively structured to meet and exceed the core evaluation criteria for the frontend dashboard assignment:

### 1. Dashboard Overview
- **Summary Cards:** Real-time calculation of Total Balance, Income, and Expenses.
- **Time-based Visualization:** Area chart mapping the progressive balance trend over the last 6 months.
- **Categorical Visualization:** Interactive donut chart breaking down explicit spending categories.

### 2. Transactions Section
- **Data Table:** Comprehensive list of transactions rendering Date, Amount, Category, and Type.
- **Interactive Controls:** Features a dedicated `FilterBar` enabling instant text-search, timeline bounds, and categorical isolation. Clickable headers allow for chronological and alphabetical sorting.

### 3. Role-Based Access Control (RBAC)
- **Top Navigation Switcher:** Seamlessly toggle between `Admin` and `Viewer` profiles.
- **Admin Privileges:** Granted full CRUD capabilities. Add, Edit, and Delete transactions with form validation.
- **Viewer Restrictions:** Strictly locked down to "Read-Only". Creation buttons vanish, and modification tools in the data table are forcefully removed.

### 4. Insights Section
- **Analytics View:** Specialized route highlighting the highest spending categories.
- **Comparisons & Observations:** Features a comparative month-by-month bar chart, dynamic anomaly detection alerting users to unusual spikes in spending, and a savings rate tracker.

### 5. State Management Approach
- **Global Store:** Engineered using **Zustand** rather than prop-drilling or basic context.
- **Domain Separation:** Logic is strictly separated into modular stores (`transactionStore`, `uiStore`, `roleStore`) for supreme scalability.

### 6. UI & UX Aesthetics
- **Responsive Architecture:** Fully optimized for mobile, tablet, and desktop screens using CSS flex/grid scaling. Charts handle overflow and label-clashing gracefully on micro-displays.
- **Edge-Case Handling:** Custom-designed `EmptyState` pages warmly greet users whenever they wipe their databases or incorrectly filter matrices, preventing empty unstyled white screens.

---

## Technical Stack & Enhancements (Bonus)

- **Framework**: React 18 / Vite
- **Styling**: Tailwind CSS v4 (using CSS Variables for theme tokens to avoid utility-class spaghetti).
- **Dark Mode**: Flawless CSS-based theme toggle injected directly into the DOM tree.
- **Data Persistence**: Zustand seamlessly syncs to the browser's `localStorage`, retaining state and settings across hard page refreshes.
- **Animations**: Silky CSS keyframe animations for Modals, Toasters, and Filter Chips.
- **Data Extensibility**: Built-in utility to export raw transaction databases directly into `.csv` spreadsheets.
- **Automated QA**: Automated end-to-end framework test integrations implemented to guarantee structural integrity.

## Setup Instructions

1. **Clone the repository** and navigate to the project directory:
   ```bash
   git clone https://github.com/ishit-07/financial_dashboard.git
   cd financial_dashboard
   ```
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

## Folder Structure

```text
src/
├── components/          # Scalable, reusable view layers
│   ├── dashboard/       # Dashboard specific graphs and cards
│   ├── insights/        # Analytics logic and anomaly displays
│   ├── layout/          # Global Sidebar, TopBar, Navigation
│   ├── transactions/    # FilterBar, Grid Tables, CRUD Modals
│   └── ui/              # Universal atomics (Buttons, Badges, Toasts)
├── data/                # Initial fallback mock seed logic
├── hooks/               # Custom lifecycle hooks (usePermission, useFilters)
├── pages/               # Primary browser route controllers
├── store/               # Zustand memory modules
└── utils/               # Formatting scripts and mathematical aggregators
```
