import { en } from "./en";
import { ja } from "./ja";

export const translations = {
  en,
  ja,
} as const;

export type Locale = keyof typeof translations;
export type { TranslationKey } from "./en";
