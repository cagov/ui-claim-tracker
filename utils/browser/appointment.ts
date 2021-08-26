/**
 * Utility functions to support appointment logic.
 */

import { DateTime, Settings } from 'luxon'

import { I18nString } from '../../types/common'

// Our API times come in as PT, and we display in PT - let's just stay in that space
Settings.defaultZone = 'America/Los_Angeles'

/**
 * Format appointment.
 */
export function formatAppointmentDate(dateString: string, localeString: string): string {
  const dateFormat = 'EEEE, LLLL d, yyyy'
  const date = DateTime.fromISO(dateString)
  const formattedDate = date.setLocale(localeString).toFormat(dateFormat)
  return formattedDate
}

/**
 * Identify whether a time is AM or PM.
 *
 * AM = 8 (inclusive) up to 12 (not inclusive)
 */
export function isAm(time: number): boolean {
  return time < 12 && time >= 8
}

/**
 * Return the I18nString for AM/PM.
 */
export function identifyI18nPeriod(time: number): I18nString {
  if (isAm(time)) {
    return 'time.am'
  } else {
    return 'time.pm'
  }
}

/**
 * Identify whether two times are both am, pm, or different.
 *
 * Note: "period" is what Unicode calls AM/PM.
 * See https://unicode.org/reports/tr35/tr35-6.html#Date_Format_Patterns
 */
export function samePeriod(first: number, second: number): boolean {
  const bothAm = isAm(first) && isAm(second)
  const bothPm = !isAm(first) && !isAm(second)
  return bothAm || bothPm
}
