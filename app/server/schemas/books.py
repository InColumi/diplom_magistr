from pydantic import BaseModel
from datetime import date
from uuid import UUID


class Books(BaseModel):
    id: UUID
    dateissured: date
    int_id: int


class Book(BaseModel):
    id: int