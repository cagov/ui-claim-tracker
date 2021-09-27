import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import { useTranslation } from 'next-i18next'

import { HeaderIcon } from './HeaderIcon'

import { UrlPrefixes } from '../types/common'
import getUrl from '../utils/browser/getUrl'

export interface HeaderProps {
  userArrivedFromUioMobile: boolean
  urlPrefixes: UrlPrefixes
}

export const Header: React.FC<HeaderProps> = ({ userArrivedFromUioMobile = false, urlPrefixes }) => {
  const { t } = useTranslation('common')

  // Return a link back to:
  //   UIO Mobile landing page if user arrived from UIO Mobile
  //   main UIO landing page if user arrived from main UIO
  const uioHomeLink = userArrivedFromUioMobile
    ? getUrl('uio-mobile-home-url', urlPrefixes)
    : getUrl('uio-desktop-home-url', urlPrefixes)

  return (
    <header className="header border-bottom border-secondary">
      <Navbar collapseOnSelect className="justify-content-between" expand="lg" fixed-top="true" variant="dark">
        <Container>
          <Navbar.Brand target="_blank" rel="noopener noreferrer" href={getUrl('ca-gov')}>
            <img
              src="/claimstatus/images/Ca-Gov-Logo-Gold.svg"
              alt={t('header.alt-image-cagov')}
              width="46"
              height="34"
            />
          </Navbar.Brand>
          <Nav>
            <Navbar.Collapse>
              <Nav.Link target="_blank" rel="noopener noreferrer" href={getUrl('edd-ca-gov')}>
                <span className="text">{t('header.edd-home')}</span>
              </Nav.Link>
            </Navbar.Collapse>
            <Nav.Link target="_blank" rel="noopener noreferrer" href={getUrl('uio-desktop-help-new-claim')}>
              <span className="text">{t('header.help')}</span>
            </Nav.Link>
            <Nav.Link href={getUrl('bpo-log-out')}>
              <span className="text">{t('header.logout')}</span>
            </Nav.Link>
          </Nav>
        </Container>
      </Navbar>
      <Navbar className="justify-content-between" expand="lg" variant="light">
        <Container>
          <Navbar.Brand target="_blank" rel="noopener noreferrer" href={getUrl('edd-ca-gov')}>
            <img
              src="/claimstatus/images/edd-logo-2-Color.svg"
              alt={t('header.alt-image-edd')}
              height="60"
              width="171"
              className="edd-logo d-inline-block align-top mr-5"
            />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse>
            <HeaderIcon link={uioHomeLink} label={t('header.uio-home')} icon="ca-gov-icon-home" />
            <HeaderIcon
              link={getUrl('uio-desktop-certify-url', urlPrefixes)}
              label={t('header.uio-certify')}
              icon="ca-gov-icon-file-check"
            />
            <HeaderIcon
              link={getUrl('uio-desktop-payments-url', urlPrefixes)}
              label={t('header.uio-payments')}
              icon="ca-gov-icon-currency"
            />
            <HeaderIcon
              link={getUrl('uio-desktop-history-url', urlPrefixes)}
              label={t('header.uio-history')}
              icon="ca-gov-icon-clock"
            />
            <HeaderIcon link="/claimstatus" label={t('header.uio-status')} icon="ca-gov-icon-file-medical-alt" />
            <HeaderIcon
              link={getUrl('uio-desktop-profile-url', urlPrefixes)}
              label={t('header.uio-profile')}
              icon="ca-gov-icon-person"
            />
            <HeaderIcon
              link={getUrl('uio-desktop-inbox-url', urlPrefixes)}
              label={t('header.uio-inbox')}
              icon="ca-gov-icon-email"
            />
            <HeaderIcon
              link={getUrl('uio-desktop-contact-url', urlPrefixes)}
              label={t('header.uio-contact')}
              icon="ca-gov-icon-users-dialog"
            />
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  )
}
