import { useState } from 'react'
import '../styling/App.css'
import {Button, Form, Image, Container, Card, Row, Col } from 'react-bootstrap';



function Login(isLoggedin) {
  return (
    <Container fluid>
      <Image className="login-background" src="https://assetstorev1-prd-cdn.unity3d.com/key-image/770a4cc3-43ec-4ff8-b36c-036612454a40.png"/>
      <Row className='g-0'>
        <Col>
          <Card className='bg-dark text-white h-100' >
            <Card.Body className="d-flex align-items-center justify-content-center">
              <h1 className='login-name'>Quester</h1>
              <p>Dungeons. Danger. Quests.</p>
            </Card.Body>
          </Card>
        </Col>
        <Col>
          <Card className='bg-dark text-white h-100'>
            <Card.Body>
              <Form>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Email address</Form.Label>
                  <Form.Control type="email" placeholder="Enter email" />
                  <Form.Text className="text-muted">
                    We'll never share your email with anyone else.
                  </Form.Text>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                  <Form.Label>Password</Form.Label>
                  <Form.Control type="password" placeholder="Password" />
                </Form.Group>
                <Button variant="light" type="submit">
                  Log In
                </Button>
                <Button variant="light" type="submit" className='ms-3'>
                  Register
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  )
}

export default Login
