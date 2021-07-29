import { useTranslation } from 'next-i18next'

import { TextLine } from './TextLine'
import { AppointmentContent } from '../types/common'
import { formatAppointmentDate } from '../utils/formatDate'
import { capitalizeFirstLetter } from '../utils/strings'
import { identifyI18nPeriod, samePeriod } from '../utils/timeSlot'

export interface AppointmentProps {
  loading: boolean
  appointment: AppointmentContent
}

export const Appointment: React.FC<AppointmentProps> = ({ loading = false, appointment }) => {
  const { t, i18n } = useTranslation('common')

  let formattedAppointment = ''

  // Format the date portion.
  formattedAppointment = capitalizeFirstLetter(formatAppointmentDate(appointment.date, i18n.language))

  // Format the time portion.
  if (appointment.timeSlot) {
    const start = appointment.timeSlot.rangeStart
    const end = appointment.timeSlot.rangeEnd
    let words: string[] = []

    // If the times are both am or both pm, the string should look something like:
    // ", between 1–3 p.m. Pacific time"
    if (samePeriod(start, end)) {
      words = [',', t('time.between'), `${start}–${end}`, t(identifyI18nPeriod(end)), t('time.pacific-time')]
    }
    // If one time is am and one time is pm, the string should look something like:
    // ", between 10 a.m. and 12 p.m. Pacific time"
    else {
      words = [
        ',',
        t('time.between'),
        start.toString(),
        t(identifyI18nPeriod(start)),
        t('time.and'),
        end.toString(),
        t(identifyI18nPeriod(end)),
        t('time.pacific-time'),
      ]
    }

    // Join word arrays.
    formattedAppointment += words.join(' ')
  }

  return (
    <div key="appointment" className="appointment">
      <TextLine loading={loading} text={formattedAppointment} />
    </div>
  )
}
