import { Modal, Button, Form } from "react-bootstrap";
import { useState } from 'react';
import useCampaigns from '../hooks/useCampaigns';
import { useNavigate } from 'react-router-dom';

function NewGameModal({show, handleClose}) {
    const [characterName, setCharacterName] = useState('');
    const [characterDescription, setCharacterDescription] = useState('');
    const {createCampaign} = useCampaigns();
    const navigate = useNavigate();

    const startGame = async () => {
        const newCampaign = await createCampaign(characterName, characterDescription);
        navigate(`/Game/${newCampaign._id}`);
    };
    
    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>New Game</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Character Name</Form.Label>
                        <Form.Control type="text" placeholder="Enter Character Name" value={characterName} onChange={e => setCharacterName(e.target.value)} />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Character Description</Form.Label>
                        <Form.Control type="text" placeholder="Enter Character Description" value={characterDescription} onChange={e => setCharacterDescription(e.target.value)} />
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer className="justify-content-center">
                <Button variant="primary" onClick={startGame}>
                    Start Game
                </Button>
            </Modal.Footer>
        </Modal>
    );
}
export default NewGameModal;