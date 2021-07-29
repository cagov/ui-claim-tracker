import MockDate from 'mockdate'
import renderer, { act } from 'react-test-renderer'

import i18n from '../jest-i18n'
import { Appointment } from '../../components/Appointment'
import { TimeSlot } from '../../types/common'
import { getDateWithOffset } from '../../utils/formatDate'

/**
 * Helper functions.
 */

function renderAppointmentComponent(timeSlot?: TimeSlot): string {
  const date = getDateWithOffset(0)
  return renderer.create(<Appointment loading={false} date={date} timeSlot={timeSlot} />).toJSON()
}

/**
 * Appointment snapshot tests.
 */

/* eslint-disable @typescript-eslint/no-floating-promises */
describe('If given an appointment', () => {
  beforeAll(() => {
    MockDate.set('2021-05-05')
  })

  it('with no time slot, then match the snapshot', () => {
    expect(renderAppointmentComponent()).toMatchSnapshot()
  })

  it('with no time slot, then match the snapshot, in Spanish', () => {
    act(() => {
      i18n.changeLanguage('es')
    })
    expect(renderAppointmentComponent()).toMatchSnapshot()
    act(() => {
      i18n.changeLanguage('en')
    })
  })

  it('with a morning time slot, then match the snapshot', () => {
    const timeSlot = {
      rangeStart: 8,
      rangeEnd: 10,
    }
    expect(renderAppointmentComponent(timeSlot)).toMatchSnapshot()
  })

  it('with a morning time slot, then match the snapshot, in Spanish', () => {
    act(() => {
      i18n.changeLanguage('es')
    })
    const timeSlot = {
      rangeStart: 8,
      rangeEnd: 10,
    }
    expect(renderAppointmentComponent(timeSlot)).toMatchSnapshot()
    act(() => {
      i18n.changeLanguage('en')
    })
  })

  it('with an afternoon time slot, then match the snapshot', () => {
    const timeSlot = {
      rangeStart: 1,
      rangeEnd: 3,
    }
    expect(renderAppointmentComponent(timeSlot)).toMatchSnapshot()
  })

  it('with an afternoon time slot, then match the snapshot, in Spanish', () => {
    act(() => {
      i18n.changeLanguage('es')
    })
    const timeSlot = {
      rangeStart: 1,
      rangeEnd: 3,
    }
    expect(renderAppointmentComponent(timeSlot)).toMatchSnapshot()
    act(() => {
      i18n.changeLanguage('en')
    })
  })

  it('with a time slot that starts in the morning and ends in the afternoon, then match the snapshot', () => {
    const timeSlot = {
      rangeStart: 8,
      rangeEnd: 3,
    }
    expect(renderAppointmentComponent(timeSlot)).toMatchSnapshot()
  })

  it('with a time slot that starts in the morning and ends in the afternoon, then match the snapshot, in Spanish', () => {
    act(() => {
      i18n.changeLanguage('es')
    })
    const timeSlot = {
      rangeStart: 8,
      rangeEnd: 3,
    }
    expect(renderAppointmentComponent(timeSlot)).toMatchSnapshot()
    act(() => {
      i18n.changeLanguage('en')
    })
  })

  it('with a time slot that has a nonsense time range, then match the snapshot', () => {
    const timeSlot = {
      rangeStart: 3,
      rangeEnd: 9,
    }
    expect(renderAppointmentComponent(timeSlot)).toMatchSnapshot()
  })

  it('with a time slot that has a nonsense time range, then match the snapshot, in Spanish', () => {
    act(() => {
      i18n.changeLanguage('es')
    })
    const timeSlot = {
      rangeStart: 3,
      rangeEnd: 9,
    }
    expect(renderAppointmentComponent(timeSlot)).toMatchSnapshot()
    act(() => {
      i18n.changeLanguage('en')
    })
  })
})
/* eslint-enable @typescript-eslint/no-floating-promises */
