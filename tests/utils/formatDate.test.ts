import formatDate from '../../utils/formatDate'

// Test formatDate()
describe('Formatting dates', () => {
  it('displays the expected date string', () => {
    const notFormatted = '2013-09-27T00:00:00'
    const formatted = formatDate(notFormatted)
    expect(formatted).toEqual('9/27/2013')
  })
})
