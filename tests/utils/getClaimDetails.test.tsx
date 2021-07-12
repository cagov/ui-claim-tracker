import getClaimDetails, {
  buildBenefitYear,
  formatCurrency,
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

// Test formatCurrency()
describe('Formatting dollar amounts', () => {
  it('displays the correct string for amounts with cents', () => {
    const withCents = '532.82'
    expect(formatCurrency(withCents)).toEqual(`$${withCents}`)
  })
  it('displays the correct string for amounts without cents', () => {
    const noCents = '500'
    expect(formatCurrency(noCents)).toEqual(`$${noCents}.00`)
  })
  it('displays the correct string for zero dollars', () => {
    const zero = '0'
    expect(formatCurrency(zero)).toEqual('$0.00')
  })
  it('displays the correct string for negative amounts', () => {
    const negative = '-40900'
    expect(formatCurrency(negative)).toEqual('-$40,900.00')
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
      claimBalance: 100,
      weeklyBenefitAmount: 25,
      lastPaymentIssued: '3/12/21',
      lastPaymentAmount: 10,
      monetaryStatus: 'active',
    }

    // Expected results
    const expected = {
      programType: 'claim-details:program-type.ui',
      benefitYear: '5/21/21 - 5/20/22',
      claimBalance: formatCurrency(rawDetails.claimBalance),
      weeklyBenefitAmount: formatCurrency(rawDetails.weeklyBenefitAmount),
      lastPaymentIssued: rawDetails.lastPaymentIssued,
      extensionType: '',
    }
    const claimDetails = getClaimDetails(rawDetails)
    expect(claimDetails).toStrictEqual(expected)
  })
})
