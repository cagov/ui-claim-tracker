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
// Note: These tests test against real content
describe('The Claim Status summary', () => {
  it('is correct for scenarios with no links', () => {
    const scenarioType = ScenarioType.Scenario1
    const expected = {
      i18nKey: 'claim-status:scenarios.scenario1.summary.text',
      links: [],
    }
    expect(getClaimStatusSummary(scenarioType)).toEqual(expected)
  })

  it('is correct for scenarios with links', () => {
    const scenarioType = ScenarioType.Scenario6
    const summary = getClaimStatusSummary(scenarioType)
    expect(summary.i18nKey).toEqual('claim-status:scenarios.scenario6.summary.text')
    expect(summary.links.length).toEqual(1)
  })
})
