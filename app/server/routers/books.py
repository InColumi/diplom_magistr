import os
import fastapi_pagination
from crud import crud_books
from crud import crud_favorites
from typing import Annotated, Optional
from sqlalchemy.orm import Session
from fastapi import APIRouter, Depends
from schemas.books import BookOut, BookIn, BookUsersCurrentPage, BookUsersEvaluation
from fastapi.responses import FileResponse
from dependencies import get_db, settings, has_access

router = APIRouter(tags=["books"])


@router.post('/books', response_model=fastapi_pagination.Page[BookOut])
def get_books(data: Annotated[dict, Depends(has_access)], is_favorites: bool = False, db: Session = Depends(get_db)):
    print(is_favorites)
    user_id = data.get('user_id')
    if not user_id:
        raise Exception("Problem in '/books': Not user_id")
    books = crud_books.get_list(user_id=user_id, db=db, only_favorites=is_favorites)
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
    id_book = 111
    file = f'{id_book}{settings.EXTENSIONS_SONGS}'
    path = os.path.join(settings.PATH_SONGS, file)

    return FileResponse(path, media_type='audio/mp3')


@router.post('/add_evaluation_book')
def add_evaluation_book(data: Annotated[dict, Depends(has_access)], book: BookUsersEvaluation, db: Session = Depends(get_db)):
    user_id = data.get('user_id')
    if not user_id:
        raise Exception("Problem in '/add_evaluation_book': Not user_id")
    crud_books.add_evaluation(db, user_id, book.id, book.value)


@router.post('/save_current_page')
def save_current_book_page(data: Annotated[dict, Depends(has_access)], book: BookUsersCurrentPage, db: Session = Depends(get_db)):
    user_id = data.get('user_id')
    if not user_id:
        raise Exception("Problem in '/save_current_page': Not user_id")
    crud_books.save_current_page(db, user_id, book.id, book.current_page)


@router.post('/get_recomendation')
def get_recomendation(data: Annotated[dict, Depends(has_access)], limit: Optional[int] = 10, db: Session = Depends(get_db)):
    user_id = data.get('user_id')
    if not user_id:
        raise Exception("Problem in '/get_recomendation': Not user_id")
    output = {}
    output['books'] = crud_books.get_recommendation(db, user_id, limit)
    return output


@router.post('/get_text')
def get_text_book(data: Annotated[dict, Depends(has_access)], book: BookIn, db: Session = Depends(get_db)):
    user_id = data.get('user_id')
    if not user_id:
        raise Exception("Problem in '/get_text': Not user_id")
    items = crud_books.get_text(db, book.id)
    output = {}
    output['items'] = items
    output['total_pages'] = len(items)
    return output


# @router.post('/test')
# def test(db: Session = Depends(get_db)):
#     from models.books import Books

#     return {'hi': 'from test'}

fastapi_pagination.add_pagination(router)
