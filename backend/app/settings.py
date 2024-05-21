import os
from functools import lru_cache
from pathlib import Path

from pydantic import PostgresDsn
from pydantic_settings import BaseSettings

APP_ROOT_PATH = Path(__file__).parent


class Settings(BaseSettings):
    POSTGRES_URL: PostgresDsn
    BLOB_STORAGE_CONNECTION_STRING: str
    BLOB_STORAGE_CONTAINER_NAME: str
    BLOB_ACCOUNT_NAME: str

    class Config:
        extra = "allow"
        if os.environ.get("PYTEST"):
            env_file = APP_ROOT_PATH.parent / ".test.env"
        else:
            env_file = APP_ROOT_PATH.parent / ".env"

    @property
    def BLOB_STORAGE_URL(self) -> str:
        return f"https://{self.BLOB_ACCOUNT_NAME}.blob.core.windows.net/{self.BLOB_STORAGE_CONTAINER_NAME}"


@lru_cache
def get_settings():
    return Settings()


settings = get_settings()
