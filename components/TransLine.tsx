import { Trans, useTranslation } from 'react-i18next'
import React from 'react'
import { I18nString, TransLineContent } from '../types/common'
import getUrl from '../utils/browser/getUrl'

export interface TransLineProps extends TransLineContent {
  userArrivedFromUioMobile: boolean
}

/**
 * Handle url resolution.
 */
function resolveUrl(link: I18nString, userArrivedFromUioMobile: boolean) {
  // Special case for UIO homepage links.
  // If the link is for UIO homepage or UIO landing page, do a direct getUrl() lookup.
  // Do not pass the looked up url through t() because t() will mangle the url.
  if (link === 'uio-home') {
    const uioHomeLink = userArrivedFromUioMobile ? getUrl('uio-mobile-home-url') : getUrl('uio-desktop-home-url')
    if (uioHomeLink) {
      return uioHomeLink
    }
  }
  // Special case for UIO landing page links.
  else if (link === 'uio-landing-page') {
    const uioLandingPageLink = userArrivedFromUioMobile
      ? getUrl('uio-mobile-landing-page')
      : getUrl('uio-desktop-landing-page')
    if (uioLandingPageLink) {
      return uioLandingPageLink
    }
  }

  // Otherwise, use t() to lookup the correct language-dependent url.
  const { t } = useTranslation(['common', 'claim-details', 'claim-status'])
  return t(link)
}

/**
 * "Internal" UIO/BPO links should not open in a new tab, vs "external" links to EDD, which should.
 */
function internalLink(link: I18nString): boolean {
  const uioRegex = new RegExp('^uio-')
  const bpoRegex = new RegExp('^bpo-')

  return uioRegex.test(link) || bpoRegex.test(link)
}

export const TransLine: React.FC<TransLineProps> = ({ userArrivedFromUioMobile = false, i18nKey, links = [] }) => {
  const linkComponents: JSX.Element[] = []
  if (links && links.length > 0) {
    for (const link of links) {
      const href = resolveUrl(link, userArrivedFromUioMobile)
      // Disabling some linting rules for the <a> lines. The anchor <a> element will
      // be interpolated by <Trans> to have content.
      /* eslint-disable jsx-a11y/anchor-has-content */
      /* eslint-disable react/self-closing-comp */
      if (internalLink(link)) {
        linkComponents.push(<a href={href} key={link}></a>)
      } else {
        linkComponents.push(<a target="_blank" rel="noopener noreferrer" href={href} key={link}></a>)
      }
      /* eslint-enable jsx-a11y/anchor-has-content */
      /* eslint-enable react/self-closing-comp */
    }
  }
  return <Trans i18nKey={i18nKey}>{linkComponents}</Trans>
}
