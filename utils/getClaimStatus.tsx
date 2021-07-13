/**
 * Utility file to get content for the Claim Status section.
 */

import { ClaimStatusContent, I18nString, TransLineProps } from '../types/common'
import { ScenarioType } from './getScenarioContent'

/**
 * Helper function to get shared Claim Status translation string prefix.
 */
function getTranslationPrefix(scenarioType: ScenarioType): I18nString {
  return `claim-status:scenarios.${ScenarioType[scenarioType].toLowerCase()}`
}

/**
 * Get Claim Status heading.
 */
export function getClaimStatusHeading(scenarioType: ScenarioType): I18nString {
  return getTranslationPrefix(scenarioType) + '.heading'
}

/**
 * Get Claim Status summary.
 */
export function getClaimStatusSummary(scenarioType: ScenarioType): TransLineProps {
  const transLineProps = {
    i18nKey: getTranslationPrefix(scenarioType) + '.summary.text',
  }
  const linkKeys = getTranslationPrefix(scenarioType) + '.summary.links'
  // console.log(getUrls())
  // const urls = getUrls(linkKeys)
  // if (urls) {
  //   transLineProps.links = urls
  // }
  return transLineProps
}

/**
 * Get combined Claim Status content.
 */
export default function getClaimStatus(scenarioType: ScenarioType): ClaimStatusContent {
  getClaimStatusSummary(scenarioType)
  const statusContent: ClaimStatusContent = {
    heading: getClaimStatusHeading(scenarioType),
    nextSteps: [
      'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
      'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
    ],
  }

  return statusContent
}
