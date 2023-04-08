from typing import Union

from app.server.database import crud_user, models, schemas
from app.server.database.database import SessionLocal, engine
from sqlalchemy.orm import Session

models.Base.metadata.create_all(bind=engine)

from fastapi import Depends, FastAPI, HTTPException, Response, Request

app = FastAPI()


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

@app.post("/create_user/", response_model=schemas.User)
def create_user(user: schemas.UserCreate, db: Session = Depends(get_db)):
    print(user)

    if user.email or user.username:
        if user.email:
            db_user = crud_user.get_user_by_email(db, email=user.email)
            if db_user:
                raise HTTPException(status_code=400, detail=f"Email: '{user.email}' already registered.")
        else:
            db_user = crud_user.get_user_by_username(db, username=user.username)
            if db_user:
                raise HTTPException(status_code=400, detail=f"Username: '{user.username}' already registered.")
        db_user = crud_user.create_user(db=db, user=user)
        if db_user:
            return db_user
    else:
        raise HTTPException(status_code=400, detail="Expected email or username.")

    
        
    

# @app.get("/")
# def read_root():
#     # info = dict({"email": "max77648@gmail.com", "password": "1234"})
#     # return Excecutor.excecute_with_check(sql_str="select public.authotization(%s);", input_json=info)
#     test = {
#         "access_token": 'maxim',
#         "refresh_token": 'panov',
#         "expiration_time": 123456}
#     print(test)
#     return test



# @app.get('/sign_in')
# def sign_in():
#     pass

# @app.get('/sign_up')
# def sign_up():
#     pass

