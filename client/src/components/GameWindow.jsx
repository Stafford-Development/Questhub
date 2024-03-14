import {Accordion, Card, Row, Col, Button} from "react-bootstrap";
import React, { useState, useEffect } from 'react';
import useCampaigns from '../hooks/useCampaigns';

function GameWindow() {
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
        <div>meow</div>
    );
}
export default GameWindow;