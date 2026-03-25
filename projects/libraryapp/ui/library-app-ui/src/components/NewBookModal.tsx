import { useState } from "react";
import { Modal, Button } from "react-bootstrap";

interface NewBookModalProps {
  show: boolean;
  onClose: () => void;
  onSave: (title: string, author: string) => void;
}

function NewBookModal({ show, onClose, onSave }: NewBookModalProps) {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [titleError, setTitleError] = useState("");
  const [authorError, setAuthorError] = useState("");

  const handleSave = (): void => {
    console.log("Book Title: " + title);
    console.log("Author Title: " + author);
    if (title === "") {
      setTitleError("Book title is required.");
    } else {
      setTitleError("");
    }
    if (author === "") {
      setAuthorError("Author is required.");
    } else {
      setAuthorError("");
    }

    onSave(title, author);
  };

  return (
    <Modal show={show} onHide={onClose} backdrop="static">
      <Modal.Header closeButton>
        <Modal.Title>New Book</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form>
          <div className="mb-3">
            <label className="form-label">Book Title</label>
            <input
              type="text"
              className="form-control"
              id="inputBookTitle"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            {titleError && <p className="text-danger">{titleError}</p>}
          </div>
          <div className="mb-3">
            <label className="form-label">Author</label>
            <input
              type="text"
              className="form-control"
              value={author}
              id="inputAuthor"
              onChange={(e) => setAuthor(e.target.value)}
            />
            {authorError && <p className="text-danger">{authorError}</p>}
          </div>
        </form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Close
        </Button>
        <Button variant="primary" onClick={handleSave}>
          Save
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default NewBookModal;
