import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav'
import { useTranslation } from 'next-i18next'

import { HeaderIcon } from './HeaderIcon'

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
  const uioHomeDesktopLink = getUrl('uio-desktop-home', urlPrefixes)
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
      <nav id="navigation" className="main-navigation megadropdown auto-highlight noindex mobile-closed">
        <ul className="top-level-nav nav-menu">
          <HeaderIcon link={uioHomeDesktopLink} label={t('header.uio-home')} icon="ca-gov-icon-home" />
          <HeaderIcon
            link={getUrl('uio-desktop-certify', urlPrefixes)}
            label={t('header.uio-certify')}
            icon="ca-gov-icon-file-check"
          />
          <HeaderIcon
            link={getUrl('uio-desktop-payments', urlPrefixes)}
            label={t('header.uio-payments')}
            icon="ca-gov-icon-currency"
          />
          <HeaderIcon
            link={getUrl('uio-desktop-history', urlPrefixes)}
            label={t('header.uio-history')}
            icon="ca-gov-icon-clock"
          />
          <HeaderIcon link={cstUrl} label={t('header.uio-status')} icon="ca-gov-icon-file-medical-alt" />
          <HeaderIcon
            link={getUrl('uio-desktop-profile', urlPrefixes)}
            label={t('header.uio-profile')}
            icon="ca-gov-icon-person"
          />
          <HeaderIcon
            link={getUrl('uio-desktop-inbox', urlPrefixes)}
            label={t('header.uio-inbox')}
            icon="ca-gov-icon-email"
          />
          <HeaderIcon
            link={getUrl('uio-desktop-contact', urlPrefixes)}
            label={t('header.uio-contact')}
            icon="ca-gov-icon-users-dialog"
          />
        </ul>
      </nav>
    )
  }

  return (
    <header className="header global-header fixed">
      <nav className="justify-content-between utility-header">
        <Container>
          <div className="group flex-row">
            <div className="social-media-links">
              <div className="header-cagov-logo">
                <a target="_blank" rel="noopener noreferrer" href={getUrl('ca-gov')}>
                  <span className="sr-only">CA.gov</span>
                  <img
                    src={assetPrefix + '/images/Ca-Gov-Logo-Gold.svg'}
                    alt={t('header.alt-image-cagov')}
                    className="pos-rel"
                  />
                </a>
              </div>
            </div>
            <div className="settings-links">
              <Nav.Link target="_blank" rel="noopener noreferrer" href={getUrl('edd-ca-gov')}>
                <span className="text">{t('header.edd-home')}</span>
              </Nav.Link>
              <Nav.Link target="_blank" rel="noopener noreferrer" href={getUrl('uio-desktop-help-new-claim')}>
                <span className="text">{t('header.help')}</span>
              </Nav.Link>
              <Nav.Link href={getUrl('bpo-logout')}>
                <span className="text">{t('header.logout')}</span>
              </Nav.Link>
            </div>
          </div>
        </Container>
      </nav>
      <div className="branding">
        <div className="header-organization-banner">
          <a target="_blank" rel="noopener noreferrer" href={getUrl('edd-ca-gov')}>
            <img src={assetPrefix + '/images/edd-logo-2-Color.svg'} alt={t('header.alt-image-edd')} />
          </a>
        </div>
      </div>
      <div className="mobile-controls">
        <span className="mobile-control-group mobile-header-icons" />
        <div className="mobile-control-group main-nav-icons float-right">
          <button className="mobile-control toggle-search float-left m-l">
            <span className="ca-gov-icon-search hidden-print" aria-hidden="true" />
            <span className="sr-only">Search</span>
          </button>
          <button
            id="nav-icon3"
            className="mobile-control toggle-menu"
            aria-expanded="false"
            aria-controls="navigation"
          >
            <span />
            <span />
            <span />
            <span />
            <span className="sr-only">Menu</span>
          </button>
        </div>
      </div>
      <div className="navigation-search">
        {globalHeader}
        <div id="head-search" className="search-container in" aria-hidden="true">
          <div className="container" />
        </div>
      </div>
    </header>
  )
}
