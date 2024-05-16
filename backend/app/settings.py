from functools import lru_cache

from pydantic import PostgresDsn
from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    POSTGRES_URL: PostgresDsn
    BLOB_STORAGE_CONNECTION_STRING: str
    BLOB_STORAGE_CONTAINER_NAME: str
    BLOB_ACCOUNT_NAME: str

    class Config:
        extra = "allow"
        env_file = "./.env"


@lru_cache
def get_settings():
    return Settings()


settings = get_settings()
