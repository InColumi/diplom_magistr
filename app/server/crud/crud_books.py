import os
from sqlalchemy.orm import Session
from sqlalchemy import select, func, Text, and_, or_, any_
from models.books import Books
from models.titles import Titles
from models.authors import Authors
from models.book_authors import BookAuthors
from models.bookshelves import Bookshelves
from models.favorites import Favorites
from models.book_users import BookUsers
from schemas.books import BookFilters
from sqlalchemy.dialects.postgresql import ARRAY
from uuid import UUID
from dependencies import settings


def get_list(db: Session, user_id: UUID, only_favorites: bool, filter: BookFilters = None) -> list:
    authors_agg = func.array_agg(Authors.name, type_=ARRAY(Text)).label('authors')
    print(filter)
    title = Titles.name.ilike(f"%{filter.value}%")
    author = Authors.name.ilike(f"%{filter.value}%")
    print(only_favorites)
    q = select(
        Books.id,
        Books.dateissued,
        Titles.name,
        authors_agg,
        Books.int_id.label('path_to_image'),
        Books.int_id.label('id_text'),
        Books.rating_avg,
        BookUsers.current_page,
        BookUsers.current_second,
        (Favorites.ref_users == user_id).label('is_favorites'))\
        .join(Titles, Titles.ref_book_id == Books.id)\
        .join(Favorites, and_(Favorites.ref_books == Books.id, Favorites.ref_users == user_id), isouter=not only_favorites)\
        .join(Bookshelves, Bookshelves.int_id == Books.bookshelves_id)\
        .join(BookAuthors, BookAuthors.ref_book_id == Books.id)\
        .join(Authors, BookAuthors.ref_authors_id == Authors.id)\
        .join(BookUsers, and_(BookUsers.ref_books == Books.id, BookUsers.ref_users == user_id), isouter=True)
    if filter.value:
        q = q.filter(or_(title, author))
    q = q.group_by(Books.id, Books.dateissued, Titles.name, Books.int_id, Books.rating_avg, Favorites.ref_users,
                    BookUsers.current_page, BookUsers.current_second)
    sort = filter.sort
    if sort == 0:
        q = q.order_by(Authors.name)
    elif sort == 1:
        q = q.order_by(Authors.name.desc())
    elif sort == 2:
        q = q.order_by(Titles.name)
    elif sort == 3:
        q = q.order_by(Titles.name.desc())
    elif sort == 4:
        q = q.order_by(Books.dateissued)
    elif sort == 5:
        q = q.order_by(Books.dateissued.desc())
    elif sort == 6:
        q = q.order_by(Books.rating_quantity)
    elif sort == 7:
        q = q.order_by(Books.rating_avg)
    return [i._asdict() for i in db.execute(q)]


def get_recommendation(db: Session, user_id: UUID, limit: int):
    authors_agg = func.array_agg(Authors.name, type_=ARRAY(Text)).label('authors')
    q = select(
        Books.id,
        Books.dateissued,
        Titles.name,
        authors_agg,
        Bookshelves.name.label('bookshelves_name'),
        Books.int_id.label('path_to_image'),
        func.round(Books.rating_avg).label('rating_avg'),
        (Favorites.ref_users == user_id).label('is_favorites')
        )\
        .join(Titles, Titles.ref_book_id == Books.id)\
        .join(Favorites, Favorites.ref_books == Books.id, isouter=True)\
        .join(Bookshelves, Bookshelves.int_id == Books.bookshelves_id)\
        .join(BookAuthors, BookAuthors.ref_book_id == Books.id)\
        .join(Authors, BookAuthors.ref_authors_id == Authors.id)\
        .where(Favorites.ref_users != user_id)
    q = q.group_by(Books.id, Books.dateissued, Titles.name, Bookshelves.name, Books.int_id, Books.rating_avg, Favorites.ref_users)\
        .order_by(func.random()).limit(limit)
    return [i._asdict() for i in db.execute(q)]


def get_books_by_id_for_recommendation(db: Session, id_list: list) -> list:
    authors_agg = func.array_agg(Authors.name, type_=ARRAY(Text)).label('authors')
    q = select(
        Books.id,
        Books.dateissued,
        Titles.name,
        authors_agg,
        Bookshelves.name.label('bookshelves_name'),
        Books.int_id.label('path_to_image'),
        func.round(Books.rating_avg).label('rating_avg')
        )\
        .join(Titles, Titles.ref_book_id == Books.id)\
        .join(Bookshelves, Bookshelves.int_id == Books.bookshelves_id)\
        .join(BookAuthors, BookAuthors.ref_book_id == Books.id)\
        .join(Authors, BookAuthors.ref_authors_id == Authors.id)\
        .where(Books.id == any_(id_list))\
        .group_by(Books.id, Books.dateissued, Titles.name, Bookshelves.name, Books.int_id, Books.rating_avg)\
        .order_by(func.random())

    return [i._asdict() for i in db.execute(q)]


def get_text_from_file(id: int) -> str:
    file = f'{id}{settings.EXTENSIONS_BOOKS}'
    path = os.path.join(settings.PATH_BOOKS, file)
    try:
        with open(path, 'r', encoding='utf-8') as f:
            return f.read()
    except Exception as e:
        print(str(e))
        raise Exception(e)


def split_text(text: str) -> list:
    split_size = settings.COUNT_ROWS_ON_ONE_PAGE
    text_rows = text.split('\n')
    text_rows = [row for row in text_rows if row != '']

    count = int(len(text_rows) / split_size)
    return [text_rows[i * split_size: (i + 1) * split_size] for i in range(count)]


def get_text_pages(id_text: int):
    text = get_text_from_file(id_text)
    splited_text = split_text(text)
    return ['\n'.join(page) for page in splited_text]
    

def get_text(db: Session, book_id: UUID) -> list:
    data = db.query(Books).where(Books.id == book_id).first()
    if not data:
        raise Exception(f'Book with id: {book_id}, not exist in DB.')
    return get_text_pages(data.int_id)


def get_last_reading(db: Session, user_id: UUID):
    authors_agg = func.array_agg(Authors.name, type_=ARRAY(Text)).label('authors')
    query = select(BookUsers.current_page, 
                BookUsers.current_second, 
                Books.total_pages, 
                Titles.name.label('title'),
                authors_agg,
                Books.id,
                Books.int_id.label('id_text'))\
            .join(BookAuthors, BookAuthors.ref_book_id == BookUsers.ref_books)\
            .join(Authors, Authors.id == BookAuthors.ref_authors_id)\
            .join(Books, Books.id == BookUsers.ref_books)\
            .join(Titles, Titles.ref_book_id == Books.id)\
            .where(BookUsers.ref_users == user_id)\
            .group_by(BookUsers.current_page, 
                BookUsers.current_second, 
                Books.total_pages, 
                Titles.name,
                Books.int_id, 
                Books.id,
                BookUsers.data_edit)\
            .order_by(BookUsers.data_edit.desc()).limit(1)
    item = [i._asdict() for i in db.execute(query)][0]
    
    pages = get_text_pages(item['id_text'])
    item['text'] = pages[item['current_page']]
    return item


def get_book_info_by_id_user(db: Session, book_id: UUID, user_id: UUID) -> dict:
    authors_agg = func.array_agg(Authors.name, type_=ARRAY(Text)).label('authors')
    query = select(Books.total_pages, Titles.name.label('title'), BookUsers.current_page, authors_agg)\
            .join(Books, Books.id == BookUsers.ref_books)\
            .join(BookAuthors, BookAuthors.ref_book_id == Books.id)\
            .join(Authors, Authors.id == BookAuthors.ref_authors_id)\
            .join(Titles, Titles.ref_book_id == Books.id)\
            .where(Books.id == book_id, BookUsers.ref_users == user_id)\
            .group_by(Books.total_pages, BookUsers.current_page, Titles.name)
    return [i._asdict() for i in db.execute(query)][0]
