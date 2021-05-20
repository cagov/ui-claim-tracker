import fs from 'fs'
import path from 'path'
import https from 'https'
import { promisify } from 'util'

import Head from 'next/head'
import Container from 'react-bootstrap/Container'
import { ReactElement } from 'react'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { GetServerSideProps } from 'next'
import pem, { Pkcs12ReadResult } from 'pem'
import fetch, { ResponseType } from 'node-fetch'

import { Header } from '../../components/Header'
import { Main } from '../../components/Main'
import { Footer } from '../../components/Footer'


export interface Claim {
  ClaimType: (string | "not working")
}

export interface HomeProps {
  claimData?: Claim[]
}

export default function Home({claimData}: HomeProps): ReactElement {
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
      {console.log("-Test Response-")} {/* TODO: testing, remove these console.logs before launch */}
      {console.dir({claimData})} {/* testing */}
    </Container>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ req, locale }) => {
  const PASSWORD = process.env.CERTIFICATE_PASSPHRASE
  const API_URL: string = process.env.API_URL
  const UNIQUE_NUMBER_HEADER: string = process.env.UNIQUE_NUMBER_HEADER_TITLE || "x-unique-number"
  const CERT_DIR: (string) = process.env.CERTIFICATE_DIR 
  const P12_FILE: string = process.env.P12_FILE
  const P12_PATH: string = path.join(CERT_DIR, P12_FILE)

  let apiData: (string | null) = null

  // return certificate object with cert and key fields. 
  async function getCertificate() {
    const pemReadPkcs12 = promisify(pem.readPkcs12)
    const pfx = fs.readFileSync(P12_PATH);

    const cert = await pemReadPkcs12(pfx, { p12Password: PASSWORD })

    return cert;
  }
  
  // TODO: Acquire uniqueNumber from header and use it to build API string 
  // that will eventually be passed to makeRequest. 
  // TODO: if no uniqueNumber, redirect. 
  // const requestHeaders: IncomingHttpHeaders  = req.headers;
  // const uniqueNumber = requestHeaders[UNIQUE_NUMBER_HEADER];
  // function buildApiUrl(uniqueNumber, USER_KEY){}

  async function makeRequest(certificate: Pkcs12ReadResult) {
    const headers = {
      Accept: 'application/json'
    };

    /* https://nodejs.org/api/tls.html#tls_tls_createsecurecontext_options
    
    // TODO: Store certs in memory, instead of loading every time. 
    // TODO: rejectUnauthorized - set to true or implement a `checkServerIdentity` 
    // function to check that the certificate is actually
    //  issued by the host you're connecting to.
    //  https://nodejs.org/api/https.html#https_https_request_url_options_callback
    */
    const options = {
      cert: certificate.cert,
      key: certificate.key,
      rejectUnauthorized: false, 
      keepAlive: false
    };
    const sslConfiguredAgent = new https.Agent(options);
  
    try {
      const response: Response = await fetch(API_URL, {
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

  // where it comes together
  const certificate = await getCertificate()
  const data = await makeRequest(certificate)

  return ({
    props: {
      claimData: [data],
      ...(await serverSideTranslations(locale || 'en', ['common', 'header', 'footer'])),
    }
  })
}
