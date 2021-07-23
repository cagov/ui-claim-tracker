/**
 * Utility file to handle time slots for scheduled appointments.
 */

import { TimeSlot } from '../types/common'

/**
 * Parse a time slot from the API gateway.
 */
export function parseTimeSlot(timeSlot: string): TimeSlot | null {
  // Time slots are expected to be in the format 10-12.
  const match = /(\d+)[-–—](\d+)/.exec(timeSlot)
  if (match) {
    const formattedTimeSlot: TimeSlot = {
      rangeStart: parseInt(match[1]),
      rangeEnd: parseInt(match[2]),
    }
    return formattedTimeSlot
  }
  // If the arg does not match the regex, return null.
  else {
    return null
  }
}

/**
 * Convert 12 hour time into 24 hour time.
 *
 * Assume that any time earlier than 8 is actually PM.
 */
function convertTo24H(time: number): number {
  if (time < 8) {
    return time + 12
  } else {
    return time
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
    return null
  }
}
