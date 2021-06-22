import { Claim } from './queryApiGateway'

export enum ScenarioType {
  PendingDetermination = 'Pending Determination Scenario',
  GenericPending = 'Generic Pending Scenario',
  GenericAllClear = 'Generic All Clear Scenario',
}

/**
 * Return the correct scenario to display.
 *
 * @param {Qbject} claim
 * @returns {Object}
 */
export default function getScenario(claimData: Claim): ScenarioType {
  // The pending determination scenario: if claimData contains any pendingDetermination
  // objects
  // @TODO: refactor with more detailed pending determination scenarios #252
  if (claimData.pendingDetermination && claimData.pendingDetermination.length > 0) {
    return ScenarioType.PendingDetermination
  }
  // The generic pending scenario: if there are no pendingDetermination objects
  // AND hasPendingWeeks is true
  else if (claimData.hasPendingWeeks === true) {
    return ScenarioType.GenericPending
  }
  // The generic "all clear"/base state scenario: if there are no pendingDetermination objects
  // and hasPendingWeeks is false
  else if (claimData.hasPendingWeeks === false) {
    return ScenarioType.GenericAllClear
  }
  // This is unexpected
  // @TODO: Log the scenario and display 500
  else {
    throw new Error('Unexpected scenario')
  }
}
