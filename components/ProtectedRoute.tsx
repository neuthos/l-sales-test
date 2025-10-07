"use client";

import {useEffect} from "react";
import {usePathname, useRouter} from "next/navigation";
import {useAuth} from "@/lib/contexts/AuthContext";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export function ProtectedRoute({children}: ProtectedRouteProps) {
  const {isAuthenticated, checkPermission} = useAuth();
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated) {
      router.replace("/401");
      return;
    }

    const permission = checkPermission(pathname);
    if (permission === "none") {
      router.replace("/403");
      return;
    }
  }, [isAuthenticated, pathname, checkPermission, router]);

  if (!isAuthenticated) {
    return null;
  }

  const permission = checkPermission(pathname);
  if (permission === "none") {
    return null;
  }

  return <>{children}</>;
}
