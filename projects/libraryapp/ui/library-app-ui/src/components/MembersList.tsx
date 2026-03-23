import { useState } from "react";
import type { Member } from "../types";

interface MembersListProps {
  items: Member[];
  heading: string;
  onClickHandle: (memberId: number) => void;
}

function MembersList({ items, heading, onClickHandle }: MembersListProps) {
  const [selectedId, setSelectedId] = useState<number | null>(null);

  if (items.length === 0) {
    return (
      <>
        <h1>{heading}</h1>
        <h2>No members to display</h2>
      </>
    );
  }

  return (
    <>
      <h3>{heading}</h3>
      <ul className="list-group">
        {items.map((member) => (
          <li
            className={`list-group-item ${member.id === selectedId ? "active" : ""}`}
            key={member.id}
            onClick={() => {
              setSelectedId(member.id);
              onClickHandle(member.id);
            }}
          >
            {member.name}
          </li>
        ))}
      </ul>
    </>
  );
}

export default MembersList;
