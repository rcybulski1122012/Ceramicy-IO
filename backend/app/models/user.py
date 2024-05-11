from enum import StrEnum

from sqlalchemy import func
from sqlalchemy.orm import Mapped, mapped_column

from app.models.base import Base


class UserRole(StrEnum):
    STUDENT = "STUDENT"
    LECTURER = "LECTURER"


class User(Base):
    __tablename__ = "user"

    id: Mapped[str] = mapped_column(primary_key=True, server_default=func.gen_random_uuid())
    name: Mapped[str]
    email: Mapped[str] = mapped_column(unique=True)
    password: Mapped[str]
    role: Mapped[UserRole]

