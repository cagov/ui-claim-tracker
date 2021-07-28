/**
 * Utility file to get content for the Claim Status section.
 */

import { parseApiGatewayDate } from './formatDate'
import { ScenarioType } from './getScenarioContent'
import { parseTimeSlot } from './timeSlot'
import claimStatusJson from '../public/locales/en/claim-status.json'
import {
  Appointment,
  ClaimStatusContent,
  I18nString,
  PendingDetermination,
  TextOptionalLink,
  TransLineContent,
} from '../types/common'

type StepType = 'your-next-steps' | 'edd-next-steps'

interface ClaimStatusScenarioJson {
  heading: string
  summary: TextOptionalLink[]
  'your-next-steps': TextOptionalLink[]
  'edd-next-steps': TextOptionalLink[]
}

/**
 * Convert a ScenarioType into the string key used in json translation files.
 */
export function scenarioToString(scenarioType: ScenarioType): string {
  return ScenarioType[scenarioType].toLowerCase()
}

/**
 * Helper function to get shared Claim Status translation string prefix.
 */
function buildTranslationPrefix(scenarioType: ScenarioType): I18nString {
  return `claim-status:scenarios.${scenarioToString(scenarioType)}`
}

/**
 * Get Claim Status heading.
 */
export function buildClaimStatusHeading(scenarioType: ScenarioType): I18nString {
  return buildTranslationPrefix(scenarioType) + '.heading'
}

/**
 * Build props to pass to the TransLine react component.
 */
export function buildTransLineContent(json: TextOptionalLink, i18nKey: I18nString): TransLineContent {
  const props: TransLineContent = {
    i18nKey: i18nKey,
  }

  if (json.links) {
    props.links = json.links
  }

  return props
}

/**
 * Helper function to construct the i18nKey for claim status link text.
 */
function buildI18nKey(keys: string[]): I18nString {
  return 'claim-status:' + keys.join('.') + '.text'
}

/**
 * Construct Scenario 2 appointment date & time.
 *
 * Expects a valid pendingDetermination.scheduleDate.
 * Will validate the pendingDetermination.timeSlotDesc.
 */
export function buildAppointment(
  scenarioType: ScenarioType,
  pendingDetermination: PendingDetermination | undefined,
): Appointment | null {
  // Return an appointment only if:
  // - this is scenario 2
  // - AND there is a pendingDetermination object
  if (scenarioType === ScenarioType.Scenario2 && pendingDetermination) {
    const parsedDate = parseApiGatewayDate(pendingDetermination.scheduleDate)
    const appointment: Appointment = {
      date: parsedDate,
    }

    const timeSlot = parseTimeSlot(pendingDetermination.timeSlotDesc)
    if (timeSlot) {
      appointment.timeSlot = timeSlot
    }

    return appointment
  } else {
    return null
  }
}

/**
 * Get Claim Status summary.
 */
export function buildClaimStatusSummary(
  scenarioObject: ClaimStatusScenarioJson,
  scenarioString: string,
): TransLineContent[] {
  const summaryParagraphs: TransLineContent[] = []
  const json = scenarioObject.summary
  for (const [index, value] of json.entries()) {
    const keys = ['scenarios', scenarioString, 'summary', index.toString()]
    summaryParagraphs.push(buildTransLineContent(value, buildI18nKey(keys)))
  }
  return summaryParagraphs
}

/**
 * Get conditional continue certifying next step.
 */
export function displayContinueCertifying(): TransLineContent {
  const keys = ['conditional-next-steps', 'continue-certifying']
  return buildTransLineContent(claimStatusJson['conditional-next-steps']['continue-certifying'], buildI18nKey(keys))
}

/**
 * Get next steps content for Claim Status.
 */
export function buildNextSteps(
  scenarioObject: ClaimStatusScenarioJson,
  scenarioString: string,
  whichSteps: StepType,
  continueCertifying = false,
): TransLineContent[] {
  const steps: TransLineContent[] = []

  // If we should display the "continue certifying" next step, then display it as the first step.
  if (continueCertifying) {
    steps.push(displayContinueCertifying())
  }

  const json = scenarioObject[whichSteps]
  for (const [index, value] of json.entries()) {
    const keys = ['scenarios', scenarioString, whichSteps, index.toString()]
    steps.push(buildTransLineContent(value, buildI18nKey(keys)))
  }

  return steps
}

/**
 * Get combined Claim Status content.
 */
export default function getClaimStatus(
  scenarioType: ScenarioType,
  continueCertifying: boolean,
  pendingDetermination: PendingDetermination | undefined,
): ClaimStatusContent {
  // Explicitly cast the scenario string (e.g. scenario1, scenario2) into the union of literal types
  // expected by Typescript. scenarioString must be one of the key names in claimStatusJson.scenarios
  // or this won't compile. For a very good explanation of `keyof typeof` Typescript's and union of
  // literal types, see:
  // https://stackoverflow.com/questions/55377365/what-does-keyof-typeof-mean-in-typescript/62764510#62764510
  const scenarioString = scenarioToString(scenarioType) as keyof typeof claimStatusJson.scenarios

  const scenarioObject = claimStatusJson.scenarios[scenarioString]

  return {
    heading: buildClaimStatusHeading(scenarioType),
    summary: buildClaimStatusSummary(scenarioObject, scenarioString),
    yourNextSteps: buildNextSteps(scenarioObject, scenarioString, 'your-next-steps', continueCertifying),
    eddNextSteps: buildNextSteps(scenarioObject, scenarioString, 'edd-next-steps'),
    appointment: buildAppointment(scenarioType, pendingDetermination),
  }
}
