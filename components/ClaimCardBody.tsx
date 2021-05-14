import Link from 'next/link'
import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/router'

import { Button } from './Button'

export interface ClaimCardBodyProps {
  statusUpdated: string
  statusMain: string
  statusDetails: string
  nextSteps?: string[]
}

export const ClaimCardBody: React.FC<ClaimCardBodyProps> = ({
  statusUpdated = '04-25-2020',
  statusMain = 'Your claim balance has expired.',
  statusDetails = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
  nextSteps = [],
}) => {
  const { t } = useTranslation('common')
  const router = useRouter()

  return (
    <div className="claim-card-body">
      <span className="claim-status-top">
        {t('claim-status')}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          className="bi bi-dot"
          viewBox="0 0 16 16"
        >
          <path d="M8 9.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z" />
        </svg>
        <span className="claim-status-date"> {t('claim-status-updated', { date: statusUpdated })}</span>
      </span>
      <h3 className="claim-status-main">{statusMain}</h3>
      <div className="claim-status-details">{statusDetails}</div>
      {nextSteps.length > 0 && <h4 className="next-steps-label">Next Steps</h4>}
      <div className="next-steps">
        <ul>
          {nextSteps.map((nextStep, index) => (
            <li key={index} className="next-step">
              {nextStep}
            </li>
          ))}
        </ul>
      </div>
      <Link href="/" locale={router.locale === 'en' ? 'es' : 'en'}>
        <Button primary label={t('change-locale')} />
      </Link>
    </div>
  )
}
