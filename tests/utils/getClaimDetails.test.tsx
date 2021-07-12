import getClaimDetails, {
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

// Test getClaimDetails()
describe('Constructing the Claim Details object', () => {
  it('returns all the expected values', () => {
    // Mock ClaimDetailsResults
    const rawDetails = {
      programType: 'UI',
      benefitYearStartDate: '5/21/21',
      benefitYearEndDate: '5/20/22',
      claimBalance: '$100',
      weeklyBenefitAmount: '$25',
      lastPaymentIssued: '3/12/21',
      lastPaymentAmount: '$10',
      monetaryStatus: 'active',
    }

    // Expected results
    const expected = {
      programType: 'claim-details:program-type.ui',
      benefitYear: '5/21/21 - 5/20/22',
      claimBalance: rawDetails.claimBalance,
      weeklyBenefitAmount: rawDetails.weeklyBenefitAmount,
      lastPaymentIssued: rawDetails.lastPaymentIssued,
      extensionType: '',
    }
    const claimDetails = getClaimDetails(rawDetails)
    expect(claimDetails).toStrictEqual(expected)
  })
})
