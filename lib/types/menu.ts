import {LucideIcon} from "lucide-react";
import {TranslationKey} from "@/lib/translations";

export type TenantEnvironment = "all" | "production" | "staging" | "development" | string[];

export interface MenuItem {
  title: TranslationKey;
  icon?: LucideIcon;
  href?: string;
  badge?: number;
  children?: MenuItem[];
  environments?: TenantEnvironment; // Which environments this menu should appear in
}

export interface MenuConfig {
  items: MenuItem[];
}
