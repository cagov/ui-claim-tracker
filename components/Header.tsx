import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'

export interface HeaderProps {
  user?: Record<string, unknown>
}

export const Header: React.FC<HeaderProps> = () => (
  <header className="header border-bottom border-secondary">
    <Navbar className="justify-content-between" expand="lg" fixed-top variant="dark">
      <Navbar.Brand target="_blank" rel="noopener noreferrer" href="https://ca.gov">
        <img src="/images/Ca-Gov-Logo-Gold.svg" width="30" height="30" />
      </Navbar.Brand>
      <Nav>
        <Nav.Link target="_blank" rel="noopener noreferrer" href="https://edd.ca.gov">
          <span className="text">EDD Home</span>
        </Nav.Link>
        {/*  TODO what is the URL here? */}
        <Nav.Link target="_blank" rel="noopener noreferrer" href="https://askedd.edd.ca.gov/">
          <span className="text">Help</span>
        </Nav.Link>
        {/*  TODO what is the URL here? */}
        <Nav.Link target="_blank" rel="noopener noreferrer" href="https://edd.ca.gov">
          <span className="text">Welcome, Firstname</span>
        </Nav.Link>
        {/*  TODO what is the URL here? */}
        <Nav.Link target="_blank" rel="noopener noreferrer" href="https://edd.ca.gov/login.htm">
          <span className="text">Log out</span>
        </Nav.Link>
      </Nav>
    </Navbar>
    <Navbar className="justify-content-between" expand="lg" variant="light">
      <Navbar.Brand target="_blank" rel="noopener noreferrer" href="https://edd.ca.gov">
        <img src="/images/edd-logo-2-Color.svg" height="50" width="150" className="d-inline-block align-top mr-5" />
      </Navbar.Brand>
      {/* <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav"> */}
      <Nav>
        <Nav.Link target="_blank" rel="noopener noreferrer" href="https://uio.edd.ca.gov">
          <span className="text">UI Online Home</span>
        </Nav.Link>
      </Nav>
      {/* </Navbar.Collapse> */}
    </Navbar>
  </header>
)
