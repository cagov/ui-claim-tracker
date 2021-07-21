import renderer from 'react-test-renderer'
import { ClaimStatus } from '../../components/ClaimStatus'
import getScenarioContent, { ScenarioType } from '../../utils/getScenarioContent'
import apiGatewayStub from '../../utils/apiGatewayStub'
import { ClaimStatusContent } from '../../types/common'

import { useRouter } from 'next/router'

jest.mock('next/router', () => ({
  __esModule: true,
  useRouter: jest.fn(),
}))

function mockTheRouter(fromUiom: false) {
  const mockRouter = {
    locale: 'en',
  }
  if (fromUiom) {
    mockRouter.query = {
      from: 'uiom',
    }
  }
  ;(useRouter as jest.Mock).mockReturnValue(mockRouter)
}

function renderClaimStatusComponent(statusContent: ClaimStatusContent): string {
  return renderer
    .create(
      <ClaimStatus
        loading={false}
        heading={statusContent.heading}
        summary={statusContent.summary}
        yourNextSteps={statusContent.yourNextSteps}
        eddNextSteps={statusContent.eddNextSteps}
      />,
    )
    .toJSON()
}

function testClaimStatus(
  scenarioType: ScenarioType,
  hasCertificationWeeksAvailable: boolean,
  fromUiom: boolean,
): string {
  mockTheRouter(fromUiom)
  const scenarioContent = getScenarioContent(apiGatewayStub(scenarioType, hasCertificationWeeksAvailable))
  return renderClaimStatusComponent(scenarioContent.statusContent)
}

describe('Scenario 1', () => {
  it('matches when there are weeks to certify, on desktop', () => {
    expect(testClaimStatus(ScenarioType.Scenario1, true)).toMatchSnapshot()
  })
  it('matches when there are weeks to certify, on mobile', () => {
    expect(testClaimStatus(ScenarioType.Scenario1, true, true)).toMatchSnapshot()
  })

  it("matches when there aren't weeks to certify, on desktop", () => {
    expect(testClaimStatus(ScenarioType.Scenario1, false)).toMatchSnapshot()
  })
  it("matches when there aren't weeks to certify, on mobile", () => {
    expect(testClaimStatus(ScenarioType.Scenario1, false, true)).toMatchSnapshot()
  })
})

describe('Scenario 4', () => {
  it('matches when there are weeks to certify, on desktop', () => {
    expect(testClaimStatus(ScenarioType.Scenario4, true)).toMatchSnapshot()
  })
  it('matches when there are weeks to certify, on mobile', () => {
    expect(testClaimStatus(ScenarioType.Scenario4, true, true)).toMatchSnapshot()
  })

  it("matches when there aren't weeks to certify, on desktop", () => {
    expect(testClaimStatus(ScenarioType.Scenario4, false)).toMatchSnapshot()
  })
  it("matches when there aren't weeks to certify, on mobile", () => {
    expect(testClaimStatus(ScenarioType.Scenario4, false, true)).toMatchSnapshot()
  })
})

// Note that Scenarios 5 & 6 explicitly differ based on whether hasCertificationWeeksAvailable
// is true or false, so it doesn't make sense to test again.
describe('Scenario 5', () => {
  it('matches, on desktop', () => {
    expect(testClaimStatus(ScenarioType.Scenario5)).toMatchSnapshot()
  })
  it('matches, on mobile', () => {
    expect(testClaimStatus(ScenarioType.Scenario5, true, true)).toMatchSnapshot()
  })
})

describe('Scenario 6', () => {
  it('matches, on desktop', () => {
    expect(testClaimStatus(ScenarioType.Scenario6)).toMatchSnapshot()
  })
  it('matches, on mobile', () => {
    expect(testClaimStatus(ScenarioType.Scenario6, true, true)).toMatchSnapshot()
  })
})
