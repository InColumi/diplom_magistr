from sqlalchemy import Column, Text, Integer
from models.base import Base


class Cluster(Base):
    __tablename__ = "Claster"

    id = Column(type_=Integer, primary_key=True)
    word = Column(type_=Text, nullable=False)
    centroid = Column(type_=Text, nullable=False)
    size = Column(type_=Integer, nullable=False)

    def __repr__(self) -> str:
        return f"Claster(id={self.id}, word={self.word}, centroid={self.centroid}, size={self.size})"
