/**
 * Utility file to get content for the Claim Status section.
 */

import claimStatusJson from '../public/locales/en/claim-status.json'
import { ClaimStatusContent, I18nString, TextOptionalLink, TransLineProps } from '../types/common'
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

/**
 * Build props to pass to the TransLine react component.
 */
export function getTransLineProps(jsonObject: Json, keys: string[], index: number): TransLineProps {
  // jsonObject could possibly be null
  if (!jsonObject) {
    throw new Error('Unable to retrieve JSON object')
  }

  let isLeaf = false
  if (index >= keys.length) {
    isLeaf = true
    keys.push('links')
  }

  const key = keys[index]
  type jsonType = keyof typeof jsonObject
  const castKey = key as jsonType
  const newJson = jsonObject[castKey]

  if (!isLeaf) {
    return getTransLineProps(newJson, keys, index + 1)
  }
  // Leaf node.
  else {
    keys.pop()
    keys.push('text')

    console.log(jsonObject)
    const links = getTransLineLinks(jsonObject as string[])
    console.log(links)

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
  return getTransLineProps(claimStatusJson, keys, 0)
}

/**
 * Get next steps content for Claim Status.
 */
// export function getNextSteps(scenarioType: ScenarioType): void {
//   const yourNextSteps: TransLineProps[] = []

//   const scenarioString: JsonScenario = scenarioToString(scenarioType)
//   const currentScenario = claimStatusJson.scenarios[scenarioString]

//   // Create dynamic type for the current scenario.
//   type currentScenarioType = keyof typeof currentScenario

//   // Cast the indexer to the new dynamic type.
//   const convertedIndexer = indexer as currentScenarioType

//   // Retrieve the text + links.
//   const wrapper = currentScenario[convertedIndexer] as TextOptionalLink

//   for (const [index, value] of currentScenario['your-next-steps']) {
//     const transLine: TransLineProps = {
//       i18nKey: getTranslationPrefix(scenarioType) + `.your-next-steps.${index}.text`,
//     }
//   }
// }

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
