# 🚀 Easy Fashion Ltd. — Admin Dashboard

A modern, responsive Admin Dashboard built with **Next.js 14**, **Ant Design 5**, and **Recharts**, closely following the provided Figma design.

---

## 📸 Screenshots

| Dashboard 1 — Modern                    | Dashboard 2 — Analytical                        | Dashboard 3 — eCommerce     |
| --------------------------------------- | ----------------------------------------------- | --------------------------- |
| Stat cards, Revenue chart, Best Selling | Welcome card, Transactions, Product Performance | Combined full-featured view |

---

## 📸 Screenshots - 2

### 🌞 Light Mode

![Dashboard Light Mode](./Screen%20Shots/Modern%20Dashboard%20%E2%80%94%20Easy%20Fashion%20Ltd.%20Day%20light.png)

### 🌙 Dark Mode

![Dashboard Dark Mode](./Screen%20Shots/Modern%20Dashboard%20%E2%80%94%20Easy%20Fashion%20Ltd.%20Night%20Mode%20.png)

## 🛠️ Tech Stack

| Tool                                          | Purpose                                 |
| --------------------------------------------- | --------------------------------------- |
| [Next.js 14](https://nextjs.org/)             | React framework with file-based routing |
| [Ant Design 5](https://ant.design/)           | Primary UI component library            |
| [Recharts](https://recharts.org/)             | Charts & data visualisations            |
| [TypeScript](https://www.typescriptlang.org/) | Type safety                             |
| [Day.js](https://day.js.org/)                 | Date utilities (used by Ant Design)     |

---

## 📁 Project Structure

```
src/
├── components/
│   ├── layout/
│   │   ├── DashboardLayout.tsx   # Main layout wrapper
│   │   ├── Sidebar.tsx           # Left navigation sidebar
│   │   └── Header.tsx            # Top navigation bar
│   └── dashboard/
│       ├── StatCards.tsx         # 6 summary stat cards
│       ├── RevenueChart.tsx      # Bar chart — revenue vs expense
│       ├── EarningsWidgets.tsx   # Yearly breakup donut + monthly earnings sparkline
│       ├── EmployeeSalary.tsx    # Monthly salary bar chart + customer mini cards
│       ├── WeeklyStats.tsx       # Weekly sparkline + top sellers list
│       ├── TopProjects.tsx       # Top projects table
│       ├── ProductPerformance.tsx# Product performance table with tabs
│       ├── BestSellingProducts.tsx # Blue card with progress bars
│       ├── WelcomeCard.tsx       # Welcome hero banner
│       ├── RecentTransactions.tsx# Transaction list
│       └── DailyActivities.tsx   # Timeline activity feed
├── data/
│   └── mockData.ts               # All mock data (replace with API calls)
├── pages/
│   ├── _app.tsx                  # App wrapper + Ant Design theme config
│   ├── _document.tsx             # Custom HTML + Google Fonts
│   ├── index.tsx                 # Dashboard 1 — Modern
│   ├── dashboard2.tsx            # Dashboard 2 — Analytical
│   └── dashboard3.tsx            # Dashboard 3 — eCommerce
└── styles/
    └── globals.css               # Global styles + Ant Design overrides
```

---

## ⚡ Getting Started

### Prerequisites

- **Node.js** ≥ 18.x
- **npm** ≥ 9.x (or yarn / pnpm)

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/YOUR_USERNAME/easy-fashion-dashboard.git

# 2. Navigate into the project
cd easy-fashion-dashboard

# 3. Install dependencies
npm install

# 4. Start the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 📄 Available Pages

| Route         | Description                                                                |
| ------------- | -------------------------------------------------------------------------- |
| `/`           | Dashboard 1 — Modern (stat cards, revenue chart, employee salary)          |
| `/dashboard2` | Dashboard 2 — Analytical (welcome card, transactions, product performance) |
| `/dashboard3` | Dashboard 3 — eCommerce (combined comprehensive view)                      |

---

## 🎨 Design Decisions

- **Theme**: Custom Ant Design theme tokens to match the Figma colour palette (`#5d87ff` primary blue, `#13deb9` success green, `#ffae1f` warning orange).
- **Typography**: `Plus Jakarta Sans` via Google Fonts — a clean, modern sans-serif that complements the design system.
- **Charts**: Recharts was chosen for its lightweight footprint and SSR compatibility with Next.js.
- **Responsiveness**: CSS Grid via Ant Design's `Row`/`Col` system. Breakpoints: `xs` → `lg` ensure the layout reflows cleanly on mobile and tablet.
- **Comments**: Every file is thoroughly commented for maintainability.

---

## 🏗️ Build for Production

```bash
npm run build
npm start
```

---

## 🔧 Linting

```bash
npm run lint
```

---

## 📦 Environment Variables

No environment variables are required for the current mock-data implementation. When connecting to a real API, create `.env.local`:

```env
NEXT_PUBLIC_API_URL=https://your-api.example.com
```

---

## 👨‍💻 Author

Built as a Frontend Developer assignment for **Easy Fashion Ltd.**

---

## 📝 License

This project is for assessment purposes only.
