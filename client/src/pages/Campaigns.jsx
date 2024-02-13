import react from 'react';
import CampaignCarousel from '../components/CampaignCarousel';
import {Container, Card, Image} from 'react-bootstrap';
import '../styling/App.css';

function Campaigns() {
    return (
        <Container fluid>
            <Image className="login-background" src="/Town.gif"/>  
            <Container fluid className="login-container"> </Container>
        </Container>
    );
};

export default Campaigns;