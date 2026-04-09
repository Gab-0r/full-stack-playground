from pydantic import TypeAdapter
from schemas.members_schema import MembersSchema


def test_get_all_members(members_client):
    response = members_client.get_all_members()
    assert response.ok, f"response is not 200. Current response: {response.status}"

    adapter = TypeAdapter(list[MembersSchema])
    members = adapter.validate_python(response.json())
    assert len(members) > 0, "no members returned"


def test_get_one_member(members_client):
    response = members_client.get_one_member()
    assert response.ok, f"reponse is not 200, Current response: {response.status}"

    adapter = TypeAdapter(MembersSchema)
    adapter.validate_python(response.json())
