/**
 * Component to match EDD's session behavior
 *
 * In order to match EDD's session expiration policy, we redirect users back to EDD
 * login page after REDIRECT_TIMER minutes. We also show this timeout modal
 * WARNING_DURATION minutes prior to the redirect. X'ing out the modal or clicking
 * outside it lets the user stay on the page until the redirect.
 */

import { useState, useEffect } from 'react'
import { useTranslation } from 'next-i18next'
import Modal from 'react-bootstrap/Modal'
import { UrlPrefixes } from '../types/common'

import { Button } from './Button'
import getUrl from '../utils/getUrl'

let warningTimerId: NodeJS.Timeout | null = null

export interface TimeoutModalProps {
  userArrivedFromUioMobile: boolean
  timedOut: boolean
  urlPrefixes: UrlPrefixes
}

export const TimeoutModal: React.FC<TimeoutModalProps> = ({ timedOut, userArrivedFromUioMobile, urlPrefixes }) => {
  const { t } = useTranslation()

  // handy converter for Minutes -> Milliseconds
  const ONE_MINUTE_MS = 60 * 1000

  // keep times in human readable minutes
  const REDIRECT_TIMER = 30
  const WARNING_DURATION = 5
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

  function startTimers() {
    // Show the warning modal for a bit before navigating
    warningTimerId = setTimeout(() => {
      setShowWarningModal(true)
      setWarned(true)
      setNumberOfMinutes(WARNING_DURATION)
    }, WARNING_TIMER * ONE_MINUTE_MS)
    // And at the end, send back to EDD
    setTimeout(() => {
      if (typeof window !== 'undefined') {
        // Note that the concatenated portion of this link is functionally useless, as IDM is not currently
        // able to redirect based on the resource_url parameter concatenated.
        const eddLoginLink = getUrl('bpo-log-in', urlPrefixes)?.concat(
          '?resource_url=',
          encodeURIComponent(window.location.toString()),
        )
        window.location.href = eddLoginLink || ''
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

  function redirectToUIHome() {
    const uioHomeLink = userArrivedFromUioMobile
      ? getUrl('uio-mobile-home-url', urlPrefixes)
      : getUrl('uio-desktop-home-url', urlPrefixes)
    window.location.href = uioHomeLink || ''
  }

  // If the warning modal hasn't shown, kickoff!
  if (!warned) {
    startTimers()
  }

  return (
    <Modal show={showWarningModal} onHide={closeWarningModal} centered>
      <Modal.Header closeButton className="border-0">
        <Modal.Title>
          <strong>{t('timeout-modal.header')}</strong>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>{t('timeout-modal.warning', { count: numberOfMinutes })}</Modal.Body>
      <Modal.Footer className="border-0">
        <Button onClick={redirectToUIHome} label={t('timeout-modal.button')} />
      </Modal.Footer>
    </Modal>
  )
}
