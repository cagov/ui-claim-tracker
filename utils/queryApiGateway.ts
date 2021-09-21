/**
 * Utility file for connecting to and querying the API gateway.
 *
 * Prerequisites for a successful connection:
 * - unique number in the received request header
 * - the following environment variables:
 *   - ID_HEADER_NAME: string for the unique number header key
 *   - API_URL: url for the API gateway
 *   - API_USER_KEY: key for authenticating with the API gateway
 *   - CERTIFICATE_DIR: path to the PKCS#12 certificate
 *   - PFX_FILE: filename of the PKCS#12 certificate for authenticating with the API gateway
 */

import fs from 'fs'
import { IncomingMessage } from 'http'
import https from 'https'
import path from 'path'
import pino from 'pino'

import { Claim } from '../types/common'
import { asyncContext } from './asyncContext'
import { Logger } from './logger'

export interface QueryParams {
  user_key: string
  uniqueNumber: string
}

export interface ApiEnvVars {
  idHeaderName: string
  apiUrl: string
  apiUserKey: string
  pfxPath: string
  pfxPassphrase?: string
}

export interface AgentOptions {
  pfx: Buffer
  keepAlive: boolean
  timeout: number
  freeSocketTimeout: number
  maxSockets: number
  passphrase?: string
}

/**
 * Load environment variables to be used for authentication & API calls.
 */
export function getApiVars(): ApiEnvVars {
  const apiEnvVars: ApiEnvVars = { idHeaderName: '', apiUrl: '', apiUserKey: '', pfxPath: '' }

  // Request fields
  apiEnvVars.idHeaderName = process.env.ID_HEADER_NAME ?? ''

  // API fields
  // Remove trailing slash from API_URL if one exists
  apiEnvVars.apiUrl = (process.env.API_URL ?? '').replace(/\/$/, '')
  apiEnvVars.apiUserKey = process.env.API_USER_KEY ?? ''

  // TLS Certificate fields
  const certDir: string = process.env.CERTIFICATE_DIR ?? ''
  const pfxFilename: string = process.env.PFX_FILE ?? ''
  if (certDir && pfxFilename) {
    apiEnvVars.pfxPath = path.join(certDir, pfxFilename)
  }

  // Some certificates have an import password
  apiEnvVars.pfxPassphrase = process.env.PFX_PASSPHRASE || ''

  // Verify that all required env vars have been set.
  const missingEnvVars: string[] = []
  for (const key of Object.keys(apiEnvVars)) {
    const castKey = key as keyof typeof apiEnvVars
    if (!apiEnvVars[castKey] && castKey !== 'pfxPassphrase') {
      missingEnvVars.push(castKey)
    }
  }
  if (missingEnvVars.length > 0) {
    const logger: Logger = Logger.getInstance()
    const childLogger = asyncContext.getStore() as pino.Logger
    logger.log(childLogger, 'error', { missingEnvVars: missingEnvVars }, 'Missing required environment variable(s)')
  }

  return apiEnvVars
}

/**
 * Construct the url request to the API gateway.
 */
export function buildApiUrl(url: string, queryParams: QueryParams): string {
  const apiUrl = new URL(url)

  for (const key in queryParams) {
    apiUrl.searchParams.append(key, queryParams[key as 'user_key' | 'uniqueNumber'])
  }

  return apiUrl.toString()
}

/**
 * Extract JSON body from API gateway response
 * See https://github.com/typescript-eslint/typescript-eslint/issues/2118#issuecomment-641464651
 * @TODO: Validate response. See #150
 */
export function extractJSON(responseBody: string): Claim {
  return JSON.parse(responseBody) as Claim
}

/**
 * Return the unique number.
 */
export function getUniqueNumber(req: IncomingMessage): string {
  const apiEnvVars: ApiEnvVars = getApiVars()
  const idHeaderName = apiEnvVars.idHeaderName
  // Request converts all headers to lowercase, so we need to convert the key to lowercase too.
  return req.headers[idHeaderName.toLowerCase()] as string
}

/**
 * Returns results from API Gateway
 */
export default async function queryApiGateway(req: IncomingMessage, uniqueNumber: string): Promise<Claim> {
  const apiEnvVars: ApiEnvVars = getApiVars()
  let apiData: Claim = { ClaimType: undefined }
  let options: AgentOptions | null = null

  const headers = {
    Accept: 'application/json',
  }

  try {
    // https://nodejs.org/api/tls.html#tls_tls_createsecurecontext_options
    options = {
      pfx: fs.readFileSync(apiEnvVars.pfxPath),
      keepAlive: true,
      timeout: 60 * 1000,
      freeSocketTimeout: 30 * 1000,
      maxSockets: 50,
    }
  } catch (error) {
    // Log any certificate loading errors and return.
    const logger: Logger = Logger.getInstance()
    const childLogger = asyncContext.getStore() as pino.Logger
    logger.log(childLogger, 'error', error, 'Read certificate error')
    throw error
  }

  if (apiEnvVars.pfxPassphrase) {
    options.passphrase = apiEnvVars.pfxPassphrase
  }

  // Instantiate agent to use with TLS Certificate.
  // Reference: https://github.com/node-fetch/node-fetch/issues/904#issuecomment-747828286
  const sslConfiguredAgent: https.Agent = new https.Agent(options)

  const apiUrlParams: QueryParams = {
    user_key: apiEnvVars.apiUserKey,
    uniqueNumber: uniqueNumber,
  }

  const apiUrl: RequestInfo = buildApiUrl(apiEnvVars.apiUrl, apiUrlParams)

  try {
    // For typing, we break out the requestInit object separately.
    // https://github.com/node-fetch/node-fetch/blob/ffef5e3c2322e8493dd75120b1123b01b106ab23/%40types/index.d.ts#L180
    const requestInit = {
      headers: headers,
      agent: sslConfiguredAgent,
    }
    // Next.js includes polyfills for fetch(). It essentially just binds node-fetch to
    // global variables, so we don't need to do explicit imports, including for typing.
    // - https://nextjs.org/docs/basic-features/supported-browsers-features#server-side-polyfills
    // - https://nextjs.org/blog/next-9-4#improved-built-in-fetch-support
    const response = await fetch(apiUrl, requestInit)

    if (response.ok) {
      const responseBody: string = await response.text()
      apiData = extractJSON(responseBody)
    } else {
      throw new Error('API Gateway response is not 200')
    }
  } catch (error) {
    const logger: Logger = Logger.getInstance()
    const childLogger = asyncContext.getStore() as pino.Logger
    logger.log(childLogger, 'error', error, 'API gateway error')
    throw error
  }

  if (apiData?.uniqueNumber !== uniqueNumber) {
    const mismatchError = new Error(
      `Mismatched API response and Header unique number (${apiData.uniqueNumber || 'null'} and ${uniqueNumber})`,
    )
    const logger: Logger = Logger.getInstance()
    const childLogger = asyncContext.getStore() as pino.Logger
    logger.log(childLogger, 'error', mismatchError, 'Unexpected API gateway response')
    throw mismatchError
  }

  return apiData
}
