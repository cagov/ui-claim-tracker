import { getClaimStatusDescription, getScenario, ScenarioType } from '../../utils/getScenarioContent'
import apiGatewayStub from '../../utils/apiGatewayStub'
import { getNumericEnumKeys } from '../../utils/numericEnum'

/**
 * Begin tests
 */

// Test getClaimStatusDescripton()
describe('Getting the Claim Status description', () => {
  it('returns the correct description for the scenario', () => {
    for (const key of getNumericEnumKeys(ScenarioType)) {
      expect(getClaimStatusDescription(key)).toEqual(
        expect.stringMatching(/claim-status:scenarios.scenario[0-9]+.description/),
      )
    }
  })
})

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

// Scenarios 7-10
describe('The base scenarios', () => {
  it('are returned as expected', () => {
    const baseScenarios = [
      ScenarioType.Scenario7,
      ScenarioType.Scenario8,
      ScenarioType.Scenario9,
      ScenarioType.Scenario10,
    ]
    for (const scenarioType of baseScenarios) {
      expect(getScenario(apiGatewayStub(scenarioType))).toBe(scenarioType)
    }
  })
})
