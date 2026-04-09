from pydantic import BaseModel


class BooksSchema(BaseModel):
    id: int
    author: str
    isbn: str | None
    publicationYear: int | None
    title: str
