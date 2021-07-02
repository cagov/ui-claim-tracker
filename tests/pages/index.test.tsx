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

describe('Exemplar react-test-renderer Snapshot test', () => {
  it('renders homepage unchanged', () => {
    const mockRouter = {
      locale: 'en',
    }
    ;(useRouter as jest.Mock).mockReturnValue(mockRouter)

    const tree = renderer.create(<Index loading={false} scenarioContent={scenarioContent} />).toJSON()
    expect(tree).toMatchSnapshot()
  })
})

describe('Main component shows loading', () => {
  it('has our titles but content is shimmer', () => {
    const mockRouter = {
      locale: 'en',
    }
    ;(useRouter as jest.Mock).mockReturnValue(mockRouter)

    render(<Index loading scenarioContent={scenarioContent} />)
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

    render(<Index timedOut loading={false} scenarioContent={scenarioContent} />)
    expect(screen.queryByText('Your Session Will End Soon')).toBeInTheDocument()
  })
})
