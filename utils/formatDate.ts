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
import { Logger } from './logger'

// Our API times come in as PT, and we display in PT - let's just stay in that space
Settings.defaultZone = 'America/Los_Angeles'

/**
 * Parse a date string from the API gateway.
 *
 *
 * This function will interpret date time strings with no time zone as a Pacific Time Zone
 * Date Time due to the Settings.defaultZone specification in this file.
 *
 * See more about ISO format parsing in the Luxon docs
 * https://moment.github.io/luxon/#/tour?id=parse-from-iso-8601
 *
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

  // Log anomalous dates: All dates are expected to be after 1970.
  const expectedMinDate = DateTime.fromISO('1970-01-01')
  if (date <= expectedMinDate) {
    const logger = Logger.getInstance()
    logger.log('warn', { dateString: dateString }, 'Unexpected date')
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
 * Format dates for user-facing display.
 *
 * Does not care if the given dateString is a valid date.
 *
 * See Luxon formatting docs for more info on toLocaleString & the DATE_SHORT preset
 * https://moment.github.io/luxon/#/formatting?id=presets
 */
export default function formatDate(dateString: ApiGatewayDateString): string {
  const date = parseApiGatewayDate(dateString)
  return date.toLocaleString(DateTime.DATE_SHORT)
}
