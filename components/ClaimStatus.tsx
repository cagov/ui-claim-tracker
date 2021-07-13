import { useTranslation } from 'next-i18next'

import { NextSteps } from './NextSteps'
import { TextLine } from './TextLine'
import { ClaimStatusContent } from '../types/common'

export interface ClaimStatusProps extends ClaimStatusContent {
  loading: boolean
}

export const ClaimStatus: React.FC<ClaimStatusProps> = ({
  loading = false,
  statusDescription,
  yourNextSteps,
  eddNextSteps,
}) => {
  const { t } = useTranslation(['common', 'claim-status'])

  return (
    <div className="claim-status claim-section">
      <h2>{t('claim-status.title')}</h2>
      <div className="pending-status claim-subsection">
        <TextLine loading={loading} header text={t(statusDescription)} />
        <div className="claim-status-extra-info">
          Placehold text to talk more about the status of your claim with some verbosity.
          <br />
          Placehold text to talk more about the status of your claim with some verbosity.
          <br />
          More text.
        </div>
      </div>
      <NextSteps loading={loading} header={t('claim-status.your-next-steps')} nextSteps={yourNextSteps} />
      <NextSteps loading={loading} header={t('claim-status.edd-next-steps')} nextSteps={eddNextSteps} />
    </div>
  )
}
