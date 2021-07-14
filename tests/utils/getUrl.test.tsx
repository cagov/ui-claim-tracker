import getUrl from '../../utils/getUrl'

describe('Retrieving urls', () => {
  // Note: This tests against real content
  it('works for real keys', () => {
    expect(getUrl('edd-ui-claim-status')).toBe('https://www.edd.ca.gov/unemployment/claim-status.htm')
  })

  it('returns undefined for unknown keys', () => {
    expect(getUrl('foo')).toBe(undefined)
  })
})
