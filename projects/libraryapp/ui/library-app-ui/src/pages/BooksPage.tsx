import { useEffect, useState } from "react";
import BooksList from "../components/BooksList";
import type { Book } from "../types";

const base_url = `${import.meta.env.VITE_API_BASE_URL}`;

function BooksPage() {
  const [items, setItems] = useState<Book[]>([]);

  useEffect(() => {
    const fetchBooks = async () => {
      const url = `${base_url}/api/books`;
      const response = await fetch(url);
      const data = await response.json();
      setItems(data);
    };
    fetchBooks();
  }, []);

  return (
    <>
      <div>
        <BooksList heading="Books" items={items} />
      </div>
    </>
  );
}

export default BooksPage;
