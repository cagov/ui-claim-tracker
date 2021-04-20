import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import { useTranslation } from 'next-i18next'

export const Footer: React.FC = () => {
  const { t } = useTranslation('footer')

  return (
    <footer className="footer">
      <Navbar className="justify-content-between" variant="dark" bg="dark">
        <Nav className="flex-wrap">
          <Nav.Link href="#top">{t('toTop')}</Nav.Link>
          <Nav.Link target="_blank" rel="noopener noreferrer" href="https://edd.ca.gov/about_edd/contact_edd.htm">
            {t('contact')}
          </Nav.Link>
          <Nav.Link target="_blank" rel="noopener noreferrer" href="https://edd.ca.gov/about_edd/conditions_of_use.htm">
            {t('conditionsOfUse')}
          </Nav.Link>
          <Nav.Link target="_blank" rel="noopener noreferrer" href="https://edd.ca.gov/about_edd/privacy_policy.htm">
            {t('privacyPolicy')}
          </Nav.Link>
          <Nav.Link target="_blank" rel="noopener noreferrer" href="https://edd.ca.gov/about_edd/accessibility.htm">
            {t('accessibility')}
          </Nav.Link>
        </Nav>
      </Navbar>
      <div className="bg-light secondary-footer">
        <Container>{t('copyright')}</Container>
      </div>
    </footer>
  )
}
