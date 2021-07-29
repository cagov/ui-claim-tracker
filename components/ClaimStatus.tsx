import { useTranslation } from 'next-i18next'

import { Appointment } from './Appointment'
import { NextSteps } from './NextSteps'
import { TextLine } from './TextLine'
import { TransLine } from './TransLine'
import { AppointmentContent, ClaimStatusContent, TransLineContent } from '../types/common'

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
  const { t } = useTranslation(['common', 'claim-status'])

  /**
   * Nested function to construct the summary containing multiple paragraphs.
   */
  function buildSummary(
    loading: boolean,
    userArrivedFromUioMobile: boolean,
    summary: TransLineContent[],
    appointment: AppointmentContent | null,
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
      const formattedAppointment = <Appointment loading={loading} appointment={appointment} />
      // Splice it in as the second element.
      elements.splice(1, 0, formattedAppointment)
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
