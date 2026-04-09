from pydantic import TypeAdapter
from schemas.loans_schema import LoansSchema


def test_get_all_loans(loans_client):
    response = loans_client.get_all_loans()
    assert (
        response.ok
    ), f"response status is not 200. current status code: {response.status}"

    adapter = TypeAdapter(list[LoansSchema])
    loans = adapter.validate_python(response.json())
    assert len(loans) > 0, "no loans returned"


def test_get_one_loan(loans_client):
    response = loans_client.get_one_loan()
    assert (
        response.ok
    ), f"response status is not 200. current status code: {response.status}"

    adapter = TypeAdapter(LoansSchema)
    adapter.validate_python(response.json())
