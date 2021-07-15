/**
 * Utility file to get content for the Claim Status section.
 */

import claimStatusJson from '../public/locales/en/claim-status.json'
import { ClaimStatusContent, I18nString, TransLineProps } from '../types/common'
import { ScenarioType } from './getScenarioContent'
import getUrl, { UrlType } from './getUrl'

type Json = string | number | boolean | null | Json[] | { [key: string]: Json }

/**
 * Convert a ScenarioType into the string key used in json translation files.
 */
export function scenarioToString(scenarioType: ScenarioType): string {
  return ScenarioType[scenarioType].toLowerCase()
}

/**
 * Helper function to get shared Claim Status translation string prefix.
 */
function getTranslationPrefix(scenarioType: ScenarioType): I18nString {
  return `claim-status:scenarios.${scenarioToString(scenarioType)}`
}

/**
 * Get Claim Status heading.
 */
export function getClaimStatusHeading(scenarioType: ScenarioType): I18nString {
  return getTranslationPrefix(scenarioType) + '.heading'
}

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

function getChildJson(jsonObject: Json, keys: string[], index: number = 0): Json {
  if (!jsonObject) {
    throw new Error('JSON error')
  }

  if (index < keys.length) {
    const key = keys[index]
    type jsonType = keyof typeof jsonObject
    const castKey = key as jsonType
    const newJson = jsonObject[castKey]
    // Recurse.
    return getChildJson(newJson, keys, index + 1)
  }
  // Leaf.
  else {
    return jsonObject
  }
}

/**
 * Build props to pass to the TransLine react component.
 */
export function getTransLineProps(targetJson: Json, i18nKey: string): TransLineProps {
  // jsonObject could possibly be null.
  // if (!jsonObject) {
  //   throw new Error('Unable to retrieve JSON object')
  // }

  // // Get the links.
  // let links: string[] = []
  // if (textObject.links) {
  //   links = getTransLineLinks(targetJson.links as string[])
  // }
  // const linksJson = getChildJson(targetJson, ['links'], 0)
  const links = getTransLineLinks(targetJson.links as string[])

  // Append to the keys array to build the full i18nKey.
  // keys.push('text')

  // Return the final TransLineProps object.
  return {
    i18nKey: i18nKey,
    links: links,
  }
}

function buildI18nKey(keys: string[]): I18nString {
  return 'claim-status:' + keys.join('.') + '.text'
}

/**
 * Get Claim Status summary.
 */
export function getClaimStatusSummary(scenarioObject: Json, scenarioString: string): TransLineProps {
  const keys = ['scenarios', scenarioString, 'summary']
  const jsonObject = getChildJson(scenarioObject, ['summary'])
  return getTransLineProps(jsonObject, buildI18nKey(keys))
}

/**
 * Get next steps content for Claim Status.
 */
export function getNextSteps(
  scenarioObject: Json,
  scenarioString: string,
  whichSteps: 'your-next-steps' | 'edd-next-steps',
): TransLineProps[] {
  const steps: TransLineProps[] = []

  const targetJson = getChildJson(scenarioObject, [whichSteps])
  for (const [index, value] of targetJson.entries()) {
    const keys = ['scenarios', scenarioString, whichSteps, index]
    steps.push(getTransLineProps(value, buildI18nKey(keys)))
  }
  return steps
}

/**
 * Get combined Claim Status content.
 */
export default function getClaimStatus(scenarioType: ScenarioType): ClaimStatusContent {
  const scenarioString = scenarioToString(scenarioType)
  const scenarioObject = getChildJson(claimStatusJson, ['scenarios', scenarioString])

  const statusContent: ClaimStatusContent = {
    heading: getClaimStatusHeading(scenarioType),
    summary: getClaimStatusSummary(scenarioObject, scenarioString),
    yourNextSteps: getNextSteps(scenarioObject, scenarioString, 'your-next-steps'),
    // yourNextSteps: [{ i18nKey: '' }],
  }

  return statusContent
}
