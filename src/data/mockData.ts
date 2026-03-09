/**
 * mockData.ts
 * Centralised mock data for all dashboard widgets.
 * In a real project, replace these with API calls.
 */

// ── Stat Cards (top row) ──────────────────────────────────────
export const statCards = [
  {
    id: 'employees',
    label: 'Employees',
    value: '96',
    color: '#7c3aed',
    bg: '#f3efff',
    iconBg: '#ede8ff',
    emoji: '👤',
  },
  {
    id: 'clients',
    label: 'Clients',
    value: '3,650',
    color: '#f59e0b',
    bg: '#fff8ed',
    iconBg: '#fff0d6',
    emoji: '💼',
  },
  {
    id: 'projects',
    label: 'Projects',
    value: '356',
    color: '#3b82f6',
    bg: '#edf3ff',
    iconBg: '#dbeafe',
    emoji: '📋',
  },
  {
    id: 'events',
    label: 'Events',
    value: '696',
    color: '#ef4444',
    bg: '#fff1f0',
    iconBg: '#ffe4e1',
    emoji: '📌',
  },
  {
    id: 'payroll',
    label: 'Payroll',
    value: '$96k',
    color: '#10b981',
    bg: '#f0fdf4',
    iconBg: '#dcfce7',
    emoji: '💰',
  },
  {
    id: 'reports',
    label: 'Reports',
    value: '59',
    color: '#06b6d4',
    bg: '#f0fdfa',
    iconBg: '#ccfbf1',
    emoji: '📊',
  },
];

// ── Revenue Chart Data ────────────────────────────────────────
export const revenueData = [
  { date: '16/08', earnings: 1200, expense: -800 },
  { date: '17/08', earnings: 1800, expense: -600 },
  { date: '18/08', earnings: 2800, expense: -1200 },
  { date: '19/08', earnings: 900,  expense: -400  },
  { date: '20/08', earnings: 2200, expense: -900  },
  { date: '21/08', earnings: 1500, expense: -700  },
  { date: '22/08', earnings: 2600, expense: -1000 },
];

// ── Employee Salary Chart Data ────────────────────────────────
export const salaryData = [
  { month: '04 Apr', value: 140 },
  { month: '05 May', value: 180 },
  { month: '06 Jun', value: 155 },
  { month: '07 Jul', value: 320 },
  { month: '08 Aug', value: 90  },
  { month: '09 Sep', value: 60  },
];

// ── Weekly Stats Sparkline ────────────────────────────────────
export const weeklyStatsData = [
  { x: 0, y: 30 }, { x: 1, y: 80 }, { x: 2, y: 45 },
  { x: 3, y: 60 }, { x: 4, y: 35 }, { x: 5, y: 70 },
  { x: 6, y: 55 }, { x: 7, y: 40 }, { x: 8, y: 65 },
];

// ── Monthly Earnings Sparkline ────────────────────────────────
export const monthlyEarningsSparkline = [
  { x: 0, y: 20 }, { x: 1, y: 35 }, { x: 2, y: 28 },
  { x: 3, y: 50 }, { x: 4, y: 42 }, { x: 5, y: 60 },
  { x: 6, y: 48 },
];

// ── Yearly Breakup (Donut) ────────────────────────────────────
export const yearlyBreakupData = [
  { type: '2022', value: 68 },
  { type: '2021', value: 32 },
];

// ── Recent Transactions ───────────────────────────────────────
export const transactions = [
  { id: 1, name: 'PayPal Transfer',  desc: 'Money added',    amount: '+$6,235', color: '#3b82f6', icon: '💳' },
  { id: 2, name: 'Wallet',           desc: 'Bill payment',   amount: '+$345',   color: '#10b981', icon: '👛' },
  { id: 3, name: 'Credit Card',      desc: 'Money reversed', amount: '+$2,235', color: '#f59e0b', icon: '💳' },
  { id: 4, name: 'Bank Transfer',    desc: 'Money added',    amount: '+$320',   color: '#6366f1', icon: '🏦' },
  { id: 5, name: 'Refund',           desc: 'Bill payment',   amount: '-$32',    color: '#ef4444', icon: '↩️' },
];

// ── Top Projects Table ────────────────────────────────────────
export const topProjects = [
  { id: 1, name: 'John Doe', role: 'Web Designer', project: 'Elite admin',        priority: 'Low',       budget: '$3.5k' },
  { id: 2, name: 'John Doe', role: 'Web Designer', project: 'Material Design',    priority: 'Yellow',    budget: '$3.5k' },
  { id: 3, name: 'John Doe', role: 'Web Designer', project: 'Spike Dashboard',    priority: 'Very High', budget: '$3.5k' },
  { id: 4, name: 'John Doe', role: 'Web Designer', project: 'Elite admin',        priority: 'High',      budget: '$3.5k' },
];

// ── Product Performances Table ────────────────────────────────
export const productPerformances = [
  { id: 1, name: 'Minecraf App',          owner: 'Jason Roy',      progress: 73.2, priority: 'Low',       budget: '$3.5k' },
  { id: 2, name: 'Web App Project',       owner: 'Mathew Flintoff', progress: 56.8, priority: 'Medium',   budget: '$3.5k' },
  { id: 3, name: 'Modernize Dashboard',   owner: 'Anil Kumar',     progress: 25,   priority: 'Very High', budget: '$3.5k' },
  { id: 4, name: 'Dashboard Co',          owner: 'George Cruize',  progress: 96.3, priority: 'High',      budget: '$3.5k' },
];

// ── Daily Activities ──────────────────────────────────────────
export const dailyActivities = [
  { id: 1, time: '09:46', text: 'Payment received from John Doe of $385.90',      color: '#10b981' },
  { id: 2, time: '09:46', text: 'New sale recorded #ML-3467',                      color: '#3b82f6', link: true },
  { id: 3, time: '09:46', text: 'Payment was made of $64.95 to Michael Anderson',  color: '#f59e0b' },
  { id: 4, time: '09:46', text: 'New sale recorded #ML-3467',                      color: '#3b82f6', link: true },
  { id: 5, time: '09:46', text: 'Project meeting',                                 color: '#6366f1' },
  { id: 6, time: '09:46', text: 'Payment received from John Doe of $385.90',       color: '#10b981' },
];

// ── Best Selling Products ─────────────────────────────────────
export const bestSelling = [
  { id: 1, name: 'MaterialPro Dashboard', price: '$23,568', progress: 55, color: '#5d87ff' },
  { id: 2, name: 'Flexy Admin Template',  price: '$23,568', progress: 24, color: '#13deb9' },
];

// ── Welcome Card stats ────────────────────────────────────────
export const welcomeStats = {
  totalEarnings: '$63,489.50',
  earningsThisMonth: '$48,820',
  expenseThisMonth: '$26,498',
  customers: '36,358',
  projects: '78,298',
  growthCustomers: '+9%',
  growthProjects: '+9%',
};
