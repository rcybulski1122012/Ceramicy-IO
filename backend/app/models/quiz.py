from typing import Any, TYPE_CHECKING, Optional

from sqlalchemy import func, ForeignKey
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.models.base import Base

if TYPE_CHECKING:
    from app.models.user import User
    from app.models.session import Session


class Quiz(Base):
    __tablename__ = "quiz"

    id: Mapped[str] = mapped_column(primary_key=True, server_default=func.gen_random_uuid())
    name: Mapped[str]
    author_id: Mapped[Optional[str]] = mapped_column(ForeignKey("user.id"))
    main_language: Mapped[str]
    file_urls: Mapped[list[str]]
    code_smells: Mapped[dict[str, Any]]

    author: Mapped[Optional["User"]] = relationship(back_populates="created_quizzes")


class UserQuizAssociation(Base):
    __tablename__ = "user_quiz"

    id: Mapped[str] = mapped_column(primary_key=True, server_default=func.gen_random_uuid())
    user_id: Mapped[str] = mapped_column(ForeignKey("user.id"))
    quiz_id: Mapped[str] = mapped_column(ForeignKey("quiz.id"))
    session_id: Mapped[Optional[str]] = mapped_column(ForeignKey("session.id"))
    solution: Mapped[dict[str, Any]]
    score: Mapped[float]

    user: Mapped["User"] = relationship()
    quiz: Mapped["Quiz"] = relationship()
    session: Mapped[Optional["Session"]] = relationship(back_populates="user_quiz_association")


