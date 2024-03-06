import react from 'react';
import CampaignAccordion from '../components/CampaignAccordion';
import {Container, Card, Image, Button} from 'react-bootstrap';
import '../styling/App.css';

function Campaigns() {
    return (
        <Container fluid>
            <Image className="login-background" src="/Town.gif"/>  
            <Container fluid className="login-container"> 
                <Card style={{height: "7vh", border: 'none'}}>
                    <Card.Body>
                        <Button className="mt-0" href="/create-campaign" variant="dark" >Create New Campaign</Button>
                    </Card.Body>
                </Card>
                <Card style={{ boxShadow: 'inset 0 0 10px #000000', height: "87vh", overflow: 'auto', backgroundImage: 'url("Page.jpg")'  }}>
                    <Card.Body>
                        <CampaignAccordion />
                    </Card.Body>
                </Card>
            </Container>
            
        </Container>
    );
};

export default Campaigns;