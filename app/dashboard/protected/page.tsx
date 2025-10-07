"use client";

import { ProtectedRoute } from "@/components/ProtectedRoute";

export default function ProtectedPage() {
  return (
    <ProtectedRoute>
      <div className="flex flex-col gap-4">
        <h1 className="text-2xl font-bold">Protected Page</h1>
        <p className="text-muted-foreground">
          This page should not be accessible even when logged in as admin/admin
          because it has &quot;none&quot; permission level.
        </p>
        <p className="text-muted-foreground">
          If you can see this, something is wrong with the permission system!
        </p>
      </div>
    </ProtectedRoute>
  );
}
