export interface ClaimCardDetailsProps {
  title: string
  benefitYear: string
  claimBalance: string
}

export const ClaimCardDetails: React.FC<ClaimCardDetailsProps> = ({
  title = 'Unemployment Insurance (UI)',
  benefitYear = '3/21/2020 - 3/20/2021',
  claimBalance = '$0.00',
}) => {
  return (
    <div className="claim-card-details">
      <h2>{title}</h2>

      <div className="info">
        <h3 className="info-label">Benefit Year</h3>
        <span className="info-entry">{benefitYear}</span>
      </div>

      <div className="info">
        <h3 className="info-label">Claim Balance</h3>
        <span className="info-entry">{claimBalance}</span>
      </div>
    </div>
  )
}
