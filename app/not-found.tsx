"use client";

import Link from "next/link";
import {useTranslation} from "@/lib/contexts/TranslationContext";
import {Button} from "@/components/ui/Button";
import {FileQuestion} from "lucide-react";

export default function NotFound() {
  const {t} = useTranslation();

  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-4">
      <div className="text-center space-y-6 max-w-md">
        <div className="flex justify-center">
          <div className="rounded-full bg-primary/10 p-6">
            <FileQuestion className="h-24 w-24 text-primary" />
          </div>
        </div>

        <div className="space-y-2">
          <h1 className="text-4xl font-bold tracking-tight">404</h1>
          <h2 className="text-2xl font-semibold">{t("Page Not Found")}</h2>
          <p className="text-muted-foreground">
            {t("The page you are looking for does not exist.")}
          </p>
        </div>

        <Button asChild className="mt-6">
          <Link href="/dashboard">{t("Go to Dashboard")}</Link>
        </Button>
      </div>
    </div>
  );
}
