/**
 * Stub for the API gateway.
 *
 * Provides stub responses for API gateway queries for Storybook and Jest testing.
 */

import { ScenarioType } from '../utils/getScenarioContent'
import { Claim } from '../types/common'

/**
 * Stub the API gateway response for a given scenario.
 */
export default function apiGatewayStub(scenarioType: ScenarioType): Claim {
  const claim: Claim = {
    uniqueNumber: null,
    claimDetails: null,
    hasCertificationWeeksAvailable: false,
    hasPendingWeeks: false,
    pendingDetermination: null,
  }

  switch (scenarioType) {
    case ScenarioType.Scenario1:
      claim.pendingDetermination = [{ determinationStatus: null }]
      break

    // @TODO: This scenario should probably not be the default case.
    // case ScenarioType.Scenario7:

    case ScenarioType.Scenario8:
      claim.hasCertificationWeeksAvailable = true
      break

    case ScenarioType.Scenario9:
      claim.hasPendingWeeks = true
      break

    case ScenarioType.Scenario10:
      claim.hasPendingWeeks = true
      claim.hasCertificationWeeksAvailable = true
      break

    // @TODO: No match should throw an error
    // default:
    //   throw new Error('Unknown scenario type')
  }

  return claim
}
