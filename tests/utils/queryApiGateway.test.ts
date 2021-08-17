import { Claim } from '../../types/common'
import queryApiGateway, { buildApiUrl, getUniqueNumber, extractJSON, QueryParams } from '../../utils/queryApiGateway'
import mockEnv from 'mocked-env'
import fs from 'fs'
import jestFetchMock from 'jest-fetch-mock'

// Mock some modules
jest.mock('fs')
jestFetchMock.enableMocks()

// Shared test constants
const goodUrl = 'http://nowhere.com'
const emptyResponse = { ClaimType: undefined }
const goodRequest = {
  headers: {
    id: '12345',
  },
}

/**
 * Begin tests
 */

// Test queryApiGateway()
describe('Querying the API Gateway', () => {
  const goodResponse = { ClaimType: 'PUA' }

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

  // Test mocked fetch is working correctly to eliminate testing issues that might be
  // originating from the way fetch is mocked.
  it('has a correctly mocked fetch', async () => {
    const resp: Response = await fetch()
    const body: string = await resp.text()
    const jsonData: Claim = extractJSON(body)
    expect(jsonData.ClaimType).toBe('PUA')
    expect(fetch).toHaveBeenCalledTimes(1)
  })

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

  it('handles errors thrown by fetch', async () => {
    /* eslint-disable  @typescript-eslint/no-unsafe-call */
    fetch.mockRejectedValueOnce(new Error('network error'))
    /* eslint-enable  @typescript-eslint/no-unsafe-call */

    // Mock process.env
    const restore = mockEnv({
      API_URL: goodUrl,
    })

    const data = await queryApiGateway(goodRequest)
    expect(data).toStrictEqual(emptyResponse)
    expect(fetch).toHaveBeenCalledTimes(1)

    // Restore env vars
    restore()
  })

  it('handles non-200 responses from API gateway', async () => {
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
    expect(data).toStrictEqual(emptyResponse)
    expect(fetch).toHaveBeenCalledTimes(1)

    // Restore env vars
    restore()
  })

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
    expect(data).toStrictEqual(emptyResponse)
    expect(fetch).toHaveBeenCalledTimes(1)

    // Restore env vars
    restore()
  })

  it('loads pfx passphrase when given', async () => {
    // Mock process.env
    const testPassphrase = 'teststring'
    const restore = mockEnv({
      API_URL: goodUrl,
      PFX_PASSPHRASE: testPassphrase,
    })

    await queryApiGateway(goodRequest)
    /* eslint-disable  @typescript-eslint/no-unsafe-assignment */
    expect(fetch).toHaveBeenCalledWith(
      expect.any(String),
      expect.objectContaining({
        agent: expect.objectContaining({ options: expect.objectContaining({ passphrase: testPassphrase }) }),
      }),
    )
    /* eslint-enable  @typescript-eslint/no-unsafe-assignment */

    // Restore env vars
    restore()
  })

  it('does not load pfx passphrase if it is an empty string', async () => {
    // Mock process.env
    const testPassphrase = ''
    const restore = mockEnv({
      API_URL: goodUrl,
      PFX_PASSPHRASE: testPassphrase,
    })

    await queryApiGateway(goodRequest)
    /* eslint-disable  @typescript-eslint/no-unsafe-assignment */
    expect(fetch).toHaveBeenCalledWith(
      expect.any(String),
      expect.objectContaining({
        agent: expect.objectContaining({ options: expect.not.objectContaining({ passphrase: testPassphrase }) }),
      }),
    )
    /* eslint-enable  @typescript-eslint/no-unsafe-assignment */

    // Restore env vars
    restore()
  })
})

// Test buildApiUrl()
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

// Test getUniqueNumber()
describe('The unique number', () => {
  it('is returned when given the correct ID key', () => {
    // Mock process.env
    const restore = mockEnv({
      ID_HEADER_NAME: 'id',
    })

    const id = getUniqueNumber(goodRequest)
    expect(id).toStrictEqual(goodRequest.headers.id)

    // Restore env vars
    restore()
  })

  // Each test case should be:
  // [test description, mock env var]
  const caseSensitiveTestCases = [
    ['lowercase', 'uniquenumber'],
    ['camelCase', 'uniqueNumber'],
    ['uppercase', 'UNIQUENUMBER'],
  ]
  it.each(caseSensitiveTestCases)('is not case sensitive: %s', (description: string, key: string) => {
    // Mock process.env
    const restore = mockEnv({
      ID_HEADER_NAME: key,
    })

    const request = {
      headers: {
        uniquenumber: 'lower',
        UNIQUENUMBER: 'UPPER',
        uniqueNumber: 'mixedCase',
      },
    }

    const id = getUniqueNumber(request)
    expect(id).toStrictEqual('lower')

    // Restore env vars
    restore()
  })

  // Current behavior is to return undefined.
  it('is not returned when given the incorrect ID key', () => {
    // Mock process.env
    const restore = mockEnv({
      ID_HEADER_NAME: 'nonsense',
    })

    const id = getUniqueNumber(goodRequest)
    expect(id).toStrictEqual(undefined)

    // Restore env vars
    restore()
  })
})

// Test extractJSON()
describe('Validating extracted JSON', () => {
  it('returns the claim with a schema-valid JSON string', () => {
    const validJSON = '{ "ClaimType": "PUA" }'

    const jsonData: Claim = extractJSON(validJSON)
    expect(jsonData.ClaimType).toBe('PUA')
  })

  it('throws an error with an schema-invalid JSON string', () => {
    const invalidJSON = '{}'
    expect(() => {
      extractJSON(invalidJSON)
    }).toThrowError('TODO')
  })
})

/*
 * @TODO: Test
 * - env vars missing (each) #176
 * - pfx missing or not read correctly #176
 * - request missing expected header #217
 */
