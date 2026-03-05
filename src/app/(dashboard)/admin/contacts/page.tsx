"use client";

import { useEffect, useState } from "react";
import { m } from "motion/react";
import {
  Search,
  RefreshCw,
  MessageSquare,
  CheckCircle2,
  Clock,
  Reply,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { formatDistanceToNow } from "date-fns";

interface Contact {
  id: string;
  name: string;
  phone: string;
  email?: string;
  subject: string;
  message: string;
  status: "new" | "read" | "replied";
  created_at: string;
}

const STATUS_TABS = [
  { value: "", label: "All" },
  { value: "new", label: "New" },
  { value: "read", label: "Read" },
  { value: "replied", label: "Replied" },
];

const SUBJECT_LABELS: Record<string, string> = {
  booking: "🚗 Taxi Booking",
  package: "📦 Tour Package",
  driver: "🚖 Driver Registration",
  other: "💬 Other",
};

export default function AdminContactsPage() {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState("new");
  const [search, setSearch] = useState("");
  const [updating, setUpdating] = useState<string | null>(null);

  const fetchContacts = async () => {
    setLoading(true);
    try {
      const res = await fetch(
        `/api/contact${statusFilter ? `?status=${statusFilter}` : ""}`,
      );
      const { data } = await res.json();
      setContacts(data ?? []);
    } catch {
      setContacts([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchContacts();
  }, [statusFilter]);

  const updateStatus = async (id: string, status: "read" | "replied") => {
    setUpdating(id);
    try {
      await fetch(`/api/contact/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });
      toast.success(`Marked as ${status}`);
      fetchContacts();
    } catch {
      toast.error("Failed to update");
    } finally {
      setUpdating(null);
    }
  };

  const filtered = contacts.filter((c) =>
    search
      ? [c.name, c.phone, c.email ?? "", c.message].some((f) =>
          f.toLowerCase().includes(search.toLowerCase()),
        )
      : true,
  );

  const StatusBadge = ({ status }: { status: Contact["status"] }) => {
    const cfg = {
      new: {
        color: "bg-primary/10 text-primary",
        icon: <Clock className="h-3 w-3" />,
        label: "New",
      },
      read: {
        color: "bg-muted text-muted-foreground",
        icon: <CheckCircle2 className="h-3 w-3" />,
        label: "Read",
      },
      replied: {
        color: "bg-green-100 text-green-700",
        icon: <Reply className="h-3 w-3" />,
        label: "Replied",
      },
    };
    const { color, icon, label } = cfg[status];
    return (
      <span
        className={cn(
          "inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-semibold",
          color,
        )}
      >
        {icon}
        {label}
      </span>
    );
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <div>
          <h1 className="text-2xl font-heading font-bold text-foreground">
            Contact Inbox
          </h1>
          <p className="text-sm text-muted-foreground">
            {filtered.length} message{filtered.length !== 1 ? "s" : ""}
          </p>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={fetchContacts}
          className="gap-2 rounded-xl"
        >
          <RefreshCw className="h-4 w-4" /> Refresh
        </Button>
      </div>

      <div className="flex flex-wrap gap-2 items-center">
        <div className="flex rounded-xl border border-border overflow-hidden">
          {STATUS_TABS.map((tab) => (
            <button
              key={tab.value}
              onClick={() => setStatusFilter(tab.value)}
              className={cn(
                "px-3 py-1.5 text-sm font-medium transition-colors",
                statusFilter === tab.value
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:bg-muted/50",
              )}
            >
              {tab.label}
            </button>
          ))}
        </div>
        <div className="relative flex-1 min-w-[200px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
          <Input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search messages..."
            className="pl-8 h-9 rounded-xl"
          />
        </div>
      </div>

      {loading ? (
        <div className="grid gap-3">
          {[...Array(4)].map((_, i) => (
            <Card key={i} className="animate-pulse h-32" />
          ))}
        </div>
      ) : filtered.length === 0 ? (
        <div className="flex flex-col items-center gap-2 py-16 text-center">
          <span className="text-4xl">📭</span>
          <p className="text-muted-foreground">No messages found</p>
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          {filtered.map((contact, i) => (
            <m.div
              key={contact.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: i * 0.04 }}
            >
              <Card
                className={cn(
                  "hover:border-primary/20 transition-colors",
                  contact.status === "new" && "border-primary/30 bg-primary/2",
                )}
              >
                <CardContent className="p-5 flex flex-col gap-3">
                  <div className="flex items-start justify-between gap-3 flex-wrap">
                    <div className="flex flex-col gap-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="font-semibold text-foreground">
                          {contact.name}
                        </span>
                        <StatusBadge status={contact.status} />
                        <span className="text-xs text-muted-foreground bg-muted/50 rounded-full px-2 py-0.5 border border-border">
                          {SUBJECT_LABELS[contact.subject] ?? contact.subject}
                        </span>
                      </div>
                      <div className="flex gap-3 text-xs text-muted-foreground">
                        <span>📞 {contact.phone}</span>
                        {contact.email && <span>✉️ {contact.email}</span>}
                        <span>
                          🕐{" "}
                          {formatDistanceToNow(new Date(contact.created_at), {
                            addSuffix: true,
                          })}
                        </span>
                      </div>
                    </div>
                    <div className="flex gap-2 shrink-0">
                      {contact.status === "new" && (
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => updateStatus(contact.id, "read")}
                          disabled={updating === contact.id}
                          className="gap-1 rounded-xl text-xs"
                        >
                          <CheckCircle2 className="h-3 w-3" /> Mark Read
                        </Button>
                      )}
                      {contact.status !== "replied" && (
                        <Button
                          size="sm"
                          onClick={() => updateStatus(contact.id, "replied")}
                          disabled={updating === contact.id}
                          className="gap-1 rounded-xl text-xs"
                        >
                          <Reply className="h-3 w-3" /> Mark Replied
                        </Button>
                      )}
                      <Button
                        size="sm"
                        asChild
                        variant="outline"
                        className="gap-1 rounded-xl text-xs bg-green-50 border-green-200 text-green-700 hover:bg-green-100"
                      >
                        <a
                          href={`https://wa.me/91${contact.phone}?text=Hi ${contact.name}! This is Sarthigo regarding your inquiry.`}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          💬 WhatsApp
                        </a>
                      </Button>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed border-t border-border pt-3">
                    {contact.message}
                  </p>
                </CardContent>
              </Card>
            </m.div>
          ))}
        </div>
      )}
    </div>
  );
}
