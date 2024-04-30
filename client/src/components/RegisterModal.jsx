import { Modal, Button, Form, Alert } from "react-bootstrap";
import { useState } from 'react';
import useLogin from "../hooks/useLogin";
import { useNavigate } from 'react-router-dom';

function RegisterModal({show, handleClose, setLoggedIn}) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [password2, setPassword2] = useState('');
    const {createUser} = useLogin(setLoggedIn);
    const [showPasswordAlert, setShowPasswordAlert] = useState(false);
    const [showEmailAlert, setShowEmailAlert] = useState(false);
    const [showPassword, setShowPassword] = useState(false);


    const validateEmail = (email) => {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }
    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
      };
      
    const handleEmailChange = (e) => {
        const email = e.target.value;
        setEmail(email);
        if (email === '') {
            setShowEmailAlert(false);
        }
        else if (!validateEmail(email)) {
            setShowEmailAlert(true);
        } else {
            setShowEmailAlert(false);
        }
    }
    const handlePasswordChange = (e) => {
        const password = e.target.value;
        setPassword(password);
        if (password2 !== '' && password !== password2) {
          setShowPasswordAlert(true);
        } else {
          setShowPasswordAlert(false);
        }
      }
      
      const handlePassword2Change = (e) => {
        const password2 = e.target.value;
        setPassword2(password2);
        if (password2 === '') {
          setShowPasswordAlert(false);
        }
        else if (password !== password2) {
          setShowPasswordAlert(true);
        } else {
          setShowPasswordAlert(false);
        }
      }
    const register = async (email, password, password2) => {
        if (!showPasswordAlert  && !showEmailAlert) {
            await createUser(email, password);
            manageClose();
        }
    };

    const manageClose = () => {
        setShowPasswordAlert(false);
        setShowEmailAlert(false);
        setEmail('');
        setPassword('');
        setPassword2('');
        handleClose();
        setShowPassword(false);
    }

    
    return (
        <Modal show={show} onHide={manageClose}>
            <Modal.Header className="bg-dark text-white" closeButton>
                <Modal.Title>Register</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="text" placeholder="Enter Email" value={email} onChange={handleEmailChange} />
                        {showEmailAlert && <Alert variant="danger" className="mt-3">Response must be a valid email.</Alert>}
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type={showPassword ? "text" : "password"} placeholder="Enter Password" value={password} onChange={handlePasswordChange} />
                        
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Confirm Password</Form.Label>
                        <Form.Control className="mb-2" type={showPassword ? "text" : "password"} placeholder="Enter Password" value={password2} onChange={handlePassword2Change} />
                        <Form.Text className="ms-2 mt-3" onClick={togglePasswordVisibility} style={{cursor: 'pointer'}}>
                            {showPassword ? "Hide Password" : "Show Password"}
                        </Form.Text>
                        {showPasswordAlert && <Alert variant="danger" className="mt-3">Passwords must match.</Alert>}
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer className="justify-content-center">
                <Button variant="dark" onClick={() => register(email, password, password2)} >
                    Sign Up
                </Button>
            </Modal.Footer>
        </Modal>
    );
}
export default RegisterModal;