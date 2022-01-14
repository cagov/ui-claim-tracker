import Nav from 'react-bootstrap/Nav'
import { useState } from 'react'
import { NavigationModal } from './NavigationModal'

export interface ExternalLinkProps {
  url: string | undefined
  text: string | string[]
  inlineLink?: boolean
}

export const ExternalLink: React.FC<ExternalLinkProps> = ({ url, text, inlineLink = false }) => {
  const [showWarningModal, setShowWarningModal] = useState<boolean>(false)

  function handleModalState() {
    setShowWarningModal(!showWarningModal)
  }

  function setLinkType() {
    let link
    if (inlineLink) {
      link = (
        <a rel="noopener noreferrer" href="\\" onClick={handleModalState}>
          {text}
        </a>
      )
    } else {
      link = (
        <Nav.Link target="_blank" rel="noopener noreferrer" onClick={handleModalState}>
          <span className="text opener">{text}</span>
        </Nav.Link>
      )
    }
    return link
  }

  return (
    <span>
      {setLinkType()}
      <NavigationModal url={url} modalState={() => handleModalState()} showWarningModal={showWarningModal} />
    </span>
  )
}
