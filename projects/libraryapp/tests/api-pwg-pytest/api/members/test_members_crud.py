from pydantic import TypeAdapter
from schemas.members_schema import MembersSchema
from data.factories import build_member


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


def test_create_member(members_client):
    adapter = TypeAdapter(MembersSchema)
    member = build_member()
    response = members_client.create_member(member)
    assert (
        response.status == 201
    ), f"reponse is not 201, Current response: {response.status}"

    new_member = response.json()
    adapter.validate_python(new_member)
    created_members = members_client.get_all_members().json()
    assert new_member in created_members, f"New member not found in created members"
