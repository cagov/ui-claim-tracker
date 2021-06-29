import { Claim, ClaimDetailsContent, ClaimStatusContent, ScenarioContent } from '../types/common'

export enum ScenarioType {
  PendingDetermination = 'Pending determination scenario',
  BasePending = 'Base state with pending weeks',
  BaseNoPendingActive = 'Base state with no pending weeks; Active claim',
  BaseNoPendingInactive = 'Base state with no pending weeks; Inactive claim',
}

/**
 * Identify the correct scenario to display.
 */
export function getScenario(claimData: Claim): ScenarioType {
  // The pending determination scenario: if claimData contains any pendingDetermination
  // objects
  // @TODO: refactor with more detailed pending determination scenarios #252
  if (claimData.pendingDetermination && claimData.pendingDetermination.length > 0) {
    return ScenarioType.PendingDetermination
  }
  // The base state (with pending weeks) scenario:
  // - there are no pendingDetermination objects AND
  // - hasPendingWeeks is true
  else if (claimData.hasPendingWeeks === true) {
    return ScenarioType.BasePending
  } else if (claimData.hasPendingWeeks === false) {
    if (claimData.claimDetails) {
      // The base state (with no pending weeks); active claim scenario:
      // - there are no pendingDetermination objects AND
      // - hasPendingWeeks is false AND
      // - monetaryStatus is "active"
      if (claimData.claimDetails.monetaryStatus && claimData.claimDetails.monetaryStatus.toLowerCase() === 'active') {
        return ScenarioType.BaseNoPendingActive
      }
      // The base state (with no pending weeks); Inactive claim scenario:
      // - there are no pendingDetermination objects AND
      // - hasPendingWeeks is false AND
      // - monetaryStatus is not "active"
      else {
        return ScenarioType.BaseNoPendingInactive
      }
    } else {
      // @TODO: This should throw an error
      // throw new Error('Missing claim details')
      return ScenarioType.BaseNoPendingInactive
    }
  } else {
    // @TODO: This should throw an error
    // throw new Error('Unknown Scenario')
    return ScenarioType.BaseNoPendingInactive
  }
}

/**
 * Get Claim Status description content.
 * This returns an i18n string.
 */
export function getClaimStatusDescription(scenarioType: ScenarioType): string {
  switch (scenarioType) {
    case ScenarioType.PendingDetermination:
      return 'claim-status:pending-determination.description'
    case ScenarioType.BasePending:
      return 'claim-status:base-pending.description'
    case ScenarioType.BaseNoPendingActive:
      return 'claim-status:base-no-pending-active.description'
    case ScenarioType.BaseNoPendingInactive:
      return 'claim-status:base-no-pending-inactive.description'
  }

  // If an unknown Scenario Type is given, throw an error.
  throw new Error('Unknown Scenario Type')
}

/**
 * Get Claim Status content.
 */
export function buildClaimStatusContent(scenarioType: ScenarioType): ClaimStatusContent {
  const statusContent: ClaimStatusContent = {
    statusDescription: getClaimStatusDescription(scenarioType),
    nextSteps: [
      'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
      'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
    ],
  }

  return statusContent
}

/**
 * Return scenario content.
 */
export default function getScenarioContent(claimData: Claim): ScenarioContent {
  // Get the scenario type.
  const scenarioType = getScenario(claimData)

  // Construct claim status content.
  const statusContent = buildClaimStatusContent(scenarioType)

  // Construct claim details content.
  // @TODO: Remove placeholder default content
  const detailsContent: ClaimDetailsContent = {
    programType: 'Unemployment Insurance (UI)',
    benefitYear: '3/21/2020 - 3/20/2021',
    claimBalance: '$0.00',
    weeklyBenefitAmount: '$111.00',
    lastPaymentIssued: '4/29/2021',
    extensionType: 'Tier 2 Extension',
  }

  if (claimData.claimDetails) {
    detailsContent.programType = claimData.claimDetails.programType
    detailsContent.benefitYear = `${claimData.claimDetails.benefitYearStartDate} - ${claimData.claimDetails.benefitYearEndDate}`
    detailsContent.claimBalance = claimData.claimDetails.claimBalance
    detailsContent.weeklyBenefitAmount = claimData.claimDetails.weeklyBenefitAmount
    detailsContent.lastPaymentIssued = claimData.claimDetails.lastPaymentIssued
    // @TODO
    // detailsContent.extensionType = ''
  }

  const content: ScenarioContent = {
    statusContent: statusContent,
    detailsContent: detailsContent,
  }

  return content
}
