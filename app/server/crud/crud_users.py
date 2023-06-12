from sqlalchemy.orm import Session
from sqlalchemy import or_
from dependencies import pwd_context
from models.users import User
from schemas.user import UserCreate
from pydantic import EmailStr


def get_user_by_id(db: Session, user_id: int):
    return db.query(User).filter(User.id == user_id).first()


def get_user_by_email(db: Session, email: EmailStr):
    return db.query(User).filter(User.email == email).first()


def get_user_by_email_or_username(db: Session, email_or_username: str):
    user = db.query(User).filter(or_(User.email == email_or_username, User.username == email_or_username)).first()
    if user:
        return user


def get_user_by_username(db: Session, username: str):
    return db.query(User).filter(User.username == username).first()


def get_password_hash(password):
    return pwd_context.hash(password)


def delete_by_id(db: Session, user_id: str):
    return db.query(User).filter(User.id == user_id).delete()


def create_user(db: Session, user: UserCreate):
    hashed_password = get_password_hash(user.password)
    db_user = User(email=user.email, username=user.username, hashed_password=hashed_password)
    try:
        db.add(db_user)
        db.commit()
        db.refresh(db_user)
    except Exception as e:
        raise Exception(str(e))
    print('Was created', db_user)
    return db_user
