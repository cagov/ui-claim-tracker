import { useState, useEffect } from 'react'
import { useTranslation } from 'next-i18next'
import Modal from 'react-bootstrap/Modal'

import { Button } from './Button'

let timeOutTimerId: NodeJS.Timeout | null = null
let warningTimerId: NodeJS.Timeout | null = null

export interface TimeoutModalProps {
  action: string
  timeout: number
}

export const TimeoutModal: React.FC<TimeoutModalProps> = (props) => {
  const { t } = useTranslation()
  const { action, timeout } = props
  const TIMEOUT_MS = timeout * 60 * 1000
  const TIMEOUT_DISPLAY_TIME_IN_MINUTES = 5
  const TIMEOUT_WARNING_MS = TIMEOUT_MS - TIMEOUT_DISPLAY_TIME_IN_MINUTES * 60 * 1000
  const [numberOfMinutes, setNumberOfMinutes] = useState(TIMEOUT_DISPLAY_TIME_IN_MINUTES)
  const [showWarningModal, setShowWarningModal] = useState<boolean | null>(false)

  useEffect(() => {
    if (showWarningModal) {
      const timer = setTimeout(() => {
        setNumberOfMinutes(numberOfMinutes - 1)
      }, 60 * 1000)
      return () => clearTimeout(timer)
    }
  })

  useEffect(() => {
    if (showWarningModal) {
      const timer = setTimeout(() => {
        setNumberOfMinutes(numberOfMinutes - 1)
      }, 60 * 1000)
      return () => clearTimeout(timer)
    }
  })

  function closeWarningModal() {
    setShowWarningModal(false)
    startOrUpdate()
  }

  function startOrUpdate() {
    clear()
    warningTimerId = setTimeout(() => {
      setShowWarningModal(true)
      setNumberOfMinutes(TIMEOUT_DISPLAY_TIME_IN_MINUTES)
    }, TIMEOUT_WARNING_MS)
    timeOutTimerId = setTimeout(() => {
      if (typeof window !== 'undefined') {
        const eddLocation =
          'https://portal.edd.ca.gov/WebApp/Login?resource_url=' + encodeURIComponent(window.location.toString())
        window.location = eddLocation
      }
    }, TIMEOUT_MS)
  }

  function clear() {
    if (timeOutTimerId) {
      clearTimeout(timeOutTimerId)
      timeOutTimerId = null
    }
    if (warningTimerId) {
      clearTimeout(warningTimerId)
      warningTimerId = null
    }
  }

  // If the modal is showing, we don't want to restart the timer.
  if (action === 'startOrUpdate' && !showWarningModal) {
    startOrUpdate()
  } else if (action === 'clear') {
    clear()
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
