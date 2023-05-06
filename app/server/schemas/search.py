from pydantic import BaseModel, validator
import re

txt = "The rain in Spain"

class SmartSearch(BaseModel):
    phrase: str

    @validator('phrase')
    def clear(cls, value: str):
        return value.strip().lower()
            
