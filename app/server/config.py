from pydantic import BaseSettings
from typing import Union, Optional
from datetime import timedelta

class Settings(BaseSettings):
    CONNECT_STRING: str
    
    REFERSH_TOKEN_KEY: str
    REFERSH_TOKEN_EXPIRES: int
    ACCESS_TOKEN_KEY: str
    ACCESS_TOKEN_EXPIRES: int



    # AUTHJWT_SECRET_KEY: str
    # AUTHJWT_ACCESS_TOKEN_EXPIRES: Optional[int] = None
    # AUTHJWT_REFRESH_TOKEN_EXPIRES: Optional[int] = None

    # # cookies
    # AUTHJWT_COOKIE_MAX_AGE: Optional[int] = None
    # AUTHJWT_COOKIE_SECURE: Optional[bool] = False

    
    # AUTHJWT_REFRESH_COOKIE_KEY: str
    HOST: str
    PORT: int

    class Config:
        env_file = 'app\server\.env'