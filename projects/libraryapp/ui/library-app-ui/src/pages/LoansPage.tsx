import { useEffect, useState } from "react";
import LoansList from "../components/LoansList";
import type { Loan } from "../types";

const base_url = `${import.meta.env.VITE_API_BASE_URL}`;

function LoansPage() {
  const [items, setItems] = useState<Loan[]>([]);

  const fetchLoans = async (): Promise<void> => {
    const url = `${base_url}/api/loans`;
    const response = await fetch(url);
    const data = await response.json();
    setItems(data);
  };

  useEffect(() => {
    fetchLoans();
  }, []);

  return (
    <>
      <div>
        <h3 className="text-center">Loans</h3>
        <LoansList items={items} />
      </div>
    </>
  );
}

export default LoansPage;
