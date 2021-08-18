import Link from 'next/link'
import { useRouter } from 'next/router'

import { useTranslation } from 'next-i18next'

export interface LanguageSwitcherProps {
  userArrivedFromUioMobile: boolean
}

export const LanguageSwitcher: React.FC<LanguageSwitcherProps> = ({ userArrivedFromUioMobile = false }) => {
  const { t } = useTranslation('common')
  const router = useRouter()

  const queryString = userArrivedFromUioMobile ? { from: 'uiom' } : {}
  // The Next Link will add the href value to the final <a> tag
  /* eslint-disable jsx-a11y/anchor-is-valid */
  return (
    <div className="language-switcher">
      <Link href={{ pathname: '/', query: queryString }} locale={router.locale === 'en' ? 'es' : 'en'}>
        <a className="text">{t('change-locale')}</a>
      </Link>
    </div>
  )
  /* eslint-enable jsx-a11y/anchor-is-valid */
}
