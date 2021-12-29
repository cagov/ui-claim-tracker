import renderer from 'react-test-renderer'
import { render, screen } from '@testing-library/react'

import Index from '../../pages/index'
import getScenarioContent, { ScenarioType } from '../../utils/getScenarioContent'
import apiGatewayStub from '../../utils/apiGatewayStub'
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

describe('Full page snapshot', () => {
  it('renders homepage unchanged', () => {
    const mockRouter = {
      locale: 'en',
    }
    ;(useRouter as jest.Mock).mockReturnValue(mockRouter)

    const urlPrefixes = {}
    const tree = renderer
      .create(
        <Index
          scenarioContent={scenarioContent}
          assetPrefix=""
          enableGoogleAnalytics=""
          enableMaintenancePage=""
          urlPrefixes={urlPrefixes}
        />,
      )
      .toJSON()
    expect(tree).toMatchSnapshot()
  })
})

describe('Main component shows the timeout', () => {
  it('has our timeout modal', () => {
    const mockRouter = {
      locale: 'en',
    }
    ;(useRouter as jest.Mock).mockReturnValue(mockRouter)

    const urlPrefixes = {}
    render(
      <Index
        timedOut
        scenarioContent={scenarioContent}
        assetPrefix=""
        enableGoogleAnalytics=""
        enableMaintenancePage=""
        urlPrefixes={urlPrefixes}
      />,
    )
    expect(screen.queryByText('Your Session Will End Soon')).toBeInTheDocument()
  })
})
