from sqlalchemy import Column, Uuid, Text, Integer
from models.base import Base
import uuid


class Titles(Base):
    __tablename__ = "titles"

    id = Column(type_=Uuid, primary_key=True, default=uuid.uuid4())
    name = Column(type_=Text, nullable=False)
    ref_book_id = Column(type_=Uuid)
    int_id = Column(type_=Integer, nullable=False)
    int_book_id = Column(type_=Integer, nullable=False)

    def __repr__(self) -> str:
        return f"Titles(id={self.id}, name={self.name}, ref_book_id={self.ref_book_id}, int_id={self.int_id}, int_book_id={self.int_book_id})"
