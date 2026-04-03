import { Modal, Button } from "react-bootstrap";
import type { Loan } from "../types";
import { useState } from "react";

interface CloseLoanModalProps {
  show: boolean;
  onSave: (returnedDate: string) => void;
  onClose: () => void;
  loanToClose: Loan | null;
}

function CloseLoanModal({
  show,
  onSave,
  onClose,
  loanToClose,
}: CloseLoanModalProps) {
  const [returnedDate, setReturnedDate] = useState("");
  const [returnedDateError, setReturnedDateError] = useState("");

  const handleSave = (): void => {
    if (returnedDate === "") {
      setReturnedDateError("Returned date is required.");
    } else {
      onSave(returnedDate);
    }
  };

  const onCloseHandle = (): void => {
    setReturnedDate("");
    setReturnedDateError("");
    onClose();
  };

  return (
    <Modal show={show} onHide={onClose} backdrop="static">
      <Modal.Header closeButton>
        <Modal.Title>Close Loan</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form>
          <div className="mb-3">
            <label className="form-label">Returned Date</label>
            <input
              type="text"
              className="form-control"
              id="inputReturnedDate"
              value={returnedDate}
              onChange={(e) => setReturnedDate(e.target.value)}
            />
            {returnedDateError && (
              <p className="text-danger">{returnedDateError}</p>
            )}
          </div>
        </form>
        <div>
          <h5>Loan Details</h5>
          <p>{"Member name: " + loanToClose?.member.name}</p>
          <p>{"Book title: " + loanToClose?.book.title}</p>
          <p>{"Book isbn: " + loanToClose?.book.isbn}</p>
          <p>{"Loan date: " + loanToClose?.loanDate}</p>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onCloseHandle}>
          Close
        </Button>
        <Button variant="primary" onClick={handleSave}>
          Save
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default CloseLoanModal;
