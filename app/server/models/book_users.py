from sqlalchemy import Column, Uuid, Integer, ForeignKeyConstraint, DateTime
from models.base import Base
from datetime import datetime


class BookUsers(Base):
    __tablename__ = "book_users"

    ref_users = Column(type_=Uuid, primary_key=True, nullable=False)
    ref_books = Column(type_=Uuid, primary_key=True, nullable=False)
    current_page = Column(type_=Integer, nullable=False, default=1, server_default='1')
    current_second = Column(type_=Integer, nullable=False, default=0, server_default='0')
    data_edit = Column(type_=DateTime, nullable=False, default=datetime.now(), server_default='now()')
    evaluation = Column(type_=Integer)

    __table_args__ = (
        ForeignKeyConstraint(["ref_users"], ["users.id"]),
        ForeignKeyConstraint(["ref_books"], ["books.id"]),
    )

    def __repr__(self) -> str:
        return f"BookUsers(ref_users={self.ref_users},\
                            ref_books={self.ref_books},\
                            current_page = {self.current_page}, \
                            current_second = {self.current_second}, \
                            data_edit = {self.data_edit}, \
                            evaluation={self.evaluation})"
