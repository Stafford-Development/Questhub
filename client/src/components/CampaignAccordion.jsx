import {Accordion, Card, Row, Col, Button, Spinner} from "react-bootstrap";
import React, { useState, useEffect } from 'react';
import useCampaigns from '../hooks/useCampaigns';
import DeleteGameModal from './DeleteGameModal';
import useUserSettings from "../hooks/useUserSettings";


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
        return <Spinner animation="border" role="status"/>;
    }
    if (!apiKeyValid) {
        return <Card className="mt-4 ">
            
            Please upload a valid openai API key in settings to continue.
            <Button href="/settings" variant="dark">Settings</Button>
        
        </Card>
    }
    
    return (
        <Accordion className="campaign-card">
            {campaigns.map((campaign) => (
                <Row key={campaign._id} className="mt-4 mx-auto">
                    <Col md={11}>
                        <Accordion.Item eventKey={campaign._id}>
                            <Accordion.Header>{campaign.title}</Accordion.Header>
                            <Accordion.Body>
                                <Row className="justify-content-center">
                                    {campaign.description}
                                </Row>
                                    <hr></hr>
                                    <Button onClick={() => toggleDeleteGameModal(campaign._id, campaign.title)}>Delete</Button>
                               
                            </Accordion.Body>
                        </Accordion.Item>
                    </Col>
                    <Col md={1}>
                        <Button className="mt-2" variant="dark" href={`/Game/${campaign._id}`}>Enter</Button>
                    </Col>
                    
                </Row>
                
            ))}
            <Button className="mt-4" onClick={toggleNewGameModal} variant="dark" >Create New Game</Button>
            
        </Accordion>

    );
}
export default CampaignAccordion;