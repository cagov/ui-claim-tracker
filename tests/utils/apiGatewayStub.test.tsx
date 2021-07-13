import apiGatewayStub from '../../utils/apiGatewayStub'
import { ScenarioType } from '../../utils/getScenarioContent'

describe('The API gateway stub response for the Pending Determination scenario', () => {
  it('is correct', () => {
    const response = apiGatewayStub(ScenarioType.Scenario1)
    expect(response.pendingDetermination.length).toBeGreaterThan(0)
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
