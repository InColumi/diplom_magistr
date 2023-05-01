from sqlalchemy import Column, Uuid
from models.base import Base


class Favorites(Base):
    __tablename__ = "favorites"

    ref_users = Column(type_=Uuid, nullable=False, primary_key=True)
    ref_books = Column(type_=Uuid, nullable=False, primary_key=True)

    def __repr__(self) -> str:
        return f"Favorites(ref_users={self.ref_users}, ref_books={self.ref_books})"
