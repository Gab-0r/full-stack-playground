import type { Loan } from "../types";

interface LoansListProps {
  items: Loan[];
}

function LoansList({ items }: LoansListProps) {
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
              <tr key={item.id}>
                <td>
                  <input type="checkbox"></input>
                </td>
                <td>{item.id}</td>
                <td>{item.loanDate}</td>
                <td>{item.member.name}</td>
                <td>{item.book.title}</td>
                <td>{item.book.isbn}</td>
                <td>{item.returned}</td>
                <td>{item.returnDate}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default LoansList;
