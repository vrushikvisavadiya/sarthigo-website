import {
  MapPin,
  Clock,
  CheckCircle,
  TrendingUp,
  Car,
  FileText,
  AlertTriangle,
} from "lucide-react";

// ─── Driver Stats ─────────────────────────────────────────────
const STATS = [
  {
    label: "Total Trips",
    value: "142",
    change: "+8 this week",
    icon: <MapPin className="w-5 h-5" />,
    color: "text-blue-500",
    bg: "bg-blue-500/10",
  },
  {
    label: "Completed",
    value: "138",
    change: "97% success rate",
    icon: <CheckCircle className="w-5 h-5" />,
    color: "text-green-500",
    bg: "bg-green-500/10",
  },
  {
    label: "Total Distance",
    value: "12,480 km",
    change: "+320 km this week",
    icon: <TrendingUp className="w-5 h-5" />,
    color: "text-purple-500",
    bg: "bg-purple-500/10",
  },
  {
    label: "Hours Driven",
    value: "318 hrs",
    change: "+14 hrs this week",
    icon: <Clock className="w-5 h-5" />,
    color: "text-orange-500",
    bg: "bg-orange-500/10",
  },
];

// ─── Recent Trips ─────────────────────────────────────────────
const RECENT_TRIPS = [
  {
    from: "Ahmedabad",
    to: "Surat",
    km: "265 km",
    duration: "3h 20m",
    status: "completed",
    date: "Today, 9:00 AM",
  },
  {
    from: "Surat",
    to: "Vadodara",
    km: "150 km",
    duration: "2h 05m",
    status: "completed",
    date: "Yesterday, 2:00 PM",
  },
  {
    from: "Vadodara",
    to: "Rajkot",
    km: "198 km",
    duration: "2h 45m",
    status: "completed",
    date: "Mar 5, 10:00 AM",
  },
  {
    from: "Rajkot",
    to: "Ahmedabad",
    km: "218 km",
    duration: "3h 00m",
    status: "completed",
    date: "Mar 4, 8:30 AM",
  },
  {
    from: "Ahmedabad",
    to: "Gandhinagar",
    km: "30 km",
    duration: "45m",
    status: "completed",
    date: "Mar 3, 11:00 AM",
  },
];

// ─── Documents ────────────────────────────────────────────────
const DOCUMENTS = [
  { name: "Driving License", expiry: "Dec 2027", status: "valid" },
  { name: "Vehicle Insurance", expiry: "Jun 2025", status: "expiring" },
  { name: "RC Book", expiry: "N/A", status: "valid" },
  { name: "PUC Certificate", expiry: "Apr 2026", status: "valid" },
];

// ─── Status Badge ─────────────────────────────────────────────
function StatusBadge({ status }: { status: string }) {
  const styles: Record<string, string> = {
    completed: "bg-green-500/10 text-green-600 border border-green-500/20",
    ongoing: "bg-orange-500/10 text-orange-600 border border-orange-500/20",
    pending: "bg-muted text-muted-foreground border border-border",
    valid: "bg-green-500/10 text-green-600 border border-green-500/20",
    expiring: "bg-orange-500/10 text-orange-600 border border-orange-500/20",
    expired: "bg-red-500/10 text-red-600 border border-red-500/20",
  };

  return (
    <span
      className={`px-2 py-0.5 rounded-full text-xs font-medium capitalize ${styles[status] ?? styles.pending}`}
    >
      {status}
    </span>
  );
}

// ─── Page ─────────────────────────────────────────────────────
export default function DriverOverviewPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">My Dashboard</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Here&apos;s your activity overview.
          </p>
        </div>
        {/* Status Badge */}
        <div className="flex items-center gap-2 px-3 py-1.5 bg-green-500/10 border border-green-500/20 rounded-full">
          <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
          <span className="text-xs font-medium text-green-600">Active</span>
        </div>
      </div>

      {/* Profile Card */}
      <div className="bg-card border border-border rounded-xl p-5">
        <div className="flex items-center gap-4">
          {/* Avatar */}
          <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center text-primary text-2xl font-bold flex-shrink-0">
            R
          </div>
          {/* Info */}
          <div className="flex-1 min-w-0">
            <h2 className="text-lg font-semibold text-foreground">
              Ravi Sharma
            </h2>
            <p className="text-sm text-muted-foreground">
              ravi.sharma@sarthigo.com
            </p>
            <div className="flex flex-wrap items-center gap-3 mt-2">
              <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
                <Car className="w-3.5 h-3.5" />
                Honda City · GJ01AB1234
              </span>
              <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
                <FileText className="w-3.5 h-3.5" />
                License: GJ01AB1234
              </span>
            </div>
          </div>
          {/* Edit Button */}
          <a
            href="/driver/profile"
            className="hidden sm:flex items-center gap-2 text-sm text-primary border border-primary/30 hover:bg-primary/10 px-3 py-1.5 rounded-lg transition-colors"
          >
            Edit Profile
          </a>
        </div>
      </div>

      {/* Stats Grid */}
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

      {/* Bottom Row */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Recent Trips — takes 2 cols */}
        <div className="xl:col-span-2 bg-card border border-border rounded-xl overflow-hidden">
          <div className="flex items-center justify-between px-5 py-4 border-b border-border">
            <h2 className="font-semibold text-foreground">Recent Trips</h2>
            <a
              href="/driver/trips"
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
                      {trip.km} · {trip.duration}
                    </p>
                  </div>
                </div>
                <div className="flex flex-col items-end gap-1">
                  <StatusBadge status={trip.status} />
                  <span className="text-xs text-muted-foreground">
                    {trip.date}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Documents — takes 1 col */}
        <div className="bg-card border border-border rounded-xl overflow-hidden">
          <div className="flex items-center justify-between px-5 py-4 border-b border-border">
            <h2 className="font-semibold text-foreground">Documents</h2>
            <a
              href="/driver/documents"
              className="text-xs text-primary hover:underline"
            >
              Manage →
            </a>
          </div>
          <div className="divide-y divide-border">
            {DOCUMENTS.map((doc) => (
              <div
                key={doc.name}
                className="flex items-center justify-between px-5 py-3 hover:bg-muted/50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  {doc.status === "expiring" ? (
                    <AlertTriangle className="w-4 h-4 text-orange-500 flex-shrink-0" />
                  ) : (
                    <FileText className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                  )}
                  <div>
                    <p className="text-sm font-medium text-foreground">
                      {doc.name}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Expires: {doc.expiry}
                    </p>
                  </div>
                </div>
                <StatusBadge status={doc.status} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
