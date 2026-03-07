"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ArrowUpDown, MapPin, MoreHorizontal } from "lucide-react";

export type Driver = {
  id: string;
  name: string;
  email: string;
  phone: string;
  vehicle: string;
  vehicleNumber: string;
  location: string;
  status: "active" | "inactive" | "suspended";
  trips: number;
  joined: string;
};

const statusStyles = {
  active:
    "bg-green-500/10 text-green-600 border-green-500/20 hover:bg-green-500/10",
  inactive: "bg-muted text-muted-foreground border-border hover:bg-muted",
  suspended: "bg-red-500/10 text-red-600 border-red-500/20 hover:bg-red-500/10",
};

export const driverColumns: ColumnDef<Driver>[] = [
  {
    accessorKey: "name",
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
          {row.original.name.charAt(0)}
        </div>
        <div>
          <p className="font-medium text-foreground text-sm">
            {row.original.name}
          </p>
          <p className="text-xs text-muted-foreground">{row.original.email}</p>
        </div>
      </div>
    ),
  },
  {
    accessorKey: "vehicle",
    header: "Vehicle",
    cell: ({ row }) => (
      <div>
        <p className="text-sm text-foreground">{row.original.vehicle}</p>
        <p className="text-xs text-muted-foreground">
          {row.original.vehicleNumber}
        </p>
      </div>
    ),
  },
  {
    accessorKey: "location",
    header: "Location",
    cell: ({ row }) => (
      <div className="flex items-center gap-1 text-sm text-muted-foreground">
        <MapPin className="w-3.5 h-3.5" />
        {row.original.location}
      </div>
    ),
  },
  {
    accessorKey: "trips",
    header: ({ column }) => (
      <Button
        variant="ghost"
        size="sm"
        className="-ml-3 h-8 text-xs font-medium text-muted-foreground"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Trips <ArrowUpDown className="ml-1 w-3 h-3" />
      </Button>
    ),
    cell: ({ row }) => (
      <span className="text-sm font-medium text-foreground">
        {row.original.trips}
      </span>
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
    accessorKey: "joined",
    header: "Joined",
    cell: ({ row }) => (
      <span className="text-sm text-muted-foreground">
        {row.original.joined}
      </span>
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
          <DropdownMenuItem>View Profile</DropdownMenuItem>
          <DropdownMenuItem>Edit</DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem className="text-orange-500 focus:text-orange-500">
            Suspend
          </DropdownMenuItem>
          <DropdownMenuItem className="text-red-500 focus:text-red-500">
            Remove
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    ),
  },
];
