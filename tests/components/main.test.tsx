import { render, screen } from '@testing-library/react'
import { Main } from '../../components/Main'

import { useRouter } from 'next/router'

jest.mock('next/router', () => ({
  __esModule: true,
  useRouter: jest.fn(),
}))

describe('Main component shows the page', () => {
  it('has our title, details, and body', () => {
    const mockRouter = {
      locale: 'en',
    }
    ;(useRouter as jest.Mock).mockReturnValue(mockRouter)

    render(<Main loading={false} mobile={false} />)
    expect(screen.queryByText('Claim Tracker')).toBeInTheDocument()
    expect(screen.queryByText('Claim Status')).toBeInTheDocument()
    expect(screen.queryByText('Next Steps')).toBeInTheDocument()
    expect(screen.queryByText('Benefit Year')).toBeInTheDocument()
    expect(screen.queryByText('Claim Status')).toBeInTheDocument()
  })
})

describe('Main component shows loading', () => {
  it('has our titles but content is shimmer', () => {
    const mockRouter = {
      locale: 'en',
    }
    ;(useRouter as jest.Mock).mockReturnValue(mockRouter)

    render(<Main loading mobile={false} />)
    expect(screen.queryByText('Claim Tracker')).toBeInTheDocument()
    expect(screen.queryByText('Claim Status')).toBeInTheDocument()
    expect(screen.queryByText('Next Steps')).toBeInTheDocument()
    expect(screen.queryByText('Benefit Year')).not.toBeInTheDocument()
    expect(screen.queryByText('Claim Status')).toBeInTheDocument()
    expect(screen.queryByText('Your payments')).not.toBeInTheDocument()
  })
})

describe('Main component shows the timeout', () => {
  it('has our timeout modal', () => {
    const mockRouter = {
      locale: 'en',
    }
    ;(useRouter as jest.Mock).mockReturnValue(mockRouter)

    render(<Main timedOut loading={false} mobile={false} />)
    expect(screen.queryByText('Your Session Will End Soon')).toBeInTheDocument()
  })
})
