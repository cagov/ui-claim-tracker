import { render, screen } from '@testing-library/react'
import { Header } from '../../components/Header'

describe('Header component loads', () => {
  it('has the desktop UIO Link by default', () => {
    render(<Header userArrivedFromUioMobile={false} />)
    expect(screen.queryByText('UI Home')).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'UI Home' })).toHaveAttribute(
      'href',
      'https://uio.edd.ca.gov/UIO/Pages/Public/ExternalUser/UIOnlineLandingPage.aspx',
    )
  })

  it('has the UIO Mobile Link when the user arrived from UIO Mobile', () => {
    render(<Header userArrivedFromUioMobile />)
    expect(screen.queryByText('UI Home')).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'UI Home' })).toHaveAttribute(
      'href',
      'https://uiom.edd.ca.gov/UIOM/Pages/Public/ExternalUser/UIOMobileLandingPage.aspx',
    )
  })
})
