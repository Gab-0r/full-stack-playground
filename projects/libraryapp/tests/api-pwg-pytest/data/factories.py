from faker import Faker

fake = Faker()


def build_book():
    return {
        "author": fake.name(),
        "isbn": fake.isbn13(),
        "publicationYear": fake.year(),
        "title": fake.sentence(nb_words=4),
    }


def build_member():
    return {"name": fake.name(), "email": fake.email()}


def build_loan(book_id: int, member_id: int):
    return {
        "bookId": book_id,
        "memberId": member_id,
        "loanDate": fake.date_this_year().isoformat(),
    }
