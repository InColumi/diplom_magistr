from sqlalchemy import Column, Uuid, Text, Integer
from models.base import Base
import uuid


class Authors(Base):
    __tablename__ = "authors"

    id = Column(type_=Uuid, primary_key=True, default=uuid.uuid4())
    name = Column(type_=Text, nullable=False)
    int_id = Column(type_=Integer, nullable=False)

    def __repr__(self) -> str:
        return f"Authors(id={self.id}, name={self.name}, int_id={self.int_id})"
