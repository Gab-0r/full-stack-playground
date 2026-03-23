import type { Loan } from "../types";

interface LoanListProps {
  items: Loan[];
  heading: string;
  memberSelected: boolean;
}

function LoanList({ items, heading, memberSelected }: LoanListProps) {
  if (items.length === 0) {
    return (
      <>
        <h3>{heading}</h3>
        <div>
          {memberSelected
            ? "Member selected doesn't have loans"
            : "Please choose a member to see their loans"}
        </div>
      </>
    );
  }

  return (
    <>
      <h3>{heading}</h3>
      <ul className="list-group">
        {items.map((loan) => (
          <li className="list-group-item" key={loan.id}>
            <div>Member: {loan.member.name}</div>
            <div>Loan date: {loan.loanDate}</div>
            <div>Book: {loan.book.title}</div>
          </li>
        ))}
      </ul>
    </>
  );
}

export default LoanList;
