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


class BookFilters(BaseModel):
    value: Optional[str]
    sort: Optional[str]

    # @validator('type_of_filter')
    # def type_of_filter_(cls, value):
    #     assert value >= 0 and value <= 3, 'current_page must be >= 0 and <= 3'
    #     return value


class LimitPages(BaseModel):
    pages: int


class BookOut(BaseModel):
    dateissued: date
    name: str
    authors: list
    bookshelves_name: str
    path_to_image: int
    id_text: int
    rating_avg: int
    is_favorites: Optional[bool] = None
    id: UUID


class BookUsersProgress(BaseModel):
    id: UUID
    current_page: Optional[int]
    current_second: Optional[int]
    evaluation: Optional[int]

    @validator('current_page')
    def current_page_must_be_positive(cls, value):
        assert value >= 0, 'current_page must be >= 0'
        return value

    @validator('current_second')
    def current_second_must_be_positive(cls, value):
        assert value >= 0, 'current_second must be >= 0'
        return value
    
    @validator('evaluation')
    def evaluation_must_be_between_1_5(cls, value):
        assert value >= 1 and value <= 5, 'evaluation must be in interval (1, 5)'
        return value
