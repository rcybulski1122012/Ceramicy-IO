from functools import lru_cache

from pydantic import PostgresDsn
from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    POSTGRES_URL: PostgresDsn

    class Config:
        extra = "allow"
        env_file = "./.env"


@lru_cache
def get_settings():
    return Settings()


settings = get_settings()
