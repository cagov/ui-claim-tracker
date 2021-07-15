import { ClaimDetails } from './ClaimDetails'
import { ClaimStatus } from './ClaimStatus'
import { ScenarioContent } from '../types/common'

export interface ClaimSectionProps extends ScenarioContent {
  loading: boolean
}

export const ClaimSection: React.FC<ClaimSectionProps> = ({ loading = false, statusContent, detailsContent }) => {
  return (
    <div className="claim-section">
      <ClaimStatus
        loading={loading}
        heading={statusContent.heading}
        summary={statusContent.summary}
        yourNextSteps={statusContent.yourNextSteps}
      />
      <ClaimDetails
        loading={loading}
        programType={detailsContent.programType}
        benefitYear={detailsContent.benefitYear}
        claimBalance={detailsContent.claimBalance}
        weeklyBenefitAmount={detailsContent.weeklyBenefitAmount}
        lastPaymentIssued={detailsContent.lastPaymentIssued}
        extensionType={detailsContent.extensionType}
      />
    </div>
  )
}
