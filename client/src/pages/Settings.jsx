import {useState, react} from 'react';
import CampaignAccordion from '../components/CampaignAccordion';
import {Container, Card, Image, Button} from 'react-bootstrap';
import '../styling/App.css';
import DeleteGameModal from '../components/DeleteGameModal';
import useUserSettings from '../hooks/useUserSettings';
import SettingsWindow from '../components/SettingsWindow';
import UploadKeyModal from '../components/UploadKeyModal';

function Settings() {
    const [campaigns, setCampaigns] = useState([]);

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [isNewGameModal, setIsNewGameModal] = useState(true);

    const [campaignName, setCampaignName] = useState('');
    const [campaignId, setCampaignId] = useState('');
    const [apiKeyValid, setApiKeyValid] = useState(false);
    
   
    
    

    return (
        <Container fluid>
            <Image className="login-background" src="/Town.gif"/>  
            <Container fluid className="login-container"> 
                <Card style={{height: "7vh", border: 'none'}}>
                    <Card.Body>
                       Settings
                    </Card.Body>
                </Card>
                <Card style={{ boxShadow: 'inset 0 0 10px #000000', height: "87vh", overflow: 'auto' }}>
                    <Card.Body>
                        <SettingsWindow handleShow={handleShow} apiKeyValid={apiKeyValid} setApiKeyValid={setApiKeyValid}/>
                    </Card.Body>
                </Card>
            </Container>
             <UploadKeyModal show={show} handleClose={handleClose} setApiKeyValid={setApiKeyValid}/> 
            
        </Container>
    );
};

export default Settings;