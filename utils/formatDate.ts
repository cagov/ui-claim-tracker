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

import { DateTime, Settings } from 'luxon'

import { ApiGatewayDateString } from '../types/common'

// Our API times come in as PT, and we display in PT - let's just stay in that space
Settings.defaultZone = 'America/Los_Angeles'

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
export function parseApiGatewayDate(dateString: ApiGatewayDateString): DateTime {
  return DateTime.fromISO(dateString)
}

/**
 * Return a string that matches the API gateway format for datetimes.
 *
 * Allows 'today' to be passed in so we can test robustly
 *
 */
export function formatFromApiGateway(daysOffset = 1, today = DateTime.now()): string {
  const apiGatewayFormat = "yyyy-MM-dd'T'HH:mm:ss"
  const newDate = today.plus({ days: daysOffset }).startOf('day')
  return newDate.toFormat(apiGatewayFormat)
}

/**
 * Determine if the date string is valid.
 */
export function isValidDate(dateString: ApiGatewayDateString): boolean {
  let date: DateTime

  // Tell luxon to throw an error if the date is invalid
  // https://moment.github.io/luxon/#/validity
  Settings.throwOnInvalid = true
  try {
    date = parseApiGatewayDate(dateString)
  } catch (error) {
    return false
  }

  // Set a min date because it's possible for the date to be '0001-01-01'.
  const minDate = DateTime.fromISO('1900-01-01')
  if (date <= minDate) {
    return false
  }

  // Okay, looks good!
  return true
}

/**
 * Returns true if the dateString is falsy.
 *
 * We are defining falsy here to mean: standard JS falsy (null, empty string, undefined, etc) or 0001-01-01T00:00:00.
 */
export function isDateStringFalsy(dateString: ApiGatewayDateString): boolean {
  return !dateString || dateString === '0001-01-01T00:00:00'
}

// @TODO: add a function to check and log any dates that are earlier
// than 2020 as these are anomolous dates that could indicate an error.

/**
 * Determine if the date is in the past.
 *
 * Assumes that the given date is a valid date.
 */
export function isDatePast(date: DateTime): boolean {
  const today = DateTime.now().startOf('day')
  return date < today
}

/**
 * Format appointment.
 */
export function formatAppointmentDate(dateString: string, localeString: string): string {
  const dateFormat = 'EEEE, LLLL d, yyyy'
  const date = parseApiGatewayDate(dateString)
  const formattedDate = date.setLocale(localeString).toFormat(dateFormat)
  return formattedDate
}

/**
 * Format dates for user-facing display.
 *
 * Does not care if the given dateString is a valid date.
 */
export default function formatDate(dateString: ApiGatewayDateString): string {
  const date = parseApiGatewayDate(dateString)
  return date.toLocaleString(DateTime.DATE_SHORT)
}
