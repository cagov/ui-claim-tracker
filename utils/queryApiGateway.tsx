import path from 'path'
import fs from 'fs'
import https from 'https'
import fetch, { Response } from 'node-fetch'
import type { NextApiRequest } from 'next'

export interface QueryParams {
  user_key: string
  uniqueNumber: string
}

/**
 * Returns results from API Gateway
 *
 * @param {Qbject} request
 * @returns {Object}
 */
const queryApiGateway = async (req: NextApiRequest): Promise<string> => {
  /**
   * Load environment variables to be used for authentication & API calls.
   * @TODO: Handle error case where env vars are null or undefined.
   */
  // Request fields
  const ID_HEADER_NAME: string = process.env.ID_HEADER_NAME ?? ''

  // API fields
  const API_URL: string = process.env.API_URL ?? ''
  const API_USER_KEY: string = process.env.API_USER_KEY ?? ''

  // TLS Certificate fields
  const CERT_DIR: string = process.env.CERTIFICATE_DIR ?? ''
  const P12_FILE: string = process.env.P12_FILE ?? ''
  const P12_PATH: string = path.join(CERT_DIR, P12_FILE)

  let apiData: JSON | null = null

  const headers = {
    Accept: 'application/json',
  }

  // https://nodejs.org/api/tls.html#tls_tls_createsecurecontext_options
  const pfxFile: Buffer = fs.readFileSync(P12_PATH)
  const options = {
    pfx: pfxFile,
  }

  // Instantiate agent to use with TLS Certificate.
  // Reference: https://github.com/node-fetch/node-fetch/issues/904#issuecomment-747828286
  const sslConfiguredAgent: https.Agent = new https.Agent(options)

  const apiUrlParams: QueryParams = {
    user_key: API_USER_KEY,
    uniqueNumber: req.headers[ID_HEADER_NAME] as string,
  }

  const apiUrl: RequestInfo = buildApiUrl(API_URL, apiUrlParams)

  try {
    const response: Response = await fetch(apiUrl, {
      headers: headers,
      agent: sslConfiguredAgent,
    })

    // TODO: Why does @ts-ignore not work on this line?
    // TODO: Implement proper typing of responseBody if possible.
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const responseBody: JSON = await response.json()

    apiData = responseBody
  } catch (error) {
    console.log(error)
  }

  // Although we are using an https.Agent with keepAlive false (default behaviour),
  // we are explicitly destroying it because:
  // > It is good practice, to destroy() an Agent instance when it is no longer in use,
  // > because unused sockets consume OS resources.
  // https://nodejs.org/api/http.html#http_class_http_agent
  sslConfiguredAgent.destroy()

  return apiData
}

/**
 * Construct the url request to the API gateway.
 *
 * @param {string} url - base url for the API gateway
 * @param {QueryParams} queryParams - query params to append to the API gateway url
 * @returns {string}
 */
function buildApiUrl(url: string, queryParams: QueryParams) {
  const apiUrl = new URL(url)

  for (const key in queryParams) {
    apiUrl.searchParams.append(key, queryParams[key as 'user_key' | 'uniqueNumber'])
  }

  return apiUrl.toString()
}

export default queryApiGateway
