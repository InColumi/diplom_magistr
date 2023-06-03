from sqlalchemy import Column, Text, Integer
from models.base import Base


class Test(Base):
    __tablename__ = "test"

    id = Column(type_=Integer, primary_key=True)
    context = Column(type_=Text, nullable=False)
    id_book = Column(type_=Integer, nullable=False)
    centroid_id = Column(type_=Integer, nullable=False)

    def __repr__(self) -> str:
        return f"Test(id={self.id}, \
            context={self.context}, \
            id_book={self.id_book}, \
            centroid_id={self.centroid_id},)"
