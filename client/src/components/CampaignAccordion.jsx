import {Accordion, Card, Row, Col, Button, Spinner} from "react-bootstrap";
import React, { useState, useEffect } from 'react';
import useCampaigns from '../hooks/useCampaigns';
import DeleteGameModal from './DeleteGameModal';
import useUserSettings from "../hooks/useUserSettings";
import '../styling/App.css';


function CampaignAccordion({campaigns, setCampaigns, handleShow, setIsNewGameModal, setCampaignId, setCampaignName}) {
    const { fetchCampaigns } = useCampaigns();
    const { checkApiKey } = useUserSettings();
    const [isLoading, setIsLoading] = useState(true);
    const [apiKeyValid, setApiKeyValid] = useState(false);
    

    useEffect(() => {
        const getCampaigns = async () => {
            setIsLoading(true);
            const response = await fetchCampaigns();
            const apiKeyResponse = await checkApiKey();
            setApiKeyValid(apiKeyResponse.apiKeyValid);
            setCampaigns(response);
            setIsLoading(false);
        };
        getCampaigns();
    }, []);

   const toggleNewGameModal = () => {
        setIsNewGameModal(true);
        handleShow();
    }
    const toggleDeleteGameModal = (campaignId, campaignName) => {
        setIsNewGameModal(false);
        setCampaignId(campaignId);
        setCampaignName(campaignName);
        handleShow();
    }

    if (isLoading) {
        return <div className="mt-5"><Spinner variant="light" animation="border" role="status"/></div>;
    }
    if (!apiKeyValid) {
        return <Card variant="dark" className="mt-4 ">
            
            Please upload a valid openai API key in settings to continue.
            <Button href="/settings" variant="dark">Settings</Button>
        
        </Card>
    }
    
    return (
        <Accordion className="campaign-card">
             <Card bg="dark"><Card.Body><Button className="mt-4" onClick={toggleNewGameModal} variant="secondary" >Create New Game</Button></Card.Body></Card>
            {campaigns.map((campaign) => (
                <Card bg="dark">
                    <Card.Body>
                            <Accordion.Item eventKey={campaign._id}>
                                <Accordion.Header>{campaign.title}</Accordion.Header>
                                <Accordion.Body>
                                    <Row className="justify-content-center">
                                        {campaign.description}
                                    </Row>
                                        <hr></hr>
                                        <Button variant="dark" onClick={() => toggleDeleteGameModal(campaign._id, campaign.title)}>Delete</Button>
                                
                                </Accordion.Body>
                            </Accordion.Item>
                       
                      
                    </Card.Body>
                    <Card.Footer><Button className="mt-2" variant="secondary" href={`/Game/${campaign._id}`}>Enter</Button></Card.Footer>
                </Card>
                
            ))}
            
        </Accordion>

    );
}
export default CampaignAccordion;