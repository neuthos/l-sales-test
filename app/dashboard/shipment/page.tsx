"use client";

import {ProtectedRoute} from "@/components/ProtectedRoute";

export default function Shipment() {
  return (
    <ProtectedRoute>
      <div className="flex flex-1 flex-col gap-4 p-4">
        <h1 className="text-2xl font-bold">Shipping Registration</h1>
        <p>Hello World - This is the Shipping Registration page.</p>
      </div>
    </ProtectedRoute>
  );
}
