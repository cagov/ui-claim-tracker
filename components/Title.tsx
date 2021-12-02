import { useTranslation } from 'next-i18next'

export const Title: React.FC = () => {
  const { t } = useTranslation('common')

  return <h1>{t('welcome')}</h1>
}
