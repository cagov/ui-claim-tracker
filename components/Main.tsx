import Container from 'react-bootstrap/Container'

import Link from 'next/link'
import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/router'

export const Main: React.FC = () => {
  const { t } = useTranslation('common')
  const router = useRouter()

  return (
    <main className="main">
      <Container className="main-content">
        <h1 className="title">{t('welcome')}</h1>
        <p />
        <Link href="/" locale={router.locale === 'en' ? 'es' : 'en'}>
          <button>{t('change-locale')}</button>
        </Link>
      </Container>
    </main>
  )
}
