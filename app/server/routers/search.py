from dependencies import get_db, has_access
from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from typing import Annotated
from crud import crud_books
from schemas.books import BookOut
from schemas.search import SmartSearch
import fastapi_pagination

router = APIRouter(tags=["search"])


@router.post('/search', response_model=fastapi_pagination.Page[BookOut])
def smart_search(data: Annotated[dict, Depends(has_access)], input: SmartSearch, db: Session = Depends(get_db)):
    user_id = data.get('user_id')
    if not user_id:
        raise Exception("Problem in '/search': Not user_id")
    books = crud_books.get_books_by_smart_search(db=db, phrase=input.phrase, user_id=user_id)
    return fastapi_pagination.paginate(books)

fastapi_pagination.add_pagination(router)