import { Navbar, Nav, NavDropdown, Container, Row, Col } from 'react-bootstrap';
import ProfilePopup from './profilePopup.jsx';
const profilePicUrl = 'https://scontent-lax3-1.xx.fbcdn.net/v/t39.30808-6/327181129_747596569830920_5108350515149982305_n.jpg?_nc_cat=104&ccb=1-7&_nc_sid=efb6e6&_nc_ohc=GNQAo5rc-jAAX_J2NzV&_nc_ht=scontent-lax3-1.xx&oh=00_AfDfpWFtBdK1l6mUYhsCSVZ_m1XCDG5_FCCtvEFRAZS1hQ&oe=65C3AF5C';
function Header() {
  
    return (
      <>
        <Navbar bg="dark" variant="dark" className='justify-content-between' fixed='top'>
            <Nav>
              <Navbar.Brand className='ms-3' href="#home">Quester</Navbar.Brand>
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
            </Nav>
           <ProfilePopup profilePicUrl={profilePicUrl} />
            

        </Navbar>
        
        
        </>
    )
  }
  
  export default Header