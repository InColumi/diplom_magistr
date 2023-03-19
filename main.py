from typing import Union
from app.server.auth.database.connect import Excecutor

from fastapi import FastAPI

app = FastAPI()

@app.get("/")
def read_root():
    return Excecutor.raw_excecute("""select now()::date;""")


@app.get("/items/{item_id}")
def read_item(item_id: int, q: Union[str, None] = None):
    return {"item_id": item_id, "q": q}
