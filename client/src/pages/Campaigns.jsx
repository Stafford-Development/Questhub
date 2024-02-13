import react from 'react';
import CampaignCarousel from '../components/CampaignCarousel';
import {Container, Card, Image} from 'react-bootstrap';

function Campaigns() {
    return (
        <Container fluid>
            <Image className="login-background" src="/Town.gif"/>  
            <Card className='bg-light text-black'>
                <Card.Title as="h2">Campaigns</Card.Title>
                <Card.Body>
                    <CampaignCarousel/>
                </Card.Body>
            </Card>

        </Container>
    );
};

export default Campaigns;