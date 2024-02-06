import { Navbar, Nav, NavDropdown, Container, Row, Col } from 'react-bootstrap';
import ProfilePopup from './profilePopup.jsx';
import '../styling/App.css'
import { Link } from 'react-router-dom';

const profilePicUrl = 'https://scontent-lax3-1.xx.fbcdn.net/v/t39.30808-6/327181129_747596569830920_5108350515149982305_n.jpg?_nc_cat=104&ccb=1-7&_nc_sid=efb6e6&_nc_ohc=GNQAo5rc-jAAX_J2NzV&_nc_ht=scontent-lax3-1.xx&oh=00_AfDfpWFtBdK1l6mUYhsCSVZ_m1XCDG5_FCCtvEFRAZS1hQ&oe=65C3AF5C';
function Header(loggedIn) {
  
    return (
      <>
        <Navbar bg="dark" variant="dark" className='justify-content-between' fixed='top'>
            <Nav>
            <Navbar.Brand className='ms-3' href="home">
              <img
                src="../public/Buddy.gif"  // Replace with the path to your image
                alt="Brand"
                width="50"
                margin="10px"
                className="d-inline-block align-top"
              />
              </Navbar.Brand>
              <Navbar.Brand className='mt-3'  href="home">
                Quester
              </Navbar.Brand>
              <Nav.Link className='mt-3' href="home">Home</Nav.Link>
              <Nav.Link className='mt-3' href="campaigns">Campaigns</Nav.Link>
            </Nav>
            <ProfilePopup profilePicUrl={profilePicUrl} />
            

        </Navbar>
        
        
        </>
    )
  }
  
  export default Header