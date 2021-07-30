import renderer, { act } from 'react-test-renderer'

import i18n from '../jest-i18n'
import { Appointment } from '../../components/Appointment'
import { TimeSlot } from '../../types/common'

/**
 * Helper functions.
 */

function renderAppointmentComponent(timeSlot: TimeSlot | undefined): string {
  // Set a random date in PT time.
  const date = new Date('2021-05-05T00:00:00.000-0800')
  return renderer.create(<Appointment loading={false} date={date} timeSlot={timeSlot} />).toJSON()
}

/**
 * Appointment snapshot tests.
 */

// Each test case should be:
// [test description, timeSlot.rangeStart, timeSlot.rangeEnd]
const testCases = [
  ['with no time slot, then match the snapshot', null, null],
  ['with a morning time slot, then match the snapshot', 8, 10],
  ['with an afternoon time slot, then match the snapshot', 1, 3],
  ['with a time slot that starts in the morning and ends in the afternoon, then match the snapshot', 8, 3],
  ['with a time slot that has a nonsense time range, then match the snapshot', 3, 9],
]

// Use describe.each() to DRY up the tests.
// See https://jestjs.io/docs/api#describeeachtablename-fn-timeout
describe.each(testCases)('If given an appointment', (description: string, start: number | null, end: number | null) => {
  // Construct the timeslot argument.
  let timeSlot: TimeSlot | undefined
  if (start && end) {
    timeSlot = {
      rangeStart: start,
      rangeEnd: end,
    }
  }

  // Run through the test cases first in English.
  it(`${description}`, () => {
    expect(renderAppointmentComponent(timeSlot)).toMatchSnapshot()
  })

  // Run through the test cases again in Spanish.
  it(`${description}, in Spanish`, () => {
    // Change the language to Spanish.

    //  The call to changeLanguage() must be wrapped in act(), otherwise Jest/react
    // complains.
    // See https://reactjs.org/link/wrap-tests-with-act
    // and https://reactjs.org/docs/test-renderer.html#testrendereract

    // Disable floating promises lint check. eslint really wants us to handle the Promise
    // returned by changeLanguage(), but it doesn't appear necessary to this test.
    // This can be revisited and refactored in the future if necessary.
    /* eslint-disable @typescript-eslint/no-floating-promises */
    act(() => {
      i18n.changeLanguage('es')
    })

    // Run the actual test.
    expect(renderAppointmentComponent(timeSlot)).toMatchSnapshot()

    // Change the language back to Spanish so the first it() renders correctly in English.
    act(() => {
      i18n.changeLanguage('en')
    })
    /* eslint-enable @typescript-eslint/no-floating-promises */
  })
})
