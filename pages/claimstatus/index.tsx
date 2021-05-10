import Head from 'next/head'
import Container from 'react-bootstrap/Container'
import { ReactElement } from 'react'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { GetServerSideProps } from 'next'
// import redirect from 'nextjs-redirect'?

import { Header } from '../../components/Header'
import { Main } from '../../components/Main'
import { Footer } from '../../components/Footer'



const API_URL = process.env.API_URL;
const API_USER_KEY: String = process.env.API_USER_KEY;
const UNIQUE_NUMBER_HEADER: String = process.env.UNIQUE_NUMBER_HEADER;

console.log("API URL ---> 🚀", API_URL);

//TODO: 
// buildApiUrl function could go here or in a utils folder. 
// will need to update .env formatted strings

export default function Home({ uniqueNumber }): ReactElement {
  const { t } = useTranslation('common')

  return (
    <Container fluid className="index">
      <Head>
        <title>{t('title')}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />
      <Main />
      <h1>{uniqueNumber}</h1>
      <Footer />
    </Container>
  )
}

// user request to our page
// we pull UniqueNumber out of a header
// --- then pass UniqueNumber 
// query API with UniqueNumber & SSL certificate
// load into props
// display on page 

export const getServerSideProps: GetServerSideProps = async ({ req, locale }) => {
  
  // roll the following two lines into a function, getUniqueNumber? 
  const headers: Object  = req.headers;
  const uniqueNumber: String = headers[UNIQUE_NUMBER_HEADER];
  console.log(uniqueNumber);
  // if no uniqueNumber, redirect

  //combine unique number with API_URL str template here 

  const res = await fetch(API_URL)
  // if (res.status) not 200, redirect
  // const data = await res.json()
  console.log("------");
  console.log(res);



  // Redirect if no unique number. Needs more thought, this currently does not work.
  // if (!uniqueNumber) {
  //   //redirect https://www.npmjs.com/package/nextjs-redirect
  //   return { redirect: {destination: 'https://google.com'} }; //is permanent correct?
  // }

  //https://docs.microsoft.com/en-us/azure/app-service/configure-ssl-certificate-in-code?WT.mc_id=Portal-WebsitesExtension
  
  // if uniqueNumber exists, start rendering page & trigger API gateway ASAP 
  return ({
    props: {
      uniqueNumber: uniqueNumber || null,
      ...(await serverSideTranslations(locale || 'en', ['common', 'header', 'footer'])),
    }
  })
}