from sqlalchemy import Column, Uuid, Text, Integer, ForeignKeyConstraint
from models.base import Base


class Ner(Base):
    __tablename__ = "Ner"

    id = Column(type_=Integer, primary_key=True)
    context_id = Column(type_=Integer, nullable=False)
    book_id = Column(type_=Integer, nullable=False)
    cluster_id = Column(type_=Integer, nullable=False)
    value = Column(type_=Text, nullable=False)
    start = Column(type_=Integer, nullable=False)
    end = Column(type_=Integer, nullable=False)
    type = Column(type_=Text, nullable=False)

    int_book_id = Column(type_=Integer, nullable=False)

    __table_args__ = (
        ForeignKeyConstraint(["cluster_id"], ["Cluster.id"]),
        ForeignKeyConstraint(["context_id"], ["Context.id"]),
    )

    def __repr__(self) -> str:
        return f"Titles(id={self.id}, \
            name={self.context_id}, \
            ref_book_id={self.book_id}, \
            int_id={self.cluster_id}, \
            int_book_id={self.value},\
            ref_book_id={self.start}, \
            ref_book_id={self.end}, \
            ref_book_id={self.type}, )"
