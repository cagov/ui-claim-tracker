import { useTranslation } from 'next-i18next'

import { NextSteps } from './NextSteps'
import { TextLine } from './TextLine'
import { TransLine } from './TransLine'
import { Appointment, ClaimStatusContent, TransLineContent } from '../types/common'
import { formatAppointmentDate } from '../utils/formatDate'
import { identifyI18nPeriod, samePeriod } from '../utils/timeSlot'

export interface ClaimStatusProps extends ClaimStatusContent {
  loading: boolean
  userArrivedFromUioMobile: boolean
}

export const ClaimStatus: React.FC<ClaimStatusProps> = ({
  loading = false,
  userArrivedFromUioMobile = false,
  heading,
  summary,
  yourNextSteps,
  eddNextSteps,
  appointment,
}) => {
  const { t, i18n } = useTranslation(['common', 'claim-status'])

  /**
   * Nested function to format appointment dates and times.
   */
  function formatAppointment(appointment: Appointment): string {
    let formattedAppointment = ''

    if (appointment) {
      // Format the date portion.
      formattedAppointment = formatAppointmentDate(appointment.date, i18n.language)

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
            t('time.from-mixed-times'),
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
    }

    return formattedAppointment
  }

  /**
   * Nested function to construct the summary containing multiple paragraphs.
   */
  function buildSummary(
    loading: boolean,
    userArrivedFromUioMobile: boolean,
    summary: TransLineContent[],
    appointment: Appointment | null,
  ): JSX.Element[] {
    let elements: JSX.Element[] = []

    // Build generic summary paragraphs.
    elements = summary.map((paragraph, index) => (
      <div key={index} className="">
        <TransLine
          loading={loading}
          userArrivedFromUioMobile={userArrivedFromUioMobile}
          i18nKey={paragraph.i18nKey}
          links={paragraph.links}
        />
      </div>
    ))

    // Build scenario 2 appointment.
    if (appointment) {
      const formattedAppointment: string = formatAppointment(appointment)
      const wrappedAppointment = (
        <div key="appointment" className="appointment">
          <TextLine loading={loading} text={formattedAppointment} />
        </div>
      )
      // Splice it in as the second element.
      elements.splice(1, 0, wrappedAppointment)
    }

    return elements
  }

  return (
    <div className="claim-status claim-section">
      <h2>{t('claim-status.title')}</h2>
      <div className="pending-status claim-subsection">
        <TextLine loading={loading} header text={t(heading)} />
      </div>
      <div className="summary">{buildSummary(loading, userArrivedFromUioMobile, summary, appointment)}</div>
      <NextSteps
        loading={loading}
        userArrivedFromUioMobile={userArrivedFromUioMobile}
        header={t('claim-status.your-next-steps')}
        nextSteps={yourNextSteps}
      />
      <NextSteps
        loading={loading}
        userArrivedFromUioMobile={userArrivedFromUioMobile}
        header={t('claim-status.edd-next-steps')}
        nextSteps={eddNextSteps}
      />
    </div>
  )
}
