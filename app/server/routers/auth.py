from dependencies import pwd_context, get_db, credentials_exception, settings, has_access
from datetime import datetime, timedelta
from fastapi import APIRouter, Depends, HTTPException
from jose import JWTError, jwt
from sqlalchemy.orm import Session
from crud import crud_users
from typing import Annotated
from schemas.user import UserCreate, UserOut, UserLogin
from schemas.token import Token, TokenRefresh
from fastapi.encoders import jsonable_encoder

router = APIRouter(tags=["auth"])


def verify_password(plain_password, hashed_password):
    return pwd_context.verify(plain_password, hashed_password)


def authenticate_user(db: Session, user_id: str, password: str):
    user = crud_users.get_user_by_id(db=db, user_id=user_id)
    if not user:
        return False
    if not verify_password(password, user.hashed_password):
        return False
    return user


def create_access_token(data: dict) -> str:
    data['exp'] = datetime.utcnow() + timedelta(seconds=settings.ACCESS_TOKEN_EXPIRES)
    return jwt.encode(claims=data, key=settings.ACCESS_TOKEN_KEY)


def create_token(data: dict) -> Token:
    access_token = create_access_token(data)

    data['exp'] = datetime.utcnow() + timedelta(minutes=settings.REFERSH_TOKEN_EXPIRES)
    refresh_token = jwt.encode(claims=data, key=settings.REFERSH_TOKEN_KEY)
    return Token(user=data['user_id'], access_token=access_token, refresh_token=refresh_token)


async def get_current_user(data: Annotated[dict, Depends(has_access)], db: Session = Depends(get_db)) -> UserOut:
    user_id = data['user_id']
    db_user = crud_users.get_user_by_id(db, user_id)
    return UserOut(id=db_user.id, email=db_user.email, username=db_user.username, is_deleted=db_user.is_deleted)


async def get_active_current_user(user: Annotated[UserOut, Depends(get_current_user)]):
    if user.is_deleted:
        raise HTTPException(status_code=403, detail='User is not active.')
    return user


@router.get('/user/me', dependencies=[Depends(has_access)])
def get_user_me(user: Annotated[UserOut, Depends(get_active_current_user)]):
    return user


@router.post('/refresh_token')
async def refresh(token: TokenRefresh):
    try:
        data = jwt.decode(token.refresh_token, settings.REFERSH_TOKEN_KEY)
        new_access_token = create_access_token(data)

        return {'access_token': new_access_token}
    except JWTError:
        raise credentials_exception


@router.post('/sign_in')
async def sing_in(user: UserLogin,  db: Session = Depends(get_db)):
    db_user = crud_users.get_user_by_email_or_username(db, user.username_or_email)
    if not db_user:
        raise HTTPException(status_code=400, detail="Incorrect username or password")
    if not verify_password(user.password, db_user.hashed_password):
        raise HTTPException(status_code=400, detail="Incorrect username or password")
    try:
        data = {'user_id': jsonable_encoder(db_user.id)}
        token = create_token(data)
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))
    return token


@router.put('/sign_up', status_code=200)
async def sign_up(user: UserCreate, db: Session = Depends(get_db)):
    if user.email:
        db_user = crud_users.get_user_by_email(db, user.email)
        if db_user:
            raise HTTPException(status_code=400, detail=f"Email: '{user.email}' already registered.")
    if user.username:
        db_user = crud_users.get_user_by_username(db, user.username)
        if db_user:
            raise HTTPException(status_code=400, detail=f"Username: '{user.username}' already registered.")
    db_user = crud_users.create_user(db, user)
    if db_user:
        raise HTTPException(status_code=201, detail="Sucess.")
