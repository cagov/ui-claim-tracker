import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import { useTranslation } from 'next-i18next'

export const Header: React.FC = () => {
  const { t } = useTranslation('header')

  return (
    <header className="header border-bottom border-secondary">
      <Navbar collapseOnSelect className="justify-content-between" expand="lg" fixed-top="true" variant="dark">
        <Navbar.Brand target="_blank" rel="noopener noreferrer" href="https://ca.gov">
          <img src="/images/Ca-Gov-Logo-Gold.svg" width="46" height="34" />
        </Navbar.Brand>
        <Nav>
          <Navbar.Collapse>
            <Nav.Link target="_blank" rel="noopener noreferrer" href="https://edd.ca.gov">
              <span className="text">{t('edd-home')}</span>
            </Nav.Link>
          </Navbar.Collapse>
          {/*  TODO what is the URL here? */}
          <Nav.Link target="_blank" rel="noopener noreferrer" href="https://askedd.edd.ca.gov/">
            <span className="text">{t('help')}</span>
          </Nav.Link>
          {/*  TODO what is the URL here? */}
          <Nav.Link target="_blank" rel="noopener noreferrer" href="https://edd.ca.gov/login.htm">
            <span className="text">{t('logout')}</span>
          </Nav.Link>
        </Nav>
      </Navbar>
      <Navbar className="justify-content-between" expand="lg" variant="light">
        <Navbar.Brand target="_blank" rel="noopener noreferrer" href="https://edd.ca.gov">
          <img src="/images/edd-logo-2-Color.svg" height="60" width="171" className="d-inline-block align-top mr-5" />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse>
          <Nav>
            <Nav.Link target="_blank" rel="noopener noreferrer" href="https://uio.edd.ca.gov">
              <span className="text">{t('uio-home')}</span>
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </header>
  )
}
