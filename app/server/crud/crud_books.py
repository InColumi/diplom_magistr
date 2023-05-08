import os
from sqlalchemy.orm import Session
from sqlalchemy import select, func, Text, and_
from models.books import Books
from models.titles import Titles
from models.authors import Authors
from models.book_authors import BookAuthors
from models.bookshelves import Bookshelves
from models.favorites import Favorites
from models.book_users import BookUsers
from sqlalchemy.dialects.postgresql import ARRAY
from uuid import UUID
from dependencies import settings


def get_list(db: Session, user_id: UUID, only_favorites: bool, title_filter: str = None, author_filter: str = None) -> list:
    authors_agg = func.array_agg(Authors.name, type_=ARRAY(Text)).label('authors')
    title = Titles.name.ilike(f"%{title_filter}%")
    author = Authors.name.ilike(f"%{author_filter}%")
    q = select(
        Books.id,
        Books.dateissued,
        Titles.name,
        authors_agg,
        Bookshelves.name.label('bookshelves_name'),
        Books.int_id.label('path_to_image'),
        Books.rating_avg,
        (Favorites.ref_users == user_id).label('is_favorites'))\
        .join(Titles, Titles.int_book_id == Books.int_id)\
        .join(Favorites, and_(Favorites.ref_books == Books.id, Favorites.ref_users == user_id), isouter=not only_favorites)\
        .join(Bookshelves, Bookshelves.int_id == Books.bookshelves_id)\
        .join(BookAuthors, BookAuthors.ref_book_id == Books.id)\
        .join(Authors, BookAuthors.ref_authors_id == Authors.id)
    if title_filter:
        q = q.filter(title)
    if author_filter:
        q = q.filter(author)
    q = q.group_by(Books.id, Books.dateissued, Titles.name, Bookshelves.name, Books.int_id, Books.rating_avg, Favorites.ref_users)\
        .order_by(Titles.name)
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
        .order_by(func.random()).limit(limit)\
        .limit(settings.COUNT_BOOKS_IN_RECOMENDATION)
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


def join_pages(splited_text: list) -> list:
    return ['\n'.join(page) for page in splited_text] 


def get_text(db: Session, book_id: UUID) -> list:
    data = db.query(Books).where(Books.id == book_id).first()
    if not data:
        raise Exception(f'Book with id: {book_id}, not exist in DB.')
    text = get_text_from_file(data.int_id)
    return split_text(text)


def get_last_reading(db: Session, user_id: UUID):
    authors_agg = func.array_agg(Authors.name, type_=ARRAY(Text)).label('authors')
    query = select(BookUsers.current_page, 
                BookUsers.current_second, 
                Books.total_pages, 
                Titles.name.label('title'),
                authors_agg,
                Books.int_id)\
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
                BookUsers.data_edit)\
            .order_by(BookUsers.data_edit.desc()).limit(1)
    item = [i._asdict() for i in db.execute(query)][0]
    
    text = get_text_from_file(item['int_id'])
    splited_text = split_text(text)
    pages = join_pages(splited_text)
    item['text'] = pages[item['current_page']]
    del item['int_id']
    return item
