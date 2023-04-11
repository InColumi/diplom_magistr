from app.server.crud import crud_users
from app.server.crud.database import SessionLocal, engine
from sqlalchemy.orm import Session
from fastapi import Depends, FastAPI, HTTPException, Response, Request
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from typing import Annotated, Union
from jose import JWTError, jwt
from datetime import datetime, timedelta
from app.server.models import users
from app.server.schemas import user
from app.server.config import Config
from fastapi.encoders import jsonable_encoder

ALGORITHM = Config.ALGORITHM
SECRET_KEY = Config.SECRET_KEY


crud_users.Base.metadata.create_all(bind=engine)


app = FastAPI(redoc_url=None)

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token123")

@app.middleware("http")
async def db_session_middleware(request: Request, call_next):
    response = Response("Internal server error", status_code=500)
    try:
        request.state.db = SessionLocal()
        response = await call_next(request)
    finally:
        request.state.db.close()
    return response


# Dependency
def get_db(request: Request):
    return request.state.db

async def get_current_user(token: Annotated[str, Depends(oauth2_scheme)], db: Session(Depends(get_db))):
    credentials_exception = HTTPException(
        status_code=401,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        username: str = payload.get("username")
        if username is None:
            raise credentials_exception
        token_data = user.TokenData(username=username)
    except JWTError:
        raise credentials_exception
    user = crud_users.get_user_by_username(db=db, username=token_data.username)
    if user is None:
        raise credentials_exception
    return user

def create_access_token(data: dict, expires_delta: Union[timedelta, None] = None):
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.utcnow() + expires_delta
    else:
        expire = datetime.utcnow() + timedelta(minutes=15)
    to_encode.update({"expiration_time": expire})
    to_encode = jsonable_encoder(to_encode)
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt


@app.post("/token")
async def login(form_data: Annotated[OAuth2PasswordRequestForm, Depends()], db: Session = Depends(get_db)):
    user: user.UserInDB = crud_users.get_user_by_username(db=db, username=form_data.username)
    if user is None:
        raise HTTPException(status_code=400, detail="Incorrect username or password")
    if False == crud_users.check_password(hashed_password=user.hashed_password, password=form_data.password, salt=user.salt):
        raise HTTPException(status_code=400, detail="Incorrect username or password")

    access_token_expires = timedelta(minutes=Config.ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(data={"username": user.username}, expires_delta=access_token_expires)
    return {"access_token": access_token, "token_type": "bearer"}




@app.post("/create_user/", response_model=crud_users.UserOut, status_code=200)
def create_user(user: crud_users.UserCreate, db: Session = Depends(get_db)):
    if user.email or user.username:
        if user.email:
            db_user = crud_users.get_user_by_email(db, email=user.email)
            if db_user:
                raise HTTPException(status_code=400, detail=f"Email: '{user.email}' already registered.")
        else:
            db_user = crud_users.get_user_by_username(db, username=user.username)
            if db_user:
                raise HTTPException(status_code=400, detail=f"Username: '{user.username}' already registered.")
        db_user = crud_users.create_user(db=db, user=user)
        if db_user:
            return db_user
    else:
        raise HTTPException(status_code=400, detail="Expected email or username.")


