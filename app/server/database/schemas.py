from pydantic import BaseModel
from typing import Union
from uuid import UUID


class User(BaseModel):
    id: UUID
    email: Union[str, None] = None
    username: Union[str, None] = None
    is_deleted: bool

    class Config:
        orm_mode = True


class UserCreate(BaseModel):
    email: Union[str, None] = None
    username: Union[str, None] = None
    password: str

    class Config:
        orm_mode = True
