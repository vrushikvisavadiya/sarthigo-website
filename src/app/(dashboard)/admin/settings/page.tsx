"use client";

import { useState } from "react";
import { Bell, Shield, Building, User, Save, Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";

// ─── Types ────────────────────────────────────────────────────
type Tab = "company" | "profile" | "notifications" | "security";

// ─── Tabs ─────────────────────────────────────────────────────
const TABS: { label: string; value: Tab; icon: React.ReactNode }[] = [
  {
    label: "Company",
    value: "company",
    icon: <Building className="w-4 h-4" />,
  },
  { label: "Profile", value: "profile", icon: <User className="w-4 h-4" /> },
  {
    label: "Notifications",
    value: "notifications",
    icon: <Bell className="w-4 h-4" />,
  },
  {
    label: "Security",
    value: "security",
    icon: <Shield className="w-4 h-4" />,
  },
];

// ─── Toggle ───────────────────────────────────────────────────
function Toggle({
  enabled,
  onChange,
}: {
  enabled: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <button
      onClick={() => onChange(!enabled)}
      className={`relative w-10 h-5 rounded-full transition-colors flex-shrink-0 ${
        enabled ? "bg-primary" : "bg-muted-foreground/30"
      }`}
    >
      <span
        className={`absolute top-0.5 left-0.5 w-4 h-4 rounded-full bg-white shadow transition-transform ${
          enabled ? "translate-x-5" : "translate-x-0"
        }`}
      />
    </button>
  );
}

// ─── Section Wrapper ──────────────────────────────────────────
function Section({
  title,
  description,
  children,
}: {
  title: string;
  description: string;
  children: React.ReactNode;
}) {
  return (
    <div className="bg-card border border-border rounded-xl p-5 space-y-5">
      <div>
        <h3 className="font-semibold text-foreground">{title}</h3>
        <p className="text-xs text-muted-foreground mt-0.5">{description}</p>
      </div>
      {children}
    </div>
  );
}

// ─── Company Tab ──────────────────────────────────────────────
function CompanyTab() {
  const [form, setForm] = useState({
    name: "Sarthigo Pvt. Ltd.",
    email: "admin@sarthigo.com",
    phone: "+91 79 2345 6789",
    address: "SG Highway, Ahmedabad, Gujarat 380054",
    website: "https://sarthigo.com",
    gst: "24AAACS1234A1Z5",
  });

  return (
    <div className="space-y-5">
      <Section
        title="Company Information"
        description="Update your company details"
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="sm:col-span-2 space-y-1.5">
            <Label>Company Name</Label>
            <Input
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />
          </div>
          <div className="space-y-1.5">
            <Label>Business Email</Label>
            <Input
              type="email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            />
          </div>
          <div className="space-y-1.5">
            <Label>Phone</Label>
            <Input
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
            />
          </div>
          <div className="sm:col-span-2 space-y-1.5">
            <Label>Address</Label>
            <Input
              value={form.address}
              onChange={(e) => setForm({ ...form, address: e.target.value })}
            />
          </div>
          <div className="space-y-1.5">
            <Label>Website</Label>
            <Input
              value={form.website}
              onChange={(e) => setForm({ ...form, website: e.target.value })}
            />
          </div>
          <div className="space-y-1.5">
            <Label>GST Number</Label>
            <Input
              value={form.gst}
              onChange={(e) => setForm({ ...form, gst: e.target.value })}
            />
          </div>
        </div>
        <div className="flex justify-end">
          <Button size="sm" className="gap-2">
            <Save className="w-4 h-4" /> Save Changes
          </Button>
        </div>
      </Section>
    </div>
  );
}

// ─── Profile Tab ──────────────────────────────────────────────
function ProfileTab() {
  const [form, setForm] = useState({
    name: "Sarthak Admin",
    email: "admin@sarthigo.com",
    phone: "+91 98765 00000",
    role: "Super Admin",
  });

  return (
    <div className="space-y-5">
      <Section
        title="Admin Profile"
        description="Update your personal admin account details"
      >
        {/* Avatar */}
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center text-primary text-2xl font-bold">
            S
          </div>
          <div>
            <Button variant="outline" size="sm">
              Change Photo
            </Button>
            <p className="text-xs text-muted-foreground mt-1.5">
              JPG, PNG up to 2MB
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <Label>Full Name</Label>
            <Input
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />
          </div>
          <div className="space-y-1.5">
            <Label>Role</Label>
            <Input
              value={form.role}
              disabled
              className="opacity-60 cursor-not-allowed"
            />
          </div>
          <div className="space-y-1.5">
            <Label>Email</Label>
            <Input
              type="email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            />
          </div>
          <div className="space-y-1.5">
            <Label>Phone</Label>
            <Input
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
            />
          </div>
        </div>

        <div className="flex justify-end">
          <Button size="sm" className="gap-2">
            <Save className="w-4 h-4" /> Save Changes
          </Button>
        </div>
      </Section>
    </div>
  );
}

// ─── Notifications Tab ────────────────────────────────────────
function NotificationsTab() {
  const [settings, setSettings] = useState({
    newDriver: true,
    tripCompleted: true,
    tripCancelled: true,
    driverSuspended: true,
    licenseExpiry: true,
    weeklyReport: false,
    monthlyReport: true,
    emailAlerts: true,
    smsAlerts: false,
  });

  const toggle = (key: keyof typeof settings) =>
    setSettings((prev) => ({ ...prev, [key]: !prev[key] }));

  const rows = [
    {
      key: "newDriver",
      label: "New Driver Registered",
      desc: "When a new driver joins the platform",
    },
    {
      key: "tripCompleted",
      label: "Trip Completed",
      desc: "When a driver completes a trip",
    },
    {
      key: "tripCancelled",
      label: "Trip Cancelled",
      desc: "When a trip is cancelled",
    },
    {
      key: "driverSuspended",
      label: "Driver Suspended",
      desc: "When a driver account is suspended",
    },
    {
      key: "licenseExpiry",
      label: "License Expiry Alert",
      desc: "When a driver license is about to expire",
    },
    {
      key: "weeklyReport",
      label: "Weekly Report",
      desc: "Receive weekly performance summary",
    },
    {
      key: "monthlyReport",
      label: "Monthly Report",
      desc: "Receive monthly analytics report",
    },
  ];

  return (
    <div className="space-y-5">
      <Section
        title="Notification Preferences"
        description="Choose what alerts you want to receive"
      >
        <div className="space-y-1 divide-y divide-border">
          {rows.map((row) => (
            <div
              key={row.key}
              className="flex items-center justify-between py-3"
            >
              <div>
                <p className="text-sm font-medium text-foreground">
                  {row.label}
                </p>
                <p className="text-xs text-muted-foreground">{row.desc}</p>
              </div>
              <Toggle
                enabled={settings[row.key as keyof typeof settings]}
                onChange={() => toggle(row.key as keyof typeof settings)}
              />
            </div>
          ))}
        </div>
      </Section>

      <Section
        title="Delivery Channels"
        description="How you want to receive notifications"
      >
        <div className="space-y-1 divide-y divide-border">
          {[
            {
              key: "emailAlerts",
              label: "Email Alerts",
              desc: "Receive notifications via email",
            },
            {
              key: "smsAlerts",
              label: "SMS Alerts",
              desc: "Receive notifications via SMS",
            },
          ].map((row) => (
            <div
              key={row.key}
              className="flex items-center justify-between py-3"
            >
              <div>
                <p className="text-sm font-medium text-foreground">
                  {row.label}
                </p>
                <p className="text-xs text-muted-foreground">{row.desc}</p>
              </div>
              <Toggle
                enabled={settings[row.key as keyof typeof settings]}
                onChange={() => toggle(row.key as keyof typeof settings)}
              />
            </div>
          ))}
        </div>
      </Section>
    </div>
  );
}

// ─── Security Tab ─────────────────────────────────────────────
function SecurityTab() {
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [sessions] = useState([
    {
      device: "Chrome · Windows 11",
      location: "Ahmedabad, IN",
      time: "Active now",
      current: true,
    },
    {
      device: "Safari · iPhone 15",
      location: "Surat, IN",
      time: "2 hours ago",
      current: false,
    },
    {
      device: "Firefox · MacOS",
      location: "Mumbai, IN",
      time: "3 days ago",
      current: false,
    },
  ]);

  return (
    <div className="space-y-5">
      {/* Change Password */}
      <Section
        title="Change Password"
        description="Update your account password"
      >
        <div className="space-y-4 max-w-sm">
          {[
            {
              label: "Current Password",
              show: showCurrent,
              toggle: () => setShowCurrent(!showCurrent),
            },
            {
              label: "New Password",
              show: showNew,
              toggle: () => setShowNew(!showNew),
            },
            {
              label: "Confirm Password",
              show: showConfirm,
              toggle: () => setShowConfirm(!showConfirm),
            },
          ].map((field) => (
            <div key={field.label} className="space-y-1.5">
              <Label>{field.label}</Label>
              <div className="relative">
                <Input
                  type={field.show ? "text" : "password"}
                  placeholder="••••••••"
                  className="pr-10"
                />
                <button
                  type="button"
                  onClick={field.toggle}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {field.show ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>
          ))}
        </div>
        <div className="flex justify-end">
          <Button size="sm" className="gap-2">
            <Save className="w-4 h-4" /> Update Password
          </Button>
        </div>
      </Section>

      {/* Active Sessions */}
      <Section
        title="Active Sessions"
        description="Devices currently signed in to your account"
      >
        <div className="space-y-2">
          {sessions.map((session, i) => (
            <div
              key={i}
              className="flex items-center justify-between p-3 rounded-lg bg-muted/50 border border-border"
            >
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-muted flex items-center justify-center">
                  <Shield className="w-4 h-4 text-muted-foreground" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-medium text-foreground">
                      {session.device}
                    </p>
                    {session.current && (
                      <Badge
                        variant="outline"
                        className="text-xs bg-green-500/10 text-green-600 border-green-500/20"
                      >
                        Current
                      </Badge>
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {session.location} · {session.time}
                  </p>
                </div>
              </div>
              {!session.current && (
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-red-500 hover:text-red-500 hover:bg-red-500/10 text-xs"
                >
                  Revoke
                </Button>
              )}
            </div>
          ))}
        </div>
      </Section>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────
export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState<Tab>("company");

  const tabContent: Record<Tab, React.ReactNode> = {
    company: <CompanyTab />,
    profile: <ProfileTab />,
    notifications: <NotificationsTab />,
    security: <SecurityTab />,
  };

  return (
    <div className="space-y-6 ">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-foreground">Settings</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Manage your account and platform preferences
        </p>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-1 bg-muted p-1 rounded-lg w-fit overflow-x-auto">
        {TABS.map((tab) => (
          <button
            key={tab.value}
            onClick={() => setActiveTab(tab.value)}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-xs font-medium transition-colors whitespace-nowrap ${
              activeTab === tab.value
                ? "bg-background text-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            {tab.icon}
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      {tabContent[activeTab]}
    </div>
  );
}
