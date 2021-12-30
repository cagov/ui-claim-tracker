import { useState } from 'react'
import Navbar from 'react-bootstrap/Navbar'
import { NavigationModal } from './NavigationModal'

export interface ExternalBrandProps {
  url: string
  src: string
  alt: string
  width: string
  height: string
  classes: string | null
}

export const ExternalBrand: React.FC<ExternalBrandProps> = ({ url, src, alt, width, height, classes }) => {
  const [showWarningModal, setShowWarningModal] = useState<boolean>(false)

  function handleModalState() {
    setShowWarningModal(!showWarningModal)
  }

  return (
    <div>
      <Navbar.Brand target="_blank" rel="noopener noreferrer" onClick={handleModalState}>
        <img
          src={src}
          alt={alt}
          width={width}
          height={height}
          className={classes !== null ? classes + ' opener' : 'opener'}
        />
      </Navbar.Brand>
      <NavigationModal url={url} modalState={() => handleModalState()} showWarningModal={showWarningModal} />
    </div>
  )
}
