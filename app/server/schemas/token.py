from pydantic import BaseModel


class Token(BaseModel):
    user: str
    access_token: str
    refresh_token: str


class TokenRefresh(BaseModel):
    refresh_token: str
