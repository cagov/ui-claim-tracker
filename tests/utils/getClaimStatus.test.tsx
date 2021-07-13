import { getClaimStatusDescription } from '../../utils/getClaimStatus'
import { ScenarioType } from '../../utils/getScenarioContent'
import { getNumericEnumKeys } from '../../utils/numericEnum'

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
