from playwright.sync_api import APIRequestContext, APIResponse
import random


class LoansClient:
    def __init__(self, api_context: APIRequestContext):
        self.api = api_context

    def get_all_loans(self) -> APIResponse:
        url = "/api/loans"
        return self.api.get(url)

    def get_one_loan(self, loan_id: str = None) -> APIResponse:
        if not loan_id:
            random_loan = random.choice(self.get_all_loans().json())
            loan_id = random_loan["id"]
        return self.api.get(f"/api/loans/{loan_id}")
