from sqlalchemy import Column, Uuid
from sqlalchemy.orm import DeclarativeBase


class Favorites(DeclarativeBase):
    __tablename__ = "favorites"

    ref_users = Column(type_=Uuid, nullable=False)
    ref_books = Column(type_=Uuid, nullable=False)

    def __repr__(self) -> str:
        return f"Favorites(ref_users={self.ref_users}, ref_books={self.ref_books})"
