import Nav from 'react-bootstrap/Nav'
import { useState } from 'react'
import { NavigationModal } from './NavigationModal'

export interface ExternalLinkProps {
  url: string
  text: string
}

export const ExternalLink: React.FC<ExternalLinkProps> = ({ url, text }) => {
  const [showWarningModal, setShowWarningModal] = useState<boolean>(false)

  function handleModalState() {
    setShowWarningModal(!showWarningModal)
  }

  return (
    <div>
      <Nav.Link target="_blank" rel="noopener noreferrer" onClick={handleModalState}>
        <span className="text opener">{text}</span>
      </Nav.Link>
      <NavigationModal url={url} modalState={() => handleModalState()} showWarningModal={showWarningModal} />
    </div>
  )
}
