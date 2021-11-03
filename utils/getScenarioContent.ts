/**
 * Utility file for returning the correct content for each scenario.
 *
 * Scenarios are referred to by number and the numbers match the content spreadsheet from
 * UIB. The ScenarioType enum is a numeric enum so that we can take advantage of the
 * built-in Typescript reverse mapping for numeric enums. However, we set the long-form
 * description in ScenarioTypeNames for easy(ish) reference.
 */

import { Claim, ClaimDetailsContent, PendingDetermination, ScenarioContent } from '../types/common'
import getClaimDetails from './getClaimDetails'
import getClaimStatus from './getClaimStatus'
import { isDatePast, isDateStringFalsy, isValidDate, parseApiGatewayDate } from './formatDate'
import { isFirstTimeSlotEarlier } from './timeSlot'

export enum ScenarioType {
  Scenario1,
  Scenario2,
  Scenario3,
  Scenario4,
  Scenario5,
  Scenario6,
  Scenario7,
  Scenario8,
  Scenario9,
  Scenario10,
  Scenario11,
  Scenario12,
}

export const ScenarioTypeNames = {
  [ScenarioType.Scenario1]: 'Determination interview: not yet scheduled',
  [ScenarioType.Scenario2]: 'Determination interview: scheduled',
  [ScenarioType.Scenario3]: 'Determination interview: awaiting decision',
  [ScenarioType.Scenario4]: 'Generic pending state: pending weeks',
  [ScenarioType.Scenario5]: 'Base state: no pending weeks, no weeks to certify',
  [ScenarioType.Scenario6]: 'Base state: no pending weeks, weeks to certify',
  [ScenarioType.Scenario7]: 'Benefit year end: Regular UI',
  [ScenarioType.Scenario8]: 'Benefit year end: PUA',
  [ScenarioType.Scenario9]: 'Benefit year end: DUA',
  [ScenarioType.Scenario10]: 'Benefit year end: Old Extensions',
  [ScenarioType.Scenario11]: 'Benefit year end: Pandemic Extensions',
  [ScenarioType.Scenario12]: 'Benefit year end: FED-ED Extension',
}

interface PendingDeterminationScenario {
  scenarioType: ScenarioType
  pendingDetermination?: PendingDetermination
}

export const NonPendingDeterminationValues = ['Canceled', 'Complete', 'TRAN', 'INVL', 'IDNC', '1277', 'OTHR', 'ClmCX']

/**
 * Determine whether the Determination Status is pending.
 *
 * Determination Status is considered pending if:
 * either DeterminationStatus is blank (NULL)
 * OR DeterminationStatus is neither "Canceled" nor "Complete" nor "TRAN" nor
 *   "INVL" nor "IDNC" nor "1277" nor "OTHR" nor "ClmCX"
 */
export function isDeterminationStatusPending(pendingDetermination: PendingDetermination): boolean {
  return (
    !pendingDetermination.determinationStatus ||
    !NonPendingDeterminationValues.includes(pendingDetermination.determinationStatus)
  )
}

/**
 * Identify whether the first pendingDetermination object is scheduled before the second object.
 *
 * If both arguments are scheduled at the same time, this will return false.
 * Assumes that dates have already been checked for validity.
 */
export function isScheduledStrictlyBefore(first: PendingDetermination, second: PendingDetermination): boolean {
  const firstScheduleDate = parseApiGatewayDate(first.scheduleDate)
  const secondScheduleDate = parseApiGatewayDate(second.scheduleDate)

  // If the first appointment is scheduled before the second.
  if (firstScheduleDate < secondScheduleDate) {
    return true
  }
  // If the first appointment is scheduled after the second.
  else if (firstScheduleDate > secondScheduleDate) {
    return false
  }
  // If both appointments are on the same date...
  else {
    // ...then compare the time slots.
    const isEarlier = isFirstTimeSlotEarlier(first.timeSlotDesc, second.timeSlotDesc)

    // It's possible for both time slots to be improperly formatted, in which case it doesn't
    // matter which appointment is said to be first, since they are on the same date.
    // Otherwise, return the appointment with the earlier time slot start time.
    return !!isEarlier
  }
}

/**
 * Identify whether the scenario is one of the pending determination scenarios.
 */
export function identifyPendingDeterminationScenario(
  pendingDeterminations: PendingDetermination[],
): PendingDeterminationScenario | null {
  let earliestScheduled: PendingDetermination | null = null

  // Track whether any of the pendingDetermination objects meet the other scenario criteria.
  let hasAwaitingDecision = false
  let hasNotYetScheduled = false

  // Loop through all the pendingDetermination objects.
  for (const pendingDetermination of pendingDeterminations) {
    if (isDeterminationStatusPending(pendingDetermination) && isValidDate(pendingDetermination.scheduleDate)) {
      // Scenario 2:
      // If Determination Status is Pending
      // AND Schedule Date is today or in the future
      if (!isDatePast(parseApiGatewayDate(pendingDetermination.scheduleDate))) {
        // If we haven't found a pendingDetermination object that is scheduled yet
        // OR the current pendingDetermination object is earlier than the previous one found
        // Then update the earliest found scheduled pendingDetermination object
        if (!earliestScheduled || isScheduledStrictlyBefore(pendingDetermination, earliestScheduled)) {
          earliestScheduled = pendingDetermination
        }
      }
      // Scenario 3:
      // If Determination Status is Pending
      // AND Schedule Date is in the past
      else {
        hasAwaitingDecision = true
      }
    }
    // Scenario 1:
    // If determinationStatus is empty/null/undefined
    // AND scheduleDate is empty/null/undefined or null date string
    // AND requestDate is a valid date
    else if (
      !pendingDetermination.determinationStatus &&
      isDateStringFalsy(pendingDetermination.scheduleDate) &&
      isValidDate(pendingDetermination.requestDate)
    ) {
      hasNotYetScheduled = true
    }
    // All other combinations are invalid!
  }

  // Scenarios 2 takes priority over Scenarios 1 & 3.
  if (earliestScheduled) {
    return {
      scenarioType: ScenarioType.Scenario2,
      pendingDetermination: earliestScheduled,
    }
  } else {
    // Scenario 3 takes priority over Scenario 1.
    if (hasAwaitingDecision) {
      return { scenarioType: ScenarioType.Scenario3 }
    } else if (hasNotYetScheduled) {
      return { scenarioType: ScenarioType.Scenario1 }
    }
    // Otherwise, no valid pendingDetermination objects; return null.
    else {
      return null
    }
  }
}

/**
 * Identifies the Program Types that count as a Pandemic extension
 **/
export function isPandemicExtension(programType: string): boolean {
  const byeValidPandemicExtensions = {
    PEUC: 'PEUC - Tier 1 Extension',
    PEUX: 'PEUX - Tier 2 Extension',
    PEUY: 'PEUY - Tier 2 Augmentation',
  }

  if (Object.values(byeValidPandemicExtensions).includes(programType)) {
    return true
  }

  return false
}

/**
 * Identifies the Program Types that count as another extension
 **/
export function isOldExtension(programType: string): boolean {
  const byeValidExtensions = {
    EUC: 'EUC - Tier 1 Extension',
    EUX: 'EUX - Tier 2 Extension',
    EUY: 'EUY - Tier 2 Augmentation',
    EUW: 'EUW - Tier 3 Extension',
    EUZ: 'EUZ - Tier 4 Extension',
  }

  if (Object.values(byeValidExtensions).includes(programType)) {
    return true
  }

  return false
}

/**
 * Identify if the benefit claim year has ended for appropriate
 * claim types
 **/
export function isBenefitYearExpired(claimData: Claim): boolean {
  const byeValidPrograms = {
    UI: 'UI',
    DUA: 'DUA',
    PUA: 'PUA',
    'FED-ED Extension': 'FED-ED Extension',
  }
  const programType = claimData.claimDetails?.programType || ''

  if (
    claimData.isBYE &&
    (programType in byeValidPrograms || isPandemicExtension(programType) || isOldExtension(programType))
  ) {
    return true
  }

  return false
}

/**
 * Determine which BYE scenario applies
 **/
export function byeScenario(claimData: Claim): ScenarioType | null {
  const programType = claimData.claimDetails?.programType

  if (programType) {
    if (isOldExtension(programType)) {
      return ScenarioType.Scenario10
    }

    if (isPandemicExtension(programType)) {
      return ScenarioType.Scenario11
    }

    switch (programType) {
      case 'UI':
        return ScenarioType.Scenario7
      case 'PUA':
        return ScenarioType.Scenario8
      case 'DUA':
        return ScenarioType.Scenario9
      case 'FED-ED Extension':
        return ScenarioType.Scenario12
    }
  }

  return null
}

/**
 * Identify the correct scenario to display.
 *
 * @TODO: Validating the API gateway response #150
 */
export function getScenario(claimData: Claim): PendingDeterminationScenario {
  // If there are any pendingDetermination objects, the scenario MIGHT be one of the
  // pending determination scenarios.
  if (claimData.pendingDetermination && claimData.pendingDetermination.length > 0) {
    const pendingDeterminationScenario = identifyPendingDeterminationScenario(claimData.pendingDetermination)

    // It's possible to have pending determination objects, but still not be a valid
    // pending determination scenario, so check to see if the returned object is null.
    if (pendingDeterminationScenario) {
      return pendingDeterminationScenario
    }
  }

  // If the scenario is not one of the Pending Determination scenarios,
  // check to see if it one of the remaining scenarios.

  // deprecated for hasValidPendingWeeks
  // @TODO: Validate that hasValidPendingWeeks is a boolean
  if (claimData.hasPendingWeeks === true || claimData.hasValidPendingWeeks === true) {
    // @TODO: Validate that hasCertificationWeeks is a boolean
    return { scenarioType: ScenarioType.Scenario4 }
  }
  // hasValidPendingWeeks === false
  // hasCertificationWeeksAvailable === true
  else if (claimData.hasCertificationWeeksAvailable === true) {
    return { scenarioType: ScenarioType.Scenario6 }
  }
  // isBYE === true
  else if (isBenefitYearExpired(claimData)) {
    const byeScenarioType = byeScenario(claimData)
    if (byeScenarioType) {
      return { scenarioType: byeScenarioType }
    }
  }

  // None of the above.
  return { scenarioType: ScenarioType.Scenario5 }
}

/**
 * Return whether the Claim Status should display the "continue certifying" content.
 */
export function continueCertifying(scenarioType: ScenarioType, claimData: Claim): boolean {
  // If the Scenario is not scenario 5 or 6
  // AND hasCertificationWeeksAvailable is true
  // Then we should display the "continue certifying" content.
  const isIgnoredScenario = [ScenarioType.Scenario5, ScenarioType.Scenario6].includes(scenarioType)
  if (!isIgnoredScenario && claimData.hasCertificationWeeksAvailable) {
    return true
  }
  // Otherwise, we should not display the "continue certifying" content.
  else {
    return false
  }
}

/*
 * Return scenario content.
 */
export default function getScenarioContent(claimData: Claim): ScenarioContent {
  // Get the scenario type.
  const scenarioTypeObject = getScenario(claimData)
  const scenarioType = scenarioTypeObject.scenarioType

  // Construct claim status content.
  const statusContent = getClaimStatus(
    scenarioType,
    continueCertifying(scenarioType, claimData),
    scenarioTypeObject.pendingDetermination,
  )

  // Construct claim details content.
  let detailsContent: ClaimDetailsContent | null = null
  if (claimData.claimDetails) {
    detailsContent = getClaimDetails(claimData.claimDetails)
  }

  const content: ScenarioContent = {
    statusContent: statusContent,
    detailsContent: detailsContent,
  }

  return content
}
