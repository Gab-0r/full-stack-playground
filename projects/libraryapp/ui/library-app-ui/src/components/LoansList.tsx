import type { Loan } from "../types";

interface LoansListProps {
  items: Loan[];
  selectedLoans: number[];
  onLoanSelect: (checked: boolean, loanId: number) => void;
}

function LoansList({ items, selectedLoans, onLoanSelect }: LoansListProps) {
  return (
    <>
      <div className="mx-5">
        <table className="table table-hover">
          <thead className="table-dark">
            <tr>
              <th scope="col"></th>
              <th scope="col">ID</th>
              <th scope="col">Loan date</th>
              <th scope="col">Member name</th>
              <th scope="col">Book title</th>
              <th scope="col">Book isbn</th>
              <th scope="col">Returned</th>
              <th scope="col">Returned date</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr
                key={item.id}
                className={
                  selectedLoans.includes(item.id) ? "table-active" : ""
                }
              >
                <td>
                  <input
                    type="checkbox"
                    checked={selectedLoans.includes(item.id)}
                    onChange={(e) => onLoanSelect(e.target.checked, item.id)}
                  ></input>
                </td>
                <td>{item.id}</td>
                <td>{item.loanDate}</td>
                <td>{item.member.name}</td>
                <td>{item.book.title}</td>
                <td>{item.book.isbn}</td>
                <td>
                  <input
                    type="checkbox"
                    checked={item.returned}
                    readOnly
                    style={{ pointerEvents: "none" }}
                  />
                </td>
                <td>{item.returnDate ?? "Not returned"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default LoansList;
