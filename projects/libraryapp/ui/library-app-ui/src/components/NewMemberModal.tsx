import { useState } from "react";
import { Modal, Button } from "react-bootstrap";

interface NewMemberModalProps {
  show: boolean;
  onSave: (memberName: string, memberEmail: string) => void;
  onClose: () => void;
}

function NewMemberModal({ show, onSave, onClose }: NewMemberModalProps) {
  const [memberName, setMemeberName] = useState("");
  const [memberEmail, setMemeberEmail] = useState("");
  const [memberNameError, setMemberNameError] = useState("");
  const [memberEmailError, setMemberEmailError] = useState("");

  const handleSave = (): void => {
    if (memberName === "") {
      setMemberNameError("Member name is required.");
    } else {
      setMemberNameError("");
    }
    if (memberEmail === "") {
      setMemberEmailError("Memeber email is required.");
    } else {
      setMemberEmailError("");
    }

    onSave(memberName, memberEmail);
  };

  return (
    <Modal show={show} onHide={onClose} backdrop="static">
      <Modal.Header closeButton>
        <Modal.Title>New Member</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form>
          <div className="mb-3">
            <label className="form-label"> Member Name </label>
            <input
              type="text"
              className="form-control"
              id="inputMemberName"
              value={memberName}
              onChange={(e) => setMemeberName(e.target.value)}
            />
            {memberNameError && (
              <p className="text-danger">{memberNameError}</p>
            )}
          </div>
          <div>
            <label className="form-label">Member Email</label>
            <input
              type="text"
              className="form-control"
              id="inputMemberEmail"
              value={memberEmail}
              onChange={(e) => setMemeberEmail(e.target.value)}
            />
            {memberEmailError && (
              <p className="text-danger">{memberEmailError}</p>
            )}
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

export default NewMemberModal;
