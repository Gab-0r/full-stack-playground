import { useEffect, useState } from "react";
import BooksList from "../components/BooksList";
import type { Book } from "../types";
import Button from "../components/Button";
import NewBookModal from "../components/NewBookModal";

const base_url = `${import.meta.env.VITE_API_BASE_URL}`;

function BooksPage() {
  const [items, setItems] = useState<Book[]>([]);
  const [showNewBookModal, setShowNewBookModal] = useState(false);

  const newBookHandle = (): void => {
    setShowNewBookModal(true);
  };

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
        <h3 className="text-center">Books</h3>
        <Button onClick={newBookHandle} color="primary">
          New Book
        </Button>
        <BooksList items={items} />
        <NewBookModal
          show={showNewBookModal}
          onClose={() => setShowNewBookModal(false)}
        />
      </div>
    </>
  );
}

export default BooksPage;
