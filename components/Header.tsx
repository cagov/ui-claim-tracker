import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'

export interface HeaderProps {
  user?: Record<string, unknown>
}

export const Header: React.FC<HeaderProps> = () => (
  <header className="header border-bottom border-secondary">
    <Navbar className="justify-content-between" variant="dark">
      <Navbar.Brand target="_blank" rel="noopener noreferrer" href="https://ca.gov">
        <img src="/images/Ca-Gov-Logo-Gold.svg" width="30" height="30" />
      </Navbar.Brand>
      <Nav>
        <Nav.Link target="_blank" rel="noopener noreferrer" href="https://edd.ca.gov">
          <img className="icon" src="images/home.svg" width="15" height="15" /> <span className="text">EDD Home</span>
        </Nav.Link>
        <Nav.Link target="_blank" rel="noopener noreferrer" href="https://edd.ca.gov">
          <img className="icon" src="images/home.svg" width="15" height="15" /> <span className="text">Help</span>
        </Nav.Link>
        <Nav.Link target="_blank" rel="noopener noreferrer" href="https://edd.ca.gov">
          <img className="icon" src="images/home.svg" width="15" height="15" />{' '}
          <span className="text">Welcome, Firstname</span>
        </Nav.Link>
        <Nav.Link target="_blank" rel="noopener noreferrer" href="https://edd.ca.gov/login.htm">
          <span>
            <img className="icon" src="images/key.svg" width="15" height="15" /> <span className="text">Log out</span>
          </span>
        </Nav.Link>
      </Nav>
    </Navbar>
    <Navbar collapseOnSelect expand="md" variant="light">
      <Navbar.Brand target="_blank" rel="noopener noreferrer" href="https://edd.ca.gov">
        <img src="/images/edd-logo-2-Color.svg" height="50" width="150" className="d-inline-block align-top mr-5" />
      </Navbar.Brand>
      <Nav>
        <Nav.Link target="_blank" rel="noopener noreferrer" href="https://edd.ca.gov">
          <img className="icon" src="images/home.svg" width="15" height="15" /> <span className="text">EDD Home</span>
        </Nav.Link>
      </Nav>
    </Navbar>
  </header>
)
