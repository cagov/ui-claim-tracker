/**
 * Utility file to handle datetimes.
 *
 * Some helpful context from https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date:
 * > A JavaScript date is fundamentally specified as the number of milliseconds that have
 * > elapsed since midnight on January 1, 1970, UTC. ... It's important to keep in mind
 * > that while the time value at the heart of a Date object is UTC, the basic methods to
 * > fetch the date and time or its components all work in the local (i.e. host system)
 * > time zone and offset.
 *
 * Because this is a State of California application, we assume all times are
 * in Pacific Time if there is no timezone provided in the datetime string.
 */

import { format, isValid } from 'date-fns'
import { toDate } from 'date-fns-tz'
import { ApiGatewayDateString } from '../types/common'

const pacificTimeZone = 'America/Los_Angeles'
const apiGatewayFormat = "yyyy-MM-dd'T'HH:mm:ss"

/**
 * Parse a date string from the API gateway.
 *
 * By default, if a date time string has no time zone (which is how we expect
 * the date times from the API gateway to be formatted), it is interpreted as a UTC time.
 *
 * From https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/parse:
 *
 * > For example, "2011-10-10" (date-only form), "2011-10-10T14:48:00" (date-time form),
 * > or "2011-10-10T14:48:00.000+09:00" (date-time form with milliseconds and time zone)
 * > can be passed and will be parsed. When the time zone offset is absent, date-only forms
 * > are interpreted as a UTC time and date-time forms are interpreted as local time.
 *
 * This function will interpret date time strings with no time zone as a Pacific Time Zone
 * time. If the date string argument contains a time zone offset, the `timeZone` option
 * is ignored.
 *
 * See: https://github.com/marnusw/date-fns-tz#todate
 */
export function parseApiGatewayDate(dateString: ApiGatewayDateString): Date {
  return toDate(dateString, { timeZone: pacificTimeZone })
}

/**
 * Return a string that matches the API gateway format for datetimes.
 */
export function formatFromApiGateway(date: Date): string {
  return format(date, apiGatewayFormat)
}

/**
 * Create a Date object that is offset from today.
 */
export function getDateWithOffset(daysOffset = 1): Date {
  const today = new Date()
  today.setDate(today.getDate() + daysOffset)
  today.setHours(0, 0, 0, 0)
  return today
}

/**
 * Determine if the date string is valid.
 */
export function isValidDate(dateString: ApiGatewayDateString): boolean {
  let date: Date

  // If the date format is such that it can't be parsed, then it is definitely invalid.
  try {
    date = parseApiGatewayDate(dateString)
  } catch (error) {
    return false
  }

  if (isValid(date)) {
    // Set a min date because it's possible for the date to be '0001-01-01'.
    const minDate = toDate('1900-01-01', { timeZone: pacificTimeZone })
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
 *
 * Assumes that the given date is a valid date.
 */
export function isDatePast(date: Date): boolean {
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  return date < today
}

/**
 * Format dates for user-facing display.
 *
 * Does not care if the given dateString is a valid date.
 */
export default function formatDate(dateString: ApiGatewayDateString): string {
  const date = parseApiGatewayDate(dateString)
  return format(date, 'M/d/yyyy')
}
