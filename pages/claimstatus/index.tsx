import Head from 'next/head'
import Container from 'react-bootstrap/Container'
import { ReactElement } from 'react'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { GetServerSideProps } from 'next'

import { Header } from '../../components/Header'
import { Footer } from '../../components/Footer'

export default function Home(): ReactElement {
  const { t } = useTranslation('common')
  const router = useRouter()

  return (
    <Container fluid className="index">
      <Head>
        <title>{t('title')}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="main">
        <Header />
        <h1 className="title">{t('welcome')}</h1>
        <p />
        <Link href="/claimstatus/" locale={router.locale === 'en' ? 'es' : 'en'}>
          <button>{t('change-locale')}</button>
        </Link>
      </main>

      <Footer />
    </Container>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale || 'en', ['common', 'header', 'footer'])),
  },
})
