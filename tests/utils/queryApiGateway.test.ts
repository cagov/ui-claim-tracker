import { Claim } from '../../types/common'
import { Logger } from '../../utils/logger'
import queryApiGateway, {
  buildApiUrl,
  getApiVars,
  getUniqueNumber,
  extractJSON,
  QueryParams,
} from '../../utils/queryApiGateway'

import mockEnv from 'mocked-env'
import fs from 'fs'
import jestFetchMock from 'jest-fetch-mock'

// Mock some modules
jest.mock('fs')
jestFetchMock.enableMocks()

// Shared test constants
const goodUrl = 'http://nowhere.com'
const goodUniqueNumber = '12345'
const goodRequest = {
  headers: {
    id: goodUniqueNumber,
  },
}

/**
 * Begin tests
 */

// Test queryApiGateway()
describe('Querying the API Gateway', () => {
  const mockedResponse: Claim = {
    hasValidPendingWeeks: false,
    hasPendingWeeks: false, // deprecated for hasValidPendingWeeks
    hasCertificationWeeksAvailable: false,
    isBYE: false,
    claimDetails: null,
    pendingDetermination: null,
    uniqueNumber: goodUniqueNumber,
  }
  const loggerSpy = jest.spyOn(Logger.prototype, 'log').mockImplementation(jest.fn())

  beforeEach(() => {
    // Mock the fetch response
    /* eslint-disable  @typescript-eslint/no-unsafe-call */
    fetch.mockResolvedValue(new Response(JSON.stringify(mockedResponse)))
    /* eslint-enable  @typescript-eslint/no-unsafe-call */
    // Mock fs.readFileSync()
    /* eslint-disable  @typescript-eslint/no-unsafe-call */
    fs.readFileSync.mockImplementation(() => {
      return 'mock file data'
    })
    /* eslint-enable  @typescript-eslint/no-unsafe-call */

    // Clear the logger mock before each test.
    loggerSpy.mockClear()
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
    expect(jsonData.hasPendingWeeks).toBe(false) // deprecated for hasValidPendingWeeks
    expect(jsonData.hasValidPendingWeeks).toBe(false)
    expect(fetch).toHaveBeenCalledTimes(1)
  })

  it('returns the expected value', async () => {
    // Mock process.env
    const restore = mockEnv({
      API_URL: goodUrl,
    })

    const data = await queryApiGateway(goodRequest, goodUniqueNumber)

    expect(data).toStrictEqual(mockedResponse)
    expect(fetch).toHaveBeenCalledTimes(1)

    // Restore env vars
    restore()
  })

  it('handles errors thrown by fetch', async () => {
    const networkErrorMessage = 'network error'
    /* eslint-disable  @typescript-eslint/no-unsafe-call */
    fetch.mockRejectedValue(new Error(networkErrorMessage))
    /* eslint-enable  @typescript-eslint/no-unsafe-call */

    // Mock process.env
    const restore = mockEnv({
      API_URL: goodUrl,
    })

    await expect(queryApiGateway(goodRequest, goodUniqueNumber)).rejects.toThrow(networkErrorMessage)

    expect(fetch).toHaveBeenCalledTimes(1)
    expect(loggerSpy).toHaveBeenCalledWith(undefined, 'error', expect.anything(), 'API gateway error')

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
    fetch.mockResolvedValue(errorResponse403)
    /* eslint-enable  @typescript-eslint/no-unsafe-call */

    // Mock process.env
    const restore = mockEnv({
      API_URL: goodUrl,
    })

    await expect(queryApiGateway(goodRequest, goodUniqueNumber)).rejects.toThrow('API Gateway response is not 200')

    expect(fetch).toHaveBeenCalledTimes(1)
    expect(loggerSpy).toHaveBeenCalledWith(undefined, 'error', expect.anything(), 'API gateway error')

    // Restore env vars
    restore()
  })

  it('handles errors returned by API gateway', async () => {
    // Mock a string response from API gateway
    // This happens when an incorrect query is sent to API gateway,
    // such as missing the unqiueNumber query string.
    /* eslint-disable  @typescript-eslint/no-unsafe-call */
    fetch.mockResolvedValue(new Response('not json'))
    /* eslint-enable  @typescript-eslint/no-unsafe-call */

    // Mock process.env
    const restore = mockEnv({
      API_URL: goodUrl,
    })

    await expect(queryApiGateway(goodRequest, goodUniqueNumber)).rejects.toThrow(
      'Unexpected token o in JSON at position 1',
    )

    expect(fetch).toHaveBeenCalledTimes(1)
    expect(loggerSpy).toHaveBeenCalledWith(undefined, 'error', expect.anything(), 'API gateway error')

    // Restore env vars
    restore()
  })

  it('handles certificate reading errors', async () => {
    // Override the beforeEach mock to throw an error.
    const fsErrorMessage = 'file read issue'
    /* eslint-disable  @typescript-eslint/no-unsafe-call */
    fs.readFileSync.mockImplementation(() => {
      throw new Error(fsErrorMessage)
    })
    /* eslint-enable  @typescript-eslint/no-unsafe-call */

    // Mock process.env
    const restore = mockEnv({
      API_URL: goodUrl,
    })

    await expect(queryApiGateway(goodRequest, goodUniqueNumber)).rejects.toThrow(fsErrorMessage)

    expect(fetch).toHaveBeenCalledTimes(0)
    expect(loggerSpy).toHaveBeenCalledWith(undefined, 'error', expect.anything(), 'Read certificate error')

    // Restore env vars
    restore()
  })

  it('handles fully null api response', async () => {
    // Mock process.env
    const restore = mockEnv({
      API_URL: goodUrl,
    })

    /* eslint-disable  @typescript-eslint/no-unsafe-call */
    fetch.mockResolvedValue(new Response(JSON.stringify(null)))
    /* eslint-enable  @typescript-eslint/no-unsafe-call */
    await expect(queryApiGateway(goodRequest, goodUniqueNumber)).rejects.toThrow(
      'API responded with a null response (queried with 12345, returned null)',
    )

    expect(fetch).toHaveBeenCalledTimes(1)
    expect(loggerSpy).toHaveBeenCalledWith(undefined, 'error', expect.anything(), 'Unexpected API gateway response')

    // Restore env vars
    restore()
  })

  it('handles mismatched unique number responses', async () => {
    // Mock process.env
    const restore = mockEnv({
      API_URL: goodUrl,
    })

    const mismatchedUniqueNumber = 'abcde'
    await expect(queryApiGateway(goodRequest, mismatchedUniqueNumber)).rejects.toThrow(
      'Mismatched API response and Header unique number (12345 and abcde)',
    )

    expect(fetch).toHaveBeenCalledTimes(1)
    expect(loggerSpy).toHaveBeenCalledWith(undefined, 'error', expect.anything(), 'Unexpected API gateway response')

    // Restore env vars
    restore()
  })

  it('handles nullish with unique number response', async () => {
    // Mock process.env
    const restore = mockEnv({
      API_URL: goodUrl,
    })

    const longNullishResponse: Claim = {
      claimDetails: {
        programType: '',
        benefitYearStartDate: null,
        benefitYearEndDate: null,
        claimBalance: null,
        weeklyBenefitAmount: null,
        lastPaymentIssued: null,
        lastPaymentAmount: null,
        monetaryStatus: '',
      },
      uniqueNumber: '12345',
      hasCertificationWeeksAvailable: false,
      hasPendingWeeks: false, // deprecated for hasValidPendingWeeks
      hasValidPendingWeeks: false,
      isBYE: false,
      pendingDetermination: [],
    }

    /* eslint-disable  @typescript-eslint/no-unsafe-call */
    fetch.mockResolvedValue(new Response(JSON.stringify(longNullishResponse)))
    /* eslint-enable  @typescript-eslint/no-unsafe-call */
    await expect(queryApiGateway(goodRequest, goodUniqueNumber)).rejects.toThrow(
      'API responded with a null object (queried with 12345, returned unique number 12345)',
    )

    expect(fetch).toHaveBeenCalledTimes(1)
    expect(loggerSpy).toHaveBeenCalledWith(undefined, 'error', expect.anything(), 'Unexpected API gateway response')

    // Restore env vars
    restore()
  })

  it('handles null unique number response', async () => {
    // Mock process.env
    const restore = mockEnv({
      API_URL: goodUrl,
    })

    const shortNullResponse: Claim = {
      hasPendingWeeks: false, // deprecated for hasValidPendingWeeks
      uniqueNumber: null,
      claimDetails: null,
      hasCertificationWeeksAvailable: false,
      hasValidPendingWeeks: false,
      isBYE: false,
      pendingDetermination: null,
    }

    /* eslint-disable  @typescript-eslint/no-unsafe-call */
    fetch.mockResolvedValue(new Response(JSON.stringify(shortNullResponse)))
    /* eslint-enable  @typescript-eslint/no-unsafe-call */
    await expect(queryApiGateway(goodRequest, goodUniqueNumber)).rejects.toThrow(
      'API responded with a null object (queried with 12345, returned unique number null)',
    )

    expect(fetch).toHaveBeenCalledTimes(1)
    expect(loggerSpy).toHaveBeenCalledWith(undefined, 'error', expect.anything(), 'Unexpected API gateway response')

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

    await queryApiGateway(goodRequest, goodUniqueNumber)
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

    await queryApiGateway(goodRequest, goodUniqueNumber)
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

// Test getApiVars()
// Each test case should be:
// [env var that should not be set, boolean whether an error should be logged]
const envVarCases = [
  ['ID_HEADER_NAME', true],
  ['API_URL', true],
  ['API_USER_KEY', true],
  ['CERTIFICATE_DIR', true],
  ['PFX_FILE', true],
  ['PFX_PASSPHRASE', false],
]
describe.each(envVarCases)('Missing environment variables log errors', (testEnv: string, triggersError: boolean) => {
  const loggerSpy = jest.spyOn(Logger.prototype, 'log').mockImplementation(jest.fn())

  beforeEach(() => {
    loggerSpy.mockClear()
  })

  it(`${testEnv}`, () => {
    // Mock process.env
    const mockEnvs = {}
    const allEnvs = ['ID_HEADER_NAME', 'API_URL', 'API_USER_KEY', 'CERTIFICATE_DIR', 'PFX_FILE', 'PFX_PASSPHRASE']
    for (const env of allEnvs) {
      if (env !== testEnv) {
        mockEnvs[env] = 'not empty'
      }
    }
    const restore = mockEnv(mockEnvs)

    getApiVars()

    /* eslint-disable jest/no-conditional-expect */
    if (triggersError) {
      expect(loggerSpy).toHaveBeenCalledWith(
        undefined,
        'error',
        expect.anything(),
        'Missing required environment variable(s)',
      )
      expect(loggerSpy).toHaveBeenCalledTimes(1)
    } else {
      expect(loggerSpy).toHaveBeenCalledTimes(0)
    }
    /* eslint-enable jest/no-conditional-expect */

    // Restore env vars
    restore()
  })
})
