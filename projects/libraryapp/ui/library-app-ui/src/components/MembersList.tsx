import type { Member } from "../types";

interface MembersListProps {
  items: Member[];
  selectedMembers: number[];
  onMemberSelect: (checked: boolean, memberId: number) => void;
}

function MembersList({
  items,
  selectedMembers,
  onMemberSelect,
}: MembersListProps) {
  if (items.length === 0) {
    return (
      <>
        <h2>No members to display</h2>
      </>
    );
  }

  return (
    <div className="mx-5">
      <table className="table table-hover">
        <thead className="table-dark">
          <tr>
            <th scope="col"></th>
            <th scope="col">ID</th>
            <th scope="col">Name</th>
            <th scope="col">Email</th>
            <th scope="col">Membership Date</th>
          </tr>
        </thead>
        <tbody>
          {items.map((member) => (
            <tr
              key={member.id}
              className={
                selectedMembers.includes(member.id) ? "table-active" : ""
              }
            >
              <td>
                <input
                  type="checkbox"
                  checked={selectedMembers.includes(member.id)}
                  onChange={(e) => onMemberSelect(e.target.checked, member.id)}
                />
              </td>
              <td>{member.id}</td>
              <td>{member.name}</td>
              <td>{member.email}</td>
              <td>{member.membershipDate}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default MembersList;
