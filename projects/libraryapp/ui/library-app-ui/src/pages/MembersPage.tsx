import { useEffect, useState } from "react";
import { type Loan, type Member } from "../types";
import MembersList from "../components/MembersList";
import Button from "../components/Button";
import NewMemberModal from "../components/NewMemberModal";
import Alert from "../components/Alert";
import EditMemberModal from "../components/EditMemberModal";

const base_url = `${import.meta.env.VITE_API_BASE_URL}`;

export default function MembersPage() {
  const [items, setItems] = useState<Member[]>([]);
  const [selectedMembers, setSelectedMembers] = useState<number[]>([]);
  const [showNewMemberModal, setShowNewMemberModal] = useState(false);
  const [showNewMemberAlert, setShowNewMemberAlert] = useState(false);
  const [showMemberErrorAlert, setShowMemberErrorAlert] = useState(false);
  const [memberToEdit, setMemberToEdit] = useState<Member | null>(null);
  const [showEditMemberModal, setShowEditMemberModal] = useState(false);

  const fetchMembers = async () => {
    const url = `${base_url}/api/members`;
    const response = await fetch(url);
    const data = await response.json();
    setItems(data);
  };

  const onMemberSelect = (checked: boolean, memberId: number): void => {
    let ids = [];
    if (checked) {
      ids = [...selectedMembers, memberId];
    } else {
      ids = [...selectedMembers].filter((item) => item !== memberId);
    }
    setSelectedMembers(ids);
  };

  useEffect(() => {
    fetchMembers();
  }, []);

  const onNewMemberClick = (): void => {
    setShowNewMemberModal(true);
  };

  const onEditMemberClick = async (): Promise<void> => {
    setShowEditMemberModal(true);
    await fetchMemberToEdit(selectedMembers[0]);
  };

  const fetchMemberToEdit = async (memberId: number): Promise<void> => {
    const url = `${base_url}/api/members/${memberId}`;
    const response = await fetch(url);
    const data = await response.json();
    setMemberToEdit(data);
  };

  const onEditMember = async (editedMember: Member): Promise<void> => {
    const url = `${base_url}/api/members/${editedMember.id}`;
    await fetch(url, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(editedMember),
    });
    setShowEditMemberModal(false);
    setSelectedMembers([]);
    fetchMembers();
  };

  const onDeleteMemberClick = async (
    selectedMembers: number[],
  ): Promise<void> => {
    await Promise.all(
      selectedMembers.map((id) =>
        fetch(`${base_url}/api/members/${id}`, {
          method: "DELETE",
        }),
      ),
    );
    setSelectedMembers([]);
    fetchMembers();
  };

  const onSaveNewMember = async (
    memberName: string,
    memberEmail: string,
  ): Promise<void> => {
    const requestBody = { name: memberName, email: memberEmail };

    const url = `${base_url}/api/members`;
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody),
    });
    if (response.status === 201) {
      setShowNewMemberAlert(true);
      setShowNewMemberModal(false);
      fetchMembers();
    } else {
      setShowMemberErrorAlert(true);
    }
  };

  const alertOnClose = (): void => {
    setShowMemberErrorAlert(false);
    setShowNewMemberAlert(false);
  };

  return (
    <>
      <div>
        <h3 className="text-center">Members</h3>
        {showNewMemberAlert && (
          <Alert onClose={alertOnClose}>Member has been created</Alert>
        )}
        {showMemberErrorAlert && (
          <Alert onClose={alertOnClose} color="danger">
            An error ocurred creating a new Member
          </Alert>
        )}
        <Button onClick={onNewMemberClick} color="primary">
          New member
        </Button>
        <Button
          onClick={onEditMemberClick}
          color="primary"
          enable={selectedMembers.length === 1 ? "" : "disabled"}
        >
          Edit member
        </Button>
        <Button
          onClick={() => onDeleteMemberClick(selectedMembers)}
          color="danger"
          enable={selectedMembers.length === 0 ? "disabled" : ""}
        >
          Delete member
        </Button>
        <MembersList
          items={items}
          selectedMembers={selectedMembers}
          onMemberSelect={onMemberSelect}
        />
        <NewMemberModal
          show={showNewMemberModal}
          onSave={onSaveNewMember}
          onClose={() => setShowNewMemberModal(false)}
        />
        <EditMemberModal
          show={showEditMemberModal}
          onSave={onEditMember}
          onClose={() => setShowEditMemberModal(false)}
          member={memberToEdit}
        />
      </div>
    </>
  );
}
