import { useState} from 'react'
import '../styling/App.css'
import {Button, Form, Image, Container, Card, Row, Col } from 'react-bootstrap'
import useLogin from '../hooks/useLogin'




function Login({ setLoggedIn }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('')
  const {login} = useLogin({setLoggedIn: setLoggedIn});
  

  return (
    <Container fluid>
      <Image className="login-background" src="/Town.gif"/>
      <Card className='bg-dark text-white' >
            <Row>
              <Card.Body className="logo-box d-flex align-items-center justify-content-center">
                <Col>
                  <h1 className='login-name'>Quester</h1>
                  <p>Dungeons. Danger. Quests.</p>
                </Col>
              
                <Col>
                  <Card className='bg-light d-flex align-items-center text-black justify-content-center'>
                    <Card.Body>
                      <Form className='items-center'>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                          <Form.Label>Email address</Form.Label>
                          <Form.Control type="text" placeholder="Enter Username" value={email} onChange={e => setEmail(e.target.value)} />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicPassword">
                          <Form.Label>Password</Form.Label>
                          <Form.Control type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
                        </Form.Group>
                        <Button variant="dark" type="submit" className='mb-3' onClick={(event) => {
                          event.preventDefault();
                          login(email, password);
                        }}>
                          Log In
                        </Button>
                        <Button variant="dark" type="submit" className='mx-auto d-block'>
                          Register
                        </Button>
                      </Form>
                    </Card.Body>
                  </Card>
                </Col>
              
            </Card.Body>
          </Row>
          </Card>
      </Container>
  )
}

export default Login
