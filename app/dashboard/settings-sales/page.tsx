"use client";

import {ProtectedRoute} from "@/components/ProtectedRoute";


export default function SettingsSales() {
  return (
    <ProtectedRoute>
    <div className="flex flex-1 flex-col gap-4 p-4">
      <h1 className="text-2xl font-bold">Sales Management Settings</h1>
      <p>Hello World - This is the Sales Management Settings page.</p>
    </div>
      </ProtectedRoute>
  );
}
