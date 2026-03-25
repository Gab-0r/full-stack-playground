import { useEffect, useState } from "react";
import BooksList from "../components/BooksList";
import type { Book } from "../types";
import Button from "../components/Button";
import NewBookModal from "../components/NewBookModal";
import Alert from "../components/Alert";

const base_url = `${import.meta.env.VITE_API_BASE_URL}`;

function BooksPage() {
  const [items, setItems] = useState<Book[]>([]);
  const [showNewBookModal, setShowNewBookModal] = useState(false);
  const [showCreatedBookAlert, setShowCreatedBookAlert] = useState(false);
  const [showErrorBookAlert, setShowErrordBookAlert] = useState(false);

  const newBookHandle = (): void => {
    setShowNewBookModal(true);
  };

  const onSave = async (title: string, author: string): Promise<void> => {
    const requestBody = {
      title: title,
      author: author,
    };

    const url = `${base_url}/api/books`;
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody),
    });

    if (response.status === 201) {
      setShowCreatedBookAlert(true);
      setShowNewBookModal(false);
      fetchBooks();
    } else {
      setShowErrordBookAlert(true);
    }
  };

  const alertOnClose = (): void => {
    setShowCreatedBookAlert(false);
    setShowErrordBookAlert(false);
  };

  const fetchBooks = async () => {
    const url = `${base_url}/api/books`;
    const response = await fetch(url);
    const data = await response.json();
    setItems(data);
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  return (
    <>
      <div>
        <h3 className="text-center">Books</h3>
        {showCreatedBookAlert && (
          <Alert onClose={alertOnClose}>Book has been created</Alert>
        )}
        {showErrorBookAlert && (
          <Alert onClose={alertOnClose} color="danger">
            An error ocurred creating a new book
          </Alert>
        )}
        <Button onClick={newBookHandle} color="primary">
          New Book
        </Button>
        <BooksList items={items} />
        <NewBookModal
          show={showNewBookModal}
          onClose={() => setShowNewBookModal(false)}
          onSave={onSave}
        />
      </div>
    </>
  );
}

export default BooksPage;
