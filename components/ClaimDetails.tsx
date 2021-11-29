import { useTranslation } from 'next-i18next'
import { InfoField } from './InfoField'
import { ClaimDetailsContent } from '../types/common'

export const ClaimDetails: React.FC<ClaimDetailsContent> = ({
  programType,
  benefitYear,
  claimBalance,
  weeklyBenefitAmount,
  lastPaymentIssued,
  extensionType,
}) => {
  const { t } = useTranslation(['common', 'claim-details'])

  let claimBalanceField: JSX.Element | null = null
  if (claimBalance) {
    claimBalanceField = <InfoField label={t('claim-details.claim-balance')} text={claimBalance} />
  }

  let weeklyBenefitAmountField: JSX.Element | null = null
  if (weeklyBenefitAmount) {
    weeklyBenefitAmountField = <InfoField label={t('claim-details.weekly-benefit-amount')} text={weeklyBenefitAmount} />
  }

  let extensionField: JSX.Element | null = null
  if (extensionType) {
    extensionField = (
      <div className="col-6">
        <div />
        <InfoField label={t('claim-details.extension-type')} text={t(extensionType)} />
      </div>
    )
  }

  return (
    <div className="claim-details claim-section container">
      <h2 className="claim-details-title">{t('claim-details.title')}</h2>

      <div className="claim-details-box">
        <div className="row">
          <div className="col-6">
            <InfoField label={t('claim-details.program-type')} text={t(programType)} />

            <InfoField label={t('claim-details.benefit-year')} text={benefitYear} />

            {claimBalanceField}

            {weeklyBenefitAmountField}

            <InfoField
              label={t('claim-details.last-payment-issued')}
              text={lastPaymentIssued || t('claim-details.none')}
            />
          </div>
          {extensionField}
        </div>
      </div>
    </div>
  )
}
