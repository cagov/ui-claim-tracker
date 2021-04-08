import Head from 'next/head'
import Container from 'react-bootstrap/Container'
import { ReactElement } from 'react'
import styles from '../styles/Home.module.css'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { GetServerSideProps } from 'next'

import { Header } from '../components/Header'

export default function Home(): ReactElement {
  const { t } = useTranslation('common')
  const router = useRouter()

  return (
    <Container>
      <Head>
        <title>{t('title')}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <Header />
        <h1 className={styles.title}>{t('welcome')}</h1>

        <div>
          <iframe
            width="560"
            height="315"
            src="https://www.youtube.com/embed/EIyixC9NsLI"
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>

        <Link href="/" locale={router.locale === 'en' ? 'es' : 'en'}>
          <button>{t('change-locale')}</button>
        </Link>
      </main>

      <footer className={styles.footer}>
        <a href="https://www.navapbc.com/" target="_blank" rel="noopener noreferrer">
          {t('footer')}
        </a>
      </footer>
    </Container>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale || 'en', ['common'])),
  },
})
