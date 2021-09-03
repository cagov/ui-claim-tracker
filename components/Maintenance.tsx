import { useTranslation } from 'next-i18next'

export const Maintenance: React.FC = () => {
  const { t } = useTranslation('common')

  return (
    <div className="error-content">
      <div className="error-label">{t('errors.server-error.label')}</div>
      <div className="error-entry">{t('errors.server-error.entry')}</div>
    </div>
  )
}
