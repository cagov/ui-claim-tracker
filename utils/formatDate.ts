/**
 * Utility file to handle datetimes.
 *
 * Because this is a State of California application, we assume all times are
 * in Pacific Time if there is no timezone provided in the datetime string.
 */
import { format, isValid } from 'date-fns'
import { zonedTimeToUtc } from 'date-fns-tz'

const pacificTimeZone = 'America/Los_Angeles'

/**
 * Assume input is in Pacific Time and convert to UTC.
 */
export function datetimeInUtc(date: string | Date): Date {
  return zonedTimeToUtc(date, pacificTimeZone)
}

/**
 * Determine if the date string is valid.
 */
export function isValidDate(dateString: string): boolean {
  const date = datetimeInUtc(dateString)
  if (isValid(date)) {
    // Set a min date because it's possible for the date
    // to be '0001-01-01'.
    const minDate = datetimeInUtc('1900-01-01')
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
 * Determine if the date is in the past.
 */
export function isDatePast(date: Date): boolean {
  const today = datetimeInUtc(new Date())
  return date < today
}

/**
 * Format dates for user-facing display.
 */
export default function formatDate(dateString: string): string {
  const parsedDate = datetimeInUtc(dateString)
  return format(parsedDate, 'M/d/yyyy')
}
