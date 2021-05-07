import { useState, useEffect } from 'react'
import Modal from 'react-bootstrap/Modal'

let timeOutTimerId: NodeJS.Timeout | null = null
let warningTimerId: NodeJS.Timeout | null = null
const TIMEOUT_MS = 30 * 60 * 1000
const TIMEOUT_DISPLAY_TIME_IN_MINUTES = 5
const TIMEOUT_WARNING_MS = TIMEOUT_MS - TIMEOUT_DISPLAY_TIME_IN_MINUTES * 60 * 1000

export interface TimeoutModalProps {
  action: string
}

export const TimeoutModal: React.FC<TimeoutModalProps> = (props) => {
  const { action } = props
  const [showWarningModal, setShowWarningModal] = useState<boolean | null>(false)
  const [numberOfMinutes, setNumberOfMinutes] = useState(TIMEOUT_DISPLAY_TIME_IN_MINUTES)

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
      console.log('redirect back to EDD?')
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
          <strong>Modal show up maybe?</strong>
        </Modal.Title>
      </Modal.Header>
    </Modal>
  )
}
