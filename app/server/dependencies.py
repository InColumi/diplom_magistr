from passlib.context import CryptContext
from fastapi import HTTPException, Depends
from fastapi.security import HTTPAuthorizationCredentials, HTTPBearer
from config import Settings
from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from jose import JWTError, jwt

settings = Settings()

SQLALCHEMY_DATABASE_URL = settings.CONNECT_STRING

engine = create_engine(SQLALCHEMY_DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()


pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

credentials_exception = HTTPException(
        status_code=401,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )


def has_access(credentials: HTTPAuthorizationCredentials = Depends(HTTPBearer())):
    token = credentials.credentials
    if not token:
        raise credentials_exception
    try:
        return jwt.decode(token, settings.ACCESS_TOKEN_KEY, options={'require_exp': True})
    except JWTError as e:
        raise HTTPException(status_code=401, detail=str(e))


def get_db():
    db = SessionLocal()
    try:
        yield db
    except Exception as e:
        print(str(e))
        db.rollback()
    finally:
        db.close()
