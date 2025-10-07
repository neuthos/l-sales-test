"use client";

import { ProtectedRoute } from "@/components/ProtectedRoute";

export default function Budget() {
  return (
    <ProtectedRoute>
      <div className="flex flex-1 flex-col gap-4 p-4">
        <h1 className="text-2xl font-bold">Budget Management</h1>
        <p>Hello World - This is the Budget Management page.</p>
      </div>
    </ProtectedRoute>
  );
}
