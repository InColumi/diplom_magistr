from sqlalchemy import Column, Uuid, Text, Integer
from models.base import Base
import uuid


class Books(Base):
    __tablename__ = "books"

    id = Column(type_=Uuid, primary_key=True, default=uuid.uuid4())
    int_id = Column(type_=Integer, nullable=False)
    bookshelves_id = Column(type_=Integer, nullable=False)
    dateissued = Column(type_=Text, nullable=False)
    rating_avg = Column(type_=Integer, nullable=False, default=0)
    total_pages = Column(type_=Integer, nullable=False)
    rating_quantity = Column(type_=Integer, nullable=False)
    

    def __repr__(self) -> str:
        return f"Books(id={self.id}, \
                 int_id={self.int_id}, \
                 dateissued={self.dateissued}, \
                 bookshelves_id={self.bookshelves_id}, \
                 rating_avg={self.rating_avg}, \
                 rating_quantity={self.rating_quantity}, \
                 total_pages={self.total_pages})"
