"use client";

import { useState } from "react";
import { MapPin, TrendingUp, Clock, CheckCircle } from "lucide-react";
import { DataTable } from "@/components/ui/data-table";
import { tripColumns, type Trip } from "./columns";

// ─── Dummy Data ───────────────────────────────────────────────
const TRIPS: Trip[] = [
  {
    id: "1",
    driver: "Ravi Sharma",
    driverEmail: "ravi@sarthigo.com",
    from: "Ahmedabad",
    to: "Surat",
    distanceKm: 265,
    duration: "3h 20m",
    status: "completed",
    date: "Mar 7, 9:00 AM",
  },
  {
    id: "2",
    driver: "Mehul Patel",
    driverEmail: "mehul@sarthigo.com",
    from: "Vadodara",
    to: "Rajkot",
    distanceKm: 198,
    duration: "2h 45m",
    status: "ongoing",
    date: "Mar 7, 11:30 AM",
  },
  {
    id: "3",
    driver: "Dipak Modi",
    driverEmail: "dipak@sarthigo.com",
    from: "Surat",
    to: "Mumbai",
    distanceKm: 280,
    duration: "4h 00m",
    status: "completed",
    date: "Mar 6, 8:00 AM",
  },
  {
    id: "4",
    driver: "Nirav Shah",
    driverEmail: "nirav@sarthigo.com",
    from: "Ahmedabad",
    to: "Gandhinagar",
    distanceKm: 30,
    duration: "45m",
    status: "completed",
    date: "Mar 6, 2:00 PM",
  },
  {
    id: "5",
    driver: "Ravi Sharma",
    driverEmail: "ravi@sarthigo.com",
    from: "Surat",
    to: "Vadodara",
    distanceKm: 150,
    duration: "2h 05m",
    status: "pending",
    date: "Mar 7, 3:00 PM",
  },
  {
    id: "6",
    driver: "Hardik Desai",
    driverEmail: "hardik@sarthigo.com",
    from: "Bhavnagar",
    to: "Ahmedabad",
    distanceKm: 195,
    duration: "2h 50m",
    status: "cancelled",
    date: "Mar 5, 10:00 AM",
  },
  {
    id: "7",
    driver: "Amit Verma",
    driverEmail: "amit@sarthigo.com",
    from: "Rajkot",
    to: "Jamnagar",
    distanceKm: 88,
    duration: "1h 20m",
    status: "completed",
    date: "Mar 5, 7:00 AM",
  },
  {
    id: "8",
    driver: "Mehul Patel",
    driverEmail: "mehul@sarthigo.com",
    from: "Surat",
    to: "Navsari",
    distanceKm: 38,
    duration: "50m",
    status: "completed",
    date: "Mar 4, 9:30 AM",
  },
  {
    id: "9",
    driver: "Nirav Shah",
    driverEmail: "nirav@sarthigo.com",
    from: "Ahmedabad",
    to: "Anand",
    distanceKm: 72,
    duration: "1h 10m",
    status: "completed",
    date: "Mar 4, 1:00 PM",
  },
  {
    id: "10",
    driver: "Dipak Modi",
    driverEmail: "dipak@sarthigo.com",
    from: "Rajkot",
    to: "Ahmedabad",
    distanceKm: 218,
    duration: "3h 00m",
    status: "completed",
    date: "Mar 3, 8:00 AM",
  },
];

// ─── Filter Tabs ──────────────────────────────────────────────
const FILTERS = [
  "all",
  "completed",
  "ongoing",
  "pending",
  "cancelled",
] as const;
type FilterValue = (typeof FILTERS)[number];

// ─── Summary Stats ────────────────────────────────────────────
const STATS = [
  {
    label: "Total Trips",
    value: "3,842",
    icon: <MapPin className="w-4 h-4" />,
    color: "text-blue-500",
    bg: "bg-blue-500/10",
  },
  {
    label: "Completed",
    value: "3,590",
    icon: <CheckCircle className="w-4 h-4" />,
    color: "text-green-500",
    bg: "bg-green-500/10",
  },
  {
    label: "Ongoing",
    value: "12",
    icon: <Clock className="w-4 h-4" />,
    color: "text-orange-500",
    bg: "bg-orange-500/10",
  },
  {
    label: "Total Distance",
    value: "98,240 km",
    icon: <TrendingUp className="w-4 h-4" />,
    color: "text-purple-500",
    bg: "bg-purple-500/10",
  },
];

// ─── Page ─────────────────────────────────────────────────────
export default function TripsPage() {
  const [filter, setFilter] = useState<FilterValue>("all");

  const filtered =
    filter === "all" ? TRIPS : TRIPS.filter((t) => t.status === filter);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-foreground">Trips</h1>
        <p className="text-sm text-muted-foreground mt-1">
          {TRIPS.length} total trips
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {STATS.map((stat) => (
          <div
            key={stat.label}
            className="bg-card border border-border rounded-xl p-4 flex items-center gap-3"
          >
            <div className={`p-2 rounded-lg ${stat.bg} ${stat.color}`}>
              {stat.icon}
            </div>
            <div>
              <p className="text-xs text-muted-foreground">{stat.label}</p>
              <p className="text-base font-bold text-foreground">
                {stat.value}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-1 bg-muted p-1 rounded-lg w-fit overflow-x-auto">
        {FILTERS.map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-3 py-1.5 rounded-md text-xs font-medium capitalize transition-colors whitespace-nowrap ${
              filter === f
                ? "bg-background text-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      {/* DataTable */}
      <DataTable
        columns={tripColumns}
        data={filtered}
        searchKey="driver"
        searchPlaceholder="Search by driver name..."
      />
    </div>
  );
}
