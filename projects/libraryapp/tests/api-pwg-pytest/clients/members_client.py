from playwright.sync_api import APIRequestContext, APIResponse
import random


class MembersClient:

    def __init__(self, api_context: APIRequestContext):
        self.api = api_context
        self.endpoint = "/api/members"

    def get_all_members(self) -> APIResponse:
        response = self.api.get(self.endpoint)
        return response

    def get_one_member(self, member_id: str = None) -> APIResponse:
        if not member_id:
            random_member = random.choice(self.get_all_members().json())
            member_id = random_member["id"]
        url = f"{self.endpoint}/{member_id}"
        response = self.api.get(url)
        return response

    def create_member(self, payload) -> APIResponse:
        response = self.api.post(self.endpoint, data=payload)
        return response
