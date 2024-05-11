from datetime import datetime
from typing import Any

from sqlalchemy import func, JSON, ARRAY, String
from sqlalchemy.orm import DeclarativeBase, Mapped, mapped_column


class Base(DeclarativeBase):
    type_annotation_map = {
        dict[str, Any]: JSON,
        list[str]: ARRAY(String)
    }

    created_at: Mapped[datetime] = mapped_column(insert_default=func.now())
    updated_at: Mapped[datetime | None] = mapped_column(default=None, server_onupdate=func.now())
