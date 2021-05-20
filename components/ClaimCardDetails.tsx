import { useTranslation } from 'next-i18next'
export interface ClaimCardDetailsProps {
  title: string
  programType: string
  benefitYear: string
  claimBalance: string
  weeklyBenefitAmount: string
  lastPaymentIssued: string
  extentionType: string
  extensionEndDate: string
}

export const ClaimCardDetails: React.FC<ClaimCardDetailsProps> = ({
  title = 'Claim Details',
  programType = 'Unemployment Insurance (UI)',
  benefitYear = '3/21/2020 - 3/20/2021',
  claimBalance = '$508.00',
  weeklyBenefitAmount = '$120.00',
  lastPaymentIssued = '4/29/2021',
  extentionType = 'Tier 2 Extension',
  extensionEndDate = '5/22/2021',
}) => {
  const { t } = useTranslation('common')

  return (
    <div className="claim-card-details container">
      <h2>{title}</h2>

      <div className="claim-card-details-box">
        <div className="row">
          <div className="col-12">
            <div className="info">
              <h3 className="info-label">{t('claim-details.program-type')}</h3>
              <span className="info-entry-primary">{programType}</span>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-6">
            <div className="info">
              <h3 className="info-label">{t('claim-details.benefit-year')}</h3>
              <span className="info-entry">{benefitYear}</span>
            </div>

            <div className="info">
              <h3 className="info-label">{t('claim-details.claim-balance')}</h3>
              <span className="info-entry">{claimBalance}</span>
            </div>

            <div className="info">
              <h3 className="info-label">{t('claim-details.weekly-benefit-amount')}</h3>
              <span className="info-entry">{weeklyBenefitAmount}</span>
            </div>

            <div className="info">
              <h3 className="info-label">{t('claim-details.last-payment-issued')}</h3>
              <span className="info-entry">{lastPaymentIssued}</span>
            </div>
          </div>
          <div className="col-6">
            <div />
            <div className="info">
              <h3 className="info-label">{t('claim-details.extension-type')}</h3>
              <span className="info-entry">{extentionType}</span>
            </div>

            <div className="info">
              <h3 className="info-label">{t('claim-details.extension-end-date')}</h3>
              <span className="info-entry">{extensionEndDate}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
