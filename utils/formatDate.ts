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
export function datetimeInUtc(date: Date | number | string): Date {
  return zonedTimeToUtc(date, pacificTimeZone)
}

/**
 * Return a string that matches the API gateway format for datetimes.
 */
export function formatFromApiGateway(date: Date): string {
  return format(date, "yyyy-MM-dd'T'HH:mm:ss")
}

/**
 * Create a Date object that is offset from today.
 */
export function getDateWithOffset(offset = 1): Date {
  const today = new Date()
  const sometime = today.setDate(today.getDate() + offset)
  const sometimeUtc = datetimeInUtc(sometime)
  return sometimeUtc
}

/**
 * Determine if the date string is valid.
 */
export function isValidDate(dateOrString: string | Date): boolean {
  let date: Date

  if (typeof dateOrString === 'string') {
    date = datetimeInUtc(dateOrString)
  } else {
    date = dateOrString
  }

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
  const today = datetimeInUtc(Date.now())
  if (isValidDate(today) && isValidDate(date)) {
    return date < today
  } else {
    throw new Error('Invalid date')
  }
}

/**
 * Format dates for user-facing display.
 */
export default function formatDate(dateString: string): string {
  const parsedDate = datetimeInUtc(dateString)
  return format(parsedDate, 'M/d/yyyy')
}
