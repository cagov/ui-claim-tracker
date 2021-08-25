/**
 * Utility functions to support appointment logic.
 */
import enUS from 'date-fns/locale/en-US'
import es from 'date-fns/locale/es'
import { format, utcToZonedTime } from 'date-fns-tz'

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
