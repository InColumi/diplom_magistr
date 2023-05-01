from sqlalchemy.orm import Session
from sqlalchemy import select, func, Text, and_
from models.books import Books
from models.titles import Titles
from models.authors import Authors
from models.book_authors import BookAuthors
from models.bookshelves import Bookshelves
from models.favorites import Favorites
from sqlalchemy.dialects.postgresql import ARRAY
from uuid import UUID


def get_books(db: Session, user_id: UUID, only_favorites: bool):
    authors_agg = func.array_agg(Authors.name, type_=ARRAY(Text)).label('authors')
    q = select(
        Books.id,
        Books.dateissued,
        Titles.name,
        authors_agg,
        Bookshelves.name.label('bookshelves_name'),
        Books.int_id.label('path_to_image'),
        Books.rating,
        (Favorites.ref_users == user_id).label('is_favorites'))\
        .join(Titles, Titles.int_book_id == Books.int_id)\
        .join(Favorites, and_(Favorites.ref_books == Books.id, Favorites.ref_users == user_id), isouter= not only_favorites)\
        .join(Bookshelves, Bookshelves.int_id == Books.bookshelves_id)\
        .join(BookAuthors, BookAuthors.ref_book_id == Books.int_id)\
        .join(Authors, BookAuthors.ref_authors_id == Authors.int_id)
    q = q.group_by(Books.id, Books.dateissued, Titles.name, Bookshelves.name, Books.int_id, Books.rating, Favorites.ref_users)\
        .order_by(Titles.name)
    print(q)
    return [i._asdict() for i in db.execute(q)]
