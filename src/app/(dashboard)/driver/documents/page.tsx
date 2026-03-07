"use client";

import { useState } from "react";
import {
  FileText,
  Upload,
  AlertTriangle,
  CheckCircle2,
  Clock,
  Eye,
  Trash2,
  Plus,
  X,
  Calendar,
  Shield,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";

// ─── Types ────────────────────────────────────────────────────
type DocStatus = "valid" | "expiring" | "expired" | "pending";

interface Document {
  id: string;
  name: string;
  category: string;
  fileType: string;
  fileSize: string;
  uploadedAt: string;
  expiry: string | null;
  status: DocStatus;
}

// ─── Dummy Data ───────────────────────────────────────────────
const DOCUMENTS: Document[] = [
  {
    id: "1",
    name: "Driving License",
    category: "Identity",
    fileType: "PDF",
    fileSize: "1.2 MB",
    uploadedAt: "Jan 12, 2025",
    expiry: "Dec 31, 2027",
    status: "valid",
  },
  {
    id: "2",
    name: "Vehicle Insurance",
    category: "Vehicle",
    fileType: "PDF",
    fileSize: "890 KB",
    uploadedAt: "Feb 5, 2025",
    expiry: "Jun 30, 2026",
    status: "expiring",
  },
  {
    id: "3",
    name: "RC Book",
    category: "Vehicle",
    fileType: "PDF",
    fileSize: "2.1 MB",
    uploadedAt: "Jan 12, 2025",
    expiry: null,
    status: "valid",
  },
  {
    id: "4",
    name: "PUC Certificate",
    category: "Vehicle",
    fileType: "JPG",
    fileSize: "540 KB",
    uploadedAt: "Mar 1, 2025",
    expiry: "Apr 30, 2026",
    status: "valid",
  },
  {
    id: "5",
    name: "Aadhaar Card",
    category: "Identity",
    fileType: "PDF",
    fileSize: "720 KB",
    uploadedAt: "Jan 12, 2025",
    expiry: null,
    status: "valid",
  },
  {
    id: "6",
    name: "Fitness Certificate",
    category: "Vehicle",
    fileType: "PDF",
    fileSize: "1.5 MB",
    uploadedAt: "Dec 10, 2024",
    expiry: "Feb 28, 2025",
    status: "expired",
  },
  {
    id: "7",
    name: "Police Verification",
    category: "Background",
    fileType: "PDF",
    fileSize: "—",
    uploadedAt: "—",
    expiry: null,
    status: "pending",
  },
];

// ─── Required Documents List ──────────────────────────────────
const REQUIRED_DOCS = [
  "Driving License",
  "Vehicle Insurance",
  "RC Book",
  "PUC Certificate",
  "Aadhaar Card",
  "Fitness Certificate",
  "Police Verification",
];

// ─── Status Config ────────────────────────────────────────────
const statusConfig: Record<
  DocStatus,
  {
    label: string;
    badge: string;
    icon: React.ReactNode;
  }
> = {
  valid: {
    label: "Valid",
    badge: "bg-green-500/10 text-green-600 border-green-500/20",
    icon: <CheckCircle2 className="w-4 h-4 text-green-500" />,
  },
  expiring: {
    label: "Expiring Soon",
    badge: "bg-orange-500/10 text-orange-600 border-orange-500/20",
    icon: <AlertTriangle className="w-4 h-4 text-orange-500" />,
  },
  expired: {
    label: "Expired",
    badge: "bg-red-500/10 text-red-600 border-red-500/20",
    icon: <AlertTriangle className="w-4 h-4 text-red-500" />,
  },
  pending: {
    label: "Pending Upload",
    badge: "bg-muted text-muted-foreground border-border",
    icon: <Clock className="w-4 h-4 text-muted-foreground" />,
  },
};

// ─── Category Tabs ────────────────────────────────────────────
const CATEGORIES = ["All", "Identity", "Vehicle", "Background"] as const;
type Category = (typeof CATEGORIES)[number];

// ─── Upload Modal ─────────────────────────────────────────────
function UploadModal({ onClose }: { onClose: () => void }) {
  const [dragging, setDragging] = useState(false);
  const [file, setFile] = useState<File | null>(null);

  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Upload Document</DialogTitle>
        </DialogHeader>

        <div className="space-y-4 py-2">
          {/* Doc Type */}
          <div className="space-y-1.5">
            <Label>Document Type</Label>
            <select className="w-full px-3 py-2 bg-background border border-border rounded-lg text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30">
              {REQUIRED_DOCS.map((doc) => (
                <option key={doc}>{doc}</option>
              ))}
            </select>
          </div>

          {/* Expiry */}
          <div className="space-y-1.5">
            <Label>
              Expiry Date{" "}
              <span className="text-muted-foreground">(optional)</span>
            </Label>
            <div className="relative">
              <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input type="date" className="pl-9" />
            </div>
          </div>

          {/* Drop Zone */}
          <div
            onDragOver={(e) => {
              e.preventDefault();
              setDragging(true);
            }}
            onDragLeave={() => setDragging(false)}
            onDrop={(e) => {
              e.preventDefault();
              setDragging(false);
              const dropped = e.dataTransfer.files[0];
              if (dropped) setFile(dropped);
            }}
            className={cn(
              "border-2 border-dashed rounded-xl p-8 text-center transition-colors cursor-pointer",
              dragging
                ? "border-primary bg-primary/5"
                : "border-border hover:border-muted-foreground/40",
            )}
            onClick={() => document.getElementById("file-input")?.click()}
          >
            <input
              id="file-input"
              type="file"
              className="hidden"
              accept=".pdf,.jpg,.jpeg,.png"
              onChange={(e) => setFile(e.target.files?.[0] ?? null)}
            />

            {file ? (
              <div className="flex items-center justify-center gap-3">
                <FileText className="w-8 h-8 text-primary" />
                <div className="text-left">
                  <p className="text-sm font-medium text-foreground">
                    {file.name}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {(file.size / 1024).toFixed(0)} KB
                  </p>
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setFile(null);
                  }}
                  className="ml-auto text-muted-foreground hover:text-foreground"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <>
                <Upload className="w-8 h-8 text-muted-foreground mx-auto mb-3" />
                <p className="text-sm font-medium text-foreground">
                  Drop file here or click to browse
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  PDF, JPG, PNG up to 5MB
                </p>
              </>
            )}
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button disabled={!file} className="gap-2">
            <Upload className="w-4 h-4" /> Upload Document
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

// ─── Document Card ────────────────────────────────────────────
function DocCard({ doc }: { doc: Document }) {
  const config = statusConfig[doc.status];

  return (
    <div
      className={cn(
        "bg-card border rounded-xl p-4 space-y-3 transition-colors",
        doc.status === "expired"
          ? "border-red-500/30"
          : doc.status === "expiring"
            ? "border-orange-500/30"
            : "border-border",
      )}
    >
      {/* Header */}
      <div className="flex items-start justify-between gap-2">
        <div className="flex items-center gap-3">
          <div
            className={cn(
              "w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0",
              doc.status === "pending" ? "bg-muted" : "bg-primary/10",
            )}
          >
            {doc.status === "pending" ? (
              <Clock className="w-5 h-5 text-muted-foreground" />
            ) : (
              <FileText className="w-5 h-5 text-primary" />
            )}
          </div>
          <div>
            <p className="text-sm font-semibold text-foreground">{doc.name}</p>
            <p className="text-xs text-muted-foreground">{doc.category}</p>
          </div>
        </div>
        <Badge
          variant="outline"
          className={`text-xs capitalize flex-shrink-0 ${config.badge}`}
        >
          {config.label}
        </Badge>
      </div>

      {/* Details */}
      {doc.status !== "pending" && (
        <div className="grid grid-cols-2 gap-2 text-xs text-muted-foreground">
          <div className="flex items-center gap-1.5">
            <FileText className="w-3.5 h-3.5" />
            {doc.fileType} · {doc.fileSize}
          </div>
          <div className="flex items-center gap-1.5">
            <Shield className="w-3.5 h-3.5" />
            {doc.uploadedAt}
          </div>
          {doc.expiry && (
            <div
              className={cn(
                "flex items-center gap-1.5 col-span-2",
                doc.status === "expired"
                  ? "text-red-500"
                  : doc.status === "expiring"
                    ? "text-orange-500"
                    : "",
              )}
            >
              <Calendar className="w-3.5 h-3.5" />
              Expires: {doc.expiry}
            </div>
          )}
        </div>
      )}

      {/* Expiring Alert */}
      {doc.status === "expiring" && (
        <div className="flex items-center gap-2 bg-orange-500/10 border border-orange-500/20 rounded-lg px-3 py-2">
          <AlertTriangle className="w-3.5 h-3.5 text-orange-500 flex-shrink-0" />
          <p className="text-xs text-orange-600">
            Expires soon — renew before it expires
          </p>
        </div>
      )}

      {/* Expired Alert */}
      {doc.status === "expired" && (
        <div className="flex items-center gap-2 bg-red-500/10 border border-red-500/20 rounded-lg px-3 py-2">
          <AlertTriangle className="w-3.5 h-3.5 text-red-500 flex-shrink-0" />
          <p className="text-xs text-red-600">
            Document expired — upload renewed copy
          </p>
        </div>
      )}

      {/* Actions */}
      <div className="flex items-center gap-2 pt-1">
        {doc.status === "pending" ? (
          <Button
            size="sm"
            variant="outline"
            className="flex-1 gap-1.5 text-xs"
          >
            <Upload className="w-3.5 h-3.5" /> Upload Now
          </Button>
        ) : (
          <>
            <Button
              size="sm"
              variant="outline"
              className="flex-1 gap-1.5 text-xs"
            >
              <Eye className="w-3.5 h-3.5" /> View
            </Button>
            <Button
              size="sm"
              variant="outline"
              className="flex-1 gap-1.5 text-xs"
            >
              <Upload className="w-3.5 h-3.5" /> Re-upload
            </Button>
            <Button
              size="sm"
              variant="ghost"
              className="text-red-500 hover:text-red-500 hover:bg-red-500/10 px-2"
            >
              <Trash2 className="w-3.5 h-3.5" />
            </Button>
          </>
        )}
      </div>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────
export default function DocumentsPage() {
  const [category, setCategory] = useState<Category>("All");
  const [showUpload, setShowUpload] = useState(false);

  const validCount = DOCUMENTS.filter((d) => d.status === "valid").length;
  const expiringCount = DOCUMENTS.filter((d) => d.status === "expiring").length;
  const expiredCount = DOCUMENTS.filter((d) => d.status === "expired").length;
  const pendingCount = DOCUMENTS.filter((d) => d.status === "pending").length;

  const filtered =
    category === "All"
      ? DOCUMENTS
      : DOCUMENTS.filter((d) => d.category === category);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Documents</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Manage your driving and vehicle documents
          </p>
        </div>
        <Button onClick={() => setShowUpload(true)} size="sm" className="gap-2">
          <Plus className="w-4 h-4" />
          <span className="hidden sm:block">Upload Document</span>
        </Button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {[
          {
            label: "Valid",
            value: validCount,
            color: "text-green-600",
            bg: "bg-green-500/10",
            border: "border-green-500/20",
          },
          {
            label: "Expiring Soon",
            value: expiringCount,
            color: "text-orange-600",
            bg: "bg-orange-500/10",
            border: "border-orange-500/20",
          },
          {
            label: "Expired",
            value: expiredCount,
            color: "text-red-600",
            bg: "bg-red-500/10",
            border: "border-red-500/20",
          },
          {
            label: "Pending",
            value: pendingCount,
            color: "text-muted-foreground",
            bg: "bg-muted",
            border: "border-border",
          },
        ].map((stat) => (
          <div
            key={stat.label}
            className={`border rounded-xl p-4 ${stat.bg} ${stat.border}`}
          >
            <p className={`text-2xl font-bold ${stat.color}`}>{stat.value}</p>
            <p className="text-xs text-muted-foreground mt-1">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Category Tabs */}
      <div className="flex items-center gap-1 bg-muted p-1 rounded-lg w-fit">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => setCategory(cat)}
            className={cn(
              "px-3 py-1.5 rounded-md text-xs font-medium transition-colors",
              category === cat
                ? "bg-background text-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground",
            )}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Documents Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filtered.map((doc) => (
          <DocCard key={doc.id} doc={doc} />
        ))}
      </div>

      {/* Upload Modal */}
      {showUpload && <UploadModal onClose={() => setShowUpload(false)} />}
    </div>
  );
}
