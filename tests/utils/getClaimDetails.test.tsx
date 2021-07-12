import {
  buildBenefitYear,
  getProgramExtensionPair,
  programExtensionPairs,
  programExtensionPairType,
  programTypeNames,
} from '../../utils/getClaimDetails'

// Test getProgramExtensionPair()
describe('Converting ProgramType to user-facing strings', () => {
  it('returns the correct string for each known ProgramType', () => {
    for (const [id, pair] of Object.entries(programExtensionPairs)) {
      const parts: programExtensionPairType = getProgramExtensionPair(programTypeNames[id])
      expect(parts.programType).toBe(pair.programType)
      expect(parts.extensionType).toBe(parts.extensionType)
    }
  })

  it('throws an error if an unknown ProgramType is given', () => {
    expect(() => {
      getProgramExtensionPair('unknown')
    }).toThrowError('Unknown Program Type')
  })
})

// Test buildBenefitYear()
describe('Constructing the benefit year', () => {
  it('results in a date range string', () => {
    const range = buildBenefitYear('foo', 'bar')
    expect(range).toBe('foo - bar')
  })
})
