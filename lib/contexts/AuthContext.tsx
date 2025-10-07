"use client";

import { createContext, useContext, useEffect, useState } from "react";
import Cookies from "js-cookie";

import type { ReactNode } from "react";
import type {
  AuthState,
  PermissionLevel,
  Permissions,
} from "@/lib/types/permission";

interface AuthCookieData {
  isAuthenticated: boolean;
  permissions: Permissions;
}

interface AuthContextType extends AuthState {
  login: () => boolean;
  logout: () => void;
  checkPermission: (route: string) => PermissionLevel;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Default permissions when logged in as admin/admin
const getDefaultPermissions = (): Permissions => ({
  "/dashboard": "approval",
  "/dashboard/budget": "approval",
  "/dashboard/proposals-list": "approval",
  "/dashboard/sales-list": "approval",
  "/dashboard/activities-history": "approval",
  "/dashboard/orders-list": "approval",
  "/dashboard/shipment": "approval",
  "/dashboard/exhibition-orders-management": "approval",
  "/dashboard/revenue-list": "approval",
  "/dashboard/master-products": "approval",
  "/dashboard/master-clients": "approval",
  "/dashboard/master-materials": "approval",
  "/dashboard/master-images": "approval",
  "/dashboard/settings-users": "approval",
  "/dashboard/settings-permissions": "approval",
  "/dashboard/settings-sales": "approval",
  "/dashboard/settings-reports": "approval",
  "/dashboard/settings-approvals": "approval",
  "/dashboard/settings-contract": "approval",
  "/dashboard/protected": "none", // Special case: no access even when logged in
});

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [permissions, setPermissions] = useState<Permissions>({});

  // Load auth state from cookies on mount
  useEffect(() => {
    const savedAuth = Cookies.get("l-sales-auth");
    if (savedAuth) {
      try {
        const authData = JSON.parse(savedAuth) as AuthCookieData;
        setIsAuthenticated(authData.isAuthenticated ?? false);
        setPermissions(authData.permissions ?? {});
      } catch {
        // Invalid data, clear it
        Cookies.remove("l-sales-auth");
      }
    }
  }, []);

  // Save auth state to cookies whenever it changes
  useEffect(() => {
    if (isAuthenticated) {
      Cookies.set(
        "l-sales-auth",
        JSON.stringify({ isAuthenticated, permissions }),
        { expires: 7 } // 7 days
      );
    } else {
      Cookies.remove("l-sales-auth");
    }
  }, [isAuthenticated, permissions]);

  const login = (): boolean => {
    if (typeof window === "undefined") return false;

    const username = window.prompt("Username:");
    if (!username) return false;

    const password = window.prompt("Password:");
    if (!password) return false;

    // Simple validation: admin/admin
    if (username === "admin" && password === "admin") {
      setIsAuthenticated(true);
      setPermissions(getDefaultPermissions());
      return true;
    }

    alert("Invalid username or password!");
    return false;
  };

  const logout = () => {
    setIsAuthenticated(false);
    setPermissions({});
    Cookies.remove("l-sales-auth");
  };

  const checkPermission = (route: string): PermissionLevel => {
    if (!isAuthenticated) return "none";
    return permissions[route] ?? "none";
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        permissions,
        login,
        logout,
        checkPermission,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
