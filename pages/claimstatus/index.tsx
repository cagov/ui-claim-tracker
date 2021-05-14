import fs from 'fs'
import path from 'path'
import https from 'https'
import fetch from 'node-fetch'
import { IncomingHttpHeaders } from 'http'

import Head from 'next/head'
import Container from 'react-bootstrap/Container'
import { ReactElement } from 'react'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { GetServerSideProps } from 'next'

import { Header } from '../../components/Header'
import { Main } from '../../components/Main'
import { Footer } from '../../components/Footer'


export interface Claim {
  ClaimType: (string | "not working")
}

export interface HomeProps {
  uniqueNumber?: string
  claimData?: Claim[]
}

export default function Home({uniqueNumber, claimData}: HomeProps): ReactElement {
  const { t } = useTranslation('common')

  return (
    <Container fluid className="index">
      <Head>
        <title>{t('title')}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />
      <Main />
      <Footer />
      {console.log("-Test Response-")} {/* testing */}
      {console.dir({claimData})} {/* testing */}
    </Container>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ req, locale }) => {

  const API_URL: string = process.env.API_URL || "fail gracefully" //TODO: Fail gracefully. 
  const UNIQUE_NUMBER_HEADER: string = process.env.UNIQUE_NUMBER_HEADER_TITLE || "x-unique-number"
  const CERT_DIR: (string) = (process.env.CERTIFICATE_DIR || "/var/ssl/certs")
  const CERT_PATH: string = path.join(CERT_DIR, '/ct.crt')
  const PUB_KEY_PATH: string = path.join(CERT_DIR, "/ct-pub.key")
  const KEY_PATH: string = path.join(CERT_DIR, "/ct.key")

  let apiData: (string | null) = null;

  const headers = {
    Accept: 'application/json'
  };
    
  const requestHeaders: IncomingHttpHeaders  = req.headers;
  const uniqueNumber = requestHeaders[UNIQUE_NUMBER_HEADER];
  // TODO: if no uniqueNumber, redirect

  async function makeRequest() {
    // https://nodejs.org/api/tls.html#tls_tls_createsecurecontext_options
    // TODO: Store certs in memory, instead of loading every time. 
    const options = {
      cert: fs.readFileSync(CERT_PATH, 'utf-8'),
      key: fs.readFileSync(KEY_PATH, 'utf-8'),
      // TODO: rejectUnauthorized - set to true or implement a `checkServerIdentity` 
      // function to check that the certificate is actually
      //  issued by the host you're connecting to.
      //  https://nodejs.org/api/https.html#https_https_request_url_options_callback
      rejectUnauthorized: false, 
      keepAlive: false
    };
  
    // we're creating a new Agent that will now use the certs we have configured
    const sslConfiguredAgent = new https.Agent(options);
  
    try {
      const response = await fetch(API_URL, {
        headers: headers, 
        agent: sslConfiguredAgent, 
      });
  
      const responseBody = await response.json();

      apiData = responseBody
    } catch (error) {
      console.log(error);
    }

    return apiData;
  }
  
  const data = await makeRequest();

  return ({
    props: {
      uniqueNumber: uniqueNumber || null,
      claimData: [data],
      ...(await serverSideTranslations(locale || 'en', ['common', 'header', 'footer'])),
    }
  })
}