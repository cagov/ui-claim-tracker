import { format, isValid, parse } from 'date-fns'

/**
 * Parse dates formatted by the API gateway.
 */
export function parseApiDate(dateString: string): Date {
  return parse(dateString, "yyyy-MM-dd'T'HH:mm:ss", new Date())
}

/**
 * Determine if the date string is valid.
 */
export function isValidDate(dateString: string): boolean {
  const date = parseApiDate(dateString)
  if (isValid(date)) {
    // Set a min date because it's possible for the date
    // to be '0001-01-01'.
    const minDate = new Date('1900-01-01')
    if (date <= minDate) {
      return false
    }
    // date-fns says the date is valid
    // AND the date is sooner than the min date.
    else {
      return true
    }
  }
  // date-fns says the date is invalid
  else {
    return false
  }
}

// @TODO: add a function to check and log any dates that are earlier
// than 2020 as these are anomolous dates that could indicate an error.

/**
 * Format dates for user-facing display.
 */
export default function formatDate(dateString: string): string {
  const parsedDate = parseApiDate(dateString)
  return format(parsedDate, 'M/d/yyyy')
}
