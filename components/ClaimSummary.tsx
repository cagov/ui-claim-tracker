import { Appointment } from './Appointment'
import { TransLine } from './TransLine'
import { ClaimSummaryContent } from '../types/common'

export interface ClaimSummaryProps extends ClaimSummaryContent {
  loading: boolean
  userArrivedFromUioMobile: boolean
}

export const ClaimSummary: React.FC<ClaimSummaryProps> = ({
  loading = false,
  userArrivedFromUioMobile = false,
  summary,
  appointment,
}) => {
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

  // Insert appointment as second element.
  // Currently only needed for Scenario 2.
  if (appointment) {
    const formattedAppointment = <Appointment loading={loading} appointment={appointment} />
    // Splice it in as the second element.
    elements.splice(1, 0, formattedAppointment)
  }
  console.log(elements)

  return <div className="summary">{elements}</div>
}
