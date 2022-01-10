import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import { useTranslation } from 'next-i18next'
import { ExternalLink } from './ExternalLink'
import getUrl from '../utils/browser/getUrl'

export const Footer: React.FC = () => {
  const { t } = useTranslation('common')

  return (
    <footer className="footer">
      <Container>
        <Navbar className="justify-content-between" variant="dark">
          <Nav className="flex-column flex-sm-row">
            <Nav.Link href="#top">{t('footer.toTop')}</Nav.Link>
            <ExternalLink url={getUrl('edd-about-contact')} text={t('footer.contact')} />
            <ExternalLink url={getUrl('edd-about-conditions-of-use')} text={t('footer.conditionsOfUse')} />
            <ExternalLink url={getUrl('edd-about-privacy-policy')} text={t('footer.privacyPolicy')} />
            <ExternalLink url={getUrl('edd-about-accessibility')} text={t('footer.accessibility')} />
          </Nav>
        </Navbar>
      </Container>
      <div className="secondary-footer">
        <Container>
          <div className="copyright">{t('footer.copyright')}</div>
        </Container>
      </div>
    </footer>
  )
}
