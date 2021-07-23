import { useState, useEffect } from 'react'
import { useTranslation } from 'next-i18next'
import Modal from 'react-bootstrap/Modal'

import { Button } from './Button'
import getUrl from '../utils/getUrl'

let warningTimerId: NodeJS.Timeout | null = null

export interface TimeoutModalProps {
  action: string
  timedOut: boolean
}

export const TimeoutModal: React.FC<TimeoutModalProps> = (props) => {
  const { t } = useTranslation()
  const { timedOut } = props

  // handy converter for Minutes -> Milliseconds
  const ONE_MINUTE_MS = 60 * 1000

  // keep times in human readable minutes
  const REDIRECT_TIMER = 3
  const WARNING_DURATION = 2
  const WARNING_TIMER = REDIRECT_TIMER - WARNING_DURATION

  const [numberOfMinutes, setNumberOfMinutes] = useState(WARNING_DURATION)
  const [showWarningModal, setShowWarningModal] = useState<boolean | null>(timedOut)
  const [warned, setWarned] = useState<boolean | null>(timedOut)

  useEffect(() => {
    if (showWarningModal) {
      const timer = setTimeout(() => {
        setNumberOfMinutes(numberOfMinutes - 1)
      }, ONE_MINUTE_MS)
      return () => clearTimeout(timer)
    }
  })

  function startTimer() {
    // Show the warning modal for a bit before navigating
    warningTimerId = setTimeout(() => {
      setShowWarningModal(true)
      setWarned(true)
      setNumberOfMinutes(WARNING_DURATION)
    }, WARNING_TIMER * ONE_MINUTE_MS)
    // And at the end, send back to EDD
    setTimeout(() => {
      if (typeof window !== 'undefined') {
        const eddLocation = getUrl('edd-log-in')?.concat(encodeURIComponent(window.location.toString()))
        window.location.href = eddLocation || ''
      }
    }, REDIRECT_TIMER * ONE_MINUTE_MS)
  }

  function closeWarningModal() {
    setShowWarningModal(false)

    if (warningTimerId) {
      clearTimeout(warningTimerId)
      warningTimerId = null
    }
  }

  // If the warning modal hasn't shown, kickoff!
  if (!warned) {
    startTimer()
  }

  return (
    <Modal show={showWarningModal} onHide={closeWarningModal} centered>
      <Modal.Header closeButton className="border-0">
        <Modal.Title>
          <strong>{t('timeout-modal.header')}</strong>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>{t('timeout-modal.warning', { numberOfMinutes })}</Modal.Body>
      <Modal.Footer className="border-0">
        <Button onClick={closeWarningModal} label={t('timeout-modal.button')} />
      </Modal.Footer>
    </Modal>
  )
}
