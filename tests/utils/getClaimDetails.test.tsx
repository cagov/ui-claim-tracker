import getClaimDetails, {
  buildBenefitYear,
  formatCurrency,
  formatDate,
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

// Test formatDate()
describe('Formatting dates', () => {
  it('displays the expected date string', () => {
    const notFormatted = '2013-09-27T00:00:00'
    const formatted = formatDate(notFormatted)
    expect(formatted).toEqual('9/27/2013')
  })
})

// Test buildBenefitYear()
describe('Constructing the benefit year', () => {
  it('results in a date range string', () => {
    const range = buildBenefitYear('2013-09-27T12:34:33', '2021-10-28T05:33:34')
    expect(range).toBe('9/27/2013–10/28/2021')
  })
})

// Test formatCurrency()
describe('Formatting dollar amounts', () => {
  it('displays the correct string for amounts without cents', () => {
    const noCents = 500
    expect(formatCurrency(noCents)).toEqual(`$${noCents}.00`)
  })
})

// Test getClaimDetails()
describe('Constructing the Claim Details object', () => {
  it('returns all the expected values', () => {
    // Mock ClaimDetailsResults
    const rawDetails = {
      programType: 'UI',
      benefitYearStartDate: '2021-05-21T00:00:00',
      benefitYearEndDate: '2022-05-20T00:00:00',
      claimBalance: 100,
      weeklyBenefitAmount: 25,
      lastPaymentIssued: '2021-03-12T00:00:00',
      lastPaymentAmount: 10,
      monetaryStatus: 'active',
    }

    // Expected results
    const expected = {
      programType: 'claim-details:program-type.ui',
      benefitYear: '5/21/2021–5/20/2022',
      claimBalance: '$100.00',
      weeklyBenefitAmount: '$25.00',
      lastPaymentIssued: '$10.00 on 3/12/2021',
      extensionType: '',
    }
    const claimDetails = getClaimDetails(rawDetails)
    expect(claimDetails).toStrictEqual(expected)
  })
})
