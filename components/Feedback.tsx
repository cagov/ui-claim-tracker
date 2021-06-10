import Alert from 'react-bootstrap/Alert'

import { useTranslation } from 'next-i18next'
import { Trans } from 'react-i18next'
import React, { useState } from 'react'

export const Feedback: React.FC = () => {
  const { t } = useTranslation('common')
  const [show, setShow] = useState(true)

  if (show) {
    return (
      <Alert variant="primary" onClose={() => setShow(false)} dismissible fixed-top>
        <div className="feedback">
          <div className="feedback-content">
            <span className="feedback-title">{t('feedback.title')}</span>
            &nbsp;
            <span className="feedback-message">
              {
                // TODO correct link
                <Trans i18nKey="feedback.message">
                  While we test this new part of UI Online, the information here may be limited for your claim.
                  We&apos;re working to add information about common issues that lead to{' '}
                  <a href="https://navapbc.com">pending payments</a>
                </Trans>
              }
            </span>
          </div>
        </div>
      </Alert>
    )
  } else {
    return <div className="feedback"> </div>
  }
}
