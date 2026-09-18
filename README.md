# 🚀 Easy Fashion Ltd. — Admin Dashboard

A modern, fully responsive **Admin Dashboard** built with **Next.js 15 (Pages Router)**, **Ant Design 5**, and **Recharts**, closely following the provided Figma design. It ships three complete dashboard views, light/dark theming, and a production-ready Docker deployment.

> **Live pages:** Modern (`/`) · Analytical (`/dashboard2`) · eCommerce (`/dashboard3`)

---

## ✨ Highlights

- **Pixel-focused UI** — Ant Design 5 component system tuned with custom theme tokens to match the Figma palette (`#5d87ff` primary, `#13deb9` success, `#ffae1f` warning).
- **Three complete dashboards** — stat cards, revenue bar charts, donut breakups, sparklines, transaction feeds, and data tables with priority badges.
- **Light / Dark mode** — `ThemeContext`-driven algorithm switching via Ant Design's theming engine, persisted across reloads.
- **Optimized images** — `next/image` everywhere (remote avatars + local illustrations) with `priority` and `sizes` hints for strong LCP.
- **Typed end-to-end** — strict TypeScript, ESLint (`next/core-web-vitals`) clean.
- **Secure by default** — all pinned dependencies pass `npm audit` with **0 known vulnerabilities** (postcss pinned to the patched release via npm `overrides`).
- **One-command Docker deploy** — multi-stage build producing a slim, non-root, standalone runtime.

---

## 📸 Screenshots

### 🌞 Light Mode — Dashboard 1 (Modern)

![Dashboard Light Mode](./Screen%20Shots/Modern%20Dashboard%20%E2%80%94%20Easy%20Fashion%20Ltd.%20Day%20light.png)

### 🌙 Dark Mode — Dashboard 1 (Modern)

![Dashboard Dark Mode](./Screen%20Shots/Modern%20Dashboard%20%E2%80%94%20Easy%20Fashion%20Ltd.%20Night%20Mode%20.png)

| Dashboard 1 — Modern | Dashboard 2 — Analytical | Dashboard 3 — eCommerce |
| -------------------- | ------------------------ | ----------------------- |
| Stat cards, Revenue chart, Best Selling | Welcome card, Transactions, Product Performance | Combined full-featured view |

---

## 🛠️ Tech Stack

| Tool | Purpose | Version |
| --------------------------------------------- | --------------------------------------- | -------- |
| [Next.js](https://nextjs.org/) | React framework with file-based routing | 15.5.25 |
| [React](https://react.dev/) | UI library | 18.3.1 |
| [Ant Design 5](https://ant.design/) | Primary UI component library | 5.29.3 |
| [@ant-design/icons](https://ant.design/) | Icon set | 5.6.1 |
| [Recharts](https://recharts.org/) | Charts & data visualisations | 2.15.4 |
| [TypeScript](https://www.typescriptlang.org/) | Type safety | 5.9.3 |
| [Day.js](https://day.js.org/) | Date utilities (used by Ant Design) | 1.11.23 |
| [ESLint](https://eslint.org/) | Linting (`next/core-web-vitals`) | 8.56.0 |
| Docker | Containerised deployment | multi-stage |

> 🔒 Dependency hygiene: `npm audit` reports **0 vulnerabilities**.

---

## 📁 Project Structure

```
easy-fashion-dashboard/
├── public/                          # Static assets served at /
│   └── images/
│       ├── logo.png                 # Easy Fashion brand logo
│       ├── welcome-illustration.png # Welcome card illustration
│       └── product-illustration.png # Dashboard illustration
│
├── src/
│   ├── components/
│   │   ├── layout/                  # Application chrome
│   │   │   ├── DashboardLayout.tsx  # Layout wrapper (Sider + Header + Content)
│   │   │   ├── Sidebar.tsx          # Left navigation menu
│   │   │   └── Header.tsx           # Top bar: search, theme toggle, alerts
│   │   │
│   │   └── dashboard/               # Composable dashboard widgets
│   │       ├── StatCards.tsx        # 6 KPI summary cards
│   │       ├── RevenueChart.tsx     # Revenue vs expense bar chart
│   │       ├── EarningsWidgets.tsx  # Yearly breakup donut + earnings sparkline
│   │       ├── EmployeeSalary.tsx   # Monthly salary chart + customer mini cards
│   │       ├── WeeklyStats.tsx      # Weekly stats + top sellers list
│   │       ├── TopProjects.tsx      # Top projects table (avatars, priority)
│   │       ├── ProductPerformance.tsx # Product performance table with tabs
│   │       ├── BestSellingProducts.tsx # Best-selling progress list
│   │       ├── WelcomeCard.tsx      # Welcome hero banner
│   │       ├── RecentTransactions.tsx # Transaction timeline
│   │       └── DailyActivities.tsx  # Activity feed
│   │
│   ├── context/
│   │   └── ThemeContext.tsx         # Light/dark theme state + persistence
│   │
│   ├── data/
│   │   └── mockData.ts              # All mock data (swap for API calls)
│   │
│   ├── pages/                       # File-based routes
│   │   ├── _app.tsx                 # ConfigProvider + theme tokens
│   │   ├── _document.tsx            # HTML shell + Google Fonts
│   │   ├── index.tsx                # Dashboard 1 — Modern
│   │   ├── dashboard2.tsx           # Dashboard 2 — Analytical
│   │   └── dashboard3.tsx           # Dashboard 3 — eCommerce
│   │
│   └── styles/
│       └── globals.css              # Global styles + Ant Design overrides
│
├── .dockerignore                    # Docker build context exclusions
├── .eslintrc.json                   # ESLint config (next/core-web-vitals)
├── .gitignore                       # Local artifacts never reach the repo
├── Dockerfile                       # Multi-stage production image
├── docker-compose.yml               # One-command deployment
├── next.config.js                   # Standalone output + remote image hosts
├── package.json                     # Scripts + pinned dependencies
└── tsconfig.json                    # Strict TypeScript config (@/* paths)
```

---

## ⚡ Getting Started

### Prerequisites

| Requirement | Minimum |
| ----------- | ------- |
| Node.js     | 18.17+  |
| npm         | 9+      |

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/SadManFahIm/Technical-Assignment---Easyfashion-Limited.git

# 2. Navigate into the project
cd Technical-Assignment---Easyfashion-Limited

# 3. Install dependencies
npm install

# 4. Start the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

> No environment variables are required — the app runs on bundled mock data. To hook up a real API later, create `.env.local` with `NEXT_PUBLIC_API_URL=https://your-api.example.com`.

---

## 📄 Available Pages

| Route | Description |
| ----- | ----------- |
| `/` | Dashboard 1 — Modern (stat cards, revenue chart, employee salary) |
| `/dashboard2` | Dashboard 2 — Analytical (welcome card, transactions, product performance) |
| `/dashboard3` | Dashboard 3 — eCommerce (combined comprehensive view) |

---

## 🧪 Scripts

| Command | Description |
| ------- | ----------- |
| `npm run dev` | Start the dev server with hot reload |
| `npm run build` | Create an optimised production build |
| `npm start` | Serve the production build |
| `npm run lint` | Run ESLint (next/core-web-vitals) |

---

## 🐳 Docker Deployment

The image is a **multi-stage build**: dependencies are installed once, the app is compiled with `output: 'standalone'`, and the final stage copies only the files `node server.js` needs into a **non-root** `node:20-alpine` runtime.

```bash
# Build & run with compose (recommended)
docker compose up --build -d

# …or plain Docker
docker build -t easy-fashion-dashboard .
docker run -p 3000:3000 easy-fashion-dashboard
```

Then open [http://localhost:3000](http://localhost:3000). The container includes a built-in healthcheck hitting the homepage.

---

## 🎨 Design Decisions

- **Theme** — custom Ant Design tokens map the Figma palette; light/dark algorithms swap a full token set (`ThemeContext`), so every component re-themes consistently.
- **Typography** — `Plus Jakarta Sans` (Google Fonts) loaded in `_document.tsx`.
- **Charts** — Recharts for its small footprint and SSR compatibility with Next.js.
- **Responsiveness** — Ant Design's `Row`/`Col` grid with `xs → lg` breakpoints keeps the layout clean on mobile and tablet.
- **Images** — remote DiceBear avatars whitelisted via `images.remotePatterns`; above-the-fold art uses `priority`.
- **Comments** — every file is thoroughly commented for maintainability.

---

## 🔄 Git Workflow

- `main` — production-ready branch (protected; merges via PR only)
- `Develop` — integration branch; feature branches land here first
- Feature branches follow `feat/<topic>` and are merged into `Develop`, then released to `main` through a reviewed PR.

---

## 👨‍💻 Author

Built as a Frontend Developer assignment for **Easy Fashion Ltd.** by [SadManFahIm](https://github.com/SadManFahIm).

---

## 📄 License

Private / internal — all rights reserved.
