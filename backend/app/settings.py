from functools import lru_cache
from pathlib import Path

from pydantic import PostgresDsn
from pydantic_settings import BaseSettings

APP_ROOT_PATH = Path(__file__).parent

class Settings(BaseSettings):
    POSTGRES_URL: PostgresDsn

    class Config:
        extra = "allow"
        env_file = APP_ROOT_PATH.parent / ".env"


@lru_cache
def get_settings():
    return Settings()


settings = get_settings()
