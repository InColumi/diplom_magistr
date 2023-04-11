from dependencies import pwd_context, get_db, oauth2_scheme
from datetime import datetime, timedelta
from fastapi import APIRouter, Depends, HTTPException
from fastapi.security import OAuth2PasswordRequestForm
from jose import JWTError, jwt
from sqlalchemy.orm import Session
from crud import crud_users
from typing import Annotated, Union
from schemas.user import UserCreate, UserOut
from schemas.token import Token
from config import Config
from fastapi.encoders import jsonable_encoder

router = APIRouter(tags=["auth"])

# @lru_cache()
# def get_settings():
#     return Settings()

def verify_password(plain_password, hashed_password):
    return pwd_context.verify(plain_password, hashed_password)


def authenticate_user(db: Session, user_id: str, password: str):
    user = crud_users.get_user_by_id(db=db, user_id=user_id)
    if not user:
        return False
    if not verify_password(password, user.hashed_password):
        return False
    return user
    

def create_token(data: dict) -> Token:
    data_copy = data.copy()
    expiration_time = datetime.utcnow() + timedelta(Config.ACCESS_TOKEN_EXPIRE_MINUTES)
    data_copy['exp'] = expiration_time
    access_token = jwt.encode(claims=data_copy, key=Config.ACCESS_TOKEN_SECRET_KEY)

    expiration_time = datetime.utcnow() + timedelta(Config.REFRESH_TOKEN_EXPIRE_DAYS)
    data_copy['exp'] = expiration_time
    refresh_token = jwt.encode(claims=data_copy, key=Config.REFRESH_TOKEN_SECRET_KEY)
    return Token(access_token=access_token, refresh_token=refresh_token, expiration_time=Config.ACCESS_TOKEN_EXPIRE_MINUTES * 1000)


@router.post('/refresh_token', status_code=200)
def refresh(token: str):
    credentials_exception = HTTPException(
        status_code=401,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        data = jwt.decode(token, Config.REFRESH_TOKEN_SECRET_KEY)
        expiration_time = datetime.utcnow() + timedelta(Config.ACCESS_TOKEN_EXPIRE_MINUTES)
        data['exp'] = expiration_time
        access_token = jwt.encode(claims=data, key=Config.ACCESS_TOKEN_SECRET_KEY)
        return {'accecc_token': access_token}
    except JWTError:
        raise credentials_exception



@router.post('/sing_in')
def sing_in(form_data: Annotated[OAuth2PasswordRequestForm, Depends()], db: Session = Depends(get_db)):
    db_user = crud_users.get_user_by_username(db, form_data.username)
    if not db_user:
        raise HTTPException(status_code=400, detail=f"Incorrect username or password")
    if not verify_password(form_data.password, db_user.hashed_password):\
        raise HTTPException(status_code=400, detail=f"Incorrect username or password")
    try:
        data = {'user_id': jsonable_encoder(db_user.id)}
        token = create_token(data)
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))
    return token


@router.put('/sign_up', status_code=200)
def sign_up(user: UserCreate, db: Session = Depends(get_db)):
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


# @router.post('/user/me', response_model=UserOut, status_code=200)
# def read_user_me(token: Annotated[str, Depends(oauth2_scheme)], db: Session = Depends(get_db)):
#     credentials_exception = HTTPException(
#         status_code=401,
#         detail="Could not validate credentials",
#         headers={"WWW-Authenticate": "Bearer"},
#     )
#     try:
#         payload = jwt.decode(token, SECRET_KEY)
#     except JWTError:
#         raise credentials_exception
#     user_id = payload.get('id')
#     if not user_id:
#         raise credentials_exception
#     user = crud_users.get_user_by_id(db, user_id)
#     print('user', user)
#     return UserOut(**user)