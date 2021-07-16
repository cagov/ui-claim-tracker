/**
 * Utility file to retrieve urls from the urls.json file.
 */

import urls from '../public/urls.json'

// Type alias for the keys in urls.json
export type UrlType = keyof typeof urls

/**
 * Get url from urls.json
 */
export default function getUrl(key: UrlType): string | undefined {
  return urls[key]
}
