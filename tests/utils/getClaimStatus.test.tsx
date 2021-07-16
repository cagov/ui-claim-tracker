import { buildClaimStatusHeading } from '../../utils/getClaimStatus'
import { ScenarioType } from '../../utils/getScenarioContent'
import { getNumericEnumKeys } from '../../utils/numericEnum'

// Test buildClaimStatusHeading()
describe('The Claim Status heading', () => {
  it('is correct for each scenario', () => {
    for (const key of getNumericEnumKeys(ScenarioType)) {
      expect(buildClaimStatusHeading(key)).toEqual(
        expect.stringMatching(/claim-status:scenarios.scenario[0-9]+.heading/),
      )
    }
  })
})
