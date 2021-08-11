import { render, screen } from '@testing-library/react'
import { ClaimSection } from '../../components/ClaimSection'
import apiGatewayStub from '../../utils/apiGatewayStub'
import getScenarioContent, { ScenarioType } from '../../utils/getScenarioContent'
import { ScenarioContent } from '../../types/common'

import { useRouter } from 'next/router'

jest.mock('next/router', () => ({
  __esModule: true,
  useRouter: jest.fn(),
}))

let scenarioContent: ScenarioContent

beforeAll(() => {
  scenarioContent = getScenarioContent(apiGatewayStub(ScenarioType.Scenario1))
})

describe('Claim Status & Claim Details are provided', () => {
  it('shows both sections', () => {
    const mockRouter = {
      locale: 'en',
    }
    ;(useRouter as jest.Mock).mockReturnValue(mockRouter)

    render(
      <ClaimSection
        loading={false}
        userArrivedFromUioMobile={false}
        statusContent={scenarioContent.statusContent}
        detailsContent={scenarioContent.detailsContent}
      />,
    )
    expect(screen.queryByText('Claim Details')).toBeInTheDocument()
  })
})

describe('No Claim Details are provided', () => {
  it('hides the Claim Details section', () => {
    const mockRouter = {
      locale: 'en',
    }
    ;(useRouter as jest.Mock).mockReturnValue(mockRouter)

    render(
      <ClaimSection
        loading={false}
        userArrivedFromUioMobile={false}
        statusContent={scenarioContent.statusContent}
        detailsContent={null}
      />,
    )
    expect(screen.queryByText('Claim Details')).not.toBeInTheDocument()
  })
})
