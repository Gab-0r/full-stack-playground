import { useState, useEffect } from "react";
import type { Member } from "../types";
import { Modal, Button } from "react-bootstrap";

interface EditMemberModalProps {
  show: boolean;
  onClose: () => void;
  onSave: (member: Member) => void;
  member: Member | null;
}

function EditMemberModal({
  show,
  onClose,
  onSave,
  member,
}: EditMemberModalProps) {
  const [id, setId] = useState<number>(member?.id || 0);
  const [membershipDate, setMembershipDate] = useState(
    member?.membershipDate || "",
  );
  const [memberName, setMemberName] = useState(member?.name || "");
  const [memberEmail, setMemberEmail] = useState(member?.email || "");
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

    const editedMember: Member = {
      id: id,
      name: memberName,
      email: memberEmail,
      membershipDate: membershipDate,
    };

    onSave(editedMember);
  };

  useEffect(() => {
    if (member) {
      setId(member.id);
      setMemberName(member.name);
      setMemberEmail(member.email);
      setMembershipDate(member.membershipDate);
    }
  }, [member]);

  return (
    <Modal show={show} onHide={onClose} backdrop="static">
      <Modal.Header closeButton>
        <Modal.Title>Edit Book</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form>
          <div className="mb-3">
            <label className="form-label">Member name</label>
            <input
              type="text"
              className="form-control"
              id="inputMemberName"
              value={memberName}
              onChange={(e) => setMemberName(e.target.value)}
            />
            {memberNameError && <p>Member name is required.</p>}
          </div>
          <div className="mb-3">
            <label className="form-label">Member email</label>
            <input
              type="text"
              className="form-control"
              id="inputMemberEmail"
              value={memberEmail}
              onChange={(e) => setMemberEmail(e.target.value)}
            />
            {memberEmailError && <p>Member email is required.</p>}
          </div>
        </form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="seconday" onClick={onClose}>
          Close
        </Button>
        <Button variant="primary" onClick={handleSave}>
          Save
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default EditMemberModal;
