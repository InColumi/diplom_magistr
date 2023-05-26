from models.book_users import BookUsers
from models.authors import Authors
from sqlalchemy.orm import Session
from sqlalchemy import select, func, Text
from models.book_authors import BookAuthors
from sqlalchemy.dialects.postgresql import ARRAY


def get_top_by_readers(db: Session, count_top: int):
    authors_agg = func.array_agg(Authors.name, type_=ARRAY(Text)).label('authors')
    count_readers = select(func.count(BookUsers.ref_users).label('count_readers'))\
        .where(BookUsers.ref_books == BookAuthors.ref_book_id)\
        .scalar_subquery()

    query = select(BookAuthors.ref_authors_id, authors_agg, count_readers.label('count_readers'))\
        .join(Authors, Authors.id == BookAuthors.ref_authors_id)\
        .group_by(BookAuthors.ref_authors_id, BookAuthors.ref_book_id)\
        .order_by(count_readers.desc())\
        .limit(count_top)

    return [item._asdict() for item in db.execute(query)]
