from pydantic import BaseModel, validator
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


class BookEvaluation(BaseModel):
    id: UUID
    value: int

    @validator('value')
    def value_must_be_between_1_5(cls, value):
        assert value >= 1 and value <= 5, 'value must be in interval (1, 5)'
        return value
