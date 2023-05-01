from pydantic import BaseModel
from datetime import date
from uuid import UUID
from typing import Union


class Books(BaseModel):
    id: UUID
    dateissured: date
    int_id: int


class BookIn(BaseModel):
    id: UUID


class LimitPages(BaseModel):
    pages: int


class BookOut(BaseModel):
    dateissued: date
    name: str
    authors: list
    bookshelves_name: str
    path_to_image: int
    rating: int
    is_favorites: Union[bool, None] = None
    id: UUID
