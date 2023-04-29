from fastapi import APIRouter, Depends, HTTPException, Response
from dependencies import get_db, credentials_exception, settings, has_access
router = APIRouter(tags=["books"])
from config import Settings
import os
from schemas.books import Book
from schemas.text import Text


def get_text_by_id(id: int) -> any:
    file = f'{id}{settings.EXTENSIONS_BOOKS}'
    path = os.path.join(settings.PATH_BOOKS, file)
    try:
        with open(path, 'r', encoding='utf-8') as f:
            return f.read()
    except Exception as e:
        print(str(e))


@router.post('/books'
# , dependencies=[Depends(has_access)]
, status_code=200)
def get_book_by_id(book: Book):
    text = get_text_by_id(book.id)
    # text = text.replace('\n', '<br>')
    if not text:
        raise HTTPException(status_code=404, detail='Books not found.')
    text_out = Text(text=text[:2000], count_pages=0, current_pages=0)
    return text_out    
    