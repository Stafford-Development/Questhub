import { Navbar, Nav, NavDropdown, Container } from 'react-bootstrap';
import ProfilePopup from './profilePopup.jsx';
import "../App.css"
const profilePicUrl = 'https://scontent-lax3-1.xx.fbcdn.net/v/t39.30808-6/327181129_747596569830920_5108350515149982305_n.jpg?_nc_cat=104&ccb=1-7&_nc_sid=efb6e6&_nc_ohc=GNQAo5rc-jAAX_J2NzV&_nc_ht=scontent-lax3-1.xx&oh=00_AfDfpWFtBdK1l6mUYhsCSVZ_m1XCDG5_FCCtvEFRAZS1hQ&oe=65C3AF5C';
function Header() {
  
    return (
        <Navbar bg="dark" variant="dark" fixed="top">
          <Navbar.Brand href="#home">My App</Navbar.Brand>
          <Nav className="mr-auto">
            <Nav.Link href="#home">Home</Nav.Link>
            <Nav.Link href="#features">Features</Nav.Link>
            <Nav.Link href="#pricing">Pricing</Nav.Link>
            <NavDropdown title="Dropdown" id="basic-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
            </NavDropdown>
            <Nav className='ml-auto'>
              <ProfilePopup profilePicUrl={profilePicUrl} />
            </Nav>
          </Nav>
        </Navbar>
    )
  }
  
  export default Header