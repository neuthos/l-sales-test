"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronRight, LayoutDashboard } from "lucide-react";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/Collapsible";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/Sidebar";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/Tooltip";
import { useTenant } from "@/hooks/useTenant";
import { menuConfig } from "@/lib/config/MenuConfig";
import { useAuth } from "@/lib/contexts/AuthContext";
import { useTranslation } from "@/lib/contexts/TranslationContext";

import type { TranslationKey } from "@/lib/translations";
import type { MenuItem } from "@/lib/types/menu";

function shouldShowMenuItem(item: MenuItem, environment: string): boolean {
  if (!item.environments ?? item.environments === "all") {
    return true;
  }

  if (Array.isArray(item.environments)) {
    return item.environments.includes(environment);
  }

  return item.environments === environment;
}

function hasPermission(
  item: MenuItem,
  checkPermission: (route: string) => string
): boolean {
  // If item has href, check permission for that route
  if (item.href) {
    return checkPermission(item.href) !== "none";
  }

  // If item has children, check if any child has permission
  if (item.children && item.children.length > 0) {
    return item.children.some((child) => hasPermission(child, checkPermission));
  }

  // Default: show item
  return true;
}

function hasActiveChild(item: MenuItem, pathname: string): boolean {
  if (!item.children) return false;

  return item.children.some((child) => {
    // Check if direct child is active
    if (child.href === pathname) return true;

    // Check nested children (grandchildren)
    if (child.children) {
      return child.children.some((grandchild) => grandchild.href === pathname);
    }

    return false;
  });
}

function renderMenuItem(
  item: MenuItem,
  t: (key: TranslationKey) => string,
  environment: string,
  pathname: string,
  checkPermission: (route: string) => string
): React.ReactNode {
  if (!shouldShowMenuItem(item, environment)) {
    return null;
  }

  if (!hasPermission(item, checkPermission)) {
    return null;
  }

  const hasChildren = item.children && item.children.length > 0;
  const Icon = item.icon;
  const isActive = item.href ? pathname === item.href : false;
  const shouldExpand = hasChildren && hasActiveChild(item, pathname);

  if (hasChildren) {
    return (
      <Collapsible
        key={item.title}
        className="group/collapsible"
        defaultOpen={shouldExpand}
      >
        <SidebarMenuItem>
          <CollapsibleTrigger asChild>
            <SidebarMenuButton tooltip={t(item.title)}>
              {Icon && <Icon />}
              <span className="truncate">{t(item.title)}</span>
              <ChevronRight className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-90" />
            </SidebarMenuButton>
          </CollapsibleTrigger>
          <CollapsibleContent>
            <SidebarMenuSub>
              {item
                .children!.filter(
                  (child) =>
                    shouldShowMenuItem(child, environment) &&
                    hasPermission(child, checkPermission)
                )
                .map((child) => {
                  // Check if this is a nested menu (3rd level)
                  if (child.children && child.children.length > 0) {
                    const shouldExpandNested = hasActiveChild(child, pathname);
                    return (
                      <Collapsible
                        key={child.title}
                        className="group/nested-collapsible"
                        defaultOpen={shouldExpandNested}
                      >
                        <SidebarMenuSubItem>
                          <Tooltip>
                            <CollapsibleTrigger asChild>
                              <TooltipTrigger asChild>
                                <SidebarMenuSubButton>
                                  <span className="truncate">
                                    {t(child.title)}
                                  </span>
                                  <ChevronRight className="ml-auto transition-transform group-data-[state=open]/nested-collapsible:rotate-90" />
                                </SidebarMenuSubButton>
                              </TooltipTrigger>
                            </CollapsibleTrigger>
                            <TooltipContent side="right">
                              {t(child.title)}
                            </TooltipContent>
                          </Tooltip>
                          <CollapsibleContent>
                            <SidebarMenuSub className="pl-4">
                              {child.children
                                .filter(
                                  (subChild) =>
                                    shouldShowMenuItem(subChild, environment) &&
                                    hasPermission(subChild, checkPermission)
                                )
                                .map((subChild) => {
                                  const isSubChildActive =
                                    pathname === subChild.href;
                                  return (
                                    <SidebarMenuSubItem key={subChild.href}>
                                      <Tooltip>
                                        <TooltipTrigger asChild>
                                          <SidebarMenuSubButton
                                            asChild
                                            isActive={isSubChildActive}
                                          >
                                            <Link href={subChild.href ?? "#"}>
                                              <span className="truncate">
                                                {t(subChild.title)}
                                              </span>
                                              {subChild.badge && (
                                                <span className="ml-auto flex h-5 w-5 items-center justify-center rounded-full bg-yellow-500 px-1.5 pb-1 pt-0.5 text-xs font-semibold text-gray-900">
                                                  {subChild.badge}
                                                </span>
                                              )}
                                            </Link>
                                          </SidebarMenuSubButton>
                                        </TooltipTrigger>
                                        <TooltipContent side="right">
                                          {t(subChild.title)}
                                        </TooltipContent>
                                      </Tooltip>
                                    </SidebarMenuSubItem>
                                  );
                                })}
                            </SidebarMenuSub>
                          </CollapsibleContent>
                        </SidebarMenuSubItem>
                      </Collapsible>
                    );
                  }

                  const isChildActive = pathname === child.href;
                  return (
                    <SidebarMenuSubItem key={child.href}>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <SidebarMenuSubButton
                            asChild
                            isActive={isChildActive}
                          >
                            <Link href={child.href ?? "#"}>
                              <span className="truncate">{t(child.title)}</span>
                              {child.badge && (
                                <span className="ml-auto flex h-5 w-5 items-center justify-center rounded-full bg-yellow-500 px-1.5 pb-1 pt-0.5 text-xs font-semibold text-gray-900">
                                  {child.badge}
                                </span>
                              )}
                            </Link>
                          </SidebarMenuSubButton>
                        </TooltipTrigger>
                        <TooltipContent side="right">
                          {t(child.title)}
                        </TooltipContent>
                      </Tooltip>
                    </SidebarMenuSubItem>
                  );
                })}
            </SidebarMenuSub>
          </CollapsibleContent>
        </SidebarMenuItem>
      </Collapsible>
    );
  }

  return (
    <SidebarMenuItem key={item.title}>
      <SidebarMenuButton asChild tooltip={t(item.title)} isActive={isActive}>
        <Link href={item.href ?? "#"}>
          {Icon && <Icon />}
          <span className="truncate">{t(item.title)}</span>
          {item.badge && (
            <span className="ml-auto flex h-5 w-5 items-center justify-center rounded-full bg-yellow-500 px-1.5 pb-1 pt-0.5 text-xs font-semibold text-gray-900">
              {item.badge}
            </span>
          )}
        </Link>
      </SidebarMenuButton>
    </SidebarMenuItem>
  );
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { t } = useTranslation();
  const { environment } = useTenant();
  const { checkPermission } = useAuth();
  const pathname = usePathname();

  return (
    <Sidebar {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <Link href="/">
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                  <LayoutDashboard className="size-4" />
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">L-Sales App</span>
                  <span
                    className="truncate text-xs text-muted-foreground"
                    suppressHydrationWarning
                  >
                    {environment}
                  </span>
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent suppressHydrationWarning>
        <SidebarGroup>
          <SidebarGroupContent>
            <TooltipProvider>
              <SidebarMenu>
                {menuConfig.items
                  .filter(
                    (item) =>
                      shouldShowMenuItem(item, environment) &&
                      hasPermission(item, checkPermission)
                  )
                  .map((item) =>
                    renderMenuItem(
                      item,
                      t,
                      environment,
                      pathname,
                      checkPermission
                    )
                  )}
              </SidebarMenu>
            </TooltipProvider>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton>
              <span className="text-xs text-muted-foreground">
                © 2025 L-Sales App
              </span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
