/**
 * Utility functions to support appointment logic.
 */
import enUS from 'date-fns/locale/en-US'
import es from 'date-fns/locale/es'
import { format, utcToZonedTime } from 'date-fns-tz'

import { I18nString } from '../../types/common'

/**
 * Convert date locale from string.
 *
 * Falls back to English if an unexpected value is given.
 */
export function convertStringToLocale(localeString: string): Locale {
  return localeString === 'es' ? es : enUS
}

/**
 * Format appointment.
 */
export function formatAppointmentDate(dateString: string, localeString: string): string {
  const dateFormat = 'EEEE, LLLL d, yyyy'
  const pacificTimeZone = 'America/Los_Angeles'
  const convertedDate = utcToZonedTime(dateString, pacificTimeZone)
  const formattedDate = format(convertedDate, dateFormat, {
    locale: convertStringToLocale(localeString),
    timeZone: pacificTimeZone,
  })
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
