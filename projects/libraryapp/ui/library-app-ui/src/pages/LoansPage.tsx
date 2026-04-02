import { useEffect, useState } from "react";
import LoansList from "../components/LoansList";
import type { Loan } from "../types";
import Button from "../components/Button";
import NewLoanModal from "../components/NewLoanModal";

const base_url = `${import.meta.env.VITE_API_BASE_URL}`;

function LoansPage() {
  const [items, setItems] = useState<Loan[]>([]);
  const [showNewLoanModal, setShowNewLoanModal] = useState(false);

  const fetchLoans = async (): Promise<void> => {
    const url = `${base_url}/api/loans`;
    const response = await fetch(url);
    const data = await response.json();
    setItems(data);
  };

  const onSaveNewLoan = async (memberId: number, bookId: number) => {
    const requestBody = {
      memberId,
      bookId,
    };
    const url = `${base_url}/api/loans`;
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(requestBody),
    });

    if (response.status === 201) {
      setShowNewLoanModal(false);
      fetchLoans();
    }
  };

  useEffect(() => {
    fetchLoans();
  }, []);

  return (
    <>
      <div>
        <h3 className="text-center">Loans</h3>
        <Button onClick={() => setShowNewLoanModal(true)}>New Loan</Button>
        <LoansList items={items} />
        <NewLoanModal
          onClose={() => setShowNewLoanModal(false)}
          show={showNewLoanModal}
          onSave={onSaveNewLoan}
        />
      </div>
    </>
  );
}

export default LoansPage;
