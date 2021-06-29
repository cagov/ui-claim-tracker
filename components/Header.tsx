import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import { useTranslation } from 'next-i18next'

export interface HeaderProps {
  userArrivedFromUioMobile: boolean
}

export const Header: React.FC<HeaderProps> = ({ userArrivedFromUioMobile = false }) => {
  const { t } = useTranslation('common')

  // Return a link back to:
  //   UIO Mobile landing page if user arrived from UIO Mobile
  //   main UIO landing page if user arrived from main UIO
  const uioHomeBase = userArrivedFromUioMobile ? t('header.uio-home-url.mobile') : t('header.uio-home-url.desktop')
  const uioHomeLink = uioHomeBase + t('header.uio-home-url.locale')

  return (
    <header className="header border-bottom border-secondary">
      <Navbar collapseOnSelect className="justify-content-between" expand="lg" fixed-top="true" variant="dark">
        <Container>
          <Navbar.Brand target="_blank" rel="noopener noreferrer" href="https://www.ca.gov/">
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
            <Nav.Link
              target="_blank"
              rel="noopener noreferrer"
              href="https://uio.edd.ca.gov/UIO/Pages/Public/help/index.htm#t=en-US/Public/NewClaim/UIOnlineNewClaimLandingPage.htm"
            >
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
