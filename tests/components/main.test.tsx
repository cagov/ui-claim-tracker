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

    render(<Main loading={false} />)
    expect(screen.queryByText('UI Online')).toBeInTheDocument()
    expect(screen.queryByText('Benefit Year')).toBeInTheDocument()
    expect(screen.queryByText('Claim Status')).toBeInTheDocument()
  })
})

describe('Main component shows loading', () => {
  it('has our title, details, and body with shimmer', () => {
    const mockRouter = {
      locale: 'en',
    }
    ;(useRouter as jest.Mock).mockReturnValue(mockRouter)

    render(<Main loading />)
    expect(screen.queryByText('UI Online')).toBeInTheDocument()
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

    render(<Main timedOut loading={false} />)
    expect(screen.queryByText('Your Session Will End Soon')).toBeInTheDocument()
  })
})
