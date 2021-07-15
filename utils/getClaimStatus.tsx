/**
 * Utility file to get content for the Claim Status section.
 */

import claimStatusJson from '../public/locales/en/claim-status.json'
import { ClaimStatusContent, I18nString, TextOptionalLink, TransLineProps } from '../types/common'
import { ScenarioType } from './getScenarioContent'
import getUrl, { UrlType } from './getUrl'

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
 *
 * Note: This function has a lot of verbosity due to Typescript + eslint.
 */
export function getClaimStatusSummary(scenarioType: ScenarioType): TransLineProps {
  const transLineProps: TransLineProps = {
    i18nKey: getTranslationPrefix(scenarioType) + '.summary.text',
  }
  // Explicitly initialize to an empty array.
  transLineProps.links = []

  // Explicitly cast the scenarioType into one of the keys of claim-status.json
  // (i.e. scenario1 | scenario2 etc)
  const scenarioString = ScenarioType[scenarioType].toLowerCase() as keyof typeof claimStatusJson.scenarios
  // Retrieve the summary links for the current scenario.
  const summary = claimStatusJson.scenarios[scenarioString].summary as TextOptionalLink
  const linkKeys = summary.links

  // Lookup each link and send the array to the TransLine component.
  if (linkKeys && linkKeys.length > 0) {
    for (const linkKey of linkKeys) {
      // Explicitly cast to one of the allowed keys in urls.json
      const key = linkKey as UrlType
      const url = getUrl(key)
      if (url) {
        transLineProps.links.push(url)
      }
    }
  }
  return transLineProps
}

/**
 * Get combined Claim Status content.
 */
export default function getClaimStatus(scenarioType: ScenarioType): ClaimStatusContent {
  getClaimStatusSummary(scenarioType)
  const statusContent: ClaimStatusContent = {
    heading: getClaimStatusHeading(scenarioType),
    summary: getClaimStatusSummary(scenarioType),
    yourNextSteps: [
      {
        i18nKey:
          'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
      },
      {
        i18nKey:
          'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
      },
    ],
  }

  return statusContent
}
