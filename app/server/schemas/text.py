from pydantic import BaseModel


class Text(BaseModel):
    text: str
    count_pages: int
    current_pages: int