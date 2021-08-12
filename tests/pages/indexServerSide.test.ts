import { GetServerSideProps, GetServerSidePropsContext } from 'next'

import mockEnv from 'mocked-env'

import { getServerSideProps, HomeProps } from '../../pages/index'

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
    }

    const result: GetServerSideProps = await getServerSideProps(context as GetServerSidePropsContext)
    const props: HomeProps = result.props as HomeProps
    expect(props.errorCode).toBe(500)

    restore()
  })
})
