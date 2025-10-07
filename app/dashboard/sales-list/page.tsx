"use client";

import { ProtectedRoute } from "@/components/ProtectedRoute";

export default function SalesList() {
  return (
    <ProtectedRoute>
      <div className="flex flex-1 flex-col gap-4 p-4">
        <h1 className="text-2xl font-bold">List of Projects</h1>
        <p>Hello World - This is the List of Projects page.</p>
      </div>
    </ProtectedRoute>
  );
}
