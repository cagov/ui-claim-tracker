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
    <div className="claim-status">
      <h2>{t('claim-status.title')}</h2>
      <div className="pending-status">
        <TextLine loading={loading} header text={t(statusDescription)} />
      </div>
      <NextSteps loading={loading} header={t('claim-status.your-next-steps')} nextSteps={yourNextSteps} />
      <NextSteps loading={loading} header={t('claim-status.edd-next-steps')} nextSteps={eddNextSteps} />
    </div>
  )
}
