"use client";

import { ProtectedRoute } from "@/components/ProtectedRoute";

export default function OrdersList() {
  return (
    <ProtectedRoute>
      <div className="flex flex-1 flex-col gap-4 p-4">
        <h1 className="text-2xl font-bold">Order List and Summary</h1>
        <p>Hello World - This is the Order List and Summary page.</p>
      </div>
    </ProtectedRoute>
  );
}
