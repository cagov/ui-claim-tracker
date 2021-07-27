/**
 * Utility file to handle datetimes.
 *
 * Because this is a State of California application, we assume all times are
 * in Pacific Time if there is no timezone provided in the datetime string.
 */
import { format, isValid, parse } from 'date-fns'
import { zonedTimeToUtc } from 'date-fns-tz'
import { ApiGatewayDateString } from '../types/common'

const pacificTimeZone = 'America/Los_Angeles'
const apiGatewayFormat = "yyyy-MM-dd'T'HH:mm:ss"

/**
 * Parse a date string from the API gateway.
 */
export function parseApiGatewayDate(dateString: ApiGatewayDateString): Date {
  return parse(dateString, apiGatewayFormat, new Date())
}

/**
 * Assume input is in Pacific Time and convert to UTC.
 */
export function datetimeInUtc(date: Date | number | string): Date {
  return zonedTimeToUtc(date, pacificTimeZone)
}

/**
 * Parse and convert an API gateway string to UTC.
 */
export function parseConvertDate(dateString: ApiGatewayDateString): Date {
  const parsedDate = parseApiGatewayDate(dateString)
  return datetimeInUtc(parsedDate)
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
export function getDateWithOffset(offset = 1): Date {
  const today = new Date()
  const sometime = today.setDate(today.getDate() + offset)
  const sometimeUtc = datetimeInUtc(sometime)
  return sometimeUtc
}

/**
 * Determine if the date string is valid.
 */
export function isValidDate(dateString: ApiGatewayDateString): boolean {
  let date: Date

  // If the date format is such that it can't be parsed and converted to UTC,
  // then it is definitely invalid.
  try {
    date = parseConvertDate(dateString)
  } catch (error) {
    return false
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
 *
 * Assumes that the given date is a valid date.
 */
export function isDatePast(date: Date): boolean {
  const today = datetimeInUtc(Date.now())
  return date < today
}

/**
 * Format dates for user-facing display.
 *
 * Does not care if the given dateString is a valid date.
 */
export default function formatDate(dateString: ApiGatewayDateString): string {
  const date = parseConvertDate(dateString)
  return format(date, 'M/d/yyyy')
}
