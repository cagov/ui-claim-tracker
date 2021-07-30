import MockDate from 'mockdate'

import { getPendingDeterminationWithScheduleDate } from '../testHelpers'
import { formatFromApiGateway, parseApiGatewayDate } from '../../utils/formatDate'
import { buildAppointment, buildClaimStatusHeading } from '../../utils/getClaimStatus'
import { ScenarioType } from '../../utils/getScenarioContent'
import { getNumericEnumKeys } from '../../utils/numericEnum'

// Test buildClaimStatusHeading()
describe('The Claim Status heading', () => {
  it('is correct for each scenario', () => {
    for (const key of getNumericEnumKeys(ScenarioType)) {
      expect(buildClaimStatusHeading(key)).toEqual(
        expect.stringMatching(/claim-status:scenarios.scenario[0-9]+.heading/),
      )
    }
  })
})

// Test buildAppointment()
describe('An appointment is', () => {
  beforeAll(() => {
    MockDate.set('2020-01-05')
  })

  it('returned with a time slot if there is a time slot value', () => {
    const pendingDetermination = getPendingDeterminationWithScheduleDate(0)
    const expectedDate = parseApiGatewayDate(formatFromApiGateway(0))

    pendingDetermination.timeSlotDesc = '10-12'
    const expectedTimeSlot = {
      rangeStart: 10,
      rangeEnd: 12,
    }

    const appointment = buildAppointment(ScenarioType.Scenario2, pendingDetermination)
    expect(appointment.date).toStrictEqual(expectedDate)
    expect(appointment.timeSlot).toStrictEqual(expectedTimeSlot)
  })

  it('returned with no time slot if there is no time slot value', () => {
    const pendingDetermination = getPendingDeterminationWithScheduleDate(0)
    const expectedDate = parseApiGatewayDate(formatFromApiGateway(0))
    const appointment = buildAppointment(ScenarioType.Scenario2, pendingDetermination)
    expect(appointment.date).toStrictEqual(expectedDate)
    expect(appointment.timeSlot).toBe(undefined)
  })

  it('not returned (null) if it is not scenario 2', () => {
    const pendingDetermination = getPendingDeterminationWithScheduleDate(0)
    const appointment = buildAppointment(ScenarioType.Scenario1, pendingDetermination)
    expect(appointment).toBe(null)
  })

  it('not returned (null) if there is no pending determination object (undefined)', () => {
    const appointment = buildAppointment(ScenarioType.Scenario2, undefined)
    expect(appointment).toBe(null)
  })
})
