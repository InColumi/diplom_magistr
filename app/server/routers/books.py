import os
import fastapi_pagination
from crud import crud_books
from crud import crud_favorites
from crud import crud_book_users
from typing import Annotated, Optional
from sqlalchemy.orm import Session
from fastapi import APIRouter, Depends
from schemas.books import BookOut, BookIn, BookUsersProgress, BookFilters
from fastapi.responses import FileResponse
from dependencies import get_db, settings, has_access

router = APIRouter(tags=["books"])


@router.post('/books', response_model=fastapi_pagination.Page[BookOut])
def get_books(data: Annotated[dict, Depends(has_access)], input: BookFilters, is_favorites: bool = False, db: Session = Depends(get_db)):
    user_id = data.get('user_id')
    if not user_id:
        raise Exception("Problem in '/books': Not user_id")
    books = crud_books.get_list(user_id=user_id, db=db, only_favorites=is_favorites, title_filter=input.title, author_filter=input.author)
    return fastapi_pagination.paginate(books)


@router.post('/change_status_favorite_book', status_code=200)
def change_status_favorite_book(data: Annotated[dict, Depends(has_access)], book: BookIn, db: Session = Depends(get_db)):
    user_id = data.get('user_id')
    if not user_id:
        raise Exception("Problem in '/change_status_favorite_book': Not user_id")
    res = crud_favorites.changed_status_favorite_book(user_id=user_id, db=db, book_id=book.id)
    return res


@router.get('/send_audio_stream')
def send_audio_stream(id_book: int):
    file = f'{id_book}{settings.EXTENSIONS_SONGS}'
    path = os.path.join(settings.PATH_SONGS, file)
    headers = {'accept-ranges': 'bytes'}
    return FileResponse(path, headers=headers)


@router.post('/save_progress_book')
def save_progress_book(data: Annotated[dict, Depends(has_access)], book: BookUsersProgress, db: Session = Depends(get_db)):
    user_id = data.get('user_id')
    if not user_id:
        raise Exception("Problem in '/add_evaluation_book': Not user_id")
    crud_book_users.update(db, user_id, book)


@router.post('/get_recomendation')
def get_recomendation(data: Annotated[dict, Depends(has_access)], limit: Optional[int] = 10, db: Session = Depends(get_db)):
    user_id = data.get('user_id')
    if not user_id:
        raise Exception("Problem in '/get_recomendation': Not user_id")
    output = {}
    output['books'] = crud_books.get_recommendation(db, user_id, limit)
    return output


@router.post('/get_text', response_model=fastapi_pagination.Page[str])
def get_text_book(data: Annotated[dict, Depends(has_access)], book: BookIn, db: Session = Depends(get_db)):
    user_id = data.get('user_id')
    if not user_id:
        raise Exception("Problem in '/get_text': Not user_id")
    items = crud_books.get_text(db, book.id)
    return fastapi_pagination.paginate(items)


@router.get('/last_reading')
def get_last_reading_book(data: Annotated[dict, Depends(has_access)], db: Session = Depends(get_db)):
    user_id = data.get('user_id')
    if not user_id:
        raise Exception("Problem in '/last_reading': Not user_id")
    book = crud_books.get_last_reading(db, user_id)
    return book

fastapi_pagination.add_pagination(router)

# @router.post('/test')
# def test(db: Session = Depends(get_db)):
#     from models.books import Books

#     return {'hi': 'from test'}
