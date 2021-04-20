import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import { useTranslation } from 'next-i18next'

export interface FooterProps {
  user?: Record<string, unknown>
}

export const Footer: React.FC<FooterProps> = () => {
  const { t } = useTranslation('footer')

  return <footer className="footer">{t('footer')}</footer>
}
