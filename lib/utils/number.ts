/**
 * Number formatting utilities for currency, quantity, and percentage
 */

// Currency types
export type CurrencyCode = "JPY" | "USD" | "EUR" | "IDR" | "SGD";

export const currencyConfig: Record<
  CurrencyCode,
  { locale: string; decimals: number; symbol: string }
> = {
  JPY: { locale: "ja-JP", decimals: 0, symbol: "¥" },
  USD: { locale: "en-US", decimals: 2, symbol: "$" },
  EUR: { locale: "de-DE", decimals: 2, symbol: "€" },
  IDR: { locale: "id-ID", decimals: 0, symbol: "Rp" },
  SGD: { locale: "en-SG", decimals: 2, symbol: "S$" },
};

/**
 * Format number as currency
 * @param value - Number to format
 * @param currency - Currency code (default: JPY)
 * @returns Formatted currency string
 * @example
 * formatCurrency(1500000) // "1,500,000" (JPY default)
 * formatCurrency(99.99, "USD") // "99.99"
 */
export function formatCurrency(
  value: number,
  currency: CurrencyCode = "JPY"
): string {
  const config = currencyConfig[currency];
  return new Intl.NumberFormat(config.locale, {
    minimumFractionDigits: config.decimals,
    maximumFractionDigits: config.decimals,
  }).format(value);
}

/**
 * Format number as quantity with thousand separators
 * @param value - Number to format
 * @returns Formatted quantity string (integer)
 * @example
 * formatQuantity(1234) // "1,234"
 * formatQuantity(1000000) // "1,000,000"
 */
export function formatQuantity(value: number): string {
  return new Intl.NumberFormat("en-US", {
    maximumFractionDigits: 0,
  }).format(Math.floor(value));
}

/**
 * Format number as percentage
 * @param value - Number to format
 * @param decimals - Number of decimal places (default: 2)
 * @returns Formatted percentage string (without % symbol)
 * @example
 * formatPercentage(15.5) // "15.50"
 * formatPercentage(10, 0) // "10"
 */
export function formatPercentage(value: number, decimals: number = 2): string {
  return value.toFixed(decimals);
}

/**
 * Parse string to number (handles currency formatting)
 * @param str - String to parse
 * @returns Parsed number or null if invalid
 * @example
 * parseNumericValue("1,234.56") // 1234.56
 * parseNumericValue("¥1,500,000") // 1500000
 * parseNumericValue("abc") // null
 */
export function parseNumericValue(str: string): number | null {
  const cleaned = str.replace(/[^\d.-]/g, "");
  const num = parseFloat(cleaned);
  return isNaN(num) ? null : num;
}

/**
 * Parse string to integer (handles quantity formatting)
 * @param str - String to parse
 * @returns Parsed integer or null if invalid
 * @example
 * parseIntegerValue("1,234") // 1234
 * parseIntegerValue("5,000,000") // 5000000
 * parseIntegerValue("abc") // null
 */
export function parseIntegerValue(str: string): number | null {
  const cleaned = str.replace(/[^\d]/g, "");
  const num = parseInt(cleaned, 10);
  return isNaN(num) ? null : num;
}
