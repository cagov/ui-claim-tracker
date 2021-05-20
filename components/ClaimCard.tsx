import { ClaimDetails } from './ClaimDetails'
import { ClaimCardBody } from './ClaimCardBody'

export const ClaimCard: React.FC = () => {
  return (
    <div className="claim-card">
      <ClaimDetails title="Unemployment Insurance (UI)" benefitYear="3/21/2020 - 3/20/2021" claimBalance="$0.00" />
      <ClaimCardBody
        statusUpdated="2-25-2021"
        statusMain="Your claim balance has been exhausted."
        statusDetails="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
        nextSteps={[
          'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
          'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
        ]}
      />
    </div>
  )
}
