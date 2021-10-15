import { isDatePast, isValidDate, parseApiGatewayDate } from '../../utils/formatDate'
import apiGatewayStub from '../../utils/apiGatewayStub'
import { isDeterminationStatusPending, ScenarioType } from '../../utils/getScenarioContent'

describe('The API gateway stub response for the Determination Interview scenarios', () => {
  it('is correct for Scenario 1', () => {
    const response = apiGatewayStub(ScenarioType.Scenario1)
    expect(response.pendingDetermination.length).toBe(1)
    const pendingDetermination = response.pendingDetermination
    expect([null, false, undefined, '']).toContain(pendingDetermination.determinationStatus)
    expect([null, false, undefined, '']).toContain(pendingDetermination.scheduleDate)
    expect(pendingDetermination.requestDate).not.toBe('')
  })

  it('is correct for Scenario 2', () => {
    const response = apiGatewayStub(ScenarioType.Scenario2)
    expect(response.pendingDetermination.length).toBe(1)

    const pendingDetermination = response.pendingDetermination[0]
    expect(isDeterminationStatusPending(pendingDetermination)).toBe(true)

    expect(isValidDate(pendingDetermination.scheduleDate)).toBe(true)

    const convertedDate = parseApiGatewayDate(pendingDetermination.scheduleDate)
    expect(isDatePast(convertedDate)).toBe(false)
  })

  it('is correct for Scenario 3', () => {
    const response = apiGatewayStub(ScenarioType.Scenario3)
    expect(response.pendingDetermination.length).toBe(1)

    const pendingDetermination = response.pendingDetermination[0]
    expect(isDeterminationStatusPending(pendingDetermination)).toBe(true)

    expect(isValidDate(pendingDetermination.scheduleDate)).toBe(true)

    const convertedDate = parseApiGatewayDate(pendingDetermination.scheduleDate)
    expect(isDatePast(convertedDate)).toBe(true)
  })
})

describe('The API gateway stub response for the Generic Pending state', () => {
  it('is correct for Scenario 4', () => {
    const response = apiGatewayStub(ScenarioType.Scenario4)
    expect([null, [], false, undefined]).toContain(response.pendingDetermination)
    expect(response.hasPendingWeeks).toBe(true)
    expect(response.hasValidPendingWeeks).toBe(true)
    expect([true, false]).toContain(response.hasCertificationWeeksAvailable)
  })
})

describe('The API gateway stub response for the Base States', () => {
  it('is correct for Scenario 5', () => {
    const response = apiGatewayStub(ScenarioType.Scenario5)
    expect([null, [], false, undefined]).toContain(response.pendingDetermination)
    expect(response.hasPendingWeeks).toBe(false)
    expect(response.hasValidPendingWeeks).toBe(false)
    expect(response.hasCertificationWeeksAvailable).toBe(false)
  })

  it('is correct for Scenario 6', () => {
    const response = apiGatewayStub(ScenarioType.Scenario6)
    expect([null, [], false, undefined]).toContain(response.pendingDetermination)
    expect(response.hasPendingWeeks).toBe(false)
    expect(response.hasValidPendingWeeks).toBe(false)
    expect(response.hasCertificationWeeksAvailable).toBe(true)
  })
})

describe('The API gateway stub response for the Bye States', () => {
  it('is correct for Scenario 7', () => {
    const response = apiGatewayStub(ScenarioType.Scenario7)
    // make sure no higher precedence scenarios will apply
    expect([null, [], false, undefined]).toContain(response.pendingDetermination)
    expect(response.hasPendingWeeks).toBe(false)
    expect(response.hasValidPendingWeeks).toBe(false)
    expect(response.hasCertificationWeeksAvailable).toBe(false)
    // check the BYE settings
    expect(response.isBye).toBe(true)
    expect(response.claimDetails?.programType).toBe('UI')
  })

  it('is correct for Scenario 8', () => {
    const response = apiGatewayStub(ScenarioType.Scenario8)
    // make sure no higher precedence scenarios will apply
    expect([null, [], false, undefined]).toContain(response.pendingDetermination)
    expect(response.hasPendingWeeks).toBe(false)
    expect(response.hasValidPendingWeeks).toBe(false)
    expect(response.hasCertificationWeeksAvailable).toBe(false)
    // check the BYE settings
    expect(response.isBye).toBe(true)
    expect(response.claimDetails?.programType).toBe('EUC')
  })

  it('is correct for Scenario 9', () => {
    const response = apiGatewayStub(ScenarioType.Scenario9)
    // make sure no higher precedence scenarios will apply
    expect([null, [], false, undefined]).toContain(response.pendingDetermination)
    expect(response.hasPendingWeeks).toBe(false)
    expect(response.hasValidPendingWeeks).toBe(false)
    expect(response.hasCertificationWeeksAvailable).toBe(false)
    // check the BYE settings
    expect(response.isBye).toBe(true)
    expect(response.claimDetails?.programType).toBe('PUA')
  })

  it('is correct for Scenario 10', () => {
    const response = apiGatewayStub(ScenarioType.Scenario10)
    // make sure no higher precedence scenarios will apply
    expect([null, [], false, undefined]).toContain(response.pendingDetermination)
    expect(response.hasPendingWeeks).toBe(false)
    expect(response.hasValidPendingWeeks).toBe(false)
    expect(response.hasCertificationWeeksAvailable).toBe(false)
    // check the BYE settings
    expect(response.isBye).toBe(true)
    expect(response.claimDetails?.programType).toBe('DUA')
  })
})
