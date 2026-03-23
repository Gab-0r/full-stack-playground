import { useEffect, useState } from "react";
import { type Loan, type Member } from "../types";
import MembersList from "../components/MembersList";
import LoanList from "../components/LoansList";

const base_url = `${import.meta.env.VITE_API_BASE_URL}`;

export default function MembersPage() {
  const [items, setItems] = useState<Member[]>([]);
  const [loans, setLoans] = useState<Loan[]>([]);
  const [memberSelected, setMemberSelected] = useState(false);

  const getMemberLoans = async (memberId: number): Promise<void> => {
    const url = `${base_url}/api/loans`;
    const response = await fetch(url);
    const data = await response.json();
    setMemberSelected(true);
    setLoans(data.filter((e: Loan) => e.member.id === memberId));
  };

  useEffect(() => {
    const fetchMembers = async () => {
      const url = `${base_url}/api/members`;
      const response = await fetch(url);
      const data = await response.json();
      setItems(data);
    };
    fetchMembers();
  }, []);

  return (
    <>
      <div>
        <MembersList
          items={items}
          heading="Members"
          onClickHandle={getMemberLoans}
        ></MembersList>
      </div>
      <div>
        <LoanList
          items={loans}
          heading="Loans per user"
          memberSelected={memberSelected}
        ></LoanList>
      </div>
    </>
  );
}
