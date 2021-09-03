import { useTranslation } from 'next-i18next'
import { ReactElement } from 'react'

import { Button } from '../components/Button'
import getUrl from '../utils/browser/getUrl'

export interface ErrorProps {
  userArrivedFromUioMobile?: boolean
}

function Error({ userArrivedFromUioMobile = false }: ErrorProps): ReactElement {
  const { t } = useTranslation('common')

  function redirectToUIHome() {
    const uioHomeLink = userArrivedFromUioMobile ? getUrl('uio-mobile-home-url') : getUrl('uio-desktop-home-url')
    window.location.href = uioHomeLink || ''
  }

  return (
    <div className="error-content">
      <div className="error-label">{t('errors.server-error.label')}</div>
      <div className="error-entry">{t('errors.server-error.entry')}</div>
      <Button primary label={t('errors.button')} onClick={redirectToUIHome} />
    </div>
  )
}

export default Error
