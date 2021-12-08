import Nav from 'react-bootstrap/Nav'

export interface HeaderIconProps {
  link: string | undefined
  label: string
  icon: string
}

export const HeaderIcon: React.FC<HeaderIconProps> = ({ link, label, icon }) => {
  return (
    <li className="nav-item">
      <Nav.Link rel="noopener noreferrer" href={link} className="first-level-link">
        <span className={icon} />
        <span className="text">{label}</span>
      </Nav.Link>
    </li>
  )
}
