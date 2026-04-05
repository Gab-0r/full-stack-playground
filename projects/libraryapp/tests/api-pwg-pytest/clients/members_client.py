from playwright.sync_api import APIRequestContext, APIResponse
import random


class MembersClient:

    def __init__(self, api_context: APIRequestContext):
        self.api = api_context

    def get_all_members(self) -> APIResponse:
        url = "/api/members"
        response = self.api.get(url)
        return response

    def get_one_member(self, member_id: str = None) -> APIResponse:
        if not member_id:
            random_member = random.choice(self.get_all_members().json())
            member_id = random_member["id"]
        url = f"api/members/{member_id}"
        response = self.api.get(url)
        return response
