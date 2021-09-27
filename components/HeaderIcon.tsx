import Nav from 'react-bootstrap/Nav'

export interface HeaderIconProps {
  link: string
  label: string
  icon: string
}

export const HeaderIcon: React.FC<HeaderIconProps> = ({ link, label, icon }) => {
  return (
    <div className="header-icon">
      <Nav>
        <Nav.Link rel="noopener noreferrer" href={link}>
          <span className={icon} />
          <br />
          <span className="text">{label}</span>
        </Nav.Link>
      </Nav>
    </div>
  )
}
