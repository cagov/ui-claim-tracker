import { formatAppointmentDate, isAm, samePeriod } from '../../../utils/browser/appointment'

// Test formatAppointmentDate()
describe('Formatting appointments', () => {
  it('displays the date in the expected format and timezone', () => {
    const date = '2020-12-31T00:00:00'
    const formattedDate = formatAppointmentDate(date, 'en')
    expect(formattedDate).toBe('Thursday, December 31, 2020')
  })
})

// Test samePeriod()
describe('Two times are', () => {
  it('the same period if they are both AM', () => {
    expect(samePeriod(8, 10)).toBe(true)
  })

  it('the same period if they are both PM', () => {
    expect(samePeriod(1, 3)).toBe(true)
  })

  it('not the same period if one is AM and one is PM', () => {
    expect(samePeriod(8, 3)).toBe(false)
  })
})

// Test isAm()
describe('A time is in the period', () => {
  it('am if it is equal to or after 8 and before 12', () => {
    expect(isAm(8)).toBe(true)
    expect(isAm(11)).toBe(true)
  })

  it('pm if it is before 8 and equal to or after 12', () => {
    expect(isAm(7)).toBe(false)
    expect(isAm(12)).toBe(false)
    expect(isAm(1)).toBe(false)
    expect(isAm(5)).toBe(false)
  })
})
