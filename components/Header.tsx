import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import { useTranslation } from 'next-i18next'

export interface HeaderProps {
  mobile: boolean
}

export const Header: React.FC<HeaderProps> = ({ mobile = false }) => {
  const { t } = useTranslation('common')

  const uioHomeBase = mobile ? t('header.uio-home-url.mobile') : t('header.uio-home-url.desktop')
  const uioHomeLink = uioHomeBase + t('header.uio-home-url.locale')

  return (
    <header className="header border-bottom border-secondary">
      <Navbar collapseOnSelect className="justify-content-between" expand="lg" fixed-top="true" variant="dark">
        <Container>
          <Navbar.Brand target="_blank" rel="noopener noreferrer" href="https://ca.gov">
            <img
              src="/claimstatus/images/Ca-Gov-Logo-Gold.svg"
              alt={t('header.alt-image-cagov')}
              width="46"
              height="34"
            />
          </Navbar.Brand>
          <Nav>
            <Navbar.Collapse>
              <Nav.Link target="_blank" rel="noopener noreferrer" href="https://edd.ca.gov">
                <span className="text">{t('header.edd-home')}</span>
              </Nav.Link>
            </Navbar.Collapse>
            {/*  TODO what is the URL here? */}
            <Nav.Link target="_blank" rel="noopener noreferrer" href="https://askedd.edd.ca.gov/">
              <span className="text">{t('header.help')}</span>
            </Nav.Link>
            {/*  TODO what is the URL here? */}
            <Nav.Link target="_blank" rel="noopener noreferrer" href="https://edd.ca.gov/login.htm">
              <span className="text">{t('header.logout')}</span>
            </Nav.Link>
          </Nav>
        </Container>
      </Navbar>
      <Navbar className="justify-content-between" expand="lg" variant="light">
        <Container>
          <Navbar.Brand target="_blank" rel="noopener noreferrer" href="https://edd.ca.gov">
            <img
              src="/claimstatus/images/edd-logo-2-Color.svg"
              alt={t('header.alt-image-edd')}
              height="60"
              width="171"
              className="d-inline-block align-top mr-5"
            />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse>
            <Nav>
              <Nav.Link target="_blank" rel="noopener noreferrer" href={uioHomeLink}>
                <span className="text">{t('header.uio-home')}</span>
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  )
}
