/**
 * Utility file to retrieve urls from the urls.json file.
 */

import urls from '../../public/urls.json'
import { UrlPrefixes } from '../../types/common'

// Type alias for the keys in urls.json
export type UrlType = keyof typeof urls

/**
 * Utility function to strip trailing slashes.
 */
export function stripTrailingSlashes(url: string | undefined): string | undefined {
  if (url) {
    return url.replace(/\/+$/, '')
  } else {
    return url
  }
}

/**
 * Get url from urls.json
 * urlPrefixes: environment-specific links to UIO, UIO Mobile, and BPO, used by EDD testing
 */
export default function getUrl(linkKey: string, urlPrefixes?: UrlPrefixes, language?: string): string | undefined {
  // Explicitly cast to one of the allowed keys in urls.json.
  // If the key does not exist in urls.json, this function will return undefined.
  let key
  if (language === 'es') {
    key = (linkKey + '-es') as UrlType
  } else {
    key = linkKey as UrlType
  }

  // urlPrefixes must be passed in if getUrl is called client-side (e.g. from TimeoutModal.tsx),
  // since env vars aren't accessible client-side; otherwise, prefixes can be loaded from env vars below
  const urlPrefixUioDesktop = stripTrailingSlashes(
    urlPrefixes?.urlPrefixUioDesktop || process.env.URL_PREFIX_UIO_DESKTOP,
  )
  const urlPrefixUioMobile = stripTrailingSlashes(urlPrefixes?.urlPrefixUioMobile || process.env.URL_PREFIX_UIO_MOBILE)
  const urlPrefixUioClaimstatus = stripTrailingSlashes(
    urlPrefixes?.urlPrefixUioClaimstatus || process.env.URL_PREFIX_UIO_CLAIMSTATUS,
  )
  const urlPrefixBpo = stripTrailingSlashes(urlPrefixes?.urlPrefixBpo || process.env.URL_PREFIX_BPO)

  if (urlPrefixUioDesktop && key.startsWith('uio-desktop')) {
    return urls[key].replace('uio.edd.ca.gov/UIO', urlPrefixUioDesktop)
  }

  if (urlPrefixUioMobile && key.startsWith('uio-mobile')) {
    return urls[key].replace('uiom.edd.ca.gov/UIOM', urlPrefixUioMobile)
  }

  if (urlPrefixUioClaimstatus && key.startsWith('uio-claimstatus')) {
    return urls[key].replace('uio', urlPrefixUioClaimstatus)
  }

  if (urlPrefixBpo && key.startsWith('bpo-login')) {
    return urls[key].replace('myedd.edd.ca.gov', urlPrefixBpo)
  }

  return urls[key]
}
