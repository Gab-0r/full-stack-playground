import type { Book } from "../types";

interface BooksListProps {
  items: Book[];
  heading: string;
}

function BooksList({ items, heading }: BooksListProps) {
  if (items.length === 0) {
    <h3 className="text-center">{heading}</h3>;
    <div className="text-center">No books to display</div>;
  }

  return (
    <>
      <h3 className="text-center">{heading}</h3>
      <div className="mx-5">
        <table className="table table-hover">
          <thead className="table-dark">
            <tr>
              <th scope="col">ID</th>
              <th scope="col">Title</th>
              <th scope="col">Author</th>
              <th scope="col">ISBN</th>
              <th scope="col">Publication Year</th>
            </tr>
          </thead>
          <tbody>
            {items.map((book) => (
              <tr>
                <td>{book.id}</td>
                <td>{book.title}</td>
                <td>{book.author}</td>
                <td>{book.isb}</td>
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
