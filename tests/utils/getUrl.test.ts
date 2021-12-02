import mockEnv from 'mocked-env'

import getUrl, { stripTrailingSlashes } from '../../utils/browser/getUrl'

// Test stripTrailingSlashes()
describe('A string', () => {
  it('with one trailing slash has it stripped', () => {
    expect(stripTrailingSlashes('hasSlash/')).toEqual('hasSlash')
  })

  it('with multiple trailing slashes has them stripped', () => {
    expect(stripTrailingSlashes('hasSlash//')).toEqual('hasSlash')
  })

  it('without trailing slashes returns the string unchanged', () => {
    const content = 'noSlash'
    expect(stripTrailingSlashes(content)).toEqual(content)
  })
})

// Test getUrl()
// Note: This tests against real content
describe('Retrieving urls', () => {
  it('works for real keys', () => {
    expect(getUrl('ca-gov')).toBe('https://www.ca.gov/')
  })

  it('returns undefined for unknown keys', () => {
    expect(getUrl('foo')).toBe(undefined)
  })
})

// Test getUrl(): per environment url overrides
// Note: This tests against real content
const cases = [
  ['URL_PREFIX_UIO_DESKTOP', 'urlPrefixUioDesktop', 'uio.edd.ca.gov/UIO', 'uio-desktop-home'],
  ['URL_PREFIX_UIO_MOBILE', 'urlPrefixUioMobile', 'uiom.edd.ca.gov/UIOM', 'uio-mobile-home'],
  ['URL_PREFIX_UIO_CLAIMSTATUS', 'urlPrefixUioClaimstatus', 'uio', 'uio-claimstatus'],
  ['URL_PREFIX_BPO', 'urlPrefixBpo', 'portal.edd.ca.gov/WebApp', 'bpo-login'],
]
describe.each(cases)(
  'Retrieving urls that differ between EDD environments',
  (envVar: string, key: string, toReplace: string, linkKey: string) => {
    const mockedPrefix = 'mock-prefix'
    const argPrefix = 'arg-prefix'

    it(`returns the url with env var prefix when the env var is provided for ${envVar}`, () => {
      const restore = mockEnv({
        [envVar]: mockedPrefix,
      })

      const url = getUrl(linkKey)
      expect(url).toEqual(expect.stringContaining(mockedPrefix))
      expect(url).toEqual(expect.not.stringContaining(toReplace))

      // Restore env vars.
      restore()
    })

    it(`returns the url with argument prefix when a prefix is passed as an argument for ${envVar}`, () => {
      const url = getUrl(linkKey, { [key]: argPrefix })
      expect(url).toEqual(expect.stringContaining(argPrefix))
      expect(url).toEqual(expect.not.stringContaining(mockedPrefix))
      expect(url).toEqual(expect.not.stringContaining(toReplace))
    })

    it(`returns the url with argument prefix when a prefix is passed as an argument and an env var is provided for ${envVar}`, () => {
      const restore = mockEnv({
        [envVar]: mockedPrefix,
      })

      const url = getUrl(linkKey, { [key]: argPrefix })
      expect(url).toEqual(expect.stringContaining(argPrefix))
      expect(url).toEqual(expect.not.stringContaining(mockedPrefix))
      expect(url).toEqual(expect.not.stringContaining(toReplace))

      // Restore env vars.
      restore()
    })
  },
)
