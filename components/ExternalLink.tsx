import Nav from 'react-bootstrap/Nav'

import getUrl from '../utils/browser/getUrl'

export interface ExternalLinkProps {
  url: string
  text: string
}

export const ExternalLink: React.FC<ExternalLinkProps> = ({ url, text }) => {
  // Javascript logic to display the modal!

  return (
    <Nav.Link target="_blank" rel="noopener noreferrer" href={getUrl(url)}>
      <span className="text">{text}</span>
    </Nav.Link>
  )
}
