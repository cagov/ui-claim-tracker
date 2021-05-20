import { useTranslation } from 'next-i18next'

import { Button } from './Button'

export interface ClaimStatusProps {
  statusUpdated: string
  nextSteps?: string[]
}

export const ClaimStatus: React.FC<ClaimStatusProps> = ({ statusUpdated = '04-25-2020', nextSteps = [] }) => {
  const { t } = useTranslation('common')

  return (
    <div className="claim-status">
      <h2>{t('claim-status.title')}</h2>
      <span className="pending-status">{t('claim-status.pending')}</span>
      <div className="status-box">
        <div className="topbar">{t('claim-status.you-need-to')}</div>
        <div className="explanation">
          <div className="next-steps">
            <ul>
              {nextSteps.map((nextStep, index) => (
                <li key={index} className="next-step">
                  {nextStep}
                </li>
              ))}
            </ul>
          </div>
          <span className="claim-status-date"> {t('claim-status.updated', { date: statusUpdated })}</span>
        </div>
      </div>
      <a href="https://uio.edd.ca.gov">
        {/*  TODO what is the URL here? */}
        <Button primary label={t('claim-status.manage-claim')} />
      </a>
    </div>
  )
}
