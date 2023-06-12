from sqlalchemy import Column, Text
from models.base import Base


class Centroid(Base):
    __tablename__ = "centroid"

    id = Column(primary_key=True, autoincrement=True)
    value = Column(type_=Text, nullable=False)

    def __repr__(self) -> str:
        return f"Centroid(id={self.id}, value={self.value})"
