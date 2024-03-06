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
              
              <Navbar.Brand className='ms-4 logo-name'  href="/">
                Quester
              </Navbar.Brand>
              
            </Nav>
            <ProfilePopup logout={logout} profilePicUrl={profilePicUrl} />
            

        </Navbar>
        
        
        </>
    )
  }
  
  export default Header