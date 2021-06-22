import { render, screen } from '@testing-library/react'
import { Header } from '../../components/Header'

import { useRouter } from 'next/router'

jest.mock('next/router', () => ({
  __esModule: true,
  useRouter: jest.fn(),
}))

describe('Header component loads', () => {
  it('has the desktop UIO Link by default', () => {
    const mockRouter = {
      locale: 'en',
    }
    ;(useRouter as jest.Mock).mockReturnValue(mockRouter)

    render(<Header mobile={false} />)
    expect(screen.queryByText('UI Online Home')).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'UI Online Home' })).toHaveAttribute(
      'href',
      'https://uio.edd.ca.gov/UIO/Pages/Public/ExternalUser/UIOnlineLandingPage.aspx?l=en',
    )
  })

  it('has the mobile UIO Link when mobile', () => {
    const mockRouter = {
      locale: 'en',
    }
    ;(useRouter as jest.Mock).mockReturnValue(mockRouter)

    render(<Header mobile />)
    expect(screen.queryByText('UI Online Home')).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'UI Online Home' })).toHaveAttribute(
      'href',
      'https://uiom.edd.ca.gov/UIOM/Pages/Public/ExternalUser/UIOMobileLandingPage.aspx?l=en',
    )
  })
})
