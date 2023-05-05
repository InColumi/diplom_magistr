from pydantic import BaseModel, validator
from datetime import date
from uuid import UUID
from typing import Optional


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
    rating_avg: int
    is_favorites: Optional[bool] = None
    id: UUID


class BookUsersCurrentPage(BaseModel):
    id: UUID
    current_page: int
    
    @validator('current_page')
    def current_page_must_be_positive(cls, value):
        assert value >= 0, 'value must be >= 0'
        return value


class BookUsersEvaluation(BaseModel):
    id: UUID
    value: int

    @validator('value')
    def value_must_be_between_1_5(cls, value):
        assert value >= 1 and value <= 5, 'value must be in interval (1, 5)'
        return value
