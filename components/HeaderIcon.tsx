import Nav from 'react-bootstrap/Nav'

export interface HeaderIconProps {
  link: string | undefined
  label: string
  icon: string
}

export const HeaderIcon: React.FC<HeaderIconProps> = ({ link, label, icon }) => {
  return (
    <Nav className="header-icon">
      <Nav.Link rel="noopener noreferrer" href={link}>
        <span className={icon} />
        <span className="text">{label}</span>
      </Nav.Link>
    </Nav>
  )
}
