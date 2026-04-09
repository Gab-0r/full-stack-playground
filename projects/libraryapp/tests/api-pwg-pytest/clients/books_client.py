from playwright.sync_api import APIRequestContext, APIResponse
import random


class BooksClient:
    def __init__(self, api_context: APIRequestContext):
        self.api = api_context

    def get_all_books(self) -> APIResponse:
        url = "/api/books"
        return self.api.get(url)

    def get_one_book(self, book_id: str = None) -> APIResponse:
        if not book_id:
            random_book = random.choice(self.get_all_books().json())
            book_id = random_book["id"]
        return self.api.get(f"/api/books/{book_id}")
