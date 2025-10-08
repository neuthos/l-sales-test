"use client";

import { useEffect, useMemo, useState } from "react";

export interface TenantConfig {
  tenantId: string;
  environment: string;
  subdomain?: string;
}

export function useTenant(): TenantConfig {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const tenant = useMemo(() => {
    // Always return default for SSR and initial client render
    if (!mounted || typeof window === "undefined") {
      return {
        tenantId: "default",
        environment: "development",
      };
    }

    // Get tenant from subdomain or URL
    const hostname = window.location.hostname;
    const subdomain = hostname.split(".")[0];

    // Detect environment from hostname or ENV variable
    let environment = process.env.NEXT_PUBLIC_ENVIRONMENT ?? "development";

    // You can customize this logic based on your needs
    if (hostname.includes("localhost") ?? hostname.includes("127.0.0.1")) {
      environment = "development";
    } else if (hostname.includes("staging")) {
      environment = "staging";
    } else if (hostname.includes("prod") ?? !hostname.includes("dev")) {
      environment = "production";
    }

    // Determine tenantId from subdomain or path
    // You can customize this based on your multi-tenant strategy
    const tenantId =
      subdomain !== "localhost" && subdomain !== "www" ? subdomain : "default";

    return {
      tenantId,
      environment,
      subdomain: subdomain !== "localhost" ? subdomain : undefined,
    };
  }, [mounted]);

  return tenant;
}
