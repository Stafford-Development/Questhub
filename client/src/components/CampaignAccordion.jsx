import {Accordion, Card, Row, Col, Button} from "react-bootstrap";
import React, { useState, useEffect } from 'react';
import useCampaigns from '../hooks/useCampaigns';

function CampaignCard({handleShow}) {
    const [campaigns, setCampaigns] = useState([]);
    const { fetchCampaigns } = useCampaigns();

    useEffect(() => {
        const getCampaigns = async () => {
            const response = await fetchCampaigns();
            setCampaigns(response);
        };
        getCampaigns();
    }, []);

    return (
        <Accordion className="campaign-card">
            {campaigns.map((campaign, index) => (
                <Row key={campaign._id} className="mt-4 mx-auto">
                    <Col md={11}>
                        <Accordion.Item eventKey={index.toString()}>
                            <Accordion.Header>{campaign.title}</Accordion.Header>
                            <Accordion.Body>
                                {campaign.description}
                            </Accordion.Body>
                        </Accordion.Item>
                    </Col>
                    <Col md={1}>
                        <Button className="mt-2" variant="dark" href={`/Game/${campaign._id}`}>Enter</Button>
                    </Col>
                </Row>

            ))}
            <Button className="mt-4" onClick={handleShow} variant="dark" >Create New Game</Button>
            
            
            
            
        </Accordion>
    );
}
export default CampaignCard;