import MockDate from 'mockdate'

import { PendingDetermination } from '../../types/common'
import apiGatewayStub from '../../utils/apiGatewayStub'
import {
  getScenario,
  identifyPendingDeterminationScenario,
  isDeterminationStatusPending,
  isScheduledStrictlyBefore,
  NonPendingDeterminationValues,
  ScenarioType,
} from '../../utils/getScenarioContent'
import { formatFromApiGateway, getDateWithOffset } from '../../utils/formatDate'

/**
 * Test helpers to create shared mock data.
 */
function getMockPendingDetermination(): PendingDetermination {
  const pendingDetermination: PendingDetermination = {
    pendingDate: '',
    scheduleDate: '',
    timeSlotDesc: '',
    requestDate: '',
    determinationStatus: '',
    willCallIndicator: false,
    spokenLanguageCode: '',
    spokenLanguageDesc: '',
  }
  return pendingDetermination
}

function getPendingDeterminationWithScheduleDate(offset = 1): PendingDetermination {
  const pendingDetermination = getMockPendingDetermination()
  pendingDetermination.determinationStatus = 'Random string' // Can be anything other than one of NonPendingDeterminationValues
  pendingDetermination.scheduleDate = formatFromApiGateway(getDateWithOffset(offset))
  return pendingDetermination
}

/**
 * Setup before all tests.
 */
beforeAll(() => {
  MockDate.set('2020-05-05T00:00:00')
})

/**
 * Test getScenario()
 *
 * Refer to ScenarioType and ScenarioTypeNames for which scenario has which number.
 */

// Scenarios 1, 2, 3 negative identification tests
describe('Scenarios 1, 2, 3', () => {
  it('are not returned if pendingDetermination is null', () => {
    const pendingDeterminationScenarioNull = { pendingDetermination: null }
    const scenarioTypeNull = getScenario(pendingDeterminationScenarioNull)
    expect(scenarioTypeNull).not.toBe(ScenarioType.Scenario1)
    expect(scenarioTypeNull).not.toBe(ScenarioType.Scenario2)
    expect(scenarioTypeNull).not.toBe(ScenarioType.Scenario3)
  })

  it('are not returned if pendingDetermination is an empty array', () => {
    const pendingDeterminationScenarioEmpty = { pendingDetermination: [] }
    const scenarioTypeEmpty = getScenario(pendingDeterminationScenarioEmpty)
    expect(scenarioTypeEmpty).not.toBe(ScenarioType.Scenario1)
    expect(scenarioTypeEmpty).not.toBe(ScenarioType.Scenario2)
    expect(scenarioTypeEmpty).not.toBe(ScenarioType.Scenario3)
  })
})

// Scenario 4
describe('The Generic Pending scenario (scenario 4)', () => {
  it('is returned as expected', () => {
    const scenarioType = ScenarioType.Scenario4
    const scenarioObject = getScenario(apiGatewayStub(scenarioType))
    expect(scenarioObject.scenarioType).toBe(scenarioType)
  })
})

// Scenarios 5 & 6
describe('The Base State scenarios (scenarios 5 & 6)', () => {
  it('are returned as expected', () => {
    const baseScenarios = [ScenarioType.Scenario5, ScenarioType.Scenario6]
    for (const scenarioType of baseScenarios) {
      const scenarioObject = getScenario(apiGatewayStub(scenarioType))
      expect(scenarioObject.scenarioType).toBe(scenarioType)
    }
  })
})

/**
 * Test identifyPendingDeterminationScenario()
 */

// Scenario 1: Test various values of pendingDetermination.determinationStatus
describe('The determination interview is not yet scheduled (scenario 1) when all other criteria are met and the determination status evaluates to', () => {
  it('false (null)', () => {
    const pendingDetermination = getMockPendingDetermination()
    pendingDetermination.determinationStatus = null
    pendingDetermination.scheduleDate = null
    pendingDetermination.requestDate = 'any non-null value'
    const result = identifyPendingDeterminationScenario([pendingDetermination])
    expect(result.scenarioType).toBe(ScenarioType.Scenario1)
  })

  it('false (empty string)', () => {
    const pendingDetermination = getMockPendingDetermination()
    pendingDetermination.determinationStatus = ''
    pendingDetermination.scheduleDate = null
    pendingDetermination.requestDate = 'any non-null value'
    const result = identifyPendingDeterminationScenario([pendingDetermination])
    expect(result.scenarioType).toBe(ScenarioType.Scenario1)
  })

  it('false (undefined)', () => {
    const pendingDetermination = getMockPendingDetermination()
    pendingDetermination.determinationStatus = undefined
    pendingDetermination.scheduleDate = null
    pendingDetermination.requestDate = 'any non-null value'
    const result = identifyPendingDeterminationScenario([pendingDetermination])
    expect(result.scenarioType).toBe(ScenarioType.Scenario1)
  })
})

// Scenario 1: Test various values of pendingDetermination.scheduleDate
describe('The determination interview is not yet scheduled (scenario 1) when all other criteria are met and the schedule date evaluates to', () => {
  it('false (null)', () => {
    const pendingDetermination = getMockPendingDetermination()
    pendingDetermination.determinationStatus = null
    pendingDetermination.scheduleDate = null
    pendingDetermination.requestDate = 'any non-null value'
    const result = identifyPendingDeterminationScenario([pendingDetermination])
    expect(result.scenarioType).toBe(ScenarioType.Scenario1)
  })

  it('false (empty string)', () => {
    const pendingDetermination = getMockPendingDetermination()
    pendingDetermination.determinationStatus = null
    pendingDetermination.scheduleDate = ''
    pendingDetermination.requestDate = 'any non-null value'
    const result = identifyPendingDeterminationScenario([pendingDetermination])
    expect(result.scenarioType).toBe(ScenarioType.Scenario1)
  })

  it('false (undefined)', () => {
    const pendingDetermination = getMockPendingDetermination()
    pendingDetermination.determinationStatus = null
    pendingDetermination.scheduleDate = undefined
    pendingDetermination.requestDate = 'any non-null value'
    const result = identifyPendingDeterminationScenario([pendingDetermination])
    expect(result.scenarioType).toBe(ScenarioType.Scenario1)
  })
})

// Test various Scenario 1 invalid values
describe('The determination interview is invalid if all other Scenario 1 critera are met, but', () => {
  it('the determination status does not evaluate to false', () => {
    const pendingDetermination = getMockPendingDetermination()
    pendingDetermination.determinationStatus = 'non-null value'
    pendingDetermination.scheduleDate = ''
    pendingDetermination.requestDate = 'any non-null value'
    const result = identifyPendingDeterminationScenario([pendingDetermination])
    expect(result).toBe(null)
  })

  it('the schedule date does not evaluate to false', () => {
    const pendingDetermination = getMockPendingDetermination()
    // Determination Status is one of NonPendingDeterminationValues values
    pendingDetermination.determinationStatus = 'Complete'
    pendingDetermination.scheduleDate = '2000-01-01T00:00:00'
    pendingDetermination.requestDate = 'any non-null value'
    const result = identifyPendingDeterminationScenario([pendingDetermination])
    expect(result).toBe(null)
  })

  it('the schedule date is an invalid datetime string', () => {
    const pendingDetermination = getMockPendingDetermination()
    pendingDetermination.determinationStatus = ''
    pendingDetermination.scheduleDate = 'non-null value'
    pendingDetermination.requestDate = 'any non-null value'
    const result = identifyPendingDeterminationScenario([pendingDetermination])
    expect(result).toBe(null)
  })

  it('the request date evaluates to false', () => {
    const pendingDetermination = getMockPendingDetermination()
    pendingDetermination.determinationStatus = ''
    pendingDetermination.scheduleDate = ''
    pendingDetermination.requestDate = ''
    const result = identifyPendingDeterminationScenario([pendingDetermination])
    expect(result).toBe(null)
  })
})

// Scenario 2
describe('The determination interview is scheduled (scenario 2)', () => {
  it('when the determination status is pending and there is one pending determination object with a schedule date in the future', () => {
    // Mock a pending determination object with a schedule date that is tomorrow
    const pendingDetermination = getPendingDeterminationWithScheduleDate(1)
    const result = identifyPendingDeterminationScenario([pendingDetermination])
    expect(result.scenarioType).toBe(ScenarioType.Scenario2)
  })

  it('scheduled (scenario 2) when the determination status is pending and there is one pending determination object with a schedule date of today', () => {
    // Mock a pending determination object with a schedule date that is now
    const pendingDetermination = getPendingDeterminationWithScheduleDate(0)
    const result = identifyPendingDeterminationScenario([pendingDetermination])
    expect(result.scenarioType).toBe(ScenarioType.Scenario2)
  })
})

// Scenario 3
describe('The determination interview is awating decision (scenario 3)', () => {
  it('when the determination status is pending and there is one pending determination object with a schedule date in the past', () => {
    // Mock a pending determination object with a schedule date that is yesterday
    const pendingDetermination = getPendingDeterminationWithScheduleDate(-1)
    const result = identifyPendingDeterminationScenario([pendingDetermination])
    expect(result.scenarioType).toBe(ScenarioType.Scenario3)
  })
})

// Test multiple pendingDetermination objects.
describe('When there are multiple pendingDetermination objects, the determination interview is', () => {
  // Multiple "not yet scheduled" pendingDetermination objects that evaluate
  // to Scenario 1, return Scenario 1.
  it('not yet scheduled (scenario 1) if all are not yet scheduled', () => {
    const appt1 = getMockPendingDetermination()
    appt1.pendingDetermination = ''
    appt1.scheduleDate = ''
    appt1.requestDate = 'not empty'

    const appt2 = getMockPendingDetermination()
    appt2.pendingDetermination = ''
    appt2.scheduleDate = ''
    appt2.requestDate = 'not empty'

    const result = identifyPendingDeterminationScenario([appt1, appt2])
    expect(result.scenarioType).toBe(ScenarioType.Scenario1)
  })

  // Multiple "scheduled" pendingDetermination objects that evaluate
  // to Scenario 2, returns the object with the earliest schedule date
  it('scheduled (scenario 2) if all are scheduled', () => {
    // Mock a pending determination object with a schedule date that is tomorrow
    const appt1 = getPendingDeterminationWithScheduleDate(1)

    // Mock a pending determination object with a schedule date that is a week from now
    const appt2 = getPendingDeterminationWithScheduleDate(7)

    const result = identifyPendingDeterminationScenario([appt1, appt2])
    expect(result.scenarioType).toBe(ScenarioType.Scenario2)
    expect(result.pendingDetermination).toBe(appt1)
  })

  // Multiple "awaiting decision" pendingDetermination objects that evaluate
  // to Scenario 3, return Scenario 3.
  it('awaiting decision (scenario 3) if all are awaiting decision', () => {
    // Mock a pending determination object with a schedule date that is yesterday
    const appt1 = getPendingDeterminationWithScheduleDate(-1)

    // Mock a pending determination object with a schedule date that is a week ago
    const appt2 = getPendingDeterminationWithScheduleDate(-7)

    const result = identifyPendingDeterminationScenario([appt1, appt2])
    expect(result.scenarioType).toBe(ScenarioType.Scenario3)
  })

  // If all three types of scenarios are present, then scenario 2 takes priority.
  it('scheduled (scenario 2) if there is a scheduled scenario, awaiting decision scenario, and not yet scheduled scenario', () => {
    // Mock a pending determination object with a schedule date that is a week from now
    const scheduled = getPendingDeterminationWithScheduleDate(7)

    // Mock a pending determination object with a schedule date that is a week ago
    const awaitingDecision = getPendingDeterminationWithScheduleDate(-7)

    const notYetScheduled = getMockPendingDetermination()
    notYetScheduled.determinationStatus = ''
    notYetScheduled.scheduleDate = ''
    notYetScheduled.requestDate = 'not empty'

    const result = identifyPendingDeterminationScenario([notYetScheduled, awaitingDecision, scheduled])
    expect(result.scenarioType).toBe(ScenarioType.Scenario2)
    expect(result.pendingDetermination).toBe(scheduled)
  })

  // If scenarios 1 & 3 are present, then scenario 3 takes priority.
  it('awaiting decision (scenario 3) if there is an awaiting decision scenario and not yet scheduled scenario', () => {
    // Mock a pending determination object with a schedule date that is a week ago
    const awaitingDecision = getPendingDeterminationWithScheduleDate(-7)

    const notYetScheduled = getMockPendingDetermination()
    notYetScheduled.determinationStatus = ''
    notYetScheduled.scheduleDate = ''
    notYetScheduled.requestDate = 'not empty'

    const result = identifyPendingDeterminationScenario([notYetScheduled, awaitingDecision])
    expect(result.scenarioType).toBe(ScenarioType.Scenario3)
  })
})

/**
 * Other tests
 */

// Test isDeterminationStatusPending()
describe('Determination Status', () => {
  it('is pending if it is an empty string', () => {
    const pendingDetermination = getMockPendingDetermination()
    expect(isDeterminationStatusPending(pendingDetermination)).toBe(true)
  })

  it('is pending if it is null', () => {
    const pendingDetermination = getMockPendingDetermination()
    pendingDetermination.determinationStatus = null
    expect(isDeterminationStatusPending(pendingDetermination)).toBe(true)
  })

  it('is pending if it is undefined', () => {
    const pendingDetermination = getMockPendingDetermination()
    pendingDetermination.determinationStatus = undefined
    expect(isDeterminationStatusPending(pendingDetermination)).toBe(true)
  })

  it('is pending if is missing', () => {
    const pendingDetermination = getMockPendingDetermination()
    delete pendingDetermination.determinationStatus
    expect(isDeterminationStatusPending(pendingDetermination)).toBe(true)
  })

  it('is pending if it is not one of the non-pending values', () => {
    const pendingDetermination = getMockPendingDetermination()
    pendingDetermination.determinationStatus = 'foo'
    expect(isDeterminationStatusPending(pendingDetermination)).toBe(true)
  })

  it('is not pending if it is one of the non-pending values', () => {
    for (const value of NonPendingDeterminationValues) {
      const pendingDetermination = getMockPendingDetermination()
      pendingDetermination.determinationStatus = value
      expect(isDeterminationStatusPending(pendingDetermination)).toBe(false)
    }
  })
})

// Test isScheduledStrictlyBefore()
describe('Comparing pending determination objects', () => {
  const earlier: PendingDetermination = {
    pendingDate: '',
    scheduleDate: '2021-01-01T00:00:00',
    timeSlotDesc: '',
    requestDate: '',
    determinationStatus: '',
    willCallIndicator: true,
    spokenLanguageCode: '',
    spokenLanguageDesc: '',
  }
  const laterTime: PendingDetermination = {
    pendingDate: '',
    scheduleDate: '2021-01-01T00:00:00',
    timeSlotDesc: '',
    requestDate: '',
    determinationStatus: '',
    willCallIndicator: true,
    spokenLanguageCode: '',
    spokenLanguageDesc: '',
  }
  const laterDate: PendingDetermination = {
    pendingDate: '',
    scheduleDate: '2021-01-02T00:00:00',
    timeSlotDesc: '',
    requestDate: '',
    determinationStatus: '',
    willCallIndicator: true,
    spokenLanguageCode: '',
    spokenLanguageDesc: '',
  }

  it('returns true if the first object has an earlier appointment date', () => {
    const result = isScheduledStrictlyBefore(earlier, laterDate)
    expect(result).toBe(true)
  })

  it('returns false if the second object has an earlier appointment date', () => {
    const result = isScheduledStrictlyBefore(laterDate, earlier)
    expect(result).toBe(false)
  })

  it('returns false if the both appointments are scheduled on the same date and neither have a valid time slot', () => {
    const result = isScheduledStrictlyBefore(earlier, laterTime)
    expect(result).toBe(false)
  })
})
