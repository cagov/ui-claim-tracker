/**
 * Stub for the API gateway.
 *
 * Provides stub responses for API gateway queries for Storybook and Jest testing.
 */

import { Claim, PendingDetermination } from '../types/common'
import { ScenarioType } from '../utils/getScenarioContent'
import { formatFromApiGateway } from '../utils/formatDate'

/**
 * Stub the API gateway response for a given scenario.
 */
export default function apiGatewayStub(
  scenarioType: ScenarioType,
  hasCertificationWeeksAvailable = false,
  hasClaimDetails = true,
  programType = 'UI',
  benefitYearEndDate = '2021-03-20T00:00:00',
): Claim {
  // Default empty response from the API gateway
  const claim: Claim = {
    uniqueNumber: null,
    claimDetails: null,
    hasCertificationWeeksAvailable: false,
    isBYE: false,
    hasValidPendingWeeks: false,
    pendingDetermination: null,
  }

  const pendingDetermination: PendingDetermination = {
    pendingDate: '',
    scheduleDate: '',
    timeSlotDesc: '',
    requestDate: '',
    determinationStatus: '',
    willCallIndicator: false,
    spokenLanguageCode: '',
    spokenLanguageDesc: '',
  }

  // If this is a known scenarioType, set a uniqueNumber.
  if (scenarioType in ScenarioType) {
    claim.uniqueNumber = '12345'
  }

  switch (scenarioType) {
    case ScenarioType.Scenario1:
      pendingDetermination.determinationStatus = ''
      pendingDetermination.scheduleDate = ''
      pendingDetermination.requestDate = formatFromApiGateway(-30)
      claim.pendingDetermination = [pendingDetermination]
      claim.hasCertificationWeeksAvailable = hasCertificationWeeksAvailable
      break

    case ScenarioType.Scenario2:
      pendingDetermination.determinationStatus = ''
      pendingDetermination.scheduleDate = formatFromApiGateway(7)
      pendingDetermination.timeSlotDesc = '1-3'
      claim.pendingDetermination = [pendingDetermination]
      claim.hasCertificationWeeksAvailable = hasCertificationWeeksAvailable
      break

    case ScenarioType.Scenario3:
      pendingDetermination.determinationStatus = ''
      pendingDetermination.scheduleDate = formatFromApiGateway(-7)
      claim.pendingDetermination = [pendingDetermination]
      claim.hasCertificationWeeksAvailable = hasCertificationWeeksAvailable
      break

    case ScenarioType.Scenario4:
      claim.hasValidPendingWeeks = true
      claim.hasCertificationWeeksAvailable = hasCertificationWeeksAvailable
      break

    // Note that Scenarios 5 & 6 explicitly differ based on whether hasCertificationWeeksAvailable
    // is true or false, so we ignore the argument.
    case ScenarioType.Scenario5:
      claim.hasValidPendingWeeks = false
      claim.hasCertificationWeeksAvailable = false
      break

    case ScenarioType.Scenario6:
      claim.hasValidPendingWeeks = false
      claim.hasCertificationWeeksAvailable = true
      break

    case ScenarioType.Scenario7:
      claim.isBYE = true
      claim.pendingDetermination = [] // test this alternative null pendingDetermination
      hasClaimDetails = true
      programType = 'UI'
      break

    case ScenarioType.Scenario8:
      claim.isBYE = true
      hasClaimDetails = true
      programType = 'PUA'
      break

    case ScenarioType.Scenario9:
      claim.isBYE = true
      hasClaimDetails = true
      programType = 'DUA'
      break

    case ScenarioType.Scenario10:
      claim.isBYE = true
      hasClaimDetails = true
      programType = 'EUW - Tier 3 Extension'
      break

    case ScenarioType.Scenario11:
      claim.isBYE = true
      hasClaimDetails = true
      programType = 'PEUC - Tier 1 Extension'
      break

    case ScenarioType.Scenario12:
      claim.isBYE = true
      hasClaimDetails = true
      programType = 'FED-ED Extension'
      break

    // No match should throw an error
    default:
      throw new Error('Unknown scenario type')
  }

  if (hasClaimDetails) {
    claim.claimDetails = {
      programType: programType,
      benefitYearStartDate: '2020-03-21T00:00:00',
      benefitYearEndDate: benefitYearEndDate,
      claimBalance: 1100.45,
      weeklyBenefitAmount: 111,
      lastPaymentIssued: '2021-04-29T00:00:00',
      lastPaymentAmount: 100,
      monetaryStatus: 'Active',
    }
  } else {
    claim.claimDetails = null
  }

  return claim
}
