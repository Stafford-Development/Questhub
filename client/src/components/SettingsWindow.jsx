import {Accordion, Card, Row, Col, Button, Spinner, Image} from "react-bootstrap";
import React, { useState, useEffect } from 'react';
import useCampaigns from '../hooks/useCampaigns';
import DeleteGameModal from './DeleteGameModal';
import { CheckCircle, XCircle } from 'react-bootstrap-icons';

import useUserSettings from "../hooks/useUserSettings";


function SettingsWindow({handleShow, apiKeyValid, setApiKeyValid}) {
    
    const [isLoading, setIsLoading] = useState(true);
   
    const {checkApiKey} = useUserSettings();
    

    useEffect(() => {
        const getSettings= async () => {
            setIsLoading(true);
            const apiKeyResponse = await checkApiKey();
            setApiKeyValid(apiKeyResponse.apiKeyValid);
            setIsLoading(false);
        };
        getSettings();
    }, []);


    if (isLoading) {
        return <Spinner animation="border" role="status"/>;
    }
   
    return (
        <>
            <Row>
                <Col className="d-flex align-items-center justify-content-center" md={12}>
                    {apiKeyValid ? <CheckCircle className="me-2"color="green" size={32} /> :  <XCircle className="me-2" color="red" size={32} />}
                    <h1 style={{ fontSize: '1.2rem', textAlign: 'center' }} className="mt-3 me-2 ">Valid API Key:  
                    </h1>
                </Col>
                <Col md={12}>
                    <Button variant="dark" onClick={handleShow}>Change/Delete API Key</Button>
                    
                </Col>
               
                <hr className="my-4" />
            </Row>
         

        </>

        
        

    );
}
export default SettingsWindow;