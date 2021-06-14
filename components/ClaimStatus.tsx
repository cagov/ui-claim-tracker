import { useTranslation } from 'next-i18next'

import { Button } from './Button'
import { NextSteps } from './NextSteps'
import { TextLine } from './TextLine'

export interface ClaimStatusProps {
  loading: boolean
  statusUpdated: string
  nextSteps?: string[]
}

export const ClaimStatus: React.FC<ClaimStatusProps> = ({
  loading,
  statusUpdated = 'April 4th, 2021',
  nextSteps = ['step one', 'step two'],
}) => {
  const { t } = useTranslation('common')

  return (
    <div className="claim-status">
      <h2>{t('claim-status.title')}</h2>
      <div className="pending-status">
        <TextLine loading={loading} text={t('claim-status.pending')} />
      </div>
      <div className="status-box">
        <div className="topbar">
          <TextLine loading={loading} text={t('claim-status.you-need-to')} />
        </div>
        <div className="explanation">
          <NextSteps loading={loading} nextSteps={nextSteps} />
          <span className="claim-status-date">
            <TextLine loading={loading} text={t('claim-status.updated', { date: statusUpdated })} />
          </span>
        </div>
      </div>
      <a href="https://uio.edd.ca.gov">
        {/*  TODO what is the URL here? */}
        <Button primary label={t('claim-status.manage-claim')} />
      </a>
    </div>
  )
}
