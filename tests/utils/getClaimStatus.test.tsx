import { getClaimStatusHeading } from '../../utils/getClaimStatus'
import { ScenarioType } from '../../utils/getScenarioContent'
import { getNumericEnumKeys } from '../../utils/numericEnum'

// Test getClaimStatusHeading()
describe('The Claim Status heading', () => {
  it('is correct for each scenario', () => {
    for (const key of getNumericEnumKeys(ScenarioType)) {
      expect(getClaimStatusHeading(key)).toEqual(expect.stringMatching(/claim-status:scenarios.scenario[0-9]+.heading/))
    }
  })
})
