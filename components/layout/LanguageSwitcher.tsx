"use client";

import {Button} from "@/components/ui/Button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/DropdownMenu";
import {useTranslation} from "@/lib/contexts/TranslationContext";

export function LanguageSwitcher() {
  const {locale, setLocale, t} = useTranslation();

  const flagEmoji = locale === "en" ? "🇬🇧" : "🇯🇵";

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" suppressHydrationWarning>
          <span className="text-lg">{flagEmoji}</span>
          <span className="sr-only">{t("Select Language")}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="min-w-[160px] space-y-1">
        <DropdownMenuItem
          onClick={() => setLocale("en")}
          className={
            locale === "en"
              ? "bg-primary text-primary-foreground font-semibold"
              : ""
          }
        >
          <span className="mr-2 text-lg">🇬🇧</span>
          {t("English")}
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => setLocale("ja")}
          className={
            locale === "ja"
              ? "bg-primary text-primary-foreground font-semibold"
              : ""
          }
        >
          <span className="mr-2 text-lg">🇯🇵</span>
          {t("Japanese")}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
