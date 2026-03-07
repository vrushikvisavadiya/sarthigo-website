"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ArrowUpDown, MapPin, MoreHorizontal } from "lucide-react";

// ─── Type ─────────────────────────────────────────────────────
export type Trip = {
  id: string;
  driver: string;
  driverEmail: string;
  from: string;
  to: string;
  distanceKm: number;
  duration: string;
  status: "completed" | "ongoing" | "pending" | "cancelled";
  date: string;
};

// ─── Status Styles ────────────────────────────────────────────
const statusStyles: Record<Trip["status"], string> = {
  completed:
    "bg-green-500/10 text-green-600 border-green-500/20 hover:bg-green-500/10",
  ongoing:
    "bg-blue-500/10 text-blue-600 border-blue-500/20 hover:bg-blue-500/10",
  pending:
    "bg-orange-500/10 text-orange-600 border-orange-500/20 hover:bg-orange-500/10",
  cancelled: "bg-red-500/10 text-red-600 border-red-500/20 hover:bg-red-500/10",
};

// ─── Columns ──────────────────────────────────────────────────
export const tripColumns: ColumnDef<Trip>[] = [
  {
    accessorKey: "driver",
    header: ({ column }) => (
      <Button
        variant="ghost"
        size="sm"
        className="-ml-3 h-8 text-xs font-medium text-muted-foreground"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Driver <ArrowUpDown className="ml-1 w-3 h-3" />
      </Button>
    ),
    cell: ({ row }) => (
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-semibold text-sm flex-shrink-0">
          {row.original.driver.charAt(0)}
        </div>
        <div>
          <p className="font-medium text-foreground text-sm">
            {row.original.driver}
          </p>
          <p className="text-xs text-muted-foreground">
            {row.original.driverEmail}
          </p>
        </div>
      </div>
    ),
  },
  {
    accessorKey: "from",
    header: "Route",
    cell: ({ row }) => (
      <div className="flex items-center gap-1.5">
        <div className="flex items-center gap-1 text-sm text-foreground">
          <MapPin className="w-3.5 h-3.5 text-muted-foreground flex-shrink-0" />
          {row.original.from}
        </div>
        <span className="text-muted-foreground">→</span>
        <div className="flex items-center gap-1 text-sm text-foreground">
          <MapPin className="w-3.5 h-3.5 text-primary flex-shrink-0" />
          {row.original.to}
        </div>
      </div>
    ),
  },
  {
    accessorKey: "distanceKm",
    header: ({ column }) => (
      <Button
        variant="ghost"
        size="sm"
        className="-ml-3 h-8 text-xs font-medium text-muted-foreground"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Distance <ArrowUpDown className="ml-1 w-3 h-3" />
      </Button>
    ),
    cell: ({ row }) => (
      <div>
        <p className="text-sm font-medium text-foreground">
          {row.original.distanceKm} km
        </p>
        <p className="text-xs text-muted-foreground">{row.original.duration}</p>
      </div>
    ),
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => (
      <Badge
        variant="outline"
        className={`capitalize text-xs ${statusStyles[row.original.status]}`}
      >
        {row.original.status}
      </Badge>
    ),
  },
  {
    accessorKey: "date",
    header: ({ column }) => (
      <Button
        variant="ghost"
        size="sm"
        className="-ml-3 h-8 text-xs font-medium text-muted-foreground"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Date <ArrowUpDown className="ml-1 w-3 h-3" />
      </Button>
    ),
    cell: ({ row }) => (
      <span className="text-sm text-muted-foreground">{row.original.date}</span>
    ),
  },
  {
    id: "actions",
    cell: ({ row }) => (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
            <MoreHorizontal className="w-4 h-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-36">
          <DropdownMenuItem>View Details</DropdownMenuItem>
          <DropdownMenuItem className="text-red-500 focus:text-red-500">
            Cancel Trip
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    ),
  },
];
