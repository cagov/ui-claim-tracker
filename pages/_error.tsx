import { NextPageContext } from 'next'
import { useTranslation } from 'next-i18next'
import { ReactElement } from 'react'

import { Button } from '../components/Button'
import getUrl from '../utils/browser/getUrl'

function Error(): ReactElement {
  const { t } = useTranslation('common')

  return (
    <div className="error-content">
      <div className="error-label">{t('errors.server-error.label')}</div>
      <div className="error-entry">{t('errors.server-error.entry')}</div>
      <Button primary label={t('errors.button')} onClick={getUrl('uio-desktop-home-url')} />
    </div>
  )
}

Error.getInitialProps = ({ res, err }: NextPageContext) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404
  return { statusCode }
}

export default Error
