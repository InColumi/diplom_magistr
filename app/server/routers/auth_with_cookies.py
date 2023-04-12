from dependencies import pwd_context, get_db, credentials_exception, settings, has_access
from datetime import datetime, timedelta
from fastapi import APIRouter, Depends, HTTPException, Header, Request, Response
from fastapi.security import OAuth2PasswordRequestForm
from jose import JWTError, jwt
from sqlalchemy.orm import Session
from crud import crud_users
from typing import Annotated, Union
from schemas.user import UserCreate, UserOut, UserLogin
from schemas.token import Token
from fastapi.encoders import jsonable_encoder
from fastapi_jwt_auth import AuthJWT
from fastapi_jwt_auth.exceptions import *
from pydantic import BaseModel
from fastapi.responses import JSONResponse

router = APIRouter(tags=["auth"])

class SettingsJWT(BaseModel):
    authjwt_token_location: set = {"cookies"}

    authjwt_secret_key: str = settings.AUTHJWT_SECRET_KEY
    authjwt_access_token_expires: timedelta = 10
    # authjwt_refresh_token_expires: timedelta = timedelta(days=settings.AUTHJWT_REFRESH_TOKEN_EXPIRES)

    # authjwt_access_cookie_key: str = settings.AUTHJWT_SECRET_KEY
    # authjwt_refresh_cookie_key: str = 
    # authjwt_cookie_max_age: timedelta = settings.AUTHJWT_COOKIE_MAX_AGE
    # authjwt_cookie_secure: bool = True
    authjwt_cookie_csrf_protect: bool = False
    authjwt_cookie_samesite: str = 'lax'
    # authjwt_cookie_domain = 'localhost'

    
    

@AuthJWT.load_config
def get_config():
    return SettingsJWT()


def verify_password(plain_password, hashed_password):
    return pwd_context.verify(plain_password, hashed_password)


def authenticate_user(db: Session, user_id: str, password: str):
    user = crud_users.get_user_by_id(db=db, user_id=user_id)
    if not user:
        return False
    if not verify_password(password, user.hashed_password):
        return False
    return user


def create_token(data: str, Authorize: AuthJWT, response: Response):
    access_token = Authorize.create_access_token(subject=data, fresh=True)
    refresh_token = Authorize.create_refresh_token(subject=data)

    Authorize.set_access_cookies(access_token, response)
    Authorize.set_refresh_cookies(refresh_token, response)
    return response


@router.get('/user/me')
def get_user_me(Authorize: AuthJWT = Depends(), db: Session = Depends(get_db)):
    Authorize.fresh_jwt_required()
        
    user_id = Authorize.get_jwt_subject()

    db_user = crud_users.get_user_by_id(db, user_id)

    return UserOut(id=db_user.id, email=db_user.email, username=db_user.username, is_deleted=db_user.is_deleted)
    

@router.get('/refresh_token', status_code=200)
async def refresh(Authorize: AuthJWT = Depends()):
    Authorize.jwt_refresh_token_required()
    user_id = Authorize.get_jwt_subject()
        
    new_access_token = Authorize.create_access_token(subject=user_id, fresh=True)
    response = Response(status_code=200, content='Successfully refresh')
    Authorize.set_access_cookies(new_access_token, response)
        
    return response

@router.delete('/logout')
def logout(Authorize: AuthJWT = Depends()):
     Authorize.jwt_required()

     Authorize.unset_jwt_cookies()
     return {"msg":"Successfully logout"} 
    


@router.post('/sign_in')
async def sing_in(user: UserLogin, Authorize: AuthJWT = Depends(), db: Session = Depends(get_db)):
    db_user = crud_users.get_user_by_username(db, user.username)
    if not db_user:
        raise HTTPException(status_code=400, detail="Incorrect username or password")
    if not verify_password(user.password, db_user.hashed_password):
        raise HTTPException(status_code=400, detail="Incorrect username or password")
    try:
        user_id = jsonable_encoder(db_user.id)
        
        response = JSONResponse(status_code=200, content={"user": db_user.username})
        response = create_token(user_id, Authorize, response)
        return response
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))


@router.put('/sign_up')
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
    return JSONResponse(status_code=200, content="Sucess.")
    
