import { toDate } from 'date-fns-tz'

import { formatAppointmentDate } from '../../../utils/browser/appointment'

// Test formatAppointmentDate()
describe('Formatting appointments', () => {
  it('displays the date in the expected format and timezone', () => {
    // Create a date that is midnight UTC
    const date = toDate('2021-01-01T00:00:00', { timeZone: 'Europe/London' })
    // Verify that it is formatted correctly for PT
    const formattedDate = formatAppointmentDate(date)
    expect(formattedDate).toBe('Thursday, December 31, 2020')
  })
})
