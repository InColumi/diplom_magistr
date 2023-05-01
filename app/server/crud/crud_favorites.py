from sqlalchemy.orm import Session
from models.favorites import Favorites
from uuid import UUID


def changed_status_favorite_book(db: Session, user_id: UUID, book_id: UUID):
    from_db = db.query(Favorites).filter(Favorites.ref_users == user_id, Favorites.ref_books == book_id).first()
    result = False
    if not from_db:
        new = Favorites(ref_books=book_id, ref_users=user_id)
        db.add(new)
        result = True
    else:
        db.delete(from_db)

    return result
