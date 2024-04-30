import { Modal, Button, Form } from "react-bootstrap";
import { useState } from 'react';
import useUserSettings from "../hooks/useUserSettings";


function DeleteUserModal({show, handleClose}) {
    const { deleteUser } = useUserSettings();

    const deleteUserAndClose = async () => {
        await deleteUser();
        window.location.reload();
    }

    
    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Delete Account?</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Button variant="primary" onClick={deleteUserAndClose}>Confirm</Button>
            </Modal.Body>
        </Modal>
    );
}
export default DeleteUserModal;