// Type aliases
export type I18nString = string
export type ApiGatewayDateString = string

// Types for URL prefixes loaded from env vars
export interface UrlPrefixes {
  urlPrefixUioDesktop: string
  urlPrefixUioMobile: string
  urlPrefixBpo: string
}

// Types for TransLine component
export interface TransLineContent {
  i18nKey: I18nString
  links?: I18nString[]
}

// Types for translation file JSON
export interface TextOptionalLink {
  text: string
  links?: string[]
  subBullets?: TextOptionalLink[]
}

// Types for API gateway result
export interface PendingDetermination {
  pendingDate: string
  scheduleDate: string
  timeSlotDesc: string
  requestDate: string
  determinationStatus?: string | null | undefined
  willCallIndicator: boolean
  spokenLanguageCode: string
  spokenLanguageDesc: string
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
  hasPendingWeeks?: null | undefined | boolean // deprecated for hasValidPendingWeeks
  hasValidPendingWeeks?: null | undefined | boolean
  hasCertificationWeeksAvailable?: null | undefined | boolean
  isBye?: null | undefined | boolean
  pendingDetermination?: null | PendingDetermination[]
}

// Types for Claim Status and Claim Details
export interface TimeSlot {
  rangeStart: number
  rangeEnd: number
}

export interface AppointmentContent {
  date: string
  timeSlot?: TimeSlot
}

export interface ClaimSummaryContent {
  paragraphs: TransLineContent[]
  appointment: null | AppointmentContent
}

export interface ClaimStatusContent {
  heading: I18nString
  summary: ClaimSummaryContent
  yourNextSteps: Array<TransLineContent | TransLineContent[]>
  eddNextSteps: Array<TransLineContent | TransLineContent[]>
}

export interface ClaimDetailsContent {
  programType: string
  benefitYear: string
  claimBalance: string | null
  weeklyBenefitAmount: string | null
  lastPaymentIssued: string | null
  extensionType: string
}

export interface ScenarioContent {
  statusContent: ClaimStatusContent
  detailsContent: null | ClaimDetailsContent
}
