/**
 * Utility file to retrieve urls from the urls.json file.
 */

import urls from '../../public/urls.json'
import { UrlPrefixes } from '../../types/common'

// Type alias for the keys in urls.json
export type UrlType = keyof typeof urls

/**
 * Get url from urls.json
 * urlPrefixes: environment-specific links to UIO, UIO Mobile, and BPO, used by EDD testing
 */
export default function getUrl(linkKey: string, urlPrefixes?: UrlPrefixes): string | undefined {
  // Explicitly cast to one of the allowed keys in urls.json.
  // If the key does not exist in urls.json, this function will return undefined.
  const key = linkKey as UrlType

  // urlPrefixes must be passed in if getUrl is called client-side (e.g. from TimeoutModal.tsx),
  // since env vars aren't accessible client-side; otherwise, prefixes can be loaded from env vars below
  const urlPrefixUioDesktop = urlPrefixes?.urlPrefixUioDesktop || process.env.URL_PREFIX_UIO_DESKTOP
  const urlPrefixUioMobile = urlPrefixes?.urlPrefixUioMobile || process.env.URL_PREFIX_UIO_MOBILE
  const urlPrefixBpo = urlPrefixes?.urlPrefixBpo || process.env.URL_PREFIX_BPO
  const urlPrefixUioStatus = urlPrefixes?.urlPrefixUioStatus || process.env.URL_PREFIX_STATUS

  if (urlPrefixUioDesktop && key.startsWith('uio-desktop')) {
    return urls[key].replace('uio.edd.ca.gov/UIO', urlPrefixUioDesktop)
  }

  if (urlPrefixUioMobile && key.startsWith('uio-mobile')) {
    return urls[key].replace('uiom.edd.ca.gov/UIOM', urlPrefixUioMobile)
  }

  if (urlPrefixUioStatus && key.startsWith('uio-status')) {
    return urls[key].replace('uio', urlPrefixUioStatus)
  }

  if (urlPrefixBpo && key.startsWith('bpo')) {
    return urls[key].replace('portal.edd.ca.gov/WebApp', urlPrefixBpo)
  }

  return urls[key]
}
