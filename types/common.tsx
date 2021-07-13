// Type aliases
export type I18nString = string

// Type interfaces for TransLine component
export interface TransLineProps {
  i18nKey: I18nString
  links?: string[] | null
}

// Type interfaces for API gateway result
export interface PendingDetermination {
  determinationStatus?: null | undefined | string
}

export interface ClaimDetailsResult {
  programType: string
  benefitYearStartDate: string
  benefitYearEndDate: string
  claimBalance: number
  weeklyBenefitAmount: number
  lastPaymentIssued: string
  lastPaymentAmount: number
  monetaryStatus: string
}

export interface Claim {
  ClaimType?: null | undefined | string
  uniqueNumber?: null | string
  claimDetails?: null | ClaimDetailsResult
  hasPendingWeeks?: null | undefined | boolean
  hasCertificationWeeksAvailable?: null | undefined | boolean
  pendingDetermination?: null | [PendingDetermination]
}

// Type interfaces for Claim Status and Claim Details
export interface ClaimStatusContent {
  heading: I18nString
  nextSteps?: string[]
}

export interface ClaimDetailsContent {
  programType: string
  benefitYear: string
  claimBalance: string
  weeklyBenefitAmount: string
  lastPaymentIssued: string
  extensionType: string
}

export interface ScenarioContent {
  statusContent: ClaimStatusContent
  detailsContent: ClaimDetailsContent
}
