from typing import Any

from pydantic import field_validator, model_validator

from app.models.quiz import Quiz
from app.schemas.base import SchemaBase
from app.settings import settings


class QuizOutList(SchemaBase):
    id: str
    name: str
    main_language: str
    files_count: int

    @model_validator(mode="before")
    @classmethod
    def set_files_count(cls, data: Quiz) -> Quiz:
        data.files_count = len(data.file_urls)
        return data


class QuizOut(SchemaBase):
    id: str
    name: str
    author_id: str | None
    main_language: str
    file_urls: list[str]
    code_smells: dict[str, Any]


class QuizIn(SchemaBase):
    name: str
    main_language: str
    file_urls: list[str]
    code_smells: dict[str, Any]

    @field_validator("file_urls")
    @classmethod
    def check_file_url_domains(cls, v: list[str]) -> list[str]:
        if any(not url.startswith(settings.BLOB_STORAGE_URL) for url in v):
            raise ValueError("Files must be uploaded via /api/v1/file endpoint!")
        return v
