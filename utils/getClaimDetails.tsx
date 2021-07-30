/**
 * Utility file for returning the correct content for the Claim Details component.
 *
 * This file specifies the mappings from what the API gateway provides and what is
 * shown in the Claim Tracker to the user.
 */

import { ClaimDetailsContent, ClaimDetailsResult, I18nString } from '../types/common'
import formatDate from './formatDate'

export interface ProgramType {
  [key: string]: string
}

// Mapped to the strings that the API gateway provides
export const programTypeNames: ProgramType = {
  UI: 'UI',
  EUC: 'EUC - Tier 1 Extension',
  EUX: 'EUX - Tier 2 Extension',
  EUY: 'EUY - Tier 2 Augmentation',
  EUW: 'EUW - Tier 3 Extension',
  EUZ: 'EUZ - Tier 4 Extension',
  FEDED: 'FED-ED Extension',
  CALED: 'CAL-ED Extension',
  TRA: 'TRA Basic Extension',
  TRAAdditional: 'TRA Additional/Remedial Extension',
  TE: 'Training Extension (TE)',
  DUA: 'DUA',
  PUA: 'PUA',
  INTERSTATE: 'Interstate',
  NAFTA: 'NAFTA-TAA/REV30',
}

export interface programExtensionPairType {
  programType: I18nString
  extensionType: I18nString
}

// Pairs of user-facing translation strings
export const programExtensionPairs = {
  UI: {
    programType: 'claim-details:program-type.ui',
    extensionType: '',
  },
  EUC: {
    programType: 'claim-details:program-type.ui',
    extensionType: 'claim-details:extension-type.euc',
  },
  EUX: {
    programType: 'claim-details:program-type.ui',
    extensionType: 'claim-details:extension-type.eux',
  },
  EUY: {
    programType: 'claim-details:program-type.ui',
    extensionType: 'claim-details:extension-type.euy',
  },
  EUW: {
    programType: 'claim-details:program-type.ui',
    extensionType: 'claim-details:extension-type.euw',
  },
  EUZ: {
    programType: 'claim-details:program-type.ui',
    extensionType: 'claim-details:extension-type.euz',
  },
  FEDED: {
    programType: 'claim-details:program-type.ui',
    extensionType: 'claim-details:extension-type.fed-ed',
  },
  CALED: {
    programType: 'claim-details:program-type.ui',
    extensionType: 'claim-details:extension-type.cal-ed',
  },
  TRA: {
    programType: 'claim-details:program-type.ui',
    extensionType: 'claim-details:extension-type.tra',
  },
  TRAAdditional: {
    programType: 'claim-details:program-type.ui',
    extensionType: 'claim-details:extension-type.tra-additional',
  },
  TE: {
    programType: 'claim-details:program-type.ui',
    extensionType: 'claim-details:extension-type.te',
  },
  DUA: {
    programType: 'claim-details:program-type.dua',
    extensionType: '',
  },
  PUA: {
    programType: 'claim-details:program-type.pua',
    extensionType: '',
  },
  INTERSTATE: {
    programType: 'claim-details:program-type.interstate',
    extensionType: '',
  },
  NAFTA: {
    programType: 'claim-details:program-type.nafta',
    extensionType: '',
  },
}

/**
 * Given a ProgramType string by the API gateway, return a pair of user-facing translation strings.
 */
export function getProgramExtensionPair(apiString: string): programExtensionPairType {
  for (const [id, pair] of Object.entries(programExtensionPairs)) {
    if (apiString === programTypeNames[id]) {
      return pair
    }
  }
  // If no known mapping is found, throw an error.
  throw new Error('Unknown Program Type')
}

/**
 * Constrtuct the benefit year string.
 */
export function buildBenefitYear(start: string, end: string): string {
  return `${formatDate(start)}–${formatDate(end)}`
}

/**
 * Format currency.
 */
export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-EN', { style: 'currency', currency: 'USD', minimumFractionDigits: 2 }).format(amount)
}

/**
 * Get Claim Details content.
 */
export default function getClaimDetails(rawDetails: ClaimDetailsResult): ClaimDetailsContent {
  // Get programType and extensionType.
  const pair: programExtensionPairType = getProgramExtensionPair(rawDetails.programType)
  const benefitYear = buildBenefitYear(rawDetails.benefitYearStartDate, rawDetails.benefitYearEndDate)

  return {
    programType: pair.programType,
    benefitYear: benefitYear,
    claimBalance: formatCurrency(rawDetails.claimBalance),
    weeklyBenefitAmount: formatCurrency(rawDetails.weeklyBenefitAmount),
    lastPaymentIssued: `${formatCurrency(rawDetails.lastPaymentAmount)} on ${formatDate(rawDetails.lastPaymentIssued)}`,
    extensionType: pair.extensionType,
  }
}
