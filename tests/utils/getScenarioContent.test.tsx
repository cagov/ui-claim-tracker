import { getScenario, ScenarioType } from '../../utils/getScenarioContent'
import apiGatewayStub from '../../utils/apiGatewayStub'

/**
 * Test getScenario()
 *
 * Refer to ScenarioType and ScenarioTypeNames for which scenario has which number.
 */

// Scenario 1
describe('Scenario 1', () => {
  it('is returned when there is a pendingDetermination object', () => {
    const pendingDeterminationScenario = apiGatewayStub(ScenarioType.Scenario1)
    const scenarioType = getScenario(pendingDeterminationScenario)
    expect(scenarioType).toBe(ScenarioType.Scenario1)
  })

  it('is returned when there is a pendingDetermination object regardless of other criteria', () => {
    const pendingDeterminationScenarioWith = {
      pendingDetermination: ['temporary text'],
      hasPendingWeeks: true,
    }
    const scenarioTypeWith = getScenario(pendingDeterminationScenarioWith)
    expect(scenarioTypeWith).toBe(ScenarioType.Scenario1)

    const pendingDeterminationScenarioWithout = {
      pendingDetermination: ['temporary text'],
      hasPendingWeeks: false,
    }
    const scenarioTypeWithout = getScenario(pendingDeterminationScenarioWithout)
    expect(scenarioTypeWithout).toBe(ScenarioType.Scenario1)
  })

  it('is not returned if pendingDetermination is null', () => {
    const pendingDeterminationScenarioNull = { pendingDetermination: null }
    const scenarioTypeNull = getScenario(pendingDeterminationScenarioNull)
    expect(scenarioTypeNull).not.toBe(ScenarioType.Scenario1)
  })

  it('is not returned if pendingDetermination is an empty array', () => {
    const pendingDeterminationScenarioEmpty = { pendingDetermination: [] }
    const scenarioTypeEmpty = getScenario(pendingDeterminationScenarioEmpty)
    expect(scenarioTypeEmpty).not.toBe(ScenarioType.Scenario1)
  })
})

// Scenario 4
describe('The Generic Pending scenario', () => {
  it('is returned as expected', () => {
    const scenarioType = ScenarioType.Scenario4
    expect(getScenario(apiGatewayStub(scenarioType))).toBe(scenarioType)
  })
})

// Scenarios 5 & 6
describe('The Base State scenarios', () => {
  it('are returned as expected', () => {
    const baseScenarios = [ScenarioType.Scenario5, ScenarioType.Scenario6]
    for (const scenarioType of baseScenarios) {
      expect(getScenario(apiGatewayStub(scenarioType))).toBe(scenarioType)
    }
  })
})
