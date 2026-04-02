import { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import type { Member, Book } from "../types";

interface NewLoanModalProps {
  show: boolean;
  onClose: () => void;
  onSave: (memberId: number, bookId: number) => void;
}

const base_url = `${import.meta.env.VITE_API_BASE_URL}`;

function NewLoanModal({ show, onClose, onSave }: NewLoanModalProps) {
  const [memberId, setMemberId] = useState("");
  const [bookId, setBookId] = useState("");
  const [memberDetails, setMemberDetails] = useState<Member | null>(null);
  const [bookDetails, setBookDetails] = useState<Book | null>(null);
  const [memberErrorMsg, setMemberErrorMsg] = useState("");
  const [bookErrorMsg, setBookErrorMsg] = useState("");

  const addMember = async (memberToAdd: number): Promise<void> => {
    const url = `${base_url}/api/members/${memberToAdd}`;
    const response = await fetch(url);
    if (response.status === 200) {
      const data = await response.json();
      setMemberErrorMsg("");
      setMemberDetails(data);
    } else {
      setMemberDetails(null);
      setMemberErrorMsg("Member not found");
    }
  };

  const addBook = async (bookToAdd: number): Promise<void> => {
    const url = `${base_url}/api/books/${bookToAdd}`;
    const response = await fetch(url);
    if (response.status === 200) {
      const data = await response.json();
      setBookErrorMsg("");
      setBookDetails(data);
    } else {
      setBookDetails(null);
      setBookErrorMsg("Book not found");
    }
  };

  const saveHandler = (): void => {
    if (memberId === "") {
      setMemberErrorMsg("Member is required.");
    } else {
      setBookErrorMsg("");
    }
    if (bookId == "") {
      setBookErrorMsg("Book is required.");
    } else {
      setBookErrorMsg("");
    }

    onSave(Number(memberId), Number(bookId));
  };

  return (
    <Modal show={show} onHide={onClose} backdrop="static">
      <Modal.Header closeButton>
        <Modal.Title>New Loan</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div>
          <form>
            <div className="mb-3">
              <label className="form-label">Member</label>
              <input
                type="number"
                className="form-control"
                id="inputMember"
                value={memberId}
                onChange={(e) => setMemberId(e.target.value)}
                placeholder="Type member ID."
              />
              {memberErrorMsg && (
                <p className="text-danger">{memberErrorMsg}</p>
              )}
              <Button
                variant="secondary"
                onClick={() => addMember(Number(memberId))}
              >
                Add member
              </Button>
            </div>
            <div className="mb-3">
              <label className="form-label">Book ID</label>
              <input
                type="text"
                className="form-control"
                id="inputMember"
                value={bookId}
                onChange={(e) => setBookId(e.target.value)}
                placeholder="Type the book ISBN."
              />
              {bookErrorMsg && <p className="text-danger">{bookErrorMsg}</p>}
              <Button
                variant="secondary"
                onClick={() => addBook(Number(bookId))}
              >
                Add Book
              </Button>
            </div>
          </form>
        </div>
        {memberDetails && (
          <div>
            <h4>New Loan Details</h4>
            <p>{"Member Id: " + memberDetails?.id}</p>
            <p>{"Member Name: " + memberDetails?.name}</p>
          </div>
        )}
        {bookDetails && (
          <div>
            <p>{"Book ID: " + bookDetails?.id}</p>
            <p>{"Book title: " + bookDetails?.title}</p>
          </div>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Close
        </Button>
        <Button variant="primary" onClick={saveHandler}>
          Save
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default NewLoanModal;
