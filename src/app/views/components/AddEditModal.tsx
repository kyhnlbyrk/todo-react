import React, { useState } from 'react';
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import Alert from 'react-bootstrap/Alert'
import Input from './Input';

interface Props {
    id?: number;
    name?: string;  
    show: boolean;
    onHide: (hide: boolean) => void;
    onSuccess: (val: string) => void;
}


const AddEditModal = (props: Props) => {
    const { id, name, show, onHide, onSuccess } = props;

    const [newName, setName] = useState<string>();
    const [error, setError] = useState<boolean>(false);

    const controlEmpty = () => {
        if (!newName || newName === '') {
            setError(true);
            return;
        }
        onSuccess(newName)
    }

    const hide = () => {
        setError(false);
        onHide(false)
    }

    return (

        <Modal show={show} onHide={() => { hide() }}>
            {error &&
                <Alert variant="danger">
                    <Alert.Heading>Ooops!</Alert.Heading>
                    <p>
                        Name can not be empty!
                    </p>
                </Alert>}
            <Modal.Header>
                <Modal.Title>{id ? "Edit" : "Insert"}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Input inputValue={name} isDebounce={false} placeholder={"Name"} onChange={(val: string) => setName(val)} />
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={() => { controlEmpty() }} size="lg" variant="success">Save</Button>
                <Button onClick={() => { hide() }} size="lg" variant="outline-danger">Cancel</Button>
            </Modal.Footer>
        </Modal>
    );
}

export default AddEditModal;
