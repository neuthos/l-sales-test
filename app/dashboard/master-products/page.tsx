"use client";

import {ProtectedRoute} from "@/components/ProtectedRoute";


export default function MasterProducts() {
  return (
    <ProtectedRoute>
    <div className="flex flex-1 flex-col gap-4 p-4">
      <h1 className="text-2xl font-bold">Product Master</h1>
      <p>Hello World - This is the Product Master page.</p>
    </div>
      </ProtectedRoute>
  );
}
