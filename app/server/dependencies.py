from passlib.context import CryptContext
from fastapi.security import OAuth2PasswordBearer
from database import SessionLocal

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
