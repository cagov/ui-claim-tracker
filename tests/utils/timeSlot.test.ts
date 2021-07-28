import { convertTo24H, isAm, isFirstTimeSlotEarlier, parseTimeSlot, samePeriod } from '../../utils/timeSlot'

// Test parseTimeSlot()
describe('A time slot string is', () => {
  it('correctly parsed if it is properly formatted', () => {
    const multipleDigits = parseTimeSlot('10-12')
    expect(multipleDigits.rangeStart).toBe(10)
    expect(multipleDigits.rangeEnd).toBe(12)

    const singleDigits = parseTimeSlot('1-3')
    expect(singleDigits.rangeStart).toBe(1)
    expect(singleDigits.rangeEnd).toBe(3)
  })

  it('handled if it is improperly formatted', () => {
    const badTimeSlot = parseTimeSlot('not a time slot')
    expect(badTimeSlot).toBe(null)
  })

  it('handled if the separator is an ndash', () => {
    const multipleDigits = parseTimeSlot('10–12')
    expect(multipleDigits.rangeStart).toBe(10)
    expect(multipleDigits.rangeEnd).toBe(12)
  })

  it('handled if the separator is an mdash', () => {
    const multipleDigits = parseTimeSlot('10—12')
    expect(multipleDigits.rangeStart).toBe(10)
    expect(multipleDigits.rangeEnd).toBe(12)
  })
})

// Test isFirstTimeSlotEarlier()
describe('Comparing time slots results in', () => {
  const bad = 'not a time slot'
  const earlier = '10-12'
  const later = '1-3'

  it('null if both time slots are improperly formatted', () => {
    const result = isFirstTimeSlotEarlier(bad, bad)
    expect(result).toBe(null)
  })

  it('the first time slot if only the second time slot is improperly formatted', () => {
    const result = isFirstTimeSlotEarlier(earlier, bad)
    expect(result).toBe(true)
  })

  it('the second time slot if only the first time slot is improperly formatted', () => {
    const result = isFirstTimeSlotEarlier(bad, earlier)
    expect(result).toBe(false)
  })

  it('the first time slot if its start time is earlier', () => {
    const result = isFirstTimeSlotEarlier(earlier, later)
    expect(result).toBe(true)
  })

  it('the second time slot if its start time is earlier', () => {
    const result = isFirstTimeSlotEarlier(later, earlier)
    expect(result).toBe(false)
  })

  it('the second time slot if both start at the same time', () => {
    const result = isFirstTimeSlotEarlier(earlier, earlier)
    expect(result).toBe(false)
  })
})

// Test samePeriod()
describe('Two times are', () => {
  // Shared test values.
  const eightAm = 8
  const tenAm = 10
  const onePm = 1
  const threePm = 3

  it('the same period if they are both AM', () => {
    expect(samePeriod(eightAm, tenAm)).toBe(true)
  })

  it('the same period if they are both PM', () => {
    expect(samePeriod(onePm, threePm)).toBe(true)
  })

  it('not the same period if one is AM and one is PM', () => {
    expect(samePeriod(eightAm, threePm)).toBe(false)
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

// Test convertTo24H()
describe('Converting a time to 24h time', () => {
  it('does not happen for times between 8–12 (inclusive)', () => {
    expect(convertTo24H(8)).toBe(8)
    expect(convertTo24H(12)).toBe(12)
  })

  it('happens for times between 1–7 and 13 and up', () => {
    expect(convertTo24H(1)).toBe(13)
    expect(convertTo24H(7)).toBe(19)
  })
})
