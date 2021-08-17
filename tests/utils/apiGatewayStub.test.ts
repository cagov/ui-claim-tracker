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
    expect([true, false]).toContain(response.hasCertificationWeeksAvailable)
  })
})

describe('The API gateway stub response for the Base States', () => {
  it('is correct for Scenario 5', () => {
    const response = apiGatewayStub(ScenarioType.Scenario5)
    expect([null, [], false, undefined]).toContain(response.pendingDetermination)
    expect(response.hasPendingWeeks).toBe(false)
    expect(response.hasCertificationWeeksAvailable).toBe(false)
  })

  it('is correct for Scenario 6', () => {
    const response = apiGatewayStub(ScenarioType.Scenario6)
    expect([null, [], false, undefined]).toContain(response.pendingDetermination)
    expect(response.hasPendingWeeks).toBe(false)
    expect(response.hasCertificationWeeksAvailable).toBe(true)
  })
})