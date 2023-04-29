from sqlalchemy import Column, Uuid, Date, Integer
from sqlalchemy.orm import DeclarativeBase
import uuid

class Books(DeclarativeBase):
    __tablename__ = "books"

    id = Column(type_=Uuid, primary_key=True, default=uuid.uuid4())
    int_id = Column(type_=Integer, nullable=False)
    dateissured = Column(type_=Date, nullable=False)

    def __repr__(self) -> str:
        return f"Books(id={self.id}, dateissured={self.dateissured})"
