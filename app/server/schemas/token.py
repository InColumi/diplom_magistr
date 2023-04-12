from pydantic import BaseModel
from datetime import datetime

class Token(BaseModel):
    user: str
    access_token: str
    refresh_token: str

class TokenRefresh(BaseModel):
    refresh_token: str
