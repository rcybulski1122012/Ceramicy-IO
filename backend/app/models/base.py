from typing import Annotated

from sqlalchemy.orm import DeclarativeBase


class Base(DeclarativeBase):
    pass


str100 = Annotated[str, 100]
