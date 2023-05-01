from pydantic import BaseModel
from uuid import UUID


class Favorites(BaseModel):
    ref_users: UUID
    ref_books: UUID
