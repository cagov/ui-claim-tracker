/**
 * Utility file to retrieve urls from the urls.json file.
 */

import urls from '../public/urls.json'

// Type alias for the keys in urls.json
export type UrlType = keyof typeof urls

/**
 * Get url from urls.json
 */
export default function getUrl(linkKey: string): string | undefined {
  // Explicitly cast to one of the allowed keys in urls.json.
  // If the key does not exist in urls.json, this function will return undefined.
  const key = linkKey as UrlType

  // Optional environment-specific links back to the UIO landing page, used by EDD testing
  if (key.startsWith('uio') && process.env.URL_PREFIX_UIO) {
    return urls[key].replace('uio.edd.ca.gov/UIO', process.env.URL_PREFIX_UIO)
  }

  if (key.startsWith('uio-mobile') && process.env.URL_PREFIX_UIO_MOBILE) {
    return urls[key].replace('uiom.edd.ca.gov/UIOM', process.env.URL_PREFIX_UIO_MOBILE)
  }

  if (key.startsWith('bpo') && process.env.URL_PREFIX_BPO) {
    return urls[key].replace('portal.edd.ca.gov', process.env.URL_PREFIX_BPO)
  }

  return urls[key]
}
