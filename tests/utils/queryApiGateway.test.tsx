import queryApiGateway, { buildApiUrl, extractJSON, Claim, QueryParams } from '../../utils/queryApiGateway'
import mockEnv from 'mocked-env'
import fs from 'fs'
import fetch from 'node-fetch'

// Mock some modules
jest.mock('fs')
jest.mock('node-fetch')
/* eslint-disable  @typescript-eslint/no-unsafe-assignment */
const { Response } = jest.requireActual('node-fetch')
/* eslint-enable  @typescript-eslint/no-unsafe-assignment */

// Shared test constants
const goodUrl = 'http://nowhere.com'

/**
 * Begin tests
 */

// Test queryApiGateway
describe('Querying the API Gateway', () => {
  const goodResponse = { ClaimType: 'PUA' }
  const goodRequest = {
    headers: {
      id: '12345',
    },
  }

  beforeEach(() => {
    // Mock the fetch response
    /* eslint-disable  @typescript-eslint/no-unsafe-call */
    fetch.mockReturnValue(Promise.resolve(new Response(JSON.stringify(goodResponse))))
    /* eslint-enable  @typescript-eslint/no-unsafe-call */
    // Mock fs.readFileSync()
    fs.readFileSync = jest.fn().mockResolvedValue('mock file data')
  })

  afterEach(() => {
    // Clear mocks after each test
    jest.clearAllMocks()
  })

  // Test mock fetch is working correctly
  it('has a correctly mocked fetch', async () => {
    const resp: Response = await fetch()
    const body: string = await resp.text()
    const jsonData: Claim = extractJSON(body)
    expect(jsonData.ClaimType).toBe('PUA')
    expect(fetch).toHaveBeenCalledTimes(1)
  })

  // Test that queryApiGateway works correctly
  it('returns the expected value', async () => {
    // Mock process.env
    const restore = mockEnv({
      API_URL: goodUrl,
    })

    const data = await queryApiGateway(goodRequest)
    expect(data).toStrictEqual(goodResponse)
    expect(fetch).toHaveBeenCalledTimes(1)

    // Restore env vars
    restore()
  })

  // Test that queryApiGateway handles Errors
  it('handles errors thrown by fetch', async () => {
    // Mock a network error
    /* eslint-disable  @typescript-eslint/no-unsafe-call */
    fetch.mockRejectedValueOnce(new Error('network error'))
    /* eslint-enable  @typescript-eslint/no-unsafe-call */

    // Mock process.env
    const restore = mockEnv({
      API_URL: goodUrl,
    })

    const data = await queryApiGateway(goodRequest)
    expect(data).toStrictEqual(null)
    expect(fetch).toHaveBeenCalledTimes(1)

    // Restore env vars
    restore()
  })

  // Test that queryApiGateway handles non-200 responses from API gateway
  it('handles non-200 responses from API gateway', async () => {
    // Mock a 403 response error
    /* eslint-disable  @typescript-eslint/no-unsafe-assignment */
    /* eslint-disable  @typescript-eslint/no-unsafe-call */
    const errorResponse403: Response = new Response('403 Forbidden', {
      status: 403,
    })
    /* eslint-enable  @typescript-eslint/no-unsafe-assignment */
    fetch.mockReturnValue(Promise.resolve(errorResponse403))
    /* eslint-enable  @typescript-eslint/no-unsafe-call */

    // Mock process.env
    const restore = mockEnv({
      API_URL: goodUrl,
    })

    const data = await queryApiGateway(goodRequest)
    expect(data).toStrictEqual(null)
    expect(fetch).toHaveBeenCalledTimes(1)

    // Restore env vars
    restore()
  })

  // Test that queryApiGateway handles errors from API gateway
  it('handles errors returned by API gateway', async () => {
    // Mock a string response from API gateway
    // This happens when an incorrect query is sent to API gateway,
    // such as missing the unqiueNumber query string.
    /* eslint-disable  @typescript-eslint/no-unsafe-call */
    fetch.mockReturnValue(Promise.resolve(new Response('not json')))
    /* eslint-enable  @typescript-eslint/no-unsafe-call */

    // Mock process.env
    const restore = mockEnv({
      API_URL: goodUrl,
    })

    const data = await queryApiGateway(goodRequest)
    expect(data).toStrictEqual(null)
    expect(fetch).toHaveBeenCalledTimes(1)

    // Restore env vars
    restore()
  })
})

// Test buildApiUrl
describe('Building the API url', () => {
  const goodParams: QueryParams = {
    user_key: 'key',
    uniqueNumber: 'num',
  }

  it('returns the correct url given correct options', () => {
    const apiUrl: string = buildApiUrl(goodUrl, goodParams)
    expect(apiUrl).toContain(goodUrl)
    expect(apiUrl).toContain(`user_key=${goodParams.user_key}`)
    expect(apiUrl).toContain(`uniqueNumber=${goodParams.uniqueNumber}`)
  })

  it('with a bad url throws an error', () => {
    const badUrl = 'badurl'
    expect(() => {
      buildApiUrl(badUrl, goodParams)
    }).toThrowError('Invalid URL')
  })
})

/*
 * @TODO: Test
 * - env vars missing (each) #176
 * - pfx missing or not read correctly #176
 * - request missing expected header #217
 */
