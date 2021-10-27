import { GetServerSideProps, GetServerSidePropsContext } from 'next'

import mockEnv from 'mocked-env'

import { getServerSideProps, HomeProps } from '../../pages/index'
import { Logger } from '../../utils/logger'

// Test getServerSideProps()
describe('Main component server side logic', () => {
  it('returns 500 if there is no unique number in the request header', async () => {
    // Mock process.env
    const restore = mockEnv({
      ID_HEADER_NAME: 'id',
    })

    const context = {
      req: {
        // empty header
        headers: {},
      },
      res: {
        statusCode: null,
      },
    }

    const loggerSpy = jest.spyOn(Logger.prototype, 'log').mockImplementation(jest.fn())
    loggerSpy.mockClear()

    const result: GetServerSideProps = await getServerSideProps(context as GetServerSidePropsContext)
    const props: HomeProps = result.props as HomeProps
    expect(props.errorCode).toBe(500)
    expect(context.res.statusCode).toBe(500)
    expect(loggerSpy).toHaveBeenCalledWith(expect.anything(), 'error', {}, 'Missing unique number')

    restore()
  })
})
