import formatDate, { isDatePast, isValidDate } from '../../utils/formatDate'

// Test isValidDate()
describe('Valid dates: A date is', () => {
  it('invalid if it is not a date', () => {
    expect(isValidDate('nonsense')).toBe(false)
  })

  it('invalid if it is earlier than the minimum date', () => {
    expect(isValidDate('0001-01-01T00:00:00')).toBe(false)
  })

  it('valid if it is later than the minimum date', () => {
    expect(isValidDate('2013-01-01T00:00:00')).toBe(true)
  })
})

// Test isDatePast()
describe('Past dates: A date is', () => {
  it('correctly identified as being in the past', () => {
    const today = new Date()
    const yesterday = today.setDate(today.getDate() - 1)
    expect(isDatePast(yesterday)).toBe(true)
  })

  it('correctly identified as not past if it is today', () => {
    const today = new Date()
    expect(isDatePast(today)).toBe(false)
  })

  it('correctly identified as not past if it is in the future', () => {
    const today = new Date()
    const tomorrow = today.setDate(today.getDate() + 1)
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
