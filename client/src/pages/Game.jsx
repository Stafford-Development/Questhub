import react from 'react';
import GameWindow from '../components/GameWindow';
import {Container, Card, Image, Button, Spinner} from 'react-bootstrap';
import '../styling/App.css';
import { useParams } from 'react-router-dom';
import useCampaigns  from '../hooks/useCampaigns';
import { useState, useEffect } from 'react'
import { Form } from 'react-bootstrap';


function Game() {
    const [Game, setGame] = useState([]);
    const { readCampaign, chatCampaign, updateCampaign } = useCampaigns();
    const {campaignId} = useParams();
    const [isLoading, setIsLoading] = useState(true);
    const [message, setMessage] = useState('');
    const [responseLoading, setResponseLoading] = useState(false);

    useEffect(() => {
        const getGame = async () => {
            setIsLoading(true);
            const response = await readCampaign(campaignId);
            setGame(response);
            setIsLoading(false);
            if (response.log.length === 1) {
                setResponseLoading(true);
                const campaign = await chatCampaign(campaignId, "The adventure begins!");
                const newLog = [
                    ...campaign.log.slice(0, campaign.log.length - 2),
                    campaign.log[campaign.log.length - 1]
                ];
                const updatedCampaign = await updateCampaign(campaignId, newLog);
                setGame(updatedCampaign);
                setResponseLoading(false);
            }
        };
        getGame();
    }, []);

    if (isLoading) {
        return <Spinner animation="border" role="status"/>; // or your custom spinner
    }
    
    return (
        <Container fluid>
            <Image className="login-background" src="/Town.gif"/>  
            <Container fluid className="login-container"> 
                <Card className='mt-3 mb-2' bg="dark" text="white" style={{ fontSize:"20px",textDecoration: 'underline', border: 'none'}}>
                    <Card.Body> 
                        {Game.title}
                    </Card.Body>
                </Card>
                <Card bg="dark" text="white" style={{ boxShadow: 'inset 0 0 10px #000000', height: "57vh", overflow: 'auto', backgroundImage: 'url("Page.jpg")'  }}>
                    
                    <Card.Body>
                        <GameWindow Game={Game} responseLoading={responseLoading}/>
                    </Card.Body>
                </Card>
                <Form className='mt-4'>
                    <Form.Group className="mb-3" controlId="formBasicPassword">
                          <Form.Control type="text" placeholder="Message" value={message} onChange={e => setMessage(e.target.value)} />
                    </Form.Group>
                    <Button variant="dark" type="submit" className='mb-3' onClick={async (event) => {
                        event.preventDefault();
                        //set user message to game log
                        const GameTemp = {...Game, log: [...Game.log, {role: "user", content: message}]};
                        setGame(GameTemp);
                        //send message to server and set response to game log
                        setResponseLoading(true);
                        const campaign = await chatCampaign(campaignId, message);
                        setGame(campaign);
                        setResponseLoading(false);
                    }}>
                            Send
                    </Button>
                </Form>
            </Container>
            
        </Container>
    );
};

export default Game;