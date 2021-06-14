import fs from 'fs'
import path from 'path'
import https from 'https'

import Head from 'next/head'
import Container from 'react-bootstrap/Container'
import pino from 'pino'
import { ReactElement } from 'react'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { GetServerSideProps } from 'next'
import fetch, { Response } from 'node-fetch'

import { Header } from '../components/Header'
import { Main } from '../components/Main'
import { Footer } from '../components/Footer'
import { Feedback } from '../components/Feedback'

export interface Claim {
  ClaimType: string | 'not working'
}

export interface HomeProps {
  claimData?: Claim[]
  loading: boolean
}

export default function Home({ claimData, loading }: HomeProps): ReactElement {
  const { t } = useTranslation('common')

  return (
    <Container fluid className="index">
      <Head>
        <title>{t('title')}</title>
        <link rel="icon" href="/favicon.ico" />
        <link href="https://fonts.googleapis.com/css?family=Source Sans Pro" rel="stylesheet" />
      </Head>
      <Feedback />
      <Header />
      <Main loading={loading} />
      <Footer />
      {console.dir({ claimData })} {/* @TODO: Remove. For development purposes only. */}
    </Container>
  )
}

export interface QueryParams {
  user_key: string
  uniqueNumber: string
}

function buildApiUrl(url: string, queryParams: QueryParams) {
  const apiUrl = new URL(url)

  for (const key in queryParams) {
    apiUrl.searchParams.append(key, queryParams[key as 'user_key' | 'uniqueNumber'])
  }

  return apiUrl.toString()
}

export const getServerSideProps: GetServerSideProps = async ({ req, locale }) => {
  const isProd = process.env.NODE_ENV === 'production'
  const logger = isProd ? pino({}) : pino({ prettyPrint: true })
  logger.info(req)

  /*
   * Load environment variables to be used for authentication & API calls.
   * @TODO: Handle error case where env vars are null or undefined.
   */
  // Request fields
  const ID_HEADER_NAME: string = process.env.ID_HEADER_NAME ?? ''

  // API fields
  const API_URL: string = process.env.API_URL ?? ''
  const API_USER_KEY: string = process.env.API_USER_KEY ?? ''

  // TLS Certificate fields
  const CERT_DIR: string = process.env.CERTIFICATE_DIR ?? ''
  const P12_FILE: string = process.env.P12_FILE ?? ''
  const P12_PATH: string = path.join(CERT_DIR, P12_FILE)

  let apiData: JSON | null = null

  // Makes API call, returns all API data.
  async function makeRequest() {
    const headers = {
      Accept: 'application/json',
    }

    // https://nodejs.org/api/tls.html#tls_tls_createsecurecontext_options
    const options = {
      pfx: fs.readFileSync(P12_PATH),
    }

    // Instantiate agent to use with TLS Certificate.
    // Reference: https://github.com/node-fetch/node-fetch/issues/904#issuecomment-747828286
    const sslConfiguredAgent: https.Agent = new https.Agent(options)

    const apiUrlParams: QueryParams = {
      user_key: API_USER_KEY,
      uniqueNumber: req.headers[ID_HEADER_NAME] as string,
    }

    const apiUrl: RequestInfo = buildApiUrl(API_URL, apiUrlParams)

    try {
      const response: Response = await fetch(apiUrl, {
        headers: headers,
        agent: sslConfiguredAgent,
      })

      // TODO: Why does @ts-ignore not work on this line?
      // TODO: Implement proper typing of responseBody if possible.
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      const responseBody: JSON = await response.json()

      apiData = responseBody
    } catch (error) {
      console.log(error)
    }

    // Although we are using an https.Agent with keepAlive false (default behaviour),
    // we are explicitly destroying it because:
    // > It is good practice, to destroy() an Agent instance when it is no longer in use,
    // > because unused sockets consume OS resources.
    // https://nodejs.org/api/http.html#http_class_http_agent
    sslConfiguredAgent.destroy()

    return apiData
  }

  // Use the above code so getServerSideProps returns props.
  // Step 1: Make the API request and return the data.
  const data = await makeRequest()

  // Step 2: Return Props
  return {
    props: {
      claimData: [data],
      loading: false,
      ...(await serverSideTranslations(locale || 'en', ['common', 'header', 'footer'])),
    },
  }
}
