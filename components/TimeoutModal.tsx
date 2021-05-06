import { useState, useEffect } from 'react'
import Modal from 'react-bootstrap/Modal'

let timeOutTimerId: number | null = null
let warningTimerId: number | null = null
const TIMEOUT_KEY = 'timeout'
const TIMEOUT_MS = 30 * 60 * 1000
const TIMEOUT_DISPLAY_TIME_IN_MINUTES = 5
const TIMEOUT_WARNING_MS = TIMEOUT_MS - TIMEOUT_DISPLAY_TIME_IN_MINUTES * 60 * 1000
const { action, setUserData } = props

const [showWarningModal, setShowWarningModal] = useState<boolean | null>() // TODO: should we set this to false?
const [numberOfMinutes, setNumberOfMinutes] = useState(TIMEOUT_DISPLAY_TIME_IN_MINUTES)

export interface TimeoutModalProps {
  action: string
}

export const TimeoutModal: React.FC<TimeoutModalProps> = () => {
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

  function timeOutUser() {
    // logEvent("RetroCerts", "SessionTimeout", history.location.pathname);
    // setUserData({
    //   status: AUTH_STRINGS.statusCode.sessionTimedOut,
    // });
  }

  function startOrUpdate() {
    // If the user is restoring a session (reopening a tab) after
    // more than 30min, log them out.
    if (sessionStorage.getItem(TIMEOUT_KEY)) {
      const timeoutTime = sessionStorage.getItem(TIMEOUT_KEY)
      if (Date.now() > timeoutTime) {
        timeOutUser()
        return
      }
    }

    clear()
    // TODO: remove everything directly session-related since we don't
    // have sessions in this app
    warningTimerId = setTimeout(() => {
      if (sessionStorage.getItem(AUTH_STRINGS.authToken)) {
        setShowWarningModal(true)
        setNumberOfMinutes(TIMEOUT_DISPLAY_TIME_IN_MINUTES)
      }
    }, TIMEOUT_WARNING_MS)
    timeOutTimerId = setTimeout(() => {
      if (sessionStorage.getItem(AUTH_STRINGS.authToken)) {
        timeOutUser()
      }
    }, TIMEOUT_MS)
    sessionStorage.setItem(TIMEOUT_KEY, Date.now() + TIMEOUT_MS)
  }

  function clear() {
    clearTimeout(timeOutTimerId)
    timeOutTimerId = null
    clearTimeout(warningTimerId)
    warningTimerId = null
    sessionStorage.removeItem(TIMEOUT_KEY)
  }

  // If the modal is showing, we don't want to restart the timer.
  if (action === 'startOrUpdate' && !showWarningModal) {
    startOrUpdate()
  } else if (action === 'clear') {
    clear()
  }

  return <Modal show={showWarningModal} onHide={closeWarningModal} centered />
}
