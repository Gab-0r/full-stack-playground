import { Modal, Button } from "react-bootstrap";

interface NewBookModalProps {
  show: boolean;
  onClose: () => void;
}

function NewBookModal({ show, onClose }: NewBookModalProps) {
  return (
    <Modal show={show} onHide={onClose} backdrop="static">
      <Modal.Header closeButton>
        <Modal.Title>New Book</Modal.Title>
      </Modal.Header>
      <Modal.Body>contenido aquí</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Close
        </Button>
        <Button variant="primary">Save</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default NewBookModal;
