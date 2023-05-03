import os
import fastapi_pagination
from crud import crud_books
from crud import crud_favorites
from typing import Annotated
from sqlalchemy.orm import Session
from fastapi import APIRouter, Depends
from schemas.books import BookOut, BookIn
from fastapi.responses import StreamingResponse
from dependencies import get_db, settings, has_access

router = APIRouter(tags=["books"])


def get_text_from_file(id: int) -> any:
    file = f'{id}{settings.EXTENSIONS_BOOKS}'
    path = os.path.join(settings.PATH_BOOKS, file)
    try:
        with open(path, 'r', encoding='utf-8') as f:
            return f.read()
    except Exception as e:
        print(str(e))
        raise Exception(e)


def split_text(text: str) -> str:
    split_size = 100
    text = text[:1000]
    print(text)
    count = int(len(text) / split_size)
    text = [text[i * split_size: (i + 1) * split_size] for i in range(count)]
    print(text)


@router.post('/books', response_model=fastapi_pagination.Page[BookOut])
def get_books(data: Annotated[dict, Depends(has_access)], is_favorites: bool = False, db: Session = Depends(get_db)):
    print(is_favorites)
    user_id = data.get('user_id')
    if not user_id:
        raise Exception("Problem in '/books': Not user_id")
    books = crud_books.get_books(user_id=user_id, db=db, only_favorites=is_favorites)
    return fastapi_pagination.paginate(books)


@router.post('/change_status_favorite_book', status_code=200)
def change_status_favorite_book(data: Annotated[dict, Depends(has_access)], book: BookIn, db: Session = Depends(get_db)):
    user_id = data.get('user_id')
    if not user_id:
        raise Exception("Problem in '/change_status_favorite_book': Not user_id")
    res = crud_favorites.changed_status_favorite_book(user_id=user_id, db=db, book_id=book.id)
    return res


@router.post('/send_audio_stream')
def send_audio_stream():
    id_book = 82
    file = f'{id_book}{settings.EXTENSIONS_SONGS}'
    path = os.path.join(settings.PATH_SONGS, file)
    def get_stream():
        with open(path, 'rb') as f:
            yield from f

    return StreamingResponse(get_stream(), media_type='audio/mp3')


fastapi_pagination.add_pagination(router)
