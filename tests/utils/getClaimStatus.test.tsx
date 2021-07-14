import { getClaimStatusHeading, getClaimStatusSummary } from '../../utils/getClaimStatus'
import { ScenarioType } from '../../utils/getScenarioContent'
import { getNumericEnumKeys } from '../../utils/numericEnum'
import claimStatusJson from '../../public/locales/en/claim-status.json'

// Test getClaimStatusHeading()
describe('The Claim Status heading', () => {
  it('is correct for each scenario', () => {
    for (const key of getNumericEnumKeys(ScenarioType)) {
      expect(getClaimStatusHeading(key)).toEqual(expect.stringMatching(/claim-status:scenarios.scenario[0-9]+.heading/))
    }
  })
})

// Test getClaimStatusSummary()
describe('The Claim Status summary', () => {
  it('is correct for each scenario', () => {
    for (const key of getNumericEnumKeys(ScenarioType)) {
      const summary = getClaimStatusSummary(key)
      const scenarioString = ScenarioType[key].toLowerCase() as keyof typeof claimStatusJson.scenarios

      // Test the summary text.
      expect(summary.i18nKey).toEqual(`claim-status:scenarios.${scenarioString}.summary.text`)

      // Test the summary links.
      const scenarioLinks = claimStatusJson.scenarios[scenarioString].summary.links
      if (scenarioLinks) {
        expect(summary.links.length).toEqual(claimStatusJson.scenarios[scenarioString].summary.links.length)
      } else {
        expect(summary.links).ToBe(undefined)
      }
    }
  })
})
