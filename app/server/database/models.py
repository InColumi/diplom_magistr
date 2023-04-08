from typing import Optional
from sqlalchemy import ForeignKey
from sqlalchemy import Boolean, Text, Uuid, Column
from sqlalchemy.orm import DeclarativeBase
from sqlalchemy.orm import Mapped
from sqlalchemy.orm import mapped_column

import uuid

class Base(DeclarativeBase):
    pass

class User(Base):
    __tablename__ = "users"

    id = Column(Text, primary_key=True, index=True, default=uuid.uuid4())
    email = Column(Text, unique=True)
    username = Column(Text, unique=True)
    hashed_password = Column(Text, nullable=False)
    salt = Column(Text, nullable=False)
    is_deleted = Column(Boolean, default=False)

    def __repr__(self) -> str:
        return f"User(id={self.id},\
            email={self.email!r},\
            username={self.username!r}, \
            hashed_password = {self.hashed_password}, \
            salt = {self.salt},\
            is_deleted = {self.is_deleted})"