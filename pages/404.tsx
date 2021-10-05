import { GetStaticProps } from 'next'
import Head from 'next/head'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { ReactElement } from 'react'
import Container from 'react-bootstrap/Container'

import { Footer } from '../components/Footer'
import { Header } from '../components/Header'
import { Button } from '../components/Button'
import getUrl from '../utils/browser/getUrl'

export interface Custom404Props {
  userArrivedFromUioMobile?: boolean
}

export default function Custom404({ userArrivedFromUioMobile = false }: Custom404Props): ReactElement {
  const { t } = useTranslation('common')

  // We need to route our static content through /claimstatus to work properly through EDD
  const assetPrefix = isAzureEnv ? '/claimstatus' : ''
  const favicon = assetPrefix + '/favicon.ico'

  function redirectToUIHome() {
    const uioHomeLink = userArrivedFromUioMobile ? getUrl('uio-mobile-home-url') : getUrl('uio-desktop-home-url')
    window.location.href = uioHomeLink || ''
  }

  return (
    <Container fluid className="index">
      <Head>
        <title>{t('title')}</title>
        <link rel="icon" href={favicon} />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
        <link
          href="https://fonts.googleapis.com/css2?family=Source+Sans+Pro:ital,wght@0,400;0,700;1,400;1,700&display=swap"
          rel="stylesheet"
        />
      </Head>
      <Header userArrivedFromUioMobile={userArrivedFromUioMobile} assetPrefix={assetPrefix} />

      <main className="main">
        <Container className="main-content">
          <div className="error-content">
            <div className="error-label">{t('errors.not-found.label')}</div>
            <div className="error-entry">{t('errors.not-found.entry')}</div>
            <Button primary label={t('errors.button')} onClick={redirectToUIHome} />
          </div>
        </Container>
      </main>
      <Footer />
    </Container>
  )
}

export const getStaticProps: GetStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale || 'en', ['common'])),
  },
})
