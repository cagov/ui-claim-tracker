import { ScenarioType } from '../utils/getScenarioContent'
import { Claim } from '../types/common'

/**
 * Stub the API gateway response for a given scenario.
 */
export default function apiGatewayStub(scenarioType: ScenarioType): Claim {
  console.log('apiGatewayStub')
  const claim: Claim = {
    uniqueNumber: null,
    claimDetails: null,
    hasCertificationWeeksAvailable: false,
    hasPendingWeeks: false,
    pendingDetermination: null,
  }

  switch (scenarioType) {
    case ScenarioType.PendingDetermination:
      claim.pendingDetermination = [{ determinationStatus: null }]
      break

    case ScenarioType.BasePending:
      claim.hasPendingWeeks = true
      break

    // @TODO: This scenario should probably not be the default case.
    // case ScenarioType.BaseNoPending:

    // @TODO: No match should throw an error
    // default:
    //   throw new Error('Unknown scenario type')
  }

  return claim
}
