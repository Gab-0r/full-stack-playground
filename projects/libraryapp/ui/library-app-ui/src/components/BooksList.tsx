import type { Book } from "../types";

interface BooksListProps {
  items: Book[];
  selectedIds: number[];
  onBookSelect: (checked: boolean, bookId: number) => void;
}

function BooksList({ items, selectedIds, onBookSelect }: BooksListProps) {
  if (items.length === 0) {
    <div className="text-center">No books to display</div>;
  }

  return (
    <>
      <div className="mx-5">
        <table className="table table-hover">
          <thead className="table-dark">
            <tr>
              <th scope="col"></th>
              <th scope="col">ID</th>
              <th scope="col">Title</th>
              <th scope="col">Author</th>
              <th scope="col">ISBN</th>
              <th scope="col">Publication Year</th>
            </tr>
          </thead>
          <tbody>
            {items.map((book) => (
              <tr
                key={book.id}
                className={selectedIds.includes(book.id) ? "table-active" : ""}
              >
                <td>
                  <input
                    type="checkbox"
                    checked={selectedIds.includes(book.id)}
                    onChange={(e) => onBookSelect(e.target.checked, book.id)}
                  ></input>
                </td>
                <td>{book.id}</td>
                <td>{book.title}</td>
                <td>{book.author}</td>
                <td>{book.isbn}</td>
                <td>{book.publicationYear}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default BooksList;
