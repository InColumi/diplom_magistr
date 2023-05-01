from sqlalchemy import Column, Integer, Uuid, Text
from models.base import Base
import uuid


class Bookshelves(Base):
    __tablename__ = "bookshelves"

    id = Column(type_=Uuid, primary_key=True, default=uuid.uuid4())
    name = Column(type_=Text, nullable=False)
    int_id = Column(type_=Integer, nullable=False)

    def __repr__(self) -> str:
        return f"Bookshelves(id={self.id}, name={self.name}, int_id={self.int_id})"
