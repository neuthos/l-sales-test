"use client";

import {Separator} from "@/components/ui/Separator";
import {SidebarTrigger} from "@/components/ui/Sidebar";
import {LanguageSwitcher} from "@/components/layout/LanguageSwitcher";
import {Button} from "@/components/ui/Button";
import {LogIn, LogOut} from "lucide-react";
import {useTranslation} from "@/lib/contexts/TranslationContext";
import {useAuth} from "@/lib/contexts/AuthContext";

export function SiteHeader() {
  const {isAuthenticated, login, logout} = useAuth();
  const {t} = useTranslation();

  const handleLogin = () => {
    const success = login();
    if (success) {
      // Redirect to dashboard after successful login
      window.location.href = "/dashboard";
    }
  };

  const handleLogout = () => {
    logout();
    // Redirect to home page
    window.location.href = "/";
  };

  return (
    <header className="flex h-16 shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
      <div className="flex w-full items-center justify-between gap-2 px-4">
        <div className="flex items-center gap-2">
          <SidebarTrigger data-test="sidebar-trigger" className="-ml-1" />
          <Separator
            data-test="seprator-trigger"
            orientation="vertical"
            className="mr-2 h-4"
          />
          <h1 className="text-base font-semibold">L-Sales Apps</h1>
        </div>
        <div className="flex items-center gap-2">
          {isAuthenticated ? (
            <Button
              data-test="logout-btn"
              variant="ghost"
              size="sm"
              onClick={handleLogout}
            >
              <LogOut className="mr-2 h-4 w-4" />
              {t("Logout")}
            </Button>
          ) : (
            <Button
              data-test="login-btn"
              variant="ghost"
              size="sm"
              onClick={handleLogin}
            >
              <LogIn className="mr-2 h-4 w-4" />
              {t("Login")}
            </Button>
          )}

          <LanguageSwitcher />
        </div>
      </div>
    </header>
  );
}
