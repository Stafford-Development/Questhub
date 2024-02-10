import { Navbar, Nav, NavDropdown, Container, Row, Col, Image} from 'react-bootstrap';
import ProfilePopup from './profilePopup.jsx';
import '../styling/App.css'
import { Link } from 'react-router-dom';

const profilePicUrl = '/Ethan.jpg';
function Header({logout}) {
  
    return (
      <>
        <Navbar bg="dark" variant="dark" className='justify-content-between' fixed='top' >
            <Nav>
              <Navbar.Brand className='ms-3' href="/">
              <Image
                src="../public/Buddy.gif"  // Replace with the path to your image
                alt="Brand"
                width="50"
                className="d-inline-block align-top"
                style={{margin: "10px"}}
              />
              </Navbar.Brand>
              <Navbar.Brand className='mt-3'  href="/">
                Quester
              </Navbar.Brand>
              <Nav.Link className='mt-3' href="/">Home</Nav.Link>
              <Nav.Link className='mt-3' href="campaigns">Campaigns</Nav.Link>
            </Nav>
            <ProfilePopup logout={logout} profilePicUrl={profilePicUrl} />
            

        </Navbar>
        
        
        </>
    )
  }
  
  export default Header