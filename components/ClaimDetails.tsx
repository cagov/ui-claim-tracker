import { useTranslation } from 'next-i18next'
import { InfoField } from './InfoField'
import { ClaimDetailsContent } from '../types/common'

export interface ClaimDetailsProps extends ClaimDetailsContent {
  loading: boolean
}

export const ClaimDetails: React.FC<ClaimDetailsProps> = ({
  loading = false,
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
    claimBalanceField = <InfoField loading={loading} label={t('claim-details.claim-balance')} text={claimBalance} />
  }

  let weeklyBenefitAmountField: JSX.Element | null = null
  if (weeklyBenefitAmount) {
    weeklyBenefitAmountField = (
      <InfoField loading={loading} label={t('claim-details.weekly-benefit-amount')} text={weeklyBenefitAmount} />
    )
  }

  let lastPaymentIssuedField: JSX.Element | null = null
  if (lastPaymentIssued) {
    lastPaymentIssuedField = (
      <InfoField loading={loading} label={t('claim-details.last-payment-issued')} text={lastPaymentIssued} />
    )
  }

  let extension: JSX.Element | null = null
  if (extensionType) {
    extension = (
      <div className="col-6">
        <div />
        <InfoField loading={loading} label={t('claim-details.extension-type')} text={t(extensionType)} />
      </div>
    )
  }

  return (
    <div className="claim-details claim-section container">
      <h2 className="claim-details-title">{t('claim-details.title')}</h2>

      <div className="claim-details-box">
        <div className="row">
          <div className="col-6">
            <InfoField loading={loading} label={t('claim-details.program-type')} text={t(programType)} />

            <InfoField loading={loading} label={t('claim-details.benefit-year')} text={benefitYear} />

            {claimBalanceField}

            {weeklyBenefitAmountField}

            {lastPaymentIssuedField}
          </div>
          {extension}
        </div>
      </div>
    </div>
  )
}
