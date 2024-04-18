import { useState} from 'react'
import '../styling/App.css'
import {Button, Form, Image, Container, Card, Row, Col } from 'react-bootstrap'
import { Link } from 'react-router-dom';



function ConfirmationSuccess({ setLoggedIn }) {
  
  

  return (
    <Container fluid>
      <Image className="login-background" src="/Town.gif"/>
      <Card className='bg-dark text-white' >
        <Card.Body className="logo-box  align-items-center justify-content-center">
          
            <Row>
                <Col><h1>Confirmation Successful!</h1></Col>  
          </Row>
          <Row>
            <Col>Please navigate to previous tab or return to login page to log in.</Col>

          </Row>
          <Row className='mt-3'>
              <Col>
                <Link to="/login">
                  <Button variant="dark">
                    
                    Return to Login Page
                  </Button>
                </Link>
              </Col>
            </Row>
          
        </Card.Body>
          </Card>
      </Container>
  )
}

export default ConfirmationSuccess
