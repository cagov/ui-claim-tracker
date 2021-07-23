import { isFirstTimeSlotEarlier, parseTimeSlot } from '../../utils/timeSlot'

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
    expect(badTimeSlot).toBe(undefined)
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

  it('undefined if both time slots are improperly formatted', () => {
    const result = isFirstTimeSlotEarlier(bad, bad)
    expect(result).toBe(undefined)
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
