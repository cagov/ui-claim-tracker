import Link from 'next/link'
import { useRouter } from 'next/router'

import { useTranslation } from 'next-i18next'

export interface LanguageSwitcherProps {
  mobile: boolean
}

export const LanguageSwitcher: React.FC<LanguageSwitcherProps> = ({ mobile = false }) => {
  const { t } = useTranslation('common')
  const router = useRouter()

  const queryString = mobile ? { from: 'uiom' } : {}
  return (
    <div className="language-switcher">
      <Link href={{ pathname: '/', query: queryString }} locale={router.locale === 'en' ? 'es' : 'en'}>
        <span className="text">{t('change-locale')}</span>
      </Link>
    </div>
  )
}
