"use client";

import {ProtectedRoute} from "@/components/ProtectedRoute";


export default function SettingsApprovals() {
  return (
    <ProtectedRoute>
    <div className="flex flex-1 flex-col gap-4 p-4">
      <h1 className="text-2xl font-bold">Approval Management</h1>
      <p>Hello World - This is the Approval Management page.</p>
    </div>
      </ProtectedRoute>
  );
}
