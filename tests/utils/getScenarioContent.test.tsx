import { getClaimStatusDescription, getScenario, ScenarioType } from '../../utils/getScenarioContent'

// Shared test constants for mock API gateway responses
const pendingDeterminationScenario = { pendingDetermination: ['temporary text'] }
const basePendingScenario = { hasPendingWeeks: true }
const baseNoPendingActiveScenario = { hasPendingWeeks: false, claimDetails: { monetaryStatus: 'active' } }
const baseNoPendingInactiveScenario = { hasPendingWeeks: false, claimDetails: { monetaryStatus: 'inactive' } }

/**
 * Begin tests
 */

// Test getScenarioContent()

// Test getClaimStatusDescripton()
describe('Getting the Claim Status description', () => {
  it('returns the correct description for the scenario', () => {
    const pendingDetermination = getClaimStatusDescription(ScenarioType.PendingDetermination)
    expect(pendingDetermination).toBe('claim-status:pending-determination.description')

    const basePending = getClaimStatusDescription(ScenarioType.BasePending)
    expect(basePending).toBe('claim-status:base-pending.description')

    const baseNoPendingActive = getClaimStatusDescription(ScenarioType.BaseNoPendingActive)
    expect(baseNoPendingActive).toBe('claim-status:base-no-pending-active.description')

    const baseNoPendingInactive = getClaimStatusDescription(ScenarioType.BaseNoPendingInactive)
    expect(baseNoPendingInactive).toBe('claim-status:base-no-pending-inactive.description')
  })

  it('throws an error if given an unknown scenario', () => {
    expect(() => {
      getClaimStatusDescription('unknown')
    }).toThrowError('Unknown Scenario Type')
  })
})

// Test getScenario(): pending determination scenario
describe('The pending determination scenario', () => {
  it('is returned when there is a pendingDetermination object', () => {
    const scenarioType: ScenarioType = getScenario(pendingDeterminationScenario)
    expect(scenarioType).toBe(ScenarioType.PendingDetermination)
  })

  it('is returned when there is a pendingDetermination object regardless of other criteria', () => {
    const pendingDeterminationScenarioWith = {
      pendingDetermination: ['temporary text'],
      hasPendingWeeks: true,
    }
    const scenarioTypeWith: ScenarioType = getScenario(pendingDeterminationScenarioWith)
    expect(scenarioTypeWith).toBe(ScenarioType.PendingDetermination)

    const pendingDeterminationScenarioWithout = {
      pendingDetermination: ['temporary text'],
      hasPendingWeeks: false,
    }
    const scenarioTypeWithout: ScenarioType = getScenario(pendingDeterminationScenarioWithout)
    expect(scenarioTypeWithout).toBe(ScenarioType.PendingDetermination)
  })
})

// Test getScenario(): base state with pending weeks scenario
describe('The base state (with pending weeks) scenario', () => {
  it('is returned when there are pending weeks', () => {
    const scenarioType: ScenarioType = getScenario(basePendingScenario)
    expect(scenarioType).toBe(ScenarioType.BasePending)
  })

  it('is returned when there are pending weeks and pendingDetermination is null', () => {
    const basePendingScenarioNull = { hasPendingWeeks: true, pendingDetermination: null }
    const scenarioType: ScenarioType = getScenario(basePendingScenarioNull)
    expect(scenarioType).toBe(ScenarioType.BasePending)
  })

  it('is returned when there are pending weeks and pendingDetermination is an empty array', () => {
    const basePendingScenarioEmpty = { hasPendingWeeks: true, pendingDetermination: [] }
    const scenarioType: ScenarioType = getScenario(basePendingScenarioEmpty)
    expect(scenarioType).toBe(ScenarioType.BasePending)
  })
})

// Test getScenario(): base state with no pending weeks; active claim scenario
describe('The base state (with no pending weeks); active claim scenario', () => {
  it('is returned when there are no pending weeks and there is an active claim', () => {
    const scenarioType: ScenarioType = getScenario(baseNoPendingActiveScenario)
    expect(scenarioType).toBe(ScenarioType.BaseNoPendingActive)
  })

  it('is returned when there are no pending weeks and there is an active claim and pendingDetermination is null', () => {
    const baseNoPendingActiveScenarioNull = {
      hasPendingWeeks: false,
      claimDetails: { monetaryStatus: 'active' },
      pendingDetermination: null,
    }
    const scenarioType: ScenarioType = getScenario(baseNoPendingActiveScenarioNull)
    expect(scenarioType).toBe(ScenarioType.BaseNoPendingActive)
  })

  it('is returned when there are no pending weeks and there is an active claim and pendingDetermination is an empty array', () => {
    const baseNoPendingActiveScenarioEmpty = {
      hasPendingWeeks: false,
      claimDetails: { monetaryStatus: 'active' },
      pendingDetermination: [],
    }
    const scenarioType: ScenarioType = getScenario(baseNoPendingActiveScenarioEmpty)
    expect(scenarioType).toBe(ScenarioType.BaseNoPendingActive)
  })
})

// Test getScenario(): base state with no pending weeks; Inactive claim scenario
describe('The base state (with no pending weeks); Inactive claim scenario', () => {
  it('is returned when there are no pending weeks and monetaryStatus is set to "inactive"', () => {
    const scenarioType: ScenarioType = getScenario(baseNoPendingInactiveScenario)
    expect(scenarioType).toBe(ScenarioType.BaseNoPendingInactive)
  })

  it('is returned when there are no pending weeks and monetaryStatus is set to null', () => {
    const inactiveScenario = {
      hasPendingWeeks: false,
      pendingDetermination: null,
      claimDetails: {
        monetaryStatus: null,
      },
    }
    const scenarioType: ScenarioType = getScenario(inactiveScenario)
    expect(scenarioType).toBe(ScenarioType.BaseNoPendingInactive)
  })

  it('is returned when there are no pending weeks and monetaryStatus is set to undefined', () => {
    const inactiveScenario = {
      hasPendingWeeks: false,
      pendingDetermination: null,
      claimDetails: {
        monetaryStatus: undefined,
      },
    }
    const scenarioType: ScenarioType = getScenario(inactiveScenario)
    expect(scenarioType).toBe(ScenarioType.BaseNoPendingInactive)
  })

  it('is returned when there are no pending weeks and monetaryStatus is not set', () => {
    const inactiveScenario = {
      hasPendingWeeks: false,
      pendingDetermination: null,
      claimDetails: {
        programType: 'UI',
      },
    }
    const scenarioType: ScenarioType = getScenario(inactiveScenario)
    expect(scenarioType).toBe(ScenarioType.BaseNoPendingInactive)
  })

  it.skip('errors if there is no claimDetails object', () => {
    const baseNoPendingActiveScenarioNull = {
      hasPendingWeeks: false,
      pendingDetermination: null,
    }
    expect(() => {
      getScenario(baseNoPendingActiveScenarioNull)
    }).toThrowError('Missing claim details')
  })
})

// Test getScenario(): error
describe('Getting the scenario', () => {
  it.skip('errors when given an unknown scenario', () => {
    expect(() => {
      getScenario({})
    }).toThrowError('Unknown Scenario')
  })
})
