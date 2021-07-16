import renderer from 'react-test-renderer'
import { ClaimStatus } from '../../components/ClaimStatus'
import getScenarioContent, { ScenarioType } from '../../utils/getScenarioContent'
import apiGatewayStub from '../../utils/apiGatewayStub'
import { ClaimStatusContent } from '../../types/common'

function renderClaimStatusComponent(statusContent: ClaimStatusContent): string {
  return renderer
    .create(
      <ClaimStatus
        loading={false}
        heading={statusContent.heading}
        summary={statusContent.summary}
        nextSteps={statusContent.nextSteps}
      />,
    )
    .toJSON()
}

function testClaimStatus(scenarioType: ScenarioType): string {
  const scenarioContent = getScenarioContent(apiGatewayStub(scenarioType))
  return renderClaimStatusComponent(scenarioContent.statusContent)
}

describe('ClaimStatus', () => {
  it('renders for Scenario1', () => {
    expect(testClaimStatus(ScenarioType.Scenario1)).toMatchSnapshot()
  })
  it('renders for Scenario4', () => {
    expect(testClaimStatus(ScenarioType.Scenario4)).toMatchSnapshot()
  })
  it('renders for Scenario5', () => {
    expect(testClaimStatus(ScenarioType.Scenario5)).toMatchSnapshot()
  })
  it('renders for Scenario6', () => {
    expect(testClaimStatus(ScenarioType.Scenario6)).toMatchSnapshot()
  })
})
