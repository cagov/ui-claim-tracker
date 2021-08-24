import Head from 'next/head'
import Container from 'react-bootstrap/Container'
import { ReactElement } from 'react'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { GetServerSideProps } from 'next'
import Error from 'next/error'
import { req as reqSerializer } from 'pino-std-serializers'

import { Header } from '../components/Header'
import { Title } from '../components/Title'
import { LanguageSwitcher } from '../components/LanguageSwitcher'
import { ClaimSection } from '../components/ClaimSection'
import { TimeoutModal } from '../components/TimeoutModal'
import { Footer } from '../components/Footer'

import { ScenarioContent } from '../types/common'
import getScenarioContent from '../utils/getScenarioContent'
import { Logger } from '../utils/logger'
import queryApiGateway, { getUniqueNumber } from '../utils/queryApiGateway'

export interface HomeProps {
  scenarioContent: ScenarioContent
  timedOut?: boolean
  loading: boolean
  errorCode?: number | null
  userArrivedFromUioMobile?: boolean
}

export default function Home({
  scenarioContent,
  timedOut = false,
  loading,
  errorCode = null,
  userArrivedFromUioMobile = false,
}: HomeProps): ReactElement {
  const { t } = useTranslation('common')

  // If any errorCode is provided, render the error page.
  let mainComponent: JSX.Element
  if (errorCode) {
    mainComponent = (
      <main className="main">
        <Container className="main-content">
          <Error statusCode={errorCode} />
        </Container>
      </main>
    )
  } else {
    mainComponent = (
      <main className="main">
        <Container className="main-content">
          <Title />
          <LanguageSwitcher userArrivedFromUioMobile={userArrivedFromUioMobile} />
          <ClaimSection
            loading={loading}
            userArrivedFromUioMobile={userArrivedFromUioMobile}
            statusContent={scenarioContent.statusContent}
            detailsContent={scenarioContent.detailsContent}
          />
        </Container>
      </main>
    )
  }

  // Otherwise, render normally.
  return (
    <Container fluid className="index">
      <Head>
        <title>{t('title')}</title>
        <link rel="icon" href="/claimstatus/favicon.ico" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
        <link
          href="https://fonts.googleapis.com/css2?family=Source+Sans+Pro:ital,wght@0,400;0,700;1,400;1,700&display=swap"
          rel="stylesheet"
        />
      </Head>
      <Header userArrivedFromUioMobile={userArrivedFromUioMobile} />
      {mainComponent}
      <TimeoutModal userArrivedFromUioMobile={userArrivedFromUioMobile} timedOut={timedOut} />
      <Footer />
      {console.dir({ scenarioContent })} {/* @TODO: Remove. For development purposes only. */}
    </Container>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ req, locale, query }) => {
  // Note whether the user came from the main UIO website or UIO Mobile, and match
  // that in our links back out to UIO.
  const userArrivedFromUioMobile = query?.from === 'uiom'

  // Other vars.
  let errorCode: number | null = null
  let scenarioContent: ScenarioContent | null = null
  const logger: Logger = Logger.getInstance()

  // Initialize logging.
  try {
    await logger.initialize()
  } catch (error) {
    // If we are unable to set up logging, return 500 and log to console.
    // As long as server-preload.js is configured with setAutoCollectConsole(true, true),
    // this console.log will be logged in Application Insights.
    errorCode = 500
    console.log(error)
  }

  // Use a separate try block for errors that are loggable to App Insights.
  try {
    logger.log(
      'info',
      {
        // If you call pino.info(req), pino does some behind the scenes serialization.
        // If you put the req into an object, it doesn't automatically do the serialization,
        // so we explicitly call it here.
        request: reqSerializer(req),
        query: query,
      },
      'Request',
    )

    // If there is no unique number in the header, AND it is the Front Door health probe,
    // then display a 500 but don't log an error.
    // If there is no unique number in the header, BUT it is not the health probe,
    // then display a 500 AND log an error.
    const uniqueNumber = getUniqueNumber(req)

    if (!uniqueNumber) {
      if (req.headers['user-agent'] !== 'Edge Health Probe') {
        logger.log('error', {}, 'Missing unique number')
      }
      errorCode = 500
    }
    // Only query the API gateway if there is a unique number in the header.
    else {
      // Make the API request and return the data.
      const claimData = await queryApiGateway(req, uniqueNumber)
      logger.log('info', claimData, 'ClaimData') /* @TODO: Remove. For development purposes only. */
      // Run business logic to get content for the current scenario.
      scenarioContent = getScenarioContent(claimData)
      logger.log('info', scenarioContent, 'ScenarioContent') /* @TODO: Remove. For development purposes only. */
    }
  } catch (error) {
    // If an error occurs, log it and show 500.
    logger.log('error', error, 'Application error')
    errorCode = 500
  }

  // Return Props.
  return {
    props: {
      scenarioContent: scenarioContent,
      loading: false,
      errorCode: errorCode,
      userArrivedFromUioMobile: userArrivedFromUioMobile,
      ...(await serverSideTranslations(locale || 'en', ['common', 'claim-details', 'claim-status'])),
    },
  }
}
