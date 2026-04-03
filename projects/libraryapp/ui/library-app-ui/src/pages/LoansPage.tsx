import { useEffect, useState } from "react";
import LoansList from "../components/LoansList";
import type { Loan } from "../types";
import Button from "../components/Button";
import NewLoanModal from "../components/NewLoanModal";
import CloseLoanModal from "../components/CloseLoanModal";

const base_url = `${import.meta.env.VITE_API_BASE_URL}`;

function LoansPage() {
  const [items, setItems] = useState<Loan[]>([]);
  const [showNewLoanModal, setShowNewLoanModal] = useState(false);
  const [selectedLoans, setSelectedLoans] = useState<number[]>([]);
  const [showCloseLoanModal, setShowCloseLoanModal] = useState(false);
  const [loanToClose, setLoanToClose] = useState<Loan | null>(null);

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

  const onSelect = (checked: boolean, loanId: number): void => {
    if (checked) {
      setSelectedLoans([...selectedLoans, loanId]);
    } else {
      const selected = [...selectedLoans].filter((item) => item !== loanId);
      setSelectedLoans(selected);
    }
  };

  const onShowCloseLoanModal = async (): Promise<void> => {
    const url = `${base_url}/api/loans/${selectedLoans[0]}`;
    const response = await fetch(url);
    const data = await response.json();
    setLoanToClose(data);
    setShowCloseLoanModal(true);
  };

  const onCloseLoan = async (returnedDate: string): Promise<void> => {
    if (!loanToClose) return;

    const editedLoan = structuredClone(loanToClose);
    editedLoan.returnDate = returnedDate;
    editedLoan.returned = true;

    const url = `${base_url}/api/loans/${selectedLoans}`;
    await fetch(url, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(editedLoan),
    });
    setShowCloseLoanModal(false);
    setSelectedLoans([]);
    setLoanToClose(null);
    fetchLoans();
  };

  useEffect(() => {
    fetchLoans();
  }, []);

  return (
    <>
      <div>
        <h3 className="text-center">Loans</h3>
        <Button onClick={() => setShowNewLoanModal(true)}>New Loan</Button>
        <Button
          onClick={onShowCloseLoanModal}
          enable={selectedLoans.length === 1 ? "" : "disabled"}
        >
          Close Loan
        </Button>
        <LoansList
          items={items}
          selectedLoans={selectedLoans}
          onLoanSelect={onSelect}
        />
        <NewLoanModal
          onClose={() => setShowNewLoanModal(false)}
          show={showNewLoanModal}
          onSave={onSaveNewLoan}
        />
        <CloseLoanModal
          onClose={() => setShowCloseLoanModal(false)}
          show={showCloseLoanModal}
          onSave={onCloseLoan}
          loanToClose={loanToClose}
        />
      </div>
    </>
  );
}

export default LoansPage;
