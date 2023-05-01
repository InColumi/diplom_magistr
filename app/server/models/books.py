from sqlalchemy import Column, Uuid, Text, Integer
from models.base import Base
import uuid


class Books(Base):
    __tablename__ = "books"

    id = Column(type_=Uuid, primary_key=True, default=uuid.uuid4())
    int_id = Column(type_=Integer, nullable=False)
    bookshelves_id = Column(type_=Integer, nullable=False)
    dateissued = Column(type_=Text, nullable=False)
    rating = Column(type_=Integer, nullable=False, default=0)

    def __repr__(self) -> str:
        return f"Books(id={self.id}, int_id={self.int_id}, dateissued={self.dateissued}, bookshelves_id={self.bookshelves_id}, rating={self.rating})"
