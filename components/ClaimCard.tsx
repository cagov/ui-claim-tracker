import Link from 'next/link'
import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/router'

import { Button } from './Button'
import { ClaimCardDetails } from './ClaimCardDetails'

export const ClaimCard: React.FC = () => {
  const { t } = useTranslation('common')
  const router = useRouter()

  return (
    <div className="claim-card">
      <ClaimCardDetails
        title="Unemployment Insurance (UI)"
        benefitYear="7/21/2020 - 7/20/2021"
        claimBalance="$508.00"
      />
      <Link href="/" locale={router.locale === 'en' ? 'es' : 'en'}>
        <Button primary label={t('change-locale')} />
      </Link>
    </div>
  )
}
