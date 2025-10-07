"use client";

import Link from "next/link";
import {useTranslation} from "@/lib/contexts/TranslationContext";
import {Button} from "@/components/ui/Button";
import {ShieldX} from "lucide-react";

export default function ForbiddenPage() {
  const {t} = useTranslation();

  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-4">
      <div className="text-center space-y-6 max-w-md">
        <div className="flex justify-center">
          <div className="rounded-full bg-destructive/10 p-6">
            <ShieldX className="h-24 w-24 text-destructive" />
          </div>
        </div>

        <div className="space-y-2">
          <h1 className="text-4xl font-bold tracking-tight">403</h1>
          <h2 className="text-2xl font-semibold">{t("Forbidden")}</h2>
          <p className="text-muted-foreground">
            {t("You do not have permission to access this page.")}
          </p>
        </div>

        <Button asChild className="mt-6" data-test="gotodashboard">
          <Link href="/dashboard">{t("Go to Dashboard")}</Link>
        </Button>
      </div>
    </div>
  );
}
