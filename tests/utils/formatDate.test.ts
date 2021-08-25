import MockDate from 'mockdate'

import formatDate, { isDatePast, isDateStringFalsy, isValidDate } from '../../utils/formatDate'

// Test isValidDate()
describe('Valid dates: A date is', () => {
  it('invalid if it is not a date', () => {
    expect(isValidDate('nonsense')).toBe(false)
  })

  it('invalid if it is earlier than the minimum date', () => {
    expect(isValidDate('1831-01-01T00:00:00')).toBe(false)
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
  beforeAll(() => {
    MockDate.set('2020-05-05T00:00:00')
  })

  it('correctly identified as being in the past', () => {
    const date = new Date()
    date.setDate(date.getDate() - 1)
    expect(isDatePast(date)).toBe(true)
  })

  it('correctly identified as not past if it is today', () => {
    const today = new Date()
    expect(isDatePast(today)).toBe(false)
  })

  it('correctly identified as not past if it is in the future', () => {
    const date = new Date()
    date.setDate(date.getDate() + 1)
    expect(isDatePast(date)).toBe(false)
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
