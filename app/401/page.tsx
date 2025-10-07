"use client";

import {useEffect} from "react";
import {useRouter} from "next/navigation";
import Link from "next/link";
import {useTranslation} from "@/lib/contexts/TranslationContext";
import {useAuth} from "@/lib/contexts/AuthContext";
import {Button} from "@/components/ui/Button";
import {ShieldAlert} from "lucide-react";

export default function UnauthorizedPage() {
  const {t} = useTranslation();
  const {isAuthenticated, login} = useAuth();
  const router = useRouter();

  // Redirect to dashboard if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      router.replace("/dashboard");
    }
  }, [isAuthenticated, router]);

  const handleLogin = () => {
    const success = login();
    if (success) {
      window.location.href = "/dashboard";
    }
  };

  // Don't render if authenticated (will redirect)
  if (isAuthenticated) {
    return null;
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-4">
      <div className="text-center space-y-6 max-w-md">
        <div className="flex justify-center">
          <div className="rounded-full bg-primary/10 p-6">
            <ShieldAlert className="h-24 w-24 text-primary" />
          </div>
        </div>

        <div className="space-y-2">
          <h1 className="text-4xl font-bold tracking-tight">401</h1>
          <h2 className="text-2xl font-semibold">{t("Unauthorized")}</h2>
          <p className="text-muted-foreground">
            {t("Please login to continue.")}
          </p>
        </div>

        <div className="flex flex-col gap-2">
          <Button onClick={handleLogin} className="mt-6" data-test="login-btn">
            {t("Login")}
          </Button>
          <Button asChild variant="outline" data-test="go-to-dashboard">
            <Link href="/dashboard">{t("Go to Dashboard")}</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
