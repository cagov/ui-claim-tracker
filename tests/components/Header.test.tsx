import { render, screen } from '@testing-library/react'
import { Header } from '../../components/Header'

describe('Header component loads', () => {
  it('has the desktop UIO Link by default', () => {
    render(<Header userArrivedFromUioMobile={false} assetPrefix="/claimstatus" />)
    expect(screen.queryByText('UI Home')).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'UI Home' })).toHaveAttribute(
      'href',
      'https://uio.edd.ca.gov/UIO/Pages/ExternalUser/ClaimantAccountManagement/UIOnlineHome.aspx',
    )
  })

  it('has the UIO Mobile Link when the user arrived from UIO Mobile', () => {
    render(<Header userArrivedFromUioMobile assetPrefix="/claimstatus" />)
    expect(screen.queryByText('UI Home')).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'UI Home' })).toHaveAttribute(
      'href',
      'https://uiom.edd.ca.gov/UIOM/Pages/Public/ExternalUser/UIOMobileLandingPage.aspx',
    )
  })
})
