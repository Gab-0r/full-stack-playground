from pydantic import BaseModel, EmailStr


class MembersSchema(BaseModel):
    id: int
    name: str
    membershipDate: str | None
    email: str


class MemberSummarySchema(BaseModel):
    id: int
    name: str
