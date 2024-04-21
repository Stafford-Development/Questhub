import { Modal, Button, Form } from "react-bootstrap";
import { useState } from 'react';
import useUserSettings from "../hooks/useUserSettings";


function UploadKeyModal({show, handleClose, setApiKeyValid}) {
    const {uploadApiKey, deleteApiKey} = useUserSettings();
    const [apiKey, setApiKey] = useState('');

    const uploadKey = async () => {
        const response =  await uploadApiKey(apiKey);
        setApiKeyValid(response.apiKeyValid);
        handleClose();
    };
    const deleteKey = async () => {
        const response =  await deleteApiKey();
        if (response.apiKeyDeleted) {
            setApiKeyValid(response.apiKeyValid);
        }
        handleClose();
    }
    
    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                Upload API Key
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Control type="text" placeholder="Enter API Key." value={apiKey} onChange={e => setApiKey(e.target.value)} />
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer className="justify-content-center">
                <Button variant="dark" onClick={uploadKey}>
                    Upload Key
                </Button>
                
            </Modal.Footer>
            <Button onClick={deleteKey} variant="dark">
                    Delete Key
            </Button>
        </Modal>
    );
}
export default UploadKeyModal;