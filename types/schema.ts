import { z } from 'zod'

export const pendingDeterminationSchema = z.object({
  pendingDate: z.string(),
  scheduleDate: z.string(),
  timeSlotDesc: z.string(),
  requestDate: z.string(),
  determinationStatus: z.union([z.string(), z.null(), z.undefined()]).optional(),
  willCallIndicator: z.boolean(),
  spokenLanguageCode: z.string(),
  spokenLanguageDesc: z.string(),
})

export const claimDetailsResultSchema = z.object({
  programType: z.string(),
  benefitYearStartDate: z.string(),
  benefitYearEndDate: z.string(),
  claimBalance: z.number(),
  weeklyBenefitAmount: z.number(),
  lastPaymentIssued: z.string(),
  lastPaymentAmount: z.number(),
  monetaryStatus: z.string(),
})

export const claimSchema = z.object({
  ClaimType: z.union([z.null(), z.undefined(), z.string()]),
  uniqueNumber: z.union([z.null(), z.string()]).optional(),
  claimDetails: z.union([z.null(), claimDetailsResultSchema]).optional(),
  hasPendingWeeks: z.union([z.null(), z.undefined(), z.boolean()]).optional(),
  hasCertificationWeeksAvailable: z.union([z.null(), z.undefined(), z.boolean()]).optional(),
  pendingDetermination: z.union([z.null(), z.array(pendingDeterminationSchema)]).optional(),
})
