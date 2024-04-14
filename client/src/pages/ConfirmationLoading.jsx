import { useState} from 'react'
import '../styling/App.css'
import {Button, Form, Image, Container, Card, Row, Col } from 'react-bootstrap'
import useLogin from '../hooks/useLogin'
import { Link } from 'react-router-dom';



function ConfirmationLoading({ sendConfirmationEmail }) {
  
  

  return (
    <Container fluid>
      <Image className="login-background" src="/Town.gif"/>
      <Card className='bg-dark text-white' >
        <Card.Body className="logo-box  align-items-center justify-content-center">
          
            <Row>
                <Col><h1>Email Confirmation Needed</h1></Col>  
          </Row>
          <Row>
            <Col>Please Confirm Your Email Before Proceeding.</Col>

          </Row>
          <Row className='mt-3'>
              <Col>
                <Link to="/login">
                  <Button variant="dark" onClick={() => sendConfirmationEmail()}>
                    
                    Resend Confirmation Email
                  </Button>
                </Link>
              </Col>
            </Row>
          
        </Card.Body>
          </Card>
      </Container>
  )
}

export default ConfirmationLoading
