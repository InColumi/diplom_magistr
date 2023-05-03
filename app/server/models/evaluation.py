from sqlalchemy import Column, Uuid, Integer, ForeignKeyConstraint, PrimaryKeyConstraint
from models.base import Base


class Evaluation(Base):
    __tablename__ = "evaluation"

    ref_users = Column(type_=Uuid, primary_key=True, nullable=False)
    ref_books = Column(type_=Uuid, primary_key=True, nullable=False)
    value = Column(type_=Integer, nullable=False)

    __table_args__ = (
        ForeignKeyConstraint(["ref_users"], ["users.id"]),
    )

    def __repr__(self) -> str:
        return f"Evaluation(ref_users={self.ref_users}, ref_books={self.ref_books}, value={self.value})"
