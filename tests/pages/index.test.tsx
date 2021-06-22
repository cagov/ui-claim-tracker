import renderer from 'react-test-renderer'
import { render, screen } from '@testing-library/react'
import Index from '../../pages/index'

import { useRouter } from 'next/router'

jest.mock('next/router', () => ({
  __esModule: true,
  useRouter: jest.fn(),
}))

describe('Exemplar react-test-renderer Snapshot test', () => {
  it('renders homepage unchanged', () => {
    const mockRouter = {
      locale: 'en',
    }
    ;(useRouter as jest.Mock).mockReturnValue(mockRouter)

    const tree = renderer.create(<Index loading={false} />).toJSON()
    expect(tree).toMatchSnapshot()
  })
})

describe('Example react testing-library Test', () => {
  it('has our placeholder app', () => {
    render(<Index loading={false} />)
    expect(screen.queryByText('Claim Tracker')).toBeInTheDocument()
  })
})
