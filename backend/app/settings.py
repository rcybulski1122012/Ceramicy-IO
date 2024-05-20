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

    @property
    def BLOB_STORAGE_URL(self) -> str:
        return f"https://{self.BLOB_ACCOUNT_NAME}.blob.core.windows.net/{self.BLOB_STORAGE_CONTAINER_NAME}"


@lru_cache
def get_settings():
    return Settings()


settings = get_settings()
