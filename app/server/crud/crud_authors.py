from models.books import Books
from models.authors import Authors
from sqlalchemy.orm import Session
from sqlalchemy import select, func, Text
from models.book_authors import BookAuthors
from sqlalchemy.dialects.postgresql import ARRAY


def get_top_by_rating(db: Session, count_top: int):
    authors_agg = func.array_agg(Authors.name, type_=ARRAY(Text)).label('authors')
    query = select(Books.id, authors_agg)\
        .join(BookAuthors, BookAuthors.ref_book_id == Books.int_id)\
        .join(Authors, BookAuthors.ref_authors_id == Authors.int_id)\
        .group_by(Books.id)\
        .order_by(Books.rating_avg.desc())\
        .limit(count_top)

    return [item._asdict() for item in db.execute(query)]
