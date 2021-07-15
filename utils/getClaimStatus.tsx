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

function getChildJson(jsonObject: Json, keys: string[], index: number): Json {
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
export function getTransLineProps(jsonObject: Json, keys: string[]): TransLineProps {
  // jsonObject could possibly be null.
  // if (!jsonObject) {
  //   throw new Error('Unable to retrieve JSON object')
  // }

  const targetJson = getChildJson(jsonObject, keys, 0)

  // Get the links.
  let links: string[] = []
  if (targetJson.links) {
    links = getTransLineLinks(targetJson.links as string[])
  }
  // const linksJson = getChildJson(targetJson, ['links'], 0)
  // const links = getTransLineLinks(linksJson as string[])

  // Append to the keys array to build the full i18nKey.
  keys.push('text')

  // Return the final TransLineProps object.
  return {
    i18nKey: 'claim-status:' + keys.join('.'),
    links: links,
  }
}

/**
 * Get Claim Status summary.
 */
export function getClaimStatusSummary(scenarioType: ScenarioType): TransLineProps {
  const keys = ['scenarios', scenarioToString(scenarioType), 'summary']
  return getTransLineProps(claimStatusJson as Json, keys)
}

/**
 * Get next steps content for Claim Status.
 */
export function getNextSteps(
  scenarioType: ScenarioType,
  whichSteps: 'your-next-steps' | 'edd-next-steps',
): TransLineProps[] {
  const steps: TransLineProps[] = []

  const scenarioString = scenarioToString(scenarioType)

  const outerKeys = ['scenarios', scenarioString, whichSteps]
  const targetJson = getChildJson(claimStatusJson, outerKeys, 0)

  for (const index of targetJson.keys()) {
    const innerKeys = outerKeys.slice()
    innerKeys.push(index)
    steps.push(getTransLineProps(claimStatusJson, innerKeys, 0))
  }
  return steps
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
