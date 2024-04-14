import {Accordion, Card, Row, Col, Button, Spinner} from "react-bootstrap";
import React, { useState, useEffect } from 'react';
import useCampaigns from '../hooks/useCampaigns';
import DeleteGameModal from './DeleteGameModal';


function CampaignAccordion({campaigns, setCampaigns, handleShow, setIsNewGameModal, setCampaignId, setCampaignName}) {
    const { fetchCampaigns } = useCampaigns();
    const [isLoading, setIsLoading] = useState(true);
    

    useEffect(() => {
        const getCampaigns = async () => {
            setIsLoading(true);
            const response = await fetchCampaigns();
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
    
    return (
        <Accordion className="campaign-card">
            {campaigns.map((campaign) => (
                <Row key={campaign._id} className="mt-4 mx-auto">
                    <Col md={11}>
                        <Accordion.Item eventKey={campaign._id}>
                            <Accordion.Header>{campaign.title}</Accordion.Header>
                            <Accordion.Body>
                                {campaign.description}
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