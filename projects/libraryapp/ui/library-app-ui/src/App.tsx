import { useEffect, useState } from "react";
import ListGroup from "./components/ListGroup";

const base_url = `${import.meta.env.VITE_API_BASE_URL}`;

interface Member {
  name: string;
  email: string;
  membershipDate: string;
  id: number;
}

export default function App() {
  const [items, setItems] = useState<Member[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const url = `${base_url}/api/members`;
      const response = await fetch(url);
      const data = await response.json();
      setItems(data);
    };
    fetchData();
  }, []);

  const memberNames: string[] = items.map((member) => member.name);

  return (
    <div>
      <ListGroup items={memberNames} heading="Members"></ListGroup>
    </div>
  );
}
