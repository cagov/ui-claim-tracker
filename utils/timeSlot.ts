/**
 * Utility file to handle time slots for scheduled appointments.
 *
 * Time slots are expected to be in this format:
 * - "10-12"
 * - "1-3"
 * - etc
 */

import { TimeSlot } from '../types/common'
import { Logger } from './logger'
import { isAm } from './browser/appointment'

/**
 * Validate times.
 */
export function validTime(time: number): boolean {
  const isExpected = time >= 1 && time <= 12
  if (!isExpected) {
    const logger: Logger = Logger.getInstance()
    logger.log(null, 'warn', { time: time }, 'Unexpected time')
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
    logger.log(null, 'warn', { first: first, second: second }, 'Unreachable code was executed')
    return null
  }
}
