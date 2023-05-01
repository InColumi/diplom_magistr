import os
import json
from crud import crud_books
from schemas.books import BookOut
from sqlalchemy.orm import Session
from typing import Annotated
from fastapi import APIRouter, Depends
from dependencies import get_db, settings, has_access
from fastapi_pagination import Page, add_pagination 
import fastapi_pagination

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


@router.post('/books', response_model=Page[BookOut])
def get_books(data: Annotated[dict, Depends(has_access)], db: Session = Depends(get_db)):
    user_id = data.get('user_id')
    if not user_id:
        raise Exception("Problem in '/books': Not user_id")

    books = crud_books.get_books(user_id=user_id, db=db)
    return fastapi_pagination.paginate(books)


add_pagination(router)
    