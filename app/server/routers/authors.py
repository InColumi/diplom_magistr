from dependencies import get_db, has_access
from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from crud import crud_authors
from typing import Annotated
from typing import Optional


router = APIRouter(tags=["authors"])


@router.post('/get_top_authors')
def get_top_authors(data: Annotated[dict, Depends(has_access)], count: Optional[int] = 10, db: Session = Depends(get_db)):
    user_id = data.get('user_id')
    if not user_id:
        raise Exception("Problem in '/get_top_authors': Not user_id")
    return crud_authors.get_top_by_rating(db, count)
