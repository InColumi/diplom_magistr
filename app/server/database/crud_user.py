from sqlalchemy.orm import Session

from . import models, schemas

def get_user(db: Session, user_id: int):
    return db.query(models.User).filter(models.User.id == user_id).first()

def get_user_by_email(db: Session, email: str):
    return db.query(models.User).filter(models.User.email == email).first()

def get_user_by_username(db: Session, username: str):
    return db.query(models.User).filter(models.User.username == username).first()

def create_user(db: Session, user: schemas.UserCreate):
    fake_salt = "salt"
    fake_hashed_password = user.password + fake_salt
    print(123)
    print(user)
    db_user = models.User(email=user.email, username=user.username, hashed_password=fake_hashed_password, salt=fake_salt)
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user