import { ClaimDetails } from './ClaimDetails'
import { ClaimStatus } from './ClaimStatus'
import { ScenarioContent } from '../types/common'

export interface ClaimSectionProps extends ScenarioContent {
  userArrivedFromUioMobile: boolean
}

export const ClaimSection: React.FC<ClaimSectionProps> = ({
  userArrivedFromUioMobile = false,
  statusContent,
  detailsContent,
}) => {
  let claimDetails: JSX.Element

  if (detailsContent) {
    claimDetails = (
      <ClaimDetails
        programType={detailsContent.programType}
        benefitYear={detailsContent.benefitYear}
        claimBalance={detailsContent.claimBalance}
        weeklyBenefitAmount={detailsContent.weeklyBenefitAmount}
        lastPaymentIssued={detailsContent.lastPaymentIssued}
        extensionType={detailsContent.extensionType}
      />
    )
  } else {
    claimDetails = <div className="claim-details claim-section container" />
  }
  return (
    <div className="claim-section">
      <ClaimStatus
        userArrivedFromUioMobile={userArrivedFromUioMobile}
        heading={statusContent.heading}
        summary={statusContent.summary}
        yourNextSteps={statusContent.yourNextSteps}
        eddNextSteps={statusContent.eddNextSteps}
      />
      {claimDetails}
    </div>
  )
}
