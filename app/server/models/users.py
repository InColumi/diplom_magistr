from sqlalchemy import Boolean, Text, Column
from sqlalchemy.orm import DeclarativeBase
import uuid


class Base(DeclarativeBase):
    pass


class User(Base):
    __tablename__ = "users"

    id = Column(type_=Text, primary_key=True, index=True, default=uuid.uuid4)
    email = Column(type_=Text, unique=True, nullable=False)
    username = Column(type_=Text, unique=True, nullable=False)
    hashed_password = Column(type_=Text, nullable=False)
    is_deleted = Column(type_=Boolean, default=False)

    def __repr__(self) -> str:
        return f"User(id={self.id},\
            email={self.email!r},\
            username={self.username!r}, \
            hashed_password = {self.hashed_password}, \
            is_deleted = {self.is_deleted})"
