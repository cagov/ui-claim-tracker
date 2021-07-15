/**
 * Utility file to get content for the Claim Status section.
 */

import claimStatusJson from '../public/locales/en/claim-status.json'
import { ClaimStatusContent, I18nString, TransLineProps } from '../types/common'
import { ScenarioType } from './getScenarioContent'
import getUrl, { UrlType } from './getUrl'

type Json = string | number | boolean | null | Json[] | { [key: string]: Json }

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

// /**
//  * Convert a ScenarioType into the string key used in json translation files.
//  */
// export function scenarioToString(scenarioType: ScenarioType): JsonScenario {
//   return ScenarioType[scenarioType].toLowerCase() as JsonScenario
// }

/**
 * Build a list of urls from keys in the json translation files.
 */
export function getTransLineLinks(linkKeys: string[] | undefined): string[] {
  const links: string[] = []
  if (linkKeys) {
    if (linkKeys && linkKeys.length > 0) {
      for (const linkKey of linkKeys) {
        // Explicitly cast to one of the allowed keys in urls.json
        const key = linkKey as UrlType
        const url = getUrl(key)
        if (url) {
          links.push(url)
        }
      }
    }
  }
  return links
}

function getChildJson(jsonObject: Json, key: string): Json {
  if (!jsonObject) {
    throw new Error('JSON error')
  }

  type jsonType = keyof typeof jsonObject
  const castKey = key as jsonType
  const newJson = jsonObject[castKey]
  return newJson
}

/**
 * Build props to pass to the TransLine react component.
 */
export function getTransLineProps(jsonObject: Json, keys: string[], index: number): TransLineProps {
  // jsonObject could possibly be null.
  if (!jsonObject) {
    throw new Error('Unable to retrieve JSON object')
  }

  if (index < keys.length) {
    const key = keys[index]
    const newJson = getChildJson(jsonObject, key)
    return getTransLineProps(newJson, keys, index + 1)
  }
  // index === keys.length
  else {
    // Get the links.
    const newJson = getChildJson(jsonObject, 'links')
    const links = getTransLineLinks(newJson as string[])

    // Append to the keys array to build the full i18nKey.
    keys.push('text')

    // Return the final TransLineProps object.
    return {
      i18nKey: 'claim-status:' + keys.join('.'),
      links: links,
    }
  }
}

/**
 * Get Claim Status summary.
 */
export function getClaimStatusSummary(scenarioType: ScenarioType): TransLineProps {
  const keys = ['scenarios', ScenarioType[scenarioType].toLowerCase(), 'summary']
  return getTransLineProps(claimStatusJson as Json, keys, 0)
}

/**
 * Get next steps content for Claim Status.
 */
export function getNextSteps(
  scenarioType: ScenarioType,
  whichSteps: 'your-next-steps' | 'edd-next-steps',
): TransLineProps[] {
  const steps: TransLineProps[] = []

  // const scenarioString: JsonScenario = scenarioToString(scenarioType)
  // const currentScenario = claimStatusJson.scenarios[scenarioString]

  // // Create dynamic type for the current scenario.
  // type currentScenarioType = keyof typeof currentScenario
  const scenarioString = ScenarioType[scenarioType].toLowerCase()
  const wrapper = claimStatusJson.scenarios[scenarioString][whichSteps]

  for (const index of wrapper.keys()) {
    const keys = ['scenarios', scenarioString, whichSteps, index]
    steps.push(getTransLineProps(claimStatusJson, keys, 0))
  }
  return steps

  // for (const [index, value] of claimStatusJson.scenarios.scenario4[whichSteps]) {
  //   const keys = ['scenarios', ScenarioType[scenarioType].toLowerCase(), whichSteps, index]
  //   yourNextSteps.push(getTransLineProps(claimStatusJson, keys, 0))
  // }
}

/**
 * Get combined Claim Status content.
 */
export default function getClaimStatus(scenarioType: ScenarioType): ClaimStatusContent {
  const statusContent: ClaimStatusContent = {
    heading: getClaimStatusHeading(scenarioType),
    summary: getClaimStatusSummary(scenarioType),
    yourNextSteps: getNextSteps(scenarioType, 'your-next-steps'),
  }

  return statusContent
}
