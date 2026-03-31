import { useState, useEffect } from "react";
import type { Book } from "../types";
import { Modal, Button } from "react-bootstrap";

interface EditBookModalProps {
  show: boolean;
  onClose: () => void;
  onSave: (book: Book) => void;
  book: Book | null;
}

function EditBookModal({ show, onClose, onSave, book }: EditBookModalProps) {
  const [id, setId] = useState<number>(book?.id || 0);
  const [title, setTitle] = useState(book?.title || "");
  const [titleError, setTitleError] = useState("");
  const [author, setAuthor] = useState(book?.author || "");
  const [authorError, setAuthorError] = useState("");
  const [isbn, setIsbn] = useState(book?.isbn || "");
  const [publicationYear, setPublicationyear] = useState(
    book?.publicationYear || "",
  );

  const handleSave = (): void => {
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
    const editedBook: Book = { id, title, author, isbn, publicationYear };
    onSave(editedBook);
  };

  useEffect(() => {
    if (book) {
      setId(book.id);
      setTitle(book.title);
      setAuthor(book.author);
      setIsbn(book.isbn || "");
      setPublicationyear(book.publicationYear || "");
    }
  }, [book]);
  return (
    <Modal show={show} onHide={onClose} backdrop="static">
      <Modal.Header closeButton>
        <Modal.Title>Edit Book</Modal.Title>
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
          <div className="mb-3">
            <label className="form-label">ISBN</label>
            <input
              type="text"
              className="form-control"
              value={isbn}
              id="inputIsbn"
              onChange={(e) => setIsbn(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Publication Year</label>
            <input
              type="text"
              className="form-control"
              value={publicationYear}
              id="inputPublicationYear"
              onChange={(e) => setPublicationyear(e.target.value)}
            />
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

export default EditBookModal;
