from enum import StrEnum

from sqlalchemy import String, func
from sqlalchemy.orm import Mapped, mapped_column

from app.models.base import Base


class UserRole(StrEnum):
    STUDENT = "STUDENT"
    LECTURER = "LECTURER"


class User(Base):
    __tablename__ = "user"

    id: Mapped[str] = mapped_column(primary_key=True, server_default=func.gen_random_uuid())
    name: Mapped[str] = mapped_column(String(100))
    email: Mapped[str] = mapped_column(String(100), unique=True)
    password: Mapped[str]
    role: Mapped[UserRole]

