from pydantic import BaseModel
from uuid import UUID


class Books(BaseModel):
    ref_users: UUID
    ref_books: UUID