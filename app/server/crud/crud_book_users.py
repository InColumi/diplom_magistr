from sqlalchemy.orm import Session
from models.book_users import BookUsers
from schemas.books import BookUsersProgress
from uuid import UUID
from datetime import datetime

def update_template(item: BookUsers, source :BookUsersProgress):
    if source.current_page:
        item.current_page = source.current_page
    if source.current_second:
        item.current_second = source.current_second
    if source.evaluation:
        item.evaluation = source.evaluation
    item.data_edit = datetime.now()


def update(db: Session, user_id: UUID, book :BookUsersProgress):
    data = db.query(BookUsers).where(BookUsers.ref_books == book.id, BookUsers.ref_users == user_id).first()
    if not data:
        new_data = BookUsers(ref_books=book.id, ref_users=user_id)
        update_template(new_data, book)
        db.add(new_data)
    else:
        update_template(data, book)
