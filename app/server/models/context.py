from sqlalchemy import Column, Text, Integer
from models.base import Base


class Context(Base):
    __tablename__ = "Context"

    id = Column(type_=Integer, primary_key=True)
    context = Column(type_=Text, nullable=False)
    start = Column(type_=Integer, nullable=False)
    end = Column(type_=Integer, nullable=False)


    def __repr__(self) -> str:
        return f"Claster(id={self.id}, word={self.word}, centroid={self.centroid}, size={self.size})"
