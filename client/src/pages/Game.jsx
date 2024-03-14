import react from 'react';
import GameWindow from '../components/GameWindow';
import {Container, Card, Image, Button} from 'react-bootstrap';
import '../styling/App.css';
import { useParams } from 'react-router-dom';
import useCampaigns  from '../hooks/useCampaigns';
import { useState, useEffect } from 'react'

function Campaigns() {
    const [Game, setGame] = useState([]);
    const { readCampaign } = useCampaigns();
    const {campaignId} = useParams();

    useEffect(() => {
        const getGame = async () => {
            const response = await readCampaign(campaignId);
            setGame(response);
        };
        getGame();
    }, []);
    
    return (
        <Container fluid>
            <Image className="login-background" src="/Town.gif"/>  
            <Container fluid className="login-container"> 
                <Card style={{height: "7vh", border: 'none'}}>
                    <Card.Body>
                        {Game.title}
                    </Card.Body>
                </Card>
                <Card style={{ boxShadow: 'inset 0 0 10px #000000', height: "87vh", overflow: 'auto', backgroundImage: 'url("Page.jpg")'  }}>
                    <Card.Body>
                        <GameWindow />
                    </Card.Body>
                </Card>
            </Container>
            
        </Container>
    );
};

export default Campaigns;