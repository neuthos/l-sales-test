import {
  Database,
  DollarSign,
  FileText,
  Gauge,
  Handshake,
  Settings,
  Target,
} from "lucide-react";

import type { MenuConfig } from "@/lib/types/menu";

export const menuConfig: MenuConfig = {
  items: [
    {
      title: "Dashboard",
      icon: Gauge,
      href: "/dashboard",
      environments: "all",
    },
    {
      title: "Budget Management",
      icon: Target,
      href: "/dashboard/budget",
      environments: "all",
    },
    {
      title: "Sales Management",
      icon: Handshake,
      environments: "all",
      children: [
        {
          title: "Proposal List",
          href: "/dashboard/proposals-list",
        },
        {
          title: "List of Projects",
          href: "/dashboard/sales-list",
        },
        {
          title: "Activity History",
          href: "/dashboard/activities-history",
        },
      ],
    },
    {
      title: "Order Management",
      icon: FileText,
      environments: "all",
      children: [
        {
          title: "Order List and Summary",
          href: "/dashboard/orders-list",
        },
        {
          title: "Shipping Registration",
          href: "/dashboard/shipment",
        },
        {
          title: "Exhibition Order Management",
          href: "/dashboard/exhibition-orders-management",
        },
      ],
    },
    {
      title: "Revenue Management",
      icon: DollarSign,
      href: "/dashboard/revenue-list",
      environments: "all",
    },
    {
      title: "Master Management",
      icon: Database,
      environments: "all",
      children: [
        {
          title: "Product Master",
          href: "/dashboard/master-products",
        },
        {
          title: "Customer Master",
          href: "/dashboard/master-clients",
        },
        {
          title: "Material Master",
          href: "/dashboard/master-materials",
        },
        {
          title: "Image Master",
          href: "/dashboard/master-images",
        },
      ],
    },
    {
      title: "Settings",
      icon: Settings,
      environments: "all",
      children: [
        {
          title: "Usage Settings",
          children: [
            {
              title: "User Management",
              href: "/dashboard/settings-users",
            },
            {
              title: "User Permission Settings",
              href: "/dashboard/settings-permissions",
            },
            {
              title: "Sales Management Settings",
              href: "/dashboard/settings-sales",
            },
            {
              title: "Report Output Settings",
              href: "/dashboard/settings-reports",
            },
          ],
        },
        {
          title: "Management",
          children: [
            {
              title: "Approval Management",
              href: "/dashboard/settings-approvals",
            },
            {
              title: "Contract Information",
              href: "/dashboard/settings-contract",
            },
          ],
        },
      ],
    },
  ],
};
