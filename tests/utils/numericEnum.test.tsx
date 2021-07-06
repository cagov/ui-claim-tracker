import { getNumericEnumKeys, getNumericEnumLength } from '../../utils/numericEnum'

// Shared mock enum
enum TestEnum {
  FOO,
  BAR,
}

describe('Numeric enum length', () => {
  it('equals the number of written elements', () => {
    expect(getNumericEnumLength(TestEnum)).toEqual(2)
  })
})

describe('Numeric enum keys', () => {
  it('equals an array of incrementing numbers', () => {
    expect(getNumericEnumKeys(TestEnum)).toEqual([0, 1])
  })
})
