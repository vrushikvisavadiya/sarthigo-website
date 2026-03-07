"use client";

import { useState } from "react";
import { MapPin, TrendingUp, Clock, IndianRupee } from "lucide-react";
import { DataTable } from "@/components/ui/data-table";
import { driverTripColumns, type DriverTrip } from "./columns";

// ─── Dummy Data ───────────────────────────────────────────────
const TRIPS: DriverTrip[] = [
  {
    id: "1",
    from: "Ahmedabad",
    to: "Surat",
    distanceKm: 265,
    duration: "3h 20m",
    status: "completed",
    date: "Mar 7, 9:00 AM",
    earnings: "₹1,850",
  },
  {
    id: "2",
    from: "Surat",
    to: "Vadodara",
    distanceKm: 150,
    duration: "2h 05m",
    status: "ongoing",
    date: "Mar 7, 1:00 PM",
    earnings: "₹1,050",
  },
  {
    id: "3",
    from: "Vadodara",
    to: "Rajkot",
    distanceKm: 198,
    duration: "2h 45m",
    status: "completed",
    date: "Mar 6, 10:00 AM",
    earnings: "₹1,386",
  },
  {
    id: "4",
    from: "Rajkot",
    to: "Ahmedabad",
    distanceKm: 218,
    duration: "3h 00m",
    status: "completed",
    date: "Mar 5, 8:30 AM",
    earnings: "₹1,526",
  },
  {
    id: "5",
    from: "Ahmedabad",
    to: "Gandhinagar",
    distanceKm: 30,
    duration: "45m",
    status: "completed",
    date: "Mar 4, 11:00 AM",
    earnings: "₹210",
  },
  {
    id: "6",
    from: "Gandhinagar",
    to: "Mehsana",
    distanceKm: 55,
    duration: "1h 10m",
    status: "completed",
    date: "Mar 4, 2:00 PM",
    earnings: "₹385",
  },
  {
    id: "7",
    from: "Ahmedabad",
    to: "Anand",
    distanceKm: 72,
    duration: "1h 15m",
    status: "cancelled",
    date: "Mar 3, 9:00 AM",
    earnings: "₹0",
  },
  {
    id: "8",
    from: "Anand",
    to: "Vadodara",
    distanceKm: 45,
    duration: "55m",
    status: "completed",
    date: "Mar 3, 3:00 PM",
    earnings: "₹315",
  },
  {
    id: "9",
    from: "Vadodara",
    to: "Surat",
    distanceKm: 150,
    duration: "2h 05m",
    status: "completed",
    date: "Mar 2, 10:00 AM",
    earnings: "₹1,050",
  },
  {
    id: "10",
    from: "Surat",
    to: "Ahmedabad",
    distanceKm: 265,
    duration: "3h 20m",
    status: "completed",
    date: "Mar 1, 8:00 AM",
    earnings: "₹1,850",
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

// ─── Stats ────────────────────────────────────────────────────
const STATS = [
  {
    label: "Total Trips",
    value: "142",
    icon: <MapPin className="w-4 h-4" />,
    color: "text-blue-500",
    bg: "bg-blue-500/10",
  },
  {
    label: "Total Distance",
    value: "12,480 km",
    icon: <TrendingUp className="w-4 h-4" />,
    color: "text-purple-500",
    bg: "bg-purple-500/10",
  },
  {
    label: "Hours Driven",
    value: "318 hrs",
    icon: <Clock className="w-4 h-4" />,
    color: "text-orange-500",
    bg: "bg-orange-500/10",
  },
  {
    label: "Total Earnings",
    value: "₹89,320",
    icon: <IndianRupee className="w-4 h-4" />,
    color: "text-green-500",
    bg: "bg-green-500/10",
  },
];

// ─── Page ─────────────────────────────────────────────────────
export default function DriverTripsPage() {
  const [filter, setFilter] = useState<FilterValue>("all");

  const filtered =
    filter === "all" ? TRIPS : TRIPS.filter((t) => t.status === filter);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-foreground">My Trips</h1>
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
        columns={driverTripColumns}
        data={filtered}
        searchKey="from"
        searchPlaceholder="Search by origin city..."
      />
    </div>
  );
}
