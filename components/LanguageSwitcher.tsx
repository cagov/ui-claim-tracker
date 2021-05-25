import Link from 'next/link'
import { useRouter } from 'next/router'

import { useTranslation } from 'next-i18next'

export const LanguageSwitcher: React.FC = () => {
  const { t } = useTranslation('common')
  const router = useRouter()

  return (
    <div className="language-switcher">
      <Link href="/" locale={router.locale === 'en' ? 'es' : 'en'}>
        <span className="text">{t('change-locale')}</span>
      </Link>
    </div>
  )
}
