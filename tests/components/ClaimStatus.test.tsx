import renderer from 'react-test-renderer'
import { ClaimStatus } from '../../components/ClaimStatus'
import getScenarioContent, { ScenarioType } from '../../utils/getScenarioContent'
import apiGatewayStub from '../../utils/apiGatewayStub'
import { ClaimStatusContent } from '../../types/common'

function getClaimStatusJson(statusContent: ClaimStatusContent): string {
  return renderer
    .create(
      <ClaimStatus
        loading={false}
        statusDescription={statusContent.statusDescription}
        nextSteps={statusContent.nextSteps}
      />,
    )
    .toJSON()
}

function testClaimStatus(scenarioType: ScenarioType): string {
  const scenarioContent = getScenarioContent(apiGatewayStub(scenarioType))
  return getClaimStatusJson(scenarioContent.statusContent)
}

describe('ClaimStatus', () => {
  it('renders for Scenario1', () => {
    expect(testClaimStatus(ScenarioType.Scenario1)).toMatchSnapshot()
  })
  it('renders for Scenario7', () => {
    expect(testClaimStatus(ScenarioType.Scenario7)).toMatchSnapshot()
  })
  it('renders for Scenario8', () => {
    expect(testClaimStatus(ScenarioType.Scenario8)).toMatchSnapshot()
  })
  it('renders for Scenario9', () => {
    expect(testClaimStatus(ScenarioType.Scenario9)).toMatchSnapshot()
  })
  it('renders for Scenario10', () => {
    expect(testClaimStatus(ScenarioType.Scenario10)).toMatchSnapshot()
  })
})
