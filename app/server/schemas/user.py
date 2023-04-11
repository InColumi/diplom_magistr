from pydantic import BaseModel, EmailStr
from typing import Union
from uuid import UUID


class UserInDB(BaseModel):
    id: UUID
    email: Union[EmailStr, None] = None
    username: Union[str, None] = None
    hashed_password: str
    is_deleted: bool

    class Config:
        orm_mode = True


class UserCreate(BaseModel):
    email: Union[EmailStr, None] = None
    username: Union[str, None] = None
    password: str

    class Config:
        orm_mode = True


class UserOut(BaseModel):
    id: UUID
    email: Union[EmailStr, None] = None
    username: Union[str, None] = None
    is_deleted: bool
