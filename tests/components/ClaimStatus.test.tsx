import renderer from 'react-test-renderer'
import { ClaimStatus } from '../../components/ClaimStatus'
import getScenarioContent, { ScenarioType } from '../../utils/getScenarioContent'
import apiGatewayStub from '../../utils/apiGatewayStub'
import { ClaimStatusContent } from '../../types/common'

function getClaimStatusJSON(statusContent: ClaimStatusContent): string {
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

function testClaimStatus(scenarioType: ScenarioType): void {
  const scenarioContent = getScenarioContent(apiGatewayStub(scenarioType))
  const tree = getClaimStatusJSON(scenarioContent.statusContent)
  expect(tree).toMatchSnapshot()
}

describe('ClaimStatus', () => {
  it('renders for Scenario1', () => {
    testClaimStatus(ScenarioType.Scenario1)
  })
  it('renders for Scenario7', () => {
    testClaimStatus(ScenarioType.Scenario7)
  })
  it('renders for Scenario8', () => {
    testClaimStatus(ScenarioType.Scenario8)
  })
  it('renders for Scenario9', () => {
    testClaimStatus(ScenarioType.Scenario9)
  })
  it('renders for Scenario10', () => {
    testClaimStatus(ScenarioType.Scenario10)
  })
})
