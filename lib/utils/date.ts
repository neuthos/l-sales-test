import dayjs, {Dayjs} from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import customParseFormat from "dayjs/plugin/customParseFormat";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.extend(customParseFormat);
dayjs.extend(relativeTime);

export const DATE_FORMAT = "YYYY/MM/DD";
export const TIME_FORMAT = "HH:mm:ss";
export const DATETIME_FORMAT = "YYYY/MM/DD HH:mm:ss";
export const DISPLAY_DATE_FORMAT = "MMM DD, YYYY";
export const DISPLAY_DATETIME_FORMAT = "MMM DD, YYYY HH:mm";

/**
 * Get user's timezone from browser
 */
export function getUserTimezone(): string {
  return dayjs.tz.guess();
}

/**
 * Get current date/time in user's timezone
 */
export function now(): Dayjs {
  return dayjs().tz(getUserTimezone());
}

/**
 * Format date to specified format
 * Automatically uses user's timezone from browser
 *
 * @param date - Date to format (Date, string, or Dayjs)
 * @param format - Format string (default: DISPLAY_DATE_FORMAT)
 * @returns Formatted date string
 *
 * @example
 * formatDate(new Date()) // "Jan 15, 2025"
 * formatDate(new Date(), "YYYY-MM-DD") // "2025-01-15"
 */
export function formatDate(
  date: Date | string | Dayjs,
  format: string = DISPLAY_DATE_FORMAT
): string {
  if (!date) return "";

  const userTimezone = getUserTimezone();
  return dayjs(date).tz(userTimezone).format(format);
}

/**
 * Format date and time to specified format
 * Automatically uses user's timezone from browser
 *
 * @param date - Date to format (Date, string, or Dayjs)
 * @param format - Format string (default: DISPLAY_DATETIME_FORMAT)
 * @returns Formatted datetime string
 *
 * @example
 * formatDateTime(new Date()) // "Jan 15, 2025 10:30"
 * formatDateTime(new Date(), "YYYY-MM-DD HH:mm:ss") // "2025-01-15 10:30:45"
 */
export function formatDateTime(
  date: Date | string | Dayjs,
  format: string = DISPLAY_DATETIME_FORMAT
): string {
  if (!date) return "";

  const userTimezone = getUserTimezone();
  return dayjs(date).tz(userTimezone).format(format);
}

/**
 * Parse ISO-8601 date string from backend
 * Automatically converts to user's timezone
 *
 * @param isoString - ISO-8601 date string (e.g., "2025-01-15T10:30:00+09:00")
 * @returns Dayjs object in user's timezone
 *
 * @example
 * parseISO("2025-01-15T10:30:00+09:00")
 */
export function parseISO(isoString: string): Dayjs {
  if (!isoString) return dayjs();

  const userTimezone = getUserTimezone();
  return dayjs(isoString).tz(userTimezone);
}

/**
 * Convert date to ISO-8601 format for backend
 * Preserves timezone information
 *
 * @param date - Date to convert (Date, string, or Dayjs)
 * @returns ISO-8601 string with timezone (e.g., "2025-01-15T10:30:00+07:00")
 *
 * @example
 * toISO(new Date()) // "2025-01-15T10:30:00+07:00"
 */
export function toISO(date: Date | string | Dayjs): string {
  if (!date) return "";

  return dayjs(date).toISOString();
}

/**
 * Convert date to UTC
 *
 * @param date - Date to convert
 * @returns Dayjs object in UTC
 */
export function toUTC(date: Date | string | Dayjs): Dayjs {
  return dayjs(date).utc();
}

/**
 * Convert UTC date to user's timezone
 *
 * @param date - UTC date
 * @returns Dayjs object in user's timezone
 */
export function fromUTC(date: Date | string | Dayjs): Dayjs {
  const userTimezone = getUserTimezone();
  return dayjs.utc(date).tz(userTimezone);
}

/**
 * Get relative time from now (e.g., "2 hours ago", "in 3 days")
 *
 * @param date - Date to compare
 * @returns Relative time string
 */
export function fromNow(date: Date | string | Dayjs): string {
  if (!date) return "";
  return dayjs(date).fromNow();
}

/**
 * Check if date is valid
 *
 * @param date - Date to validate
 * @returns True if valid date
 */
export function isValidDate(date: Date | string | Dayjs): boolean {
  return dayjs(date).isValid();
}
