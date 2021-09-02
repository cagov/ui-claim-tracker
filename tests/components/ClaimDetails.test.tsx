import { render, screen } from '@testing-library/react'

import { useRouter } from 'next/router'

import { ClaimDetails } from '../../components/ClaimDetails'

jest.mock('next/router', () => ({
  __esModule: true,
  useRouter: jest.fn(),
}))

describe('ClaimDetails with all nonnull fields', () => {
  it('shows all the fields', () => {
    const mockRouter = {
      locale: 'en',
    }
    ;(useRouter as jest.Mock).mockReturnValue(mockRouter)

    render(
      <ClaimDetails
        loading={false}
        programType="Test Program Type"
        benefitYear="Test Benefit Year"
        claimBalance="Test Claim Balance"
        weeklyBenefitAmount="Test Weekly Benefit Amount"
        lastPaymentIssued="Test Last Payment Issued"
        extensionType="Test Extension Type"
      />,
    )

    expect(screen.queryByText('Claim Details')).toBeInTheDocument()
    expect(screen.queryByText('Claim Type')).toBeInTheDocument()
    expect(screen.queryByText('Benefit Year')).toBeInTheDocument()
    expect(screen.queryByText('Claim Balance')).toBeInTheDocument()
    expect(screen.queryByText('Weekly Benefit Amount')).toBeInTheDocument()
    expect(screen.queryByText('Last Payment Issued')).toBeInTheDocument()
  })
})

describe('ClaimDetails with nullable fields', () => {
  it('Null Claim Balance hides the field', () => {
    const mockRouter = {
      locale: 'en',
    }
    ;(useRouter as jest.Mock).mockReturnValue(mockRouter)

    render(
      <ClaimDetails
        loading={false}
        programType="Test Program Type"
        benefitYear="Test Benefit Year"
        claimBalance={null}
        weeklyBenefitAmount="Test Weekly Benefit Amount"
        lastPaymentIssued="Test Last Payment Issued"
        extensionType="Test Extension Type"
      />,
    )

    expect(screen.queryByText('Claim Balance')).not.toBeInTheDocument()
  })
  it('Null Weekly Benefit Amount hides the field', () => {
    const mockRouter = {
      locale: 'en',
    }
    ;(useRouter as jest.Mock).mockReturnValue(mockRouter)

    render(
      <ClaimDetails
        loading={false}
        programType="Test Program Type"
        benefitYear="Test Benefit Year"
        claimBalance="Test Claim Balance"
        weeklyBenefitAmount={null}
        lastPaymentIssued="Test Last Payment Issued"
        extensionType="Test Extension Type"
      />,
    )

    expect(screen.queryByText('Weekly Benefit Amount')).not.toBeInTheDocument()
  })
  it('Null Last Payment Issued shows None', () => {
    const mockRouter = {
      locale: 'en',
    }
    ;(useRouter as jest.Mock).mockReturnValue(mockRouter)

    render(
      <ClaimDetails
        loading={false}
        programType="Test Program Type"
        benefitYear="Test Benefit Year"
        claimBalance="Test Claim Balance"
        weeklyBenefitAmount="Test Weekly Benefit Amount"
        lastPaymentIssued={null}
        extensionType="Test Extension Type"
      />,
    )

    expect(screen.queryByText('Last Payment Issued')).toBeInTheDocument()
    expect(screen.queryByText('None')).toBeInTheDocument()
  })
})
