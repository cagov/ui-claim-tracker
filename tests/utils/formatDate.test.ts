import { DateTime } from 'luxon'

import formatDate, { formatFromApiGateway, isDatePast, isDateStringFalsy, isValidDate } from '../../utils/formatDate'
import { Logger } from '../../utils/logger'

// Test isValidDate()
describe('Valid dates: A date is', () => {
  it('invalid if it is not a date', () => {
    expect(isValidDate('nonsense')).toBe(false)
  })

  it('invalid if it is earlier than the minimum date', () => {
    const loggerSpy = jest.spyOn(Logger.prototype, 'log').mockImplementation(jest.fn())
    loggerSpy.mockClear()
    expect(isValidDate('1831-01-01T00:00:00')).toBe(false)
    expect(loggerSpy).toHaveBeenCalledTimes(1)
    expect(loggerSpy).toHaveBeenCalledWith(undefined, 'warn', expect.anything(), 'Unexpected date')
  })

  it('valid if it is later than the minimum date', () => {
    expect(isValidDate('2013-01-01T00:00:00')).toBe(true)
  })
})

// Test isDateStringFalsy()
describe('Falsy date strings: A date string is', () => {
  it('falsy if it is Jan 1, 0001', () => {
    expect(isDateStringFalsy('0001-01-01T00:00:00')).toBe(true)
  })

  it('falsy if it is null', () => {
    expect(isDateStringFalsy(null)).toBe(true)
  })

  it('falsy if it is an empty string', () => {
    expect(isDateStringFalsy('')).toBe(true)
  })

  it('falsy if it is undefined', () => {
    expect(isDateStringFalsy(undefined)).toBe(true)
  })

  it('not falsy if it is any valid date', () => {
    expect(isDateStringFalsy('2001-01-01T00:00:00')).toBe(false)
  })

  it('not falsy if it is any valid string', () => {
    expect(isDateStringFalsy('something else')).toBe(false)
  })
})

// Test isDatePast()
describe('Past dates: A date is', () => {
  it('correctly identified as being in the past', () => {
    const yesterday = DateTime.now().minus({ days: 1 })
    expect(isDatePast(yesterday)).toBe(true)
  })

  it('correctly identified as not past if it is today', () => {
    const today = DateTime.now()
    expect(isDatePast(today)).toBe(false)
  })

  it('correctly identified as not past if it is in the future', () => {
    const tomorrow = DateTime.now().plus({ days: 1 })
    expect(isDatePast(tomorrow)).toBe(false)
  })
})

// Test formatDate()
describe('Formatting dates', () => {
  it('displays the expected date string', () => {
    const notFormatted = '2013-09-27T00:00:00'
    const formatted = formatDate(notFormatted)
    expect(formatted).toEqual('9/27/2013')
  })
})

// Test formatFromApiGateway()
describe('Requesting a date adjusted from existing in the correct format', () => {
  it('has our time set to PT!', () => {
    expect(DateTime.local().zoneName).toEqual('America/Los_Angeles')
  })

  it('displays the expected date string', () => {
    const baseDate = DateTime.fromISO('2021-09-10T02:00:00')
    const adjustment = -1
    const newDate = formatFromApiGateway(adjustment, baseDate)

    expect(newDate).toEqual('2021-09-09T00:00:00')
  })

  it('handles PT edge cases', () => {
    // Tricky time - 10pm PT means it's always* the next day ET & UTC
    // *like, casually true but don't hold me to this; time is hard okay?
    const baseDate = DateTime.fromISO('2021-09-01T22:00:00')
    const adjustment = 3
    const newDate = formatFromApiGateway(adjustment, baseDate)

    expect(newDate).toEqual('2021-09-04T00:00:00')
  })
})
