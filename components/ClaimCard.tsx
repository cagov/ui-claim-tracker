import Link from 'next/link'
import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/router'

import { Button } from './Button'

export const ClaimCard: React.FC = () => {
  const { t } = useTranslation('common')
  const router = useRouter()

  return (
    <div className="claim-card">
      <Link href="/" locale={router.locale === 'en' ? 'es' : 'en'}>
        <Button primary label={t('change-locale')} />
      </Link>
    </div>
  )
}
