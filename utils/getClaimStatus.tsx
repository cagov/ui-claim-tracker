/**
 * Utility file to get content for the Claim Status section.
 */

import { ClaimStatusContent, I18nString } from '../types/common'
import { ScenarioType } from './getScenarioContent'

/**
 * Get Claim Status description content.
 */
export function getClaimStatusDescription(scenarioType: ScenarioType): I18nString {
  return `claim-status:scenarios.${ScenarioType[scenarioType].toLowerCase()}.description`
}

/**
 * Get combined Claim Status content.
 */
export default function getClaimStatus(scenarioType: ScenarioType): ClaimStatusContent {
  const statusContent: ClaimStatusContent = {
    statusDescription: getClaimStatusDescription(scenarioType),
    nextSteps: [
      'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
      'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
    ],
  }

  return statusContent
}
