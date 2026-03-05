"use client";

import { Card, CardContent } from "@/components/ui/card";

export default function AdminCitiesPage() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl font-heading font-bold text-foreground">City Pages</h1>
        <p className="text-sm text-muted-foreground">Manage city landing pages and SEO content.</p>
      </div>

      <Card>
        <CardContent className="flex flex-col items-center justify-center p-20 text-center gap-4">
          <span className="text-5xl">🚧</span>
          <div className="flex flex-col gap-1">
            <h3 className="text-xl font-bold font-heading">Under Construction</h3>
            <p className="text-sm text-muted-foreground max-w-sm">The city management interface is being built. You can still manage cities directly in the Supabase dashboard in the meantime.</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
