import { format, parse } from 'date-fns'

/**
 * Parse dates formatted by the API gateway.
 */
export function parseApiDate(dateString: string): Date {
  return parse(dateString, "yyyy-MM-dd'T'HH:mm:ss", new Date())
}

/**
 * Format dates for user-facing display.
 */
export default function formatDate(dateString: string): string {
  const parsedDate = parseApiDate(dateString)
  return format(parsedDate, 'M/d/yyyy')
}
