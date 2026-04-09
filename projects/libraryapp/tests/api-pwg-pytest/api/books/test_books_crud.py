from pydantic import TypeAdapter
from schemas.books_schema import BooksSchema


def test_get_all_books(books_client):
    response = books_client.get_all_books()
    assert response.ok, f"response is not 200. Current response: {response.status}"

    adapter = TypeAdapter(list[BooksSchema])
    books = adapter.validate_python(response.json())
    assert len(books) > 0, "no books returned"


def test_get_one_book(books_client):
    response = books_client.get_one_book()
    assert response.ok, f"response is not 200. Current response: {response.status}"

    adapter = TypeAdapter(BooksSchema)
    adapter.validate_python(response.json())
