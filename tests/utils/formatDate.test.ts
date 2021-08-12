import MockDate from 'mockdate'
import { toDate } from 'date-fns-tz'

import formatDate, { formatAppointmentDate, isDatePast, isNullDateString, isValidDate } from '../../utils/formatDate'

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

// Test isNullDateString()
describe('Null dates: A date is', () => {
  it('null if it is Jan 1, 0001', () => {
    expect(isNullDateString('0001-01-01T00:00:00')).toBe(true)
  })

  it('not null if it is any string', () => {
    expect(isNullDateString('2001-01-01T00:00:00')).toBe(false)
    expect(isNullDateString('something else')).toBe(false)
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

// Test formatAppointmentDate()
describe('Formatting appointments', () => {
  it('displays the date in the expected format and timezone', () => {
    // Create a date that is midnight UTC
    const date = toDate('2021-01-01T00:00:00', { timeZone: 'Europe/London' })
    // Verify that it is formatted correctly for PT
    const formattedDate = formatAppointmentDate(date)
    expect(formattedDate).toBe('Thursday, December 31, 2020')
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
