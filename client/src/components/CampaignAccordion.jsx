import {Accordion, Card, Row, Col, Button} from "react-bootstrap";
import React, { useState, useEffect } from 'react';
import useCampaigns from '../hooks/useCampaigns';

function CampaignCard() {
    const [campaigns, setCampaigns] = useState([]);
    const { fetchCampaigns } = useCampaigns(setCampaigns);

    useEffect(() => {
        const getCampaigns = async () => {
         await fetchCampaigns();
        };
        getCampaigns();
    }, []);

    return (
        <Accordion className="campaign-card">
            {campaigns.map((campaign, index) => (
                <Row key={campaign._id} className="mt-2 mx-auto">
                    <Col md={11}>
                        <Accordion.Item eventKey={index.toString()}>
                            <Accordion.Header>{campaign.title}</Accordion.Header>
                            <Accordion.Body>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
                            minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                            aliquip ex ea commodo consequat. Duis aute irure dolor in
                            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
                            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
                            culpa qui officia deserunt mollit anim id est laborum.
                            </Accordion.Body>
                        </Accordion.Item>
                    </Col>
                    <Col md={1}>
                        <Button className="mt-2" variant="dark">Enter</Button>
                    </Col>
                </Row>
            ))}
            
            
            
        </Accordion>
    );
}
export default CampaignCard;