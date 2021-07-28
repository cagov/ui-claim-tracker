/**
 * Common test helpers to create shared mock data.
 */

import { PendingDetermination } from '../types/common'
import { formatFromApiGateway, getDateWithOffset } from '../utils/formatDate'

export function getMockPendingDetermination(): PendingDetermination {
  const pendingDetermination: PendingDetermination = {
    pendingDate: '',
    scheduleDate: '',
    timeSlotDesc: '',
    requestDate: '',
    determinationStatus: '',
    willCallIndicator: false,
    spokenLanguageCode: '',
    spokenLanguageDesc: '',
  }
  return pendingDetermination
}

export function getPendingDeterminationWithScheduleDate(offset = 1): PendingDetermination {
  const pendingDetermination = getMockPendingDetermination()
  pendingDetermination.determinationStatus = 'Random string' // Can be anything other than one of NonPendingDeterminationValues
  pendingDetermination.scheduleDate = formatFromApiGateway(getDateWithOffset(offset))
  return pendingDetermination
}
