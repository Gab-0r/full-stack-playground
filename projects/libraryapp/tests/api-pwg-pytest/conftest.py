import pytest
import os
from playwright.sync_api import Playwright
from clients.members_client import MembersClient


@pytest.fixture(scope="session")
def base_url() -> str:
    return os.getenv("BASE_URL")


@pytest.fixture(scope="session")
def api_context(playwright: Playwright, base_url):
    context = playwright.request.new_context(
        base_url=base_url,
        extra_http_headers={
            "Content-Type": "application/json",
            "Accept": "application/json",
        },
    )
    yield context
    context.dispose()


@pytest.fixture(scope="function")
def members_client(api_context) -> MembersClient:
    return MembersClient(api_context)
