import {
  TrendingUp,
  Users,
  Car,
  MapPin,
  Clock,
  AlertCircle,
} from "lucide-react";

// ─── Stat Card Data ───────────────────────────────────────────
const STATS = [
  {
    label: "Total Drivers",
    value: "124",
    change: "+12 this month",
    trend: "up",
    icon: <Users className="w-5 h-5" />,
    color: "text-blue-500",
    bg: "bg-blue-500/10",
  },
  {
    label: "Active Drivers",
    value: "98",
    change: "79% of total",
    trend: "up",
    icon: <Car className="w-5 h-5" />,
    color: "text-green-500",
    bg: "bg-green-500/10",
  },
  {
    label: "Total Trips",
    value: "3,842",
    change: "+248 this week",
    trend: "up",
    icon: <MapPin className="w-5 h-5" />,
    color: "text-purple-500",
    bg: "bg-purple-500/10",
  },
  {
    label: "Pending Approval",
    value: "7",
    change: "Needs attention",
    trend: "alert",
    icon: <AlertCircle className="w-5 h-5" />,
    color: "text-orange-500",
    bg: "bg-orange-500/10",
  },
];

// ─── Recent Drivers Data ──────────────────────────────────────
const RECENT_DRIVERS = [
  {
    name: "Ravi Sharma",
    vehicle: "Honda City",
    license: "GJ01AB1234",
    status: "active",
    joined: "2 days ago",
  },
  {
    name: "Mehul Patel",
    vehicle: "Maruti Swift",
    license: "GJ05CD5678",
    status: "active",
    joined: "5 days ago",
  },
  {
    name: "Suresh Joshi",
    vehicle: "Tata Nexon",
    license: "GJ01EF9012",
    status: "inactive",
    joined: "1 week ago",
  },
  {
    name: "Amit Verma",
    vehicle: "Hyundai i20",
    license: "GJ03GH3456",
    status: "suspended",
    joined: "2 weeks ago",
  },
  {
    name: "Dipak Modi",
    vehicle: "Kia Seltos",
    license: "GJ06IJ7890",
    status: "active",
    joined: "3 weeks ago",
  },
];

// ─── Recent Trips Data ────────────────────────────────────────
const RECENT_TRIPS = [
  {
    driver: "Ravi Sharma",
    from: "Ahmedabad",
    to: "Surat",
    km: "265 km",
    status: "completed",
    time: "2h ago",
  },
  {
    driver: "Mehul Patel",
    from: "Vadodara",
    to: "Rajkot",
    km: "198 km",
    status: "ongoing",
    time: "Now",
  },
  {
    driver: "Dipak Modi",
    from: "Surat",
    to: "Mumbai",
    km: "280 km",
    status: "completed",
    time: "5h ago",
  },
  {
    driver: "Ravi Sharma",
    from: "Ahmedabad",
    to: "Gandhinagar",
    km: "30 km",
    status: "completed",
    time: "8h ago",
  },
];

// ─── Status Badge ─────────────────────────────────────────────
function StatusBadge({ status }: { status: string }) {
  const styles: Record<string, string> = {
    active: "bg-green-500/10 text-green-600 border border-green-500/20",
    inactive: "bg-muted text-muted-foreground border border-border",
    suspended: "bg-red-500/10 text-red-600 border border-red-500/20",
    completed: "bg-blue-500/10 text-blue-600 border border-blue-500/20",
    ongoing: "bg-orange-500/10 text-orange-600 border border-orange-500/20",
  };

  return (
    <span
      className={`px-2 py-0.5 rounded-full text-xs font-medium capitalize ${styles[status] ?? styles.inactive}`}
    >
      {status}
    </span>
  );
}

// ─── Page ─────────────────────────────────────────────────────
export default function AdminOverviewPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-foreground">Dashboard</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Welcome back! Here&apos;s what&apos;s happening today.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {STATS.map((stat) => (
          <div
            key={stat.label}
            className="bg-card border border-border rounded-xl p-4 space-y-3"
          >
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">
                {stat.label}
              </span>
              <div className={`p-2 rounded-lg ${stat.bg} ${stat.color}`}>
                {stat.icon}
              </div>
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground">{stat.value}</p>
              <p
                className={`text-xs mt-1 ${stat.trend === "alert" ? "text-orange-500" : "text-green-500"}`}
              >
                {stat.change}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Tables Row */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {/* Recent Drivers */}
        <div className="bg-card border border-border rounded-xl overflow-hidden">
          <div className="flex items-center justify-between px-5 py-4 border-b border-border">
            <h2 className="font-semibold text-foreground">Recent Drivers</h2>
            <a
              href="/dashboard/admin/drivers"
              className="text-xs text-primary hover:underline"
            >
              View all →
            </a>
          </div>
          <div className="divide-y divide-border">
            {RECENT_DRIVERS.map((driver) => (
              <div
                key={driver.license}
                className="flex items-center justify-between px-5 py-3 hover:bg-muted/50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary text-sm font-semibold flex-shrink-0">
                    {driver.name.charAt(0)}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-foreground">
                      {driver.name}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {driver.vehicle}
                    </p>
                  </div>
                </div>
                <div className="flex flex-col items-end gap-1">
                  <StatusBadge status={driver.status} />
                  <span className="text-xs text-muted-foreground">
                    {driver.joined}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Trips */}
        <div className="bg-card border border-border rounded-xl overflow-hidden">
          <div className="flex items-center justify-between px-5 py-4 border-b border-border">
            <h2 className="font-semibold text-foreground">Recent Trips</h2>
            <a
              href="/dashboard/admin/trips"
              className="text-xs text-primary hover:underline"
            >
              View all →
            </a>
          </div>
          <div className="divide-y divide-border">
            {RECENT_TRIPS.map((trip, i) => (
              <div
                key={i}
                className="flex items-center justify-between px-5 py-3 hover:bg-muted/50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-purple-500/10 flex items-center justify-center text-purple-500 flex-shrink-0">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-foreground">
                      {trip.from} → {trip.to}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {trip.driver} · {trip.km}
                    </p>
                  </div>
                </div>
                <div className="flex flex-col items-end gap-1">
                  <StatusBadge status={trip.status} />
                  <span className="text-xs text-muted-foreground">
                    {trip.time}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
