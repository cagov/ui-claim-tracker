import { useTranslation } from 'next-i18next'
import { Trans } from 'react-i18next'

export const Feedback: React.FC = () => {
  const { t } = useTranslation('common')

  return (
    <div className="feedback">
      <div className="feedback-content">
        <div className="feedback-title">{t('feedback.title')}</div>
        <div className="feedback-message">
          {
            // TODO correct feedback link?
            <Trans i18nKey="feedback.message">
              This is a new part of UI Online. <a href="https://navapbc.com">Your Feedback</a> will help us improve it.
            </Trans>
          }
        </div>
      </div>
    </div>
  )
}
