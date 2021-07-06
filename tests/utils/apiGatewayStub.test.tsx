import apiGatewayStub from '../../utils/apiGatewayStub'
import { ScenarioType } from '../../utils/getScenarioContent'

describe('The API gateway stub response for the Pending Determination scenario', () => {
  it('is correct', () => {
    const response = apiGatewayStub(ScenarioType.Scenario1)
    expect(response.pendingDetermination.length).toBeGreaterThan(0)
  })
})

describe('The API gateway stub response for the Base States', () => {
  it('is correct for Scenario 7', () => {
    const response = apiGatewayStub(ScenarioType.Scenario7)
    expect([null, [], false, undefined]).toContain(response.pendingDetermination)
    expect(response.hasPendingWeeks).toBe(false)
    expect(response.hasCertificationWeeksAvailable).toBe(false)
  })

  it('is correct for Scenario 8', () => {
    const response = apiGatewayStub(ScenarioType.Scenario8)
    expect([null, [], false, undefined]).toContain(response.pendingDetermination)
    expect(response.hasPendingWeeks).toBe(false)
    expect(response.hasCertificationWeeksAvailable).toBe(true)
  })

  it('is correct for Scenario 9', () => {
    const response = apiGatewayStub(ScenarioType.Scenario9)
    expect([null, [], false, undefined]).toContain(response.pendingDetermination)
    expect(response.hasPendingWeeks).toBe(true)
    expect(response.hasCertificationWeeksAvailable).toBe(false)
  })

  it('is correct for Scenario 10', () => {
    const response = apiGatewayStub(ScenarioType.Scenario10)
    expect([null, [], false, undefined]).toContain(response.pendingDetermination)
    expect(response.hasPendingWeeks).toBe(true)
    expect(response.hasCertificationWeeksAvailable).toBe(true)
  })
})
