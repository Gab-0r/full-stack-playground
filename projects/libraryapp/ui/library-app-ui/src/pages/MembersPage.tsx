import { useEffect, useState } from "react";
import { type Loan, type Member } from "../types";
import MembersList from "../components/MembersList";

const base_url = `${import.meta.env.VITE_API_BASE_URL}`;

export default function MembersPage() {
  const [items, setItems] = useState<Member[]>([]);
  const [selectedMembers, setSelectedMembers] = useState<number[]>([]);

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

  return (
    <>
      <div>
        <h3 className="text-center">Members</h3>
        <MembersList
          items={items}
          selectedMembers={selectedMembers}
          onMemberSelect={onMemberSelect}
        />
      </div>
    </>
  );
}
