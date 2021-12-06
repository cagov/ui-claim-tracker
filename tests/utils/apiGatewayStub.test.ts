import { isDatePast, isValidDate, parseApiGatewayDate } from '../../utils/formatDate'
import apiGatewayStub from '../../utils/apiGatewayStub'
import { isDeterminationStatusPending, ScenarioType } from '../../utils/getScenarioContent'

describe('The API gateway stub response for the Determination Interview scenarios', () => {
  it('is correct for Scenario 1', () => {
    const response = apiGatewayStub(ScenarioType.Scenario1)
    expect(response.pendingDetermination?.length).toBe(1)

    const pendingDetermination = response?.pendingDetermination?.[0]
    expect([null, false, undefined, '']).toContainEqual(pendingDetermination?.determinationStatus)
    expect([null, false, undefined, '']).toContainEqual(pendingDetermination?.scheduleDate)
    expect(pendingDetermination?.requestDate).not.toBe('')
  })

  it('is correct for Scenario 2', () => {
    const response = apiGatewayStub(ScenarioType.Scenario2)
    expect(response?.pendingDetermination?.length).toBe(1)

    const pendingDetermination = response?.pendingDetermination?.[0]

    /* eslint-disable jest/no-conditional-expect */
    // Conditional expects allows us to use typescripts natural type narrowing.
    // Lesser evil compared to using an as line & possibly hiding type issues
    if (pendingDetermination === undefined) {
      // type narrowed fail fast if we got undefined back
      expect(pendingDetermination).not.toBe(undefined)
    } else {
      expect(isDeterminationStatusPending(pendingDetermination)).toBe(true)

      expect(isValidDate(pendingDetermination.scheduleDate)).toBe(true)

      const convertedDate = parseApiGatewayDate(pendingDetermination.scheduleDate)
      expect(isDatePast(convertedDate)).toBe(false)
    }
    /* eslint-enable jest/no-conditional-expect */
  })

  it('is correct for Scenario 3', () => {
    const response = apiGatewayStub(ScenarioType.Scenario3)

    expect(response?.pendingDetermination?.length).toBe(1)

    const pendingDetermination = response?.pendingDetermination?.[0]

    /* eslint-disable jest/no-conditional-expect */
    // Conditional expects allows us to use typescripts natural type narrowing.
    // Lesser evil compared to using an as line & possibly hiding type issues
    if (pendingDetermination === undefined) {
      // type narrowed fail fast if we got undefined back
      expect(pendingDetermination).not.toBe(undefined)
    } else {
      expect(isDeterminationStatusPending(pendingDetermination)).toBe(true)

      expect(isValidDate(pendingDetermination.scheduleDate)).toBe(true)

      const convertedDate = parseApiGatewayDate(pendingDetermination.scheduleDate)
      expect(isDatePast(convertedDate)).toBe(true)
    }
    /* eslint-enable jest/no-conditional-expect */
  })
})

describe('The API gateway stub response for the Generic Pending state', () => {
  it('is correct for Scenario 4', () => {
    const response = apiGatewayStub(ScenarioType.Scenario4)
    expect([null, [], false, undefined]).toContainEqual(response.pendingDetermination)
    expect(response.hasPendingWeeks).toBe(true) // deprecated for hasValidPendingWeeks
    expect(response.hasValidPendingWeeks).toBe(true)
    expect([true, false]).toContainEqual(response.hasCertificationWeeksAvailable)
  })
})

describe('The API gateway stub response for the Base States', () => {
  it('is correct for Scenario 5', () => {
    const response = apiGatewayStub(ScenarioType.Scenario5)
    expect([null, [], false, undefined]).toContainEqual(response.pendingDetermination)
    expect(response.hasPendingWeeks).toBe(false) // deprecated for hasValidPendingWeeks
    expect(response.hasValidPendingWeeks).toBe(false)
    expect(response.hasCertificationWeeksAvailable).toBe(false)
  })

  it('is correct for Scenario 6', () => {
    const response = apiGatewayStub(ScenarioType.Scenario6)
    expect([null, [], false, undefined]).toContainEqual(response.pendingDetermination)
    expect(response.hasPendingWeeks).toBe(false) // deprecated for hasValidPendingWeeks
    expect(response.hasValidPendingWeeks).toBe(false)
    expect(response.hasCertificationWeeksAvailable).toBe(true)
  })
})

describe('The API gateway stub response for the Bye States', () => {
  it('is correct for Scenario 7', () => {
    const response = apiGatewayStub(ScenarioType.Scenario7)
    // make sure no higher precedence scenarios will apply
    expect([null, [], false, undefined]).toContainEqual(response.pendingDetermination)
    expect(response.hasPendingWeeks).toBe(false) // deprecated for hasValidPendingWeeks
    expect(response.hasValidPendingWeeks).toBe(false)
    expect(response.hasCertificationWeeksAvailable).toBe(false)
    // check the BYE settings
    expect(response.isBYE).toBe(true)
    expect(response.claimDetails?.programType).toBe('UI')
  })

  it('is correct for Scenario 8', () => {
    const response = apiGatewayStub(ScenarioType.Scenario8)
    // make sure no higher precedence scenarios will apply
    expect([null, [], false, undefined]).toContainEqual(response.pendingDetermination)
    expect(response.hasPendingWeeks).toBe(false) // deprecated for hasValidPendingWeeks
    expect(response.hasValidPendingWeeks).toBe(false)
    expect(response.hasCertificationWeeksAvailable).toBe(false)
    // check the BYE settings
    expect(response.isBYE).toBe(true)
    expect(response.claimDetails?.programType).toBe('PUA')
  })

  it('is correct for Scenario 9', () => {
    const response = apiGatewayStub(ScenarioType.Scenario9)
    // make sure no higher precedence scenarios will apply
    expect([null, [], false, undefined]).toContainEqual(response.pendingDetermination)
    expect(response.hasPendingWeeks).toBe(false) // deprecated for hasValidPendingWeeks
    expect(response.hasValidPendingWeeks).toBe(false)
    expect(response.hasCertificationWeeksAvailable).toBe(false)
    // check the BYE settings
    expect(response.isBYE).toBe(true)
    expect(response.claimDetails?.programType).toBe('DUA')
  })

  it('is correct for Scenario 10', () => {
    const response = apiGatewayStub(ScenarioType.Scenario10)
    // make sure no higher precedence scenarios will apply
    expect([null, [], false, undefined]).toContainEqual(response.pendingDetermination)
    expect(response.hasPendingWeeks).toBe(false) // deprecated for hasValidPendingWeeks
    expect(response.hasValidPendingWeeks).toBe(false)
    expect(response.hasCertificationWeeksAvailable).toBe(false)
    // check the BYE settings
    expect(response.isBYE).toBe(true)
    expect(response.claimDetails?.programType).toBe('EUW - Tier 3 Extension')
  })

  it('is correct for Scenario 11', () => {
    const response = apiGatewayStub(ScenarioType.Scenario11)
    // make sure no higher precedence scenarios will apply
    expect([null, [], false, undefined]).toContainEqual(response.pendingDetermination)
    expect(response.hasPendingWeeks).toBe(false) // deprecated for hasValidPendingWeeks
    expect(response.hasValidPendingWeeks).toBe(false)
    expect(response.hasCertificationWeeksAvailable).toBe(false)
    // check the BYE settings
    expect(response.isBYE).toBe(true)
    expect(response.claimDetails?.programType).toBe('PEUC - Tier 1 Extension')
  })

  it('is correct for Scenario 12', () => {
    const response = apiGatewayStub(ScenarioType.Scenario12)
    // make sure no higher precedence scenarios will apply
    expect([null, [], false, undefined]).toContainEqual(response.pendingDetermination)
    expect(response.hasPendingWeeks).toBe(false) // deprecated for hasValidPendingWeeks
    expect(response.hasValidPendingWeeks).toBe(false)
    expect(response.hasCertificationWeeksAvailable).toBe(false)
    // check the BYE settings
    expect(response.isBYE).toBe(true)
    expect(response.claimDetails?.programType).toBe('FED-ED Extension')
  })
})
