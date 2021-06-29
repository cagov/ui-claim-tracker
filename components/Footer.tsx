import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import { useTranslation } from 'next-i18next'

export const Footer: React.FC = () => {
  const { t } = useTranslation('common')

  return (
    <footer className="footer">
      <Container>
        <Navbar className="justify-content-between" variant="dark">
          <Nav className="flex-column flex-sm-row">
            <Nav.Link href="#top">{t('footer.toTop')}</Nav.Link>
            <Nav.Link target="_blank" rel="noopener noreferrer" href="https://www.edd.ca.gov/About_EDD/Contact_EDD.htm">
              {t('footer.contact')}
            </Nav.Link>
            <Nav.Link
              target="_blank"
              rel="noopener noreferrer"
              href="https://www.edd.ca.gov/About_EDD/Conditions_Of_Use.htm"
            >
              {t('footer.conditionsOfUse')}
            </Nav.Link>
            <Nav.Link
              target="_blank"
              rel="noopener noreferrer"
              href="https://www.edd.ca.gov/About_EDD/Privacy_Policy.htm"
            >
              {t('footer.privacyPolicy')}
            </Nav.Link>
            <Nav.Link
              target="_blank"
              rel="noopener noreferrer"
              href="https://www.edd.ca.gov/About_EDD/Accessibility.htm"
            >
              {t('footer.accessibility')}
            </Nav.Link>
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
