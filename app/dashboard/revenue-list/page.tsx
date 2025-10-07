"use client";

import {ProtectedRoute} from "@/components/ProtectedRoute";


export default function RevenueList() {
  return (
    <ProtectedRoute>
    <div className="flex flex-1 flex-col gap-4 p-4">
      <h1 className="text-2xl font-bold">Revenue Management</h1>
      <p>Hello World - This is the Revenue Management page.</p>
    </div>
      </ProtectedRoute>
  );
}
