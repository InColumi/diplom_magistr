from dependencies import pwd_context, get_db, credentials_exception, settings, has_access
from datetime import datetime, timedelta
from fastapi import APIRouter, Depends, HTTPException, Header
from fastapi.security import OAuth2PasswordRequestForm
from jose import JWTError, jwt
from sqlalchemy.orm import Session
from crud import crud_users
from typing import Annotated
from schemas.user import UserCreate, UserOut
from schemas.token import Token
from fastapi.encoders import jsonable_encoder

router = APIRouter(tags=["auth"])


async def verify_password(plain_password, hashed_password):
    return pwd_context.verify(plain_password, hashed_password)


async def authenticate_user(db: Session, user_id: str, password: str):
    user = crud_users.get_user_by_id(db=db, user_id=user_id)
    if not user:
        return False
    if not verify_password(password, user.hashed_password):
        return False
    return user


async def create_token(data: dict) -> Token:
    data_copy = data.copy()
    expiration_time = datetime.utcnow() + timedelta(minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES)
    data_copy['exp'] = expiration_time
    access_token = jwt.encode(claims=data_copy, key=settings.ACCESS_TOKEN_SECRET_KEY)

    expiration_time = datetime.utcnow() + timedelta(days=settings.REFRESH_TOKEN_EXPIRE_DAYS)
    data_copy['exp'] = expiration_time
    refresh_token = jwt.encode(claims=data_copy, key=settings.REFRESH_TOKEN_SECRET_KEY)
    return Token(access_token=access_token, refresh_token=refresh_token, expiration_time=settings.ACCESS_TOKEN_EXPIRE_MINUTES * 1000)


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
    

@router.post('/refresh_token', status_code=200)
async def refresh(token: str = Depends(has_access)):
    try:
        data = jwt.decode(token, settings.REFRESH_TOKEN_SECRET_KEY)
        expiration_time = datetime.utcnow() + timedelta(minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES)
        data['exp'] = expiration_time
        access_token = jwt.encode(claims=data, key=settings.ACCESS_TOKEN_SECRET_KEY)
        return {'accecc_token': access_token}
    except JWTError:
        raise credentials_exception


@router.post('/sing_in')
async def sing_in(form_data: Annotated[OAuth2PasswordRequestForm, Depends()], db: Session = Depends(get_db)):
    db_user = crud_users.get_user_by_username(db, form_data.username)
    if not db_user:
        raise HTTPException(status_code=400, detail="Incorrect username or password")
    if not verify_password(form_data.password, db_user.hashed_password):
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
