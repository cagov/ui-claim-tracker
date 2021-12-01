import renderer from 'react-test-renderer'

import { DateTime, Settings } from 'luxon'

import { ClaimStatus } from '../../components/ClaimStatus'
import { ClaimStatusContent } from '../../types/common'
import apiGatewayStub from '../../utils/apiGatewayStub'
import getScenarioContent, { ScenarioType } from '../../utils/getScenarioContent'

/**
 * Helper functions.
 */

function renderClaimStatusComponent(statusContent: ClaimStatusContent, userArrivedFromUioMobile: boolean): string {
  return renderer
    .create(
      <ClaimStatus
        userArrivedFromUioMobile={userArrivedFromUioMobile}
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
  hasCertificationWeeksAvailable = false,
  userArrivedFromUioMobile = false,
): string {
  const scenarioContent = getScenarioContent(apiGatewayStub(scenarioType, hasCertificationWeeksAvailable))
  return renderClaimStatusComponent(scenarioContent.statusContent, userArrivedFromUioMobile)
}

/**
 * Scenario snapshot tests.
 */

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

describe('Scenario 2', () => {
  beforeAll(() => {
    const expectedNow = DateTime.local(2021, 5, 5)
    Settings.now = () => expectedNow.toMillis()
  })

  it('matches when there are weeks to certify, on desktop', () => {
    expect(testClaimStatus(ScenarioType.Scenario2, true)).toMatchSnapshot()
  })
  it('matches when there are weeks to certify, on mobile', () => {
    expect(testClaimStatus(ScenarioType.Scenario2, true, true)).toMatchSnapshot()
  })

  it("matches when there aren't weeks to certify, on desktop", () => {
    expect(testClaimStatus(ScenarioType.Scenario2, false)).toMatchSnapshot()
  })
  it("matches when there aren't weeks to certify, on mobile", () => {
    expect(testClaimStatus(ScenarioType.Scenario2, false, true)).toMatchSnapshot()
  })
})

describe('Scenario 3', () => {
  it('matches when there are weeks to certify, on desktop', () => {
    expect(testClaimStatus(ScenarioType.Scenario3, true)).toMatchSnapshot()
  })
  it('matches when there are weeks to certify, on mobile', () => {
    expect(testClaimStatus(ScenarioType.Scenario3, true, true)).toMatchSnapshot()
  })

  it("matches when there aren't weeks to certify, on desktop", () => {
    expect(testClaimStatus(ScenarioType.Scenario3, false)).toMatchSnapshot()
  })
  it("matches when there aren't weeks to certify, on mobile", () => {
    expect(testClaimStatus(ScenarioType.Scenario3, false, true)).toMatchSnapshot()
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

// Test the BYE Scenarios
// Note that BYE Scenarios are lower precendent than hasCertificationWeeksAvailable, so they
// do not have a display to test with that
describe('Scenario 7', () => {
  it('matches, on desktop', () => {
    expect(testClaimStatus(ScenarioType.Scenario7)).toMatchSnapshot()
  })
  it('matches, on mobile', () => {
    expect(testClaimStatus(ScenarioType.Scenario7, true, true)).toMatchSnapshot()
  })
})

describe('Scenario 8', () => {
  it('matches, on desktop', () => {
    expect(testClaimStatus(ScenarioType.Scenario8)).toMatchSnapshot()
  })
  it('matches, on mobile', () => {
    expect(testClaimStatus(ScenarioType.Scenario8, true, true)).toMatchSnapshot()
  })
})

describe('Scenario 9', () => {
  it('matches, on desktop', () => {
    expect(testClaimStatus(ScenarioType.Scenario9)).toMatchSnapshot()
  })
  it('matches, on mobile', () => {
    expect(testClaimStatus(ScenarioType.Scenario9, true, true)).toMatchSnapshot()
  })
})

describe('Scenario 10', () => {
  it('matches, on desktop', () => {
    expect(testClaimStatus(ScenarioType.Scenario10)).toMatchSnapshot()
  })
  it('matches, on mobile', () => {
    expect(testClaimStatus(ScenarioType.Scenario10, true, true)).toMatchSnapshot()
  })
})

describe('Scenario 11', () => {
  it('matches, on desktop', () => {
    expect(testClaimStatus(ScenarioType.Scenario11)).toMatchSnapshot()
  })
  it('matches, on mobile', () => {
    expect(testClaimStatus(ScenarioType.Scenario11, true, true)).toMatchSnapshot()
  })
})

describe('Scenario 12', () => {
  it('matches, on desktop', () => {
    expect(testClaimStatus(ScenarioType.Scenario12)).toMatchSnapshot()
  })
  it('matches, on mobile', () => {
    expect(testClaimStatus(ScenarioType.Scenario12, true, true)).toMatchSnapshot()
  })
})
