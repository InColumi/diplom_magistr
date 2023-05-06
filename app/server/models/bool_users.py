from sqlalchemy import Column, Uuid, Integer, ForeignKeyConstraint
from models.base import Base


class BookUsers(Base):
    __tablename__ = "book_users"

    ref_users = Column(type_=Uuid, primary_key=True, nullable=False)
    ref_books = Column(type_=Uuid, primary_key=True, nullable=False)
    current_page = Column(type_=Integer, nullable=False, default=0, server_default='0')
    evaluation = Column(type_=Integer)

    __table_args__ = (
        ForeignKeyConstraint(["ref_users"], ["users.id"]),
        ForeignKeyConstraint(["ref_books"], ["books.id"]),
    )

    def __repr__(self) -> str:
        return f"BookUsers(ref_users={self.ref_users},\
                            ref_books={self.ref_books},\
                            current_page = {self.current_page}, \
                            evaluation={self.vaevaluationlue})"
