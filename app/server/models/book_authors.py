from sqlalchemy import Column, Integer
from models.base import Base


class BookAuthors(Base):
    __tablename__ = "book_authors"

    ref_book_id = Column(type_=Integer, nullable=False, primary_key=True)
    ref_authors_id = Column(type_=Integer, nullable=False, primary_key=True)

    def __repr__(self) -> str:
        return f"BookAuthors(ref_book_id={self.ref_book_id}, ref_authors_id={self.ref_authors_id})"
