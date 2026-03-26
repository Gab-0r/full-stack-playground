import { useEffect, useState } from "react";
import BooksList from "../components/BooksList";
import type { Book } from "../types";
import Button from "../components/Button";
import NewBookModal from "../components/NewBookModal";
import Alert from "../components/Alert";
import EditBookModal from "../components/EditBookModal";

const base_url = `${import.meta.env.VITE_API_BASE_URL}`;

function BooksPage() {
  const [items, setItems] = useState<Book[]>([]);
  const [showNewBookModal, setShowNewBookModal] = useState(false);
  const [showCreatedBookAlert, setShowCreatedBookAlert] = useState(false);
  const [showErrorBookAlert, setShowErrordBookAlert] = useState(false);
  const [selectedBooks, setSelectedBooks] = useState<number[]>([]);
  const [showEditBookModal, setShowEditBookModal] = useState(false);

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

  const deleteBookHandle = async (selectedBooks: number[]): Promise<void> => {
    await Promise.all(
      selectedBooks.map((id) =>
        fetch(`${base_url}/api/books/${id}`, {
          method: "DELETE",
        }),
      ),
    );
    setSelectedBooks([]);
    fetchBooks();
  };

  const editBookHandle = (): void => {
    setShowEditBookModal(true);
    console.log("showing modal " + showEditBookModal);
  };

  const onBookSelect = (checked: boolean, bookId: number): void => {
    let ids = [];
    if (checked) {
      ids = [...selectedBooks, bookId];
    } else {
      ids = [...selectedBooks].filter((item) => item !== bookId);
    }
    setSelectedBooks(ids);
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

        <Button
          onClick={editBookHandle}
          color="primary"
          enable={selectedBooks.length != 1 ? "disabled" : ""}
        >
          Edit Book
        </Button>

        <Button
          onClick={() => deleteBookHandle(selectedBooks)}
          color="danger"
          enable={selectedBooks.length === 0 ? "disabled" : ""}
        >
          Delete Book
        </Button>
        <BooksList
          items={items}
          selectedIds={selectedBooks}
          onBookSelect={onBookSelect}
        />
        <NewBookModal
          show={showNewBookModal}
          onClose={() => setShowNewBookModal(false)}
          onSave={onSave}
        />
        <EditBookModal
          show={showEditBookModal}
          onClose={() => setShowEditBookModal(false)}
          onSave={() => console.log("saving...")}
        />
      </div>
    </>
  );
}

export default BooksPage;
