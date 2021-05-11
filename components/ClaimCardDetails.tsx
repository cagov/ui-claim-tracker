import { useTranslation } from 'next-i18next'
export interface ClaimCardDetailsProps {
  title: string
  benefitYear: string
  claimBalance: string
}

export const ClaimCardDetails: React.FC<ClaimCardDetailsProps> = ({
  title = 'Unemployment Insurance (UI)',
  benefitYear = '7/21/2020 - 7/20/2021',
  claimBalance = '$508.00',
}) => {
  const { t } = useTranslation('common')

  return (
    <div className="claim-card-details">
      <h2>{title}</h2>

      <div className="info">
        <h3 className="info-label">{t('claim-benefit-year')}</h3>
        <span className="info-entry">{benefitYear}</span>
      </div>

      <div className="info">
        <h3 className="info-label">{t('claim-benefit-balance')}</h3>
        <span className="info-entry">{claimBalance}</span>
      </div>
    </div>
  )
}
