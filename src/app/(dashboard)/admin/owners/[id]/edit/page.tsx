"use client";

import { useParams, useRouter } from "next/navigation";
import { ArrowLeft, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useOwner } from "@/services/owners.service";
import { EditOwnerForm } from "../../edit-owner-form";

export default function EditOwnerPage() {
  const params = useParams();
  const router = useRouter();
  const ownerId = params.id as string;

  const { data: owner, isLoading, error } = useOwner(ownerId);

  const handleSuccess = () => {
    router.push(`/admin/owners/${ownerId}`);
  };

  const handleBack = () => {
    router.back();
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-96">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  if (error || !owner) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-center">
          <p className="text-red-500 mb-2">Failed to load owner</p>
          <p className="text-sm text-muted-foreground">
            {error instanceof Error ? error.message : "Owner not found"}
          </p>
          <Button onClick={handleBack} className="mt-4">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Go Back
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={handleBack}>
          <ArrowLeft className="w-4 h-4" />
        </Button>
        <div>
          <h1 className="text-3xl font-bold">Edit Owner</h1>
          <p className="text-muted-foreground mt-1">
            Update {owner.ownerProfile?.companyName || owner.email} information
          </p>
        </div>
      </div>

      {/* Edit Form */}
      <div className="rounded-lg border bg-card p-6 max-w-2xl">
        <EditOwnerForm owner={owner} onSuccess={handleSuccess} />
      </div>
    </div>
  );
}
