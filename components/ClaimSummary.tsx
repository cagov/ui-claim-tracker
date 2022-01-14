import { Appointment } from './Appointment'
import { TransLine } from './TransLine'
import { ClaimSummaryContent } from '../types/common'

export interface ClaimSummaryProps extends ClaimSummaryContent {
  userArrivedFromUioMobile: boolean
}

export const ClaimSummary: React.FC<ClaimSummaryProps> = ({
  userArrivedFromUioMobile = false,
  paragraphs,
  appointment,
}) => {
  let elements: JSX.Element[] = []

  // Build generic paragraphs.
  elements = paragraphs.map((paragraph, index) => (
    <div key={index} className="summary-section">
      <TransLine
        userArrivedFromUioMobile={userArrivedFromUioMobile}
        i18nKey={paragraph.i18nKey}
        links={paragraph.links}
        hypertext={paragraph.hypertext}
      />
    </div>
  ))

  // Insert appointment as second element.
  // Currently only needed for Scenario 2.
  if (appointment) {
    const formattedAppointment = (
      <Appointment key="appointment" date={appointment.date} timeSlot={appointment.timeSlot} />
    )
    // Splice it in as the second element.
    elements.splice(1, 0, formattedAppointment)
  }

  return <div className="summary">{elements}</div>
}
