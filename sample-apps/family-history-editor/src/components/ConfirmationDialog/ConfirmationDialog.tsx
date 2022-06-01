import { Modal, Button } from "react-bootstrap";

export interface IConfirmationDialogProps {
    show: boolean;
    title: string;
    message: string;
    onYesClick: () => void;
    onNoClick: () => void;
    onHide: () => void;
}

export default function ConfirmationDialog(props: IConfirmationDialogProps) {
    return (
        <Modal show={props.show} onHide={props.onHide}>
            <Modal.Header closeButton>
                <Modal.Title>{props.title}</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <p>{props.message}</p>
            </Modal.Body>

            <Modal.Footer>
                <Button variant="secondary" onClick={props.onNoClick}>No</Button>
                <Button variant="primary" onClick={props.onYesClick}>Yes</Button>
            </Modal.Footer>
        </Modal>
    );
}