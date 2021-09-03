import { useTranslation } from 'next-i18next'

export const Maintenance: React.FC = () => {
  const { t } = useTranslation('common')

  return (
    <div className="error-content">
      <div className="error-label">{t('maintenance.label')}</div>
      <div className="error-entry">{t('maintenance.entry')}</div>
      <div className="error-entry">{t('maintenance.entry2')}</div>
    </div>
  )
}
