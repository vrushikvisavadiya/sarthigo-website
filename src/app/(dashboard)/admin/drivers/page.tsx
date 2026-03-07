"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import { driverColumns, type Driver } from "./columns";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

// ─── Dummy Data ───────────────────────────────────────────────
const DRIVERS: Driver[] = [
  {
    id: "1",
    name: "Ravi Sharma",
    email: "ravi@sarthigo.com",
    phone: "+91 98765 43210",
    vehicle: "Honda City",
    vehicleNumber: "GJ01AB1234",
    location: "Ahmedabad",
    status: "active",
    trips: 142,
    joined: "Jan 12, 2025",
  },
  {
    id: "2",
    name: "Mehul Patel",
    email: "mehul@sarthigo.com",
    phone: "+91 91234 56789",
    vehicle: "Maruti Swift",
    vehicleNumber: "GJ05CD5678",
    location: "Surat",
    status: "active",
    trips: 98,
    joined: "Feb 3, 2025",
  },
  {
    id: "3",
    name: "Suresh Joshi",
    email: "suresh@sarthigo.com",
    phone: "+91 99887 76655",
    vehicle: "Tata Nexon",
    vehicleNumber: "GJ01EF9012",
    location: "Vadodara",
    status: "inactive",
    trips: 54,
    joined: "Mar 18, 2025",
  },
  {
    id: "4",
    name: "Amit Verma",
    email: "amit@sarthigo.com",
    phone: "+91 88776 65544",
    vehicle: "Hyundai i20",
    vehicleNumber: "GJ03GH3456",
    location: "Rajkot",
    status: "suspended",
    trips: 23,
    joined: "Apr 5, 2025",
  },
  {
    id: "5",
    name: "Dipak Modi",
    email: "dipak@sarthigo.com",
    phone: "+91 77665 54433",
    vehicle: "Kia Seltos",
    vehicleNumber: "GJ06IJ7890",
    location: "Gandhinagar",
    status: "active",
    trips: 187,
    joined: "May 22, 2025",
  },
  {
    id: "6",
    name: "Nirav Shah",
    email: "nirav@sarthigo.com",
    phone: "+91 66554 43322",
    vehicle: "Toyota Innova",
    vehicleNumber: "GJ01KL2345",
    location: "Ahmedabad",
    status: "active",
    trips: 210,
    joined: "Jun 10, 2025",
  },
  {
    id: "7",
    name: "Hardik Desai",
    email: "hardik@sarthigo.com",
    phone: "+91 55443 32211",
    vehicle: "Mahindra XUV",
    vehicleNumber: "GJ07MN6789",
    location: "Bhavnagar",
    status: "inactive",
    trips: 67,
    joined: "Jul 14, 2025",
  },
];

// ─── Filter Tabs ──────────────────────────────────────────────
const FILTERS = ["all", "active", "inactive", "suspended"] as const;
type FilterValue = (typeof FILTERS)[number];

// ─── Page ─────────────────────────────────────────────────────
export default function DriversPage() {
  const [filter, setFilter] = useState<FilterValue>("all");
  const [showModal, setShowModal] = useState(false);

  const filtered =
    filter === "all" ? DRIVERS : DRIVERS.filter((d) => d.status === filter);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Drivers</h1>
          <p className="text-sm text-muted-foreground mt-1">
            {DRIVERS.length} total drivers
          </p>
        </div>
        <Button onClick={() => setShowModal(true)} size="sm" className="gap-2">
          <Plus className="w-4 h-4" />
          <span className="hidden sm:block">Add Driver</span>
        </Button>
      </div>

      {/* Status Filter Tabs */}
      <div className="flex items-center gap-1 bg-muted p-1 rounded-lg w-fit">
        {FILTERS.map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-3 py-1.5 rounded-md text-xs font-medium capitalize transition-colors ${
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
        columns={driverColumns}
        data={filtered}
        searchKey="name"
        searchPlaceholder="Search by name..."
      />

      {/* Add Driver Dialog */}
      <Dialog open={showModal} onOpenChange={setShowModal}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Add New Driver</DialogTitle>
          </DialogHeader>
          <div className="grid grid-cols-2 gap-4 py-2">
            <div className="col-span-2 space-y-1.5">
              <Label>Full Name</Label>
              <Input placeholder="Ravi Sharma" />
            </div>
            <div className="space-y-1.5">
              <Label>Email</Label>
              <Input type="email" placeholder="ravi@email.com" />
            </div>
            <div className="space-y-1.5">
              <Label>Phone</Label>
              <Input placeholder="+91 98765 43210" />
            </div>
            <div className="space-y-1.5">
              <Label>License Number</Label>
              <Input placeholder="GJ-0120110012345" />
            </div>
            <div className="space-y-1.5">
              <Label>License Expiry</Label>
              <Input type="date" />
            </div>
            <div className="space-y-1.5">
              <Label>Vehicle Type</Label>
              <Input placeholder="Honda City" />
            </div>
            <div className="space-y-1.5">
              <Label>Vehicle Number</Label>
              <Input placeholder="GJ01AB1234" />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowModal(false)}>
              Cancel
            </Button>
            <Button>Add Driver</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
