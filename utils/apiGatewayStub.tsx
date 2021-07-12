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
export default function apiGatewayStub(scenarioType: ScenarioType, hasClaimDetails = true): Claim {
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

  if (hasClaimDetails) {
    claim.claimDetails = {
      programType: 'PEUC - Tier 2 Extension',
      benefitYearStartDate: '3/21/2020',
      benefitYearEndDate: '3/20/2021',
      claimBalance: 1100.45,
      weeklyBenefitAmount: 111,
      lastPaymentIssued: '4/29/2021',
      lastPaymentAmount: 100,
      monetaryStatus: 'Active',
    }
  }

  return claim
}
