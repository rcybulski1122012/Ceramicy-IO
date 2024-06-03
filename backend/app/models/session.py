from typing import TYPE_CHECKING, Any

from sqlalchemy import ForeignKey, func
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.models.base import Base

if TYPE_CHECKING:
    from app.models.quiz import Quiz
    from app.models.user import User


class Session(Base):
    __tablename__ = "session"

    id: Mapped[str] = mapped_column(primary_key=True, server_default=func.uuid_generate_v4())
    host_id: Mapped[str] = mapped_column(ForeignKey("user.id"))
    quiz_id: Mapped[str] = mapped_column(ForeignKey("quiz.id"))
    session_url: Mapped[str]

    host: Mapped["User"] = relationship()
    quiz: Mapped["Quiz"] = relationship()
    participants: Mapped[list["UserSession"]] = relationship(back_populates="session", cascade="all, delete-orphan")


class UserSession(Base):
    __tablename__ = "user_session"

    user_name: Mapped[str] = mapped_column(primary_key=True)
    session_id: Mapped[str] = mapped_column(ForeignKey("session.id"))
    solution: Mapped[dict[str, Any] | None] = mapped_column(default=None)

    session: Mapped[Session] = relationship(back_populates="participants")
