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
  if (process.env.URL_PREFIX_UIO && key.startsWith('uio')) {
    return urls[key].replace(urls['uio-prefix'], process.env.URL_PREFIX_UIO)
  }

  if (process.env.URL_PREFIX_UIO_MOBILE && key.startsWith('uio-mobile')) {
    return urls[key].replace(urls['uio-mobile-prefix'], process.env.URL_PREFIX_UIO_MOBILE)
  }

  if (process.env.URL_PREFIX_BPO && key.startsWith('bpo')) {
    return urls[key].replace(urls['bpo-prefix'], process.env.URL_PREFIX_BPO)
  }

  return urls[key]
}
