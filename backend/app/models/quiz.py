from typing import Any

from sqlalchemy import String, func
from sqlalchemy.orm import Mapped, mapped_column

from app.models.base import Base


class Quiz(Base):
    __tablename__ = "quiz"

    id: Mapped[str] = mapped_column(primary_key=True, server_default=func.gen_random_uuid())
    name: Mapped[str] = mapped_column(String(100))
    # author_id: Mapped[str | None] = mapped_column(ForeignKey("user.id"))
    main_language: Mapped[str]
    file_urls: Mapped[list[str]]
    code_smells: Mapped[dict[str, Any]]

