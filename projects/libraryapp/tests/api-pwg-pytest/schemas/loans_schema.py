from pydantic import BaseModel
from schemas.books_schema import BooksSchema
from schemas.members_schema import MemberSummarySchema


class LoansSchema(BaseModel):
    id: int
    book: BooksSchema
    member: MemberSummarySchema
    loanDate: str
    returnDate: str | None
    returned: bool
