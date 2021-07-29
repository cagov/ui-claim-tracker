import MockDate from 'mockdate'
import renderer, { act } from 'react-test-renderer'

import i18n from '../jest-i18n'
import { ClaimStatus } from '../../components/ClaimStatus'
import { Appointment, ClaimStatusContent } from '../../types/common'
import apiGatewayStub from '../../utils/apiGatewayStub'
import { getDateWithOffset } from '../../utils/formatDate'
import getScenarioContent, { ScenarioType } from '../../utils/getScenarioContent'

/**
 * Helper functions.
 */

function renderClaimStatusComponent(
  statusContent: ClaimStatusContent,
  userArrivedFromUioMobile: boolean,
  appointment: Appointment | null = null,
): string {
  // Optionally override the appointment.
  let appointmentToRender = statusContent.appointment
  if (appointment) {
    appointmentToRender = appointment
  }

  return renderer
    .create(
      <ClaimStatus
        loading={false}
        userArrivedFromUioMobile={userArrivedFromUioMobile}
        heading={statusContent.heading}
        summary={statusContent.summary}
        yourNextSteps={statusContent.yourNextSteps}
        eddNextSteps={statusContent.eddNextSteps}
        appointment={appointmentToRender}
      />,
    )
    .toJSON()
}

function testClaimStatus(
  scenarioType: ScenarioType,
  hasCertificationWeeksAvailable = false,
  userArrivedFromUioMobile = false,
  appointment: Appointment | null = null,
): string {
  const scenarioContent = getScenarioContent(apiGatewayStub(scenarioType, hasCertificationWeeksAvailable))
  return renderClaimStatusComponent(scenarioContent.statusContent, userArrivedFromUioMobile, appointment)
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
    MockDate.set('2021-05-05')
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

/**
 * Appointment snapshot tests.
 */
/* eslint-disable @typescript-eslint/no-floating-promises */
describe('If given an appointment', () => {
  beforeAll(() => {
    MockDate.set('2021-05-05')
  })

  it('with no time slot, then match the snapshot', () => {
    const appointment = {
      date: getDateWithOffset(0),
    }
    expect(testClaimStatus(ScenarioType.Scenario2, false, false, appointment)).toMatchSnapshot()
  })

  it('with no time slot, then match the snapshot, in Spanish', () => {
    const appointment = {
      date: getDateWithOffset(0),
    }
    act(() => {
      i18n.changeLanguage('es')
    })
    expect(testClaimStatus(ScenarioType.Scenario2, false, false, appointment)).toMatchSnapshot()
    act(() => {
      i18n.changeLanguage('en')
    })
  })

  it('with a morning time slot, then match the snapshot', () => {
    const appointment = {
      date: getDateWithOffset(0),
      timeSlot: {
        rangeStart: 8,
        rangeEnd: 10,
      },
    }
    expect(testClaimStatus(ScenarioType.Scenario2, false, false, appointment)).toMatchSnapshot()
  })

  it('with a morning time slot, then match the snapshot, in Spanish', () => {
    const appointment = {
      date: getDateWithOffset(0),
      timeSlot: {
        rangeStart: 8,
        rangeEnd: 10,
      },
    }
    act(() => {
      i18n.changeLanguage('es')
    })
    expect(testClaimStatus(ScenarioType.Scenario2, false, false, appointment)).toMatchSnapshot()
    act(() => {
      i18n.changeLanguage('en')
    })
  })

  it('with an afternoon time slot, then match the snapshot', () => {
    const appointment = {
      date: getDateWithOffset(0),
      timeSlot: {
        rangeStart: 1,
        rangeEnd: 3,
      },
    }
    expect(testClaimStatus(ScenarioType.Scenario2, false, false, appointment)).toMatchSnapshot()
  })

  it('with an afternoon time slot, then match the snapshot, in Spanish', () => {
    const appointment = {
      date: getDateWithOffset(0),
      timeSlot: {
        rangeStart: 1,
        rangeEnd: 3,
      },
    }
    act(() => {
      i18n.changeLanguage('es')
    })
    expect(testClaimStatus(ScenarioType.Scenario2, false, false, appointment)).toMatchSnapshot()
    act(() => {
      i18n.changeLanguage('en')
    })
  })

  it('with a time slot that starts in the morning and ends in the afternoon, then match the snapshot', () => {
    const appointment = {
      date: getDateWithOffset(0),
      timeSlot: {
        rangeStart: 8,
        rangeEnd: 3,
      },
    }
    expect(testClaimStatus(ScenarioType.Scenario2, false, false, appointment)).toMatchSnapshot()
  })

  it('with a time slot that starts in the morning and ends in the afternoon, then match the snapshot, in Spanish', () => {
    const appointment = {
      date: getDateWithOffset(0),
      timeSlot: {
        rangeStart: 8,
        rangeEnd: 3,
      },
    }
    act(() => {
      i18n.changeLanguage('es')
    })
    expect(testClaimStatus(ScenarioType.Scenario2, false, false, appointment)).toMatchSnapshot()
    act(() => {
      i18n.changeLanguage('en')
    })
  })

  it('with a time slot that has a nonsense time range, then match the snapshot', () => {
    const appointment = {
      date: getDateWithOffset(0),
      timeSlot: {
        rangeStart: 3,
        rangeEnd: 9,
      },
    }
    expect(testClaimStatus(ScenarioType.Scenario2, false, false, appointment)).toMatchSnapshot()
  })

  it('with a time slot that has a nonsense time range, then match the snapshot, in Spanish', () => {
    const appointment = {
      date: getDateWithOffset(0),
      timeSlot: {
        rangeStart: 3,
        rangeEnd: 9,
      },
    }
    act(() => {
      i18n.changeLanguage('es')
    })
    expect(testClaimStatus(ScenarioType.Scenario2, false, false, appointment)).toMatchSnapshot()
    act(() => {
      i18n.changeLanguage('en')
    })
  })
})
/* eslint-enable @typescript-eslint/no-floating-promises */
