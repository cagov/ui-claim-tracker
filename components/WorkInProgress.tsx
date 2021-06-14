import Alert from 'react-bootstrap/Alert'

import { useTranslation } from 'next-i18next'
import { Trans } from 'react-i18next'
import React, { useState } from 'react'

export const WorkInProgress: React.FC = () => {
  const { t } = useTranslation('common')
  const [show, setShow] = useState(true)

  if (show) {
    return (
      <Alert variant="primary" onClose={() => setShow(false)} dismissible fixed-top>
        <div className="work-in-progress">
          <div className="work-in-progress-content">
            <span className="work-in-progress-title">{t('work-in-progress.title')}</span>
            &nbsp;
            <span className="work-in-progress-message">
              {
                // TODO correct link
                <Trans i18nKey="work-in-progress.message">
                  While we test this new part of UI Online, the information here may be limited for your claim.
                  We&apos;re working to add information about common issues that lead to&nbsp;
                  <a href="https://navapbc.com">pending payments</a>
                </Trans>
              }
            </span>
          </div>
        </div>
      </Alert>
    )
  } else {
    return <div className="work-in-progress"> </div>
  }
}
