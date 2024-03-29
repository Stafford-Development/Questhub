import { Modal, Button, Form } from "react-bootstrap";
import { useState } from 'react';
import useCampaigns from '../hooks/useCampaigns';


function DeleteGameModal({show, handleClose, campaignId, campaignName, setCampaigns}) {
    const {deleteCampaign, fetchCampaigns} = useCampaigns();

    const deleteGame = async () => {
        await deleteCampaign(campaignId);
        const response = await fetchCampaigns();
        setCampaigns(response);
        handleClose();
    };
    
    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Delete {campaignName} ?</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Button variant="primary" onClick={deleteGame}>Confirm</Button>
            </Modal.Body>
        </Modal>
    );
}
export default DeleteGameModal;