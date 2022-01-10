import getUrl from '../utils/browser/getUrl'
import Modal from 'react-bootstrap/Modal'
import { useTranslation } from 'next-i18next'
import { Button } from './Button'

export interface NavigationModalProps {
  url: string
  modalState(): void
  showWarningModal: boolean
}

export const NavigationModal: React.FC<NavigationModalProps> = ({ url, modalState, showWarningModal }) => {
  // Javascript logic to display the modal!
  const { t } = useTranslation()

  function redirectToURL() {
    const externalLink = getUrl(url)
    window.open(externalLink || '', '_blank')
    modalState()
  }

  return (
    <Modal show={showWarningModal} onHide={modalState} centered size="lg">
      <Modal.Header closeButton>
        <h2 className="modal-title">{t('external-navigation-modal.header')}</h2>
      </Modal.Header>
      <Modal.Body>{t('external-navigation-modal.warning')}</Modal.Body>
      <Modal.Footer>
        <Button onClick={redirectToURL} label={t('external-navigation-modal.continue-button')} />
        <Button onClick={modalState} label={t('external-navigation-modal.cancel-button')} />
      </Modal.Footer>
    </Modal>
  )
}
