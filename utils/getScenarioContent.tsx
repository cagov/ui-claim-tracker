/**
 * Utility file for returning the correct content for each scenario.
 *
 * Scenarios are referred to by number and the numbers match the content spreadsheet from
 * UIB. The ScenarioType enum is a numeric enum so that we can take advantage of the
 * built-in Typescript reverse mapping for numeric enums. However, we set the long-form
 * description in ScenarioTypeNames for easy(ish) reference.
 */

import { Claim, ClaimDetailsContent, ScenarioContent } from '../types/common'
import getClaimDetails from './getClaimDetails'
import getClaimStatus from './getClaimStatus'

export enum ScenarioType {
  Scenario1,
  Scenario7,
  Scenario8,
  Scenario9,
  Scenario10,
}

export const ScenarioTypeNames = {
  [ScenarioType.Scenario1]: 'Pending determination scenario',
  [ScenarioType.Scenario7]: 'Base state; No pending weeks; No weeks to certify',
  [ScenarioType.Scenario8]: 'Base state; No pending weeks; Has weeks to certify',
  [ScenarioType.Scenario9]: 'Base state; Has pending weeks; No weeks to certify',
  [ScenarioType.Scenario10]: 'Base state; Has pending weeks; Has weeks to certify',
}

/**
 * Identify the correct scenario to display.
 *
 * @TODO: Validating the API gateway response #150
 */
export function getScenario(claimData: Claim): ScenarioType {
  // The pending determination scenario: if claimData contains any pendingDetermination
  // objects
  // @TODO: refactor with more detailed pending determination scenarios #252
  if (claimData.pendingDetermination && claimData.pendingDetermination.length > 0) {
    return ScenarioType.Scenario1
  }

  // No pendingDetermination objects: display a Base State scenario.
  else {
    // @TODO: Validate that hasPendingWeeks is a boolean
    if (claimData.hasPendingWeeks === false) {
      // @TODO: Validate that hasCertificationWeeks is a boolean
      if (claimData.hasCertificationWeeksAvailable === false) {
        return ScenarioType.Scenario7
      } else {
        return ScenarioType.Scenario8
      }
    }
    // hasPendingWeeks === true
    else {
      if (claimData.hasCertificationWeeksAvailable === false) {
        return ScenarioType.Scenario9
      } else {
        return ScenarioType.Scenario10
      }
    }
  }
}

/**
 * Return scenario content.
 */
export default function getScenarioContent(claimData: Claim): ScenarioContent {
  // Get the scenario type.
  const scenarioType = getScenario(claimData)

  // Construct claim status content.
  const statusContent = getClaimStatus(scenarioType)

  // Construct claim details content.
  if (!claimData.claimDetails) {
    throw new Error('Missing claim details')
  }
  const detailsContent: ClaimDetailsContent = getClaimDetails(claimData.claimDetails)

  const content: ScenarioContent = {
    statusContent: statusContent,
    detailsContent: detailsContent,
  }

  return content
}
