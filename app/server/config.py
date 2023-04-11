from pydantic import BaseSettings


class Settings(BaseSettings):
    CONNECT_STRING: str
    
    ACCESS_TOKEN_SECRET_KEY: str
    ACCESS_TOKEN_EXPIRE_MINUTES: int

    REFRESH_TOKEN_SECRET_KEY: str
    REFRESH_TOKEN_EXPIRE_DAYS: int

    HOST: str
    PORT: int

    class Config:
        env_file = 'app\server\.env'
