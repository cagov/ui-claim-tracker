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
  return urls[key]
}
