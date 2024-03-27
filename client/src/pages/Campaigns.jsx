import {useState, react} from 'react';
import CampaignAccordion from '../components/CampaignAccordion';
import {Container, Card, Image, Button} from 'react-bootstrap';
import '../styling/App.css';
import NewGameModal from '../components/NewGameModal';

function Campaigns() {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <Container fluid>
            <Image className="login-background" src="/Town.gif"/>  
            <Container fluid className="login-container"> 
                <Card style={{height: "7vh", border: 'none'}}>
                    <Card.Body>
                       Campaigns
                    </Card.Body>
                </Card>
                <Card style={{ boxShadow: 'inset 0 0 10px #000000', height: "87vh", overflow: 'auto', backgroundImage: 'url("Page.jpg")'  }}>
                    <Card.Body>
                        <CampaignAccordion handleShow={handleShow}/>
                    </Card.Body>
                </Card>
            </Container>
            <NewGameModal show={show} handleClose={handleClose}/>
        </Container>
    );
};

export default Campaigns;