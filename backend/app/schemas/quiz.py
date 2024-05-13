from pydantic import model_validator

from app.models.quiz import Quiz
from app.schemas.base import SchemaBase


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

