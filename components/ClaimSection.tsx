import { ClaimDetails } from './ClaimDetails'
import { ClaimStatus } from './ClaimStatus'

export const ClaimSection: React.FC = () => {
  return (
    <div className="claim-card">
      <ClaimStatus
        statusUpdated="2-25-2021"
        statusMain="Your claim balance has been exhausted."
        statusDetails="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
        nextSteps={[
          'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
          'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
        ]}
      />
      <ClaimDetails
        title="Claim Details"
        programType="Unemployment Insurance (UI)"
        benefitYear="3/21/2020 - 3/20/2021"
        claimBalance="$0.00"
        weeklyBenefitAmount="$111.00"
        lastPaymentIssued="4/29/2021"
        extentionType="Tier 2 Extension"
        extensionEndDate="5/22/2021"
      />
    </div>
  )
}
