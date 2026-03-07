"use client";

import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { TrendingUp, Users, MapPin, IndianRupee } from "lucide-react";

// ─── Data ─────────────────────────────────────────────────────
const MONTHLY_TRIPS = [
  { month: "Aug", trips: 280 },
  { month: "Sep", trips: 320 },
  { month: "Oct", trips: 295 },
  { month: "Nov", trips: 410 },
  { month: "Dec", trips: 380 },
  { month: "Jan", trips: 450 },
  { month: "Feb", trips: 490 },
  { month: "Mar", trips: 520 },
];

const MONTHLY_REVENUE = [
  { month: "Aug", revenue: 196000 },
  { month: "Sep", revenue: 224000 },
  { month: "Oct", revenue: 206500 },
  { month: "Nov", revenue: 287000 },
  { month: "Dec", revenue: 266000 },
  { month: "Jan", revenue: 315000 },
  { month: "Feb", revenue: 343000 },
  { month: "Mar", revenue: 364000 },
];

const DRIVER_STATUS = [
  { name: "Active", value: 98, color: "#22c55e" },
  { name: "Inactive", value: 18, color: "#94a3b8" },
  { name: "Suspended", value: 8, color: "#ef4444" },
];

const TOP_ROUTES = [
  { route: "AMD → Surat", trips: 420 },
  { route: "AMD → Rajkot", trips: 380 },
  { route: "Surat → Mumbai", trips: 310 },
  { route: "AMD → Vadodara", trips: 290 },
  { route: "Rajkot → AMD", trips: 260 },
  { route: "Vadodara → AMD", trips: 240 },
];

// ─── Stats ────────────────────────────────────────────────────
const STATS = [
  {
    label: "Total Revenue",
    value: "₹24,01,500",
    change: "+18% vs last month",
    trend: "up",
    icon: <IndianRupee className="w-5 h-5" />,
    color: "text-green-500",
    bg: "bg-green-500/10",
  },
  {
    label: "Total Trips",
    value: "3,842",
    change: "+248 this month",
    trend: "up",
    icon: <MapPin className="w-5 h-5" />,
    color: "text-blue-500",
    bg: "bg-blue-500/10",
  },
  {
    label: "Active Drivers",
    value: "98",
    change: "+5 this month",
    trend: "up",
    icon: <Users className="w-5 h-5" />,
    color: "text-purple-500",
    bg: "bg-purple-500/10",
  },
  {
    label: "Avg Trip Value",
    value: "₹625",
    change: "+₹42 vs last month",
    trend: "up",
    icon: <TrendingUp className="w-5 h-5" />,
    color: "text-orange-500",
    bg: "bg-orange-500/10",
  },
];

// ─── Custom Tooltip ───────────────────────────────────────────
function TripTooltip({ active, payload, label }: any) {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-card border border-border rounded-lg px-3 py-2 shadow-lg text-sm">
      <p className="text-muted-foreground mb-1">{label}</p>
      <p className="font-semibold text-foreground">{payload[0].value} trips</p>
    </div>
  );
}

function RevenueTooltip({ active, payload, label }: any) {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-card border border-border rounded-lg px-3 py-2 shadow-lg text-sm">
      <p className="text-muted-foreground mb-1">{label}</p>
      <p className="font-semibold text-foreground">
        ₹{(payload[0].value / 1000).toFixed(0)}k
      </p>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────
export default function AnalyticsPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-foreground">Analytics</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Performance overview for the last 8 months
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {STATS.map((stat) => (
          <div
            key={stat.label}
            className="bg-card border border-border rounded-xl p-4 space-y-3"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs text-muted-foreground">
                {stat.label}
              </span>
              <div className={`p-2 rounded-lg ${stat.bg} ${stat.color}`}>
                {stat.icon}
              </div>
            </div>
            <div>
              <p className="text-xl font-bold text-foreground">{stat.value}</p>
              <p className="text-xs mt-1 text-green-500">{stat.change}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Charts Row 1 */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {/* Trips Over Time */}
        <div className="bg-card border border-border rounded-xl p-5">
          <h3 className="font-semibold text-foreground">Trips Over Time</h3>
          <p className="text-xs text-muted-foreground mt-0.5 mb-5">
            Monthly trip volume
          </p>
          <ResponsiveContainer width="100%" height={220}>
            <AreaChart
              data={MONTHLY_TRIPS}
              margin={{ top: 5, right: 10, left: -20, bottom: 0 }}
            >
              <defs>
                <linearGradient id="tripsGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="hsl(var(--border))"
              />
              <XAxis
                dataKey="month"
                tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }}
                axisLine={false}
                tickLine={false}
              />
              <Tooltip content={<TripTooltip />} />
              <Area
                type="monotone"
                dataKey="trips"
                stroke="#6366f1"
                strokeWidth={2}
                fill="url(#tripsGrad)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Revenue Over Time */}
        <div className="bg-card border border-border rounded-xl p-5">
          <h3 className="font-semibold text-foreground">Revenue Over Time</h3>
          <p className="text-xs text-muted-foreground mt-0.5 mb-5">
            Monthly revenue in ₹
          </p>
          <ResponsiveContainer width="100%" height={220}>
            <AreaChart
              data={MONTHLY_REVENUE}
              margin={{ top: 5, right: 10, left: -10, bottom: 0 }}
            >
              <defs>
                <linearGradient id="revenueGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#22c55e" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#22c55e" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="hsl(var(--border))"
              />
              <XAxis
                dataKey="month"
                tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                tickFormatter={(v) => `₹${v / 1000}k`}
                tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }}
                axisLine={false}
                tickLine={false}
              />
              <Tooltip content={<RevenueTooltip />} />
              <Area
                type="monotone"
                dataKey="revenue"
                stroke="#22c55e"
                strokeWidth={2}
                fill="url(#revenueGrad)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Charts Row 2 */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Top Routes — 2 cols */}
        <div className="xl:col-span-2 bg-card border border-border rounded-xl p-5">
          <h3 className="font-semibold text-foreground">Top Routes</h3>
          <p className="text-xs text-muted-foreground mt-0.5 mb-5">
            Most travelled routes
          </p>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart
              data={TOP_ROUTES}
              layout="vertical"
              margin={{ top: 0, right: 10, left: 10, bottom: 0 }}
            >
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="hsl(var(--border))"
                horizontal={false}
              />
              <XAxis
                type="number"
                tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                dataKey="route"
                type="category"
                tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }}
                axisLine={false}
                tickLine={false}
                width={90}
              />
              <Tooltip
                content={({ active, payload }) =>
                  active && payload?.length ? (
                    <div className="bg-card border border-border rounded-lg px-3 py-2 shadow-lg text-sm">
                      <p className="font-semibold text-foreground">
                        {payload[0].value} trips
                      </p>
                    </div>
                  ) : null
                }
              />
              <Bar dataKey="trips" fill="#6366f1" radius={[0, 6, 6, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Driver Status — 1 col */}
        <div className="bg-card border border-border rounded-xl p-5">
          <h3 className="font-semibold text-foreground">Driver Status</h3>
          <p className="text-xs text-muted-foreground mt-0.5 mb-5">
            Current driver breakdown
          </p>
          <ResponsiveContainer width="100%" height={160}>
            <PieChart>
              <Pie
                data={DRIVER_STATUS}
                cx="50%"
                cy="50%"
                innerRadius={50}
                outerRadius={75}
                paddingAngle={3}
                dataKey="value"
              >
                {DRIVER_STATUS.map((entry, i) => (
                  <Cell key={i} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip
                content={({ active, payload }) =>
                  active && payload?.length ? (
                    <div className="bg-card border border-border rounded-lg px-3 py-2 shadow-lg text-sm">
                      <p className="font-semibold text-foreground">
                        {payload[0].name}: {payload[0].value}
                      </p>
                    </div>
                  ) : null
                }
              />
            </PieChart>
          </ResponsiveContainer>

          {/* Legend */}
          <div className="space-y-2 mt-2">
            {DRIVER_STATUS.map((item) => (
              <div
                key={item.name}
                className="flex items-center justify-between text-sm"
              >
                <div className="flex items-center gap-2">
                  <span
                    className="w-2.5 h-2.5 rounded-full flex-shrink-0"
                    style={{ backgroundColor: item.color }}
                  />
                  <span className="text-muted-foreground">{item.name}</span>
                </div>
                <span className="font-medium text-foreground">
                  {item.value}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
