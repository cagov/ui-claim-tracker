/**
 * Utility file to handle time slots for scheduled appointments.
 *
 * Time slots are expected to be in this format:
 * - "10-12"
 * - "1-3"
 * - etc
 */

import { I18nString, TimeSlot } from '../types/common'
import { Logger } from './logger'

/**
 * Validate times.
 */
export function validTime(time: number): boolean {
  const isExpected = time >= 1 && time <= 12
  if (!isExpected) {
    const logger: Logger = Logger.getInstance()
    logger.log('error', { time: time }, 'Unexpected time')
  }
  return isExpected
}

/**
 * Parse a time slot from the API gateway.
 */
export function parseTimeSlot(timeSlot: string): TimeSlot | null {
  // Time slots are expected to be in the format 10-12,
  // where the dash can either be a hyphen (-) or an ndash (–) or an mdash (—).
  let result: TimeSlot | null = null

  const match = /(\d+)[-–—](\d+)/.exec(timeSlot)
  if (match) {
    const start = parseInt(match[1])
    const end = parseInt(match[2])

    if (validTime(start) && validTime(end)) {
      result = {
        rangeStart: start,
        rangeEnd: end,
      }
    }
  }
  // If the arg does not match the regex, return null.
  return result
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

/**
 * Convert 12 hour time into 24 hour time.
 */
export function convertTo24H(time: number): number {
  if (isAm(time) || time === 12) {
    return time
  } else {
    return time + 12
  }
}

/**
 * Determine whether the first time slot starts earlier than the second time slot.
 */
export function isFirstTimeSlotEarlier(first: string, second: string): boolean | null {
  const firstTimeSlot = parseTimeSlot(first)
  const secondTimeSlot = parseTimeSlot(second)

  // If neither arg matches the expected format, return null.
  if (!firstTimeSlot && !secondTimeSlot) {
    return null
  }
  // If the first arg is properly formatted and the second one is not,
  // then we say the first one is earlier because we prefer showing more granularity.
  else if (firstTimeSlot && !secondTimeSlot) {
    return true
  }
  // If the first arg is not properly formatted and the second one is,
  // then we say the second one is earlier for the same reason as above.
  else if (!firstTimeSlot && secondTimeSlot) {
    return false
  }
  // If both args are properly formatted...
  // Note: this is an "else if" instead of an "else" because typescript says that
  // firstTimeSlot and secondTimeSlot could be null at this point.
  else if (firstTimeSlot && secondTimeSlot) {
    // ...then we can actually compare them against each other.
    if (convertTo24H(firstTimeSlot.rangeStart) < convertTo24H(secondTimeSlot.rangeStart)) {
      return true
    } else {
      return false
    }
  }
  // This is required due to a weird typescript issue.
  // In practice, this should be unreachable code.
  else {
    const logger: Logger = Logger.getInstance()
    logger.log('error', { first: first, second: second }, 'Unreachable code was executed')
    return null
  }
}
