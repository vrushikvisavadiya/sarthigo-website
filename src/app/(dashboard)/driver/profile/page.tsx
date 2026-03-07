"use client";

import { useState } from "react";
import {
  Camera,
  Car,
  FileText,
  Phone,
  Mail,
  MapPin,
  Calendar,
  Shield,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";

// ─── Types ────────────────────────────────────────────────────
interface ProfileData {
  name: string;
  email: string;
  phone: string;
  location: string;
  license: string;
  licenseExpiry: string;
  vehicle: string;
  vehicleNumber: string;
  vehicleType: string;
  joinedDate: string;
  status: "active" | "inactive" | "suspended";
}

// ─── Dummy Data ───────────────────────────────────────────────
const PROFILE: ProfileData = {
  name: "Ravi Sharma",
  email: "ravi.sharma@sarthigo.com",
  phone: "+91 98765 43210",
  location: "Ahmedabad, Gujarat",
  license: "GJ-0120110012345",
  licenseExpiry: "Dec 31, 2027",
  vehicle: "Honda City",
  vehicleNumber: "GJ01AB1234",
  vehicleType: "Sedan",
  joinedDate: "January 12, 2025",
  status: "active",
};

// ─── Documents ────────────────────────────────────────────────
const DOCUMENTS = [
  { name: "Driving License", expiry: "Dec 2027", status: "valid" },
  { name: "Vehicle Insurance", expiry: "Jun 2026", status: "expiring" },
  { name: "RC Book", expiry: "N/A", status: "valid" },
  { name: "PUC Certificate", expiry: "Apr 2026", status: "valid" },
];

const docStatusStyles: Record<string, string> = {
  valid: "bg-green-500/10 text-green-600 border-green-500/20",
  expiring: "bg-orange-500/10 text-orange-600 border-orange-500/20",
  expired: "bg-red-500/10 text-red-600 border-red-500/20",
};

// ─── Info Row ─────────────────────────────────────────────────
function InfoRow({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-start gap-3 py-3 border-b border-border last:border-0">
      <div className="w-8 h-8 rounded-lg bg-muted flex items-center justify-center text-muted-foreground flex-shrink-0">
        {icon}
      </div>
      <div>
        <p className="text-xs text-muted-foreground">{label}</p>
        <p className="text-sm font-medium text-foreground mt-0.5">{value}</p>
      </div>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────
export default function DriverProfilePage() {
  const [showEditModal, setShowEditModal] = useState(false);
  const [form, setForm] = useState({
    name: PROFILE.name,
    phone: PROFILE.phone,
    location: PROFILE.location,
  });

  return (
    <div className="space-y-6 ">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-foreground">My Profile</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Manage your personal and vehicle information
        </p>
      </div>

      {/* Profile Hero Card */}
      <div className="bg-card border border-border rounded-xl p-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
          {/* Avatar */}
          <div className="relative">
            <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center text-primary text-3xl font-bold flex-shrink-0">
              {PROFILE.name.charAt(0)}
            </div>
            <button className="absolute bottom-0 right-0 w-6 h-6 bg-primary rounded-full flex items-center justify-center shadow-md hover:bg-primary/90 transition-colors">
              <Camera className="w-3 h-3 text-primary-foreground" />
            </button>
          </div>

          {/* Info */}
          <div className="flex-1">
            <div className="flex flex-wrap items-center gap-3">
              <h2 className="text-xl font-bold text-foreground">
                {PROFILE.name}
              </h2>
              <Badge
                variant="outline"
                className="bg-green-500/10 text-green-600 border-green-500/20 capitalize"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-green-500 mr-1.5 animate-pulse" />
                {PROFILE.status}
              </Badge>
            </div>
            <p className="text-sm text-muted-foreground mt-1">
              {PROFILE.email}
            </p>
            <div className="flex flex-wrap gap-3 mt-3">
              <span className="flex items-center gap-1 text-xs text-muted-foreground">
                <MapPin className="w-3.5 h-3.5" />
                {PROFILE.location}
              </span>
              <span className="flex items-center gap-1 text-xs text-muted-foreground">
                <Calendar className="w-3.5 h-3.5" />
                Joined {PROFILE.joinedDate}
              </span>
            </div>
          </div>

          {/* Edit Button */}
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowEditModal(true)}
            className="flex-shrink-0"
          >
            Edit Profile
          </Button>
        </div>
      </div>

      {/* Two Column Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Personal Info */}
        <div className="bg-card border border-border rounded-xl p-5">
          <h3 className="font-semibold text-foreground mb-1">
            Personal Information
          </h3>
          <p className="text-xs text-muted-foreground mb-4">
            Your contact and personal details
          </p>
          <InfoRow
            icon={<Mail className="w-4 h-4" />}
            label="Email"
            value={PROFILE.email}
          />
          <InfoRow
            icon={<Phone className="w-4 h-4" />}
            label="Phone"
            value={PROFILE.phone}
          />
          <InfoRow
            icon={<MapPin className="w-4 h-4" />}
            label="Location"
            value={PROFILE.location}
          />
          <InfoRow
            icon={<Calendar className="w-4 h-4" />}
            label="Joined"
            value={PROFILE.joinedDate}
          />
        </div>

        {/* License Info */}
        <div className="bg-card border border-border rounded-xl p-5">
          <h3 className="font-semibold text-foreground mb-1">
            License Details
          </h3>
          <p className="text-xs text-muted-foreground mb-4">
            Your driving license information
          </p>
          <InfoRow
            icon={<Shield className="w-4 h-4" />}
            label="License Number"
            value={PROFILE.license}
          />
          <InfoRow
            icon={<Calendar className="w-4 h-4" />}
            label="Expiry Date"
            value={PROFILE.licenseExpiry}
          />
          <InfoRow
            icon={<Car className="w-4 h-4" />}
            label="Vehicle"
            value={PROFILE.vehicle}
          />
          <InfoRow
            icon={<FileText className="w-4 h-4" />}
            label="Vehicle Number"
            value={PROFILE.vehicleNumber}
          />
        </div>

        {/* Vehicle Info */}
        <div className="bg-card border border-border rounded-xl p-5">
          <h3 className="font-semibold text-foreground mb-1">
            Vehicle Information
          </h3>
          <p className="text-xs text-muted-foreground mb-4">
            Details about your assigned vehicle
          </p>
          <InfoRow
            icon={<Car className="w-4 h-4" />}
            label="Vehicle Name"
            value={PROFILE.vehicle}
          />
          <InfoRow
            icon={<FileText className="w-4 h-4" />}
            label="Vehicle Number"
            value={PROFILE.vehicleNumber}
          />
          <InfoRow
            icon={<Car className="w-4 h-4" />}
            label="Vehicle Type"
            value={PROFILE.vehicleType}
          />
        </div>

        {/* Documents */}
        <div className="bg-card border border-border rounded-xl p-5">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="font-semibold text-foreground">Documents</h3>
              <p className="text-xs text-muted-foreground mt-0.5">
                Your uploaded documents
              </p>
            </div>
            <Button variant="outline" size="sm" className="text-xs">
              Upload
            </Button>
          </div>
          <div className="space-y-2">
            {DOCUMENTS.map((doc) => (
              <div
                key={doc.name}
                className="flex items-center justify-between p-3 rounded-lg bg-muted/50 border border-border"
              >
                <div className="flex items-center gap-2">
                  <FileText className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                  <div>
                    <p className="text-sm font-medium text-foreground">
                      {doc.name}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Expires: {doc.expiry}
                    </p>
                  </div>
                </div>
                <Badge
                  variant="outline"
                  className={`capitalize text-xs ${docStatusStyles[doc.status]}`}
                >
                  {doc.status}
                </Badge>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Edit Profile Modal */}
      <Dialog open={showEditModal} onOpenChange={setShowEditModal}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Edit Profile</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <div className="space-y-1.5">
              <Label>Full Name</Label>
              <Input
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
              />
            </div>
            <div className="space-y-1.5">
              <Label>Phone</Label>
              <Input
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
              />
            </div>
            <div className="space-y-1.5">
              <Label>Location</Label>
              <Input
                value={form.location}
                onChange={(e) => setForm({ ...form, location: e.target.value })}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowEditModal(false)}>
              Cancel
            </Button>
            <Button onClick={() => setShowEditModal(false)}>
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
