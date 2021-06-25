import Head from 'next/head'
import Container from 'react-bootstrap/Container'
import pino from 'pino'
import { ReactElement } from 'react'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { GetServerSideProps } from 'next'

import { Header } from '../components/Header'
import { Main } from '../components/Main'
import { Footer } from '../components/Footer'
import { WorkInProgress } from '../components/WorkInProgress'

import queryApiGateway, { Claim } from '../utils/queryApiGateway'
import { useRouter } from 'next/router'

export interface HomeProps {
  claimData?: Claim[]
  loading: boolean
}

export default function Home({ claimData, loading }: HomeProps): ReactElement {
  const { t } = useTranslation('common')

  // Note whether the user came from the main UIO website or UIO Mobile, and match
  // that in our links back out to UIO.
  const router = useRouter()
  const userArrivedFromUioMobile = router.query?.from === 'uiom'

  return (
    <Container fluid className="index">
      <Head>
        <title>{t('title')}</title>
        <link rel="icon" href="/claimstatus/favicon.ico" />
        <link href="https://fonts.googleapis.com/css?family=Source Sans Pro" rel="stylesheet" />
      </Head>
      <WorkInProgress />
      <Header userArrivedFromUioMobile={userArrivedFromUioMobile} />
      <Main loading={loading} userArrivedFromUioMobile={userArrivedFromUioMobile} />
      <Footer />
      {console.dir({ claimData })} {/* @TODO: Remove. For development purposes only. */}
    </Container>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ req, locale }) => {
  const isProd = process.env.NODE_ENV === 'production'
  const logger = isProd ? pino({}) : pino({ prettyPrint: true })
  logger.info(req)

  // Step 1: Make the API request and return the data.
  const data: Claim = await queryApiGateway(req)

  // Step 2: Return Props
  return {
    props: {
      claimData: [data],
      loading: false,
      ...(await serverSideTranslations(locale || 'en', ['common', 'header', 'footer'])),
    },
  }
}
