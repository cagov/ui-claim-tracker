import { useTranslation } from 'next-i18next'

import { TextLine } from './TextLine'
import { AppointmentContent } from '../types/common'
import { formatAppointmentDate } from '../utils/formatDate'
import { capitalizeFirstLetter } from '../utils/strings'
import { identifyI18nPeriod, samePeriod } from '../utils/timeSlot'

export interface AppointmentProps extends AppointmentContent {
  loading: boolean
}

export const Appointment: React.FC<AppointmentProps> = ({ loading = false, date, timeSlot }) => {
  const { t, i18n } = useTranslation('common')

  let formattedAppointment = ''

  // Format the date portion.
  formattedAppointment = capitalizeFirstLetter(formatAppointmentDate(date, i18n.language))

  // Format the time portion.
  if (timeSlot) {
    const start = timeSlot.rangeStart
    const end = timeSlot.rangeEnd

    // Appointment time slots are formatted using i18n's interpolation feature.
    // See https://www.i18next.com/translation-function/interpolation

    // If the times are both am or both pm, the string should look something like:
    // ", between 1–3 p.m. Pacific time"
    if (samePeriod(start, end)) {
      formattedAppointment += t('time.between-range', { range: `${start}–${end}`, ampm: t(identifyI18nPeriod(end)) })
    }
    // If one time is am and one time is pm, the string should look something like:
    // ", between 10 a.m. and 12 p.m. Pacific time"
    else {
      formattedAppointment += t('time.between-start-end', {
        start: { time: start, ampm: t(identifyI18nPeriod(start)) },
        end: { time: end, ampm: t(identifyI18nPeriod(end)) },
      })
    }
  }

  return (
    <div key="appointment" className="appointment">
      <strong>
        <TextLine loading={loading} text={formattedAppointment} />
      </strong>
    </div>
  )
}
