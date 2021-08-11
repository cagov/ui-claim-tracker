import { ClaimDetails } from './ClaimDetails'
import { ClaimStatus } from './ClaimStatus'
import { ScenarioContent } from '../types/common'

export interface ClaimSectionProps extends ScenarioContent {
  loading: boolean
  userArrivedFromUioMobile: boolean
}

export const ClaimSection: React.FC<ClaimSectionProps> = ({
  loading = false,
  userArrivedFromUioMobile = false,
  statusContent,
  detailsContent,
}) => {
  let claimDetails: JSX.Element

  if (detailsContent) {
    claimDetails = (
      <ClaimDetails
        loading={loading}
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
        loading={loading}
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
