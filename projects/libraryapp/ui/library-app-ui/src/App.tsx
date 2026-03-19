import { useEffect, useState } from "react";
import type { Member } from "./types";
import MembersList from "./components/MembersList";

const base_url = `${import.meta.env.VITE_API_BASE_URL}`;

export default function App() {
  const [items, setItems] = useState<Member[]>([]);

  function getMemberLoans(memberId: number): void {
    console.log("Fetching loans for member" + memberId);
  }

  useEffect(() => {
    const fetchData = async () => {
      const url = `${base_url}/api/members`;
      const response = await fetch(url);
      const data = await response.json();
      setItems(data);
    };
    fetchData();
  }, []);

  return (
    <div>
      <MembersList
        items={items}
        heading="Members"
        onClickHandle={getMemberLoans}
      ></MembersList>
    </div>
  );
}
