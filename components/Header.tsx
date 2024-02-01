import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import { useTranslation } from 'next-i18next'

import { HeaderIcon } from './HeaderIcon'
import { ExternalLink } from './ExternalLink'
import { ExternalBrand } from './ExternalBrand'
import { LanguageSelector } from './LanguageSelector'

import { UrlPrefixes } from '../types/common'
import getUrl from '../utils/browser/getUrl'

export interface HeaderProps {
  userArrivedFromUioMobile: boolean
  assetPrefix: string
  urlPrefixes?: UrlPrefixes
}

export const Header: React.FC<HeaderProps> = ({ userArrivedFromUioMobile = false, urlPrefixes, assetPrefix = '' }) => {
  const { t, i18n } = useTranslation('common')

  // Return a link back to:
  //   UIO Mobile landing page if user arrived from UIO Mobile
  //   main UIO landing page if user arrived from main UIO
  const uioHomeDesktopLink = getUrl('uio-desktop-home', urlPrefixes, i18n.language)
  const uioHomeLink = userArrivedFromUioMobile ? getUrl('uio-mobile-home', urlPrefixes) : uioHomeDesktopLink

  let globalHeader: JSX.Element

  if (userArrivedFromUioMobile) {
    globalHeader = (
      <Nav className="uiom">
        <Nav.Link className="uiom" rel="noopener noreferrer" href={uioHomeLink}>
          <span className="text">{t('header.uio-home')}</span>
        </Nav.Link>
      </Nav>
    )
  } else {
    let cstUrl: string | undefined = getUrl('uio-claimstatus', urlPrefixes)
    if (cstUrl !== undefined && i18n.language !== 'en') {
      cstUrl += `/${i18n.language}`
    }

    globalHeader = (
      <>
        <HeaderIcon link={uioHomeDesktopLink} label={t('header.uio-home')} icon="ca-gov-icon-home" />
        <HeaderIcon
          link={getUrl('uio-desktop-certify', urlPrefixes, i18n.language)}
          label={t('header.uio-certify')}
          icon="ca-gov-icon-file-check"
        />
        <HeaderIcon
          link={getUrl('uio-desktop-payments', urlPrefixes, i18n.language)}
          label={t('header.uio-payments')}
          icon="ca-gov-icon-currency"
        />
        <HeaderIcon
          link={getUrl('uio-desktop-history', urlPrefixes, i18n.language)}
          label={t('header.uio-history')}
          icon="ca-gov-icon-clock"
        />
        <HeaderIcon link={cstUrl} label={t('header.uio-status')} icon="ca-gov-icon-file-medical-alt" />
        <HeaderIcon
          link={getUrl('uio-desktop-profile', urlPrefixes, i18n.language)}
          label={t('header.uio-profile')}
          icon="ca-gov-icon-person"
        />
        <HeaderIcon
          link={getUrl('uio-desktop-inbox', urlPrefixes, i18n.language)}
          label={t('header.uio-inbox')}
          icon="ca-gov-icon-email"
        />
        <HeaderIcon
          link={getUrl('uio-desktop-contact', urlPrefixes, i18n.language)}
          label={t('header.uio-contact')}
          icon="ca-gov-icon-users-dialog"
        />
      </>
    )
  }

  return (
    <header className="header border-bottom border-secondary">
      <Navbar collapseOnSelect className="justify-content-between" expand="lg" fixed-top="true" variant="dark">
        <Container>
          <ExternalBrand
            url={getUrl('ca-gov')}
            src={assetPrefix + '/images/Ca-Gov-Logo-Gold.svg'}
            alt={t('header.alt-image-cagov')}
            width="46"
            height="34"
          />
          <Nav>
            <Nav.Item>
              <LanguageSelector />
            </Nav.Item>
            <Navbar.Collapse>
              <ExternalLink url={getUrl('edd-ca-gov')} text={t('header.edd-home')} />
            </Navbar.Collapse>
            <Nav.Link
              target="_blank"
              rel="noopener noreferrer"
              href={getUrl('uio-desktop-help-new-claim', urlPrefixes, i18n.language)}
            >
              <span className="text">{t('header.help')}</span>
            </Nav.Link>
            <Nav.Link href={getUrl('bpo-logout')}>
              <span className="text">{t('header.logout')}</span>
            </Nav.Link>
          </Nav>
        </Container>
      </Navbar>
      <Navbar className="justify-content-between" expand="lg" variant="light">
        <Container>
          <ExternalBrand
            url={getUrl('edd-ca-gov')}
            src={assetPrefix + '/images/edd-logo-2-Color.svg'}
            alt={t('header.alt-image-edd')}
            width="171"
            height="60"
            classes="edd-logo d-inline-block align-top mr-5"
          />
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse>{globalHeader}</Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  )
}
