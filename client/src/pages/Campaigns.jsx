import {useState, react} from 'react';
import CampaignAccordion from '../components/CampaignAccordion';
import {Container, Card, Image, Button} from 'react-bootstrap';
import '../styling/App.css';
import NewGameModal from '../components/NewGameModal';
import DeleteGameModal from '../components/DeleteGameModal';

function Campaigns() {
    const [campaigns, setCampaigns] = useState([]);
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [isNewGameModal, setIsNewGameModal] = useState(true);

    const [campaignName, setCampaignName] = useState('');
    const [campaignId, setCampaignId] = useState('');

    return (
        <Container fluid>
            <Image className="login-background" src="/Town.gif"/>  
            <Container fluid className="login-container"> 
                <Card style={{height: "7vh", border: 'none'}}>
                    <Card.Body>
                    <h1 style={{ fontSize: '2rem' }}>Campaigns</h1>
                    </Card.Body>
                </Card>
                <Card style={{ boxShadow: 'inset 0 0 10px #000000', height: "87vh", overflow: 'auto', backgroundImage: 'url("Page.jpg")'  }}>
                    <Card.Body>
                        <CampaignAccordion campaigns={campaigns} setCampaigns={setCampaigns} handleShow={handleShow} setIsNewGameModal={setIsNewGameModal} setCampaignId={setCampaignId} setCampaignName={setCampaignName}/>
                    </Card.Body>
                </Card>
            </Container>
            {isNewGameModal ? <NewGameModal show={show} handleClose={handleClose}/> : <DeleteGameModal show={show} handleClose={handleClose} campaignId={campaignId} campaignName={campaignName} setCampaigns={setCampaigns}/>}
            
        </Container>
    );
};

export default Campaigns;