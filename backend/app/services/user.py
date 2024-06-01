from fastapi import Depends

from typing import Annotated

from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from app.db import get_session
from app.models.user import User, UserRole


async def get_current_user(session: Annotated[AsyncSession, Depends(get_session)]) -> User:
    # TODO implement this properly
    stmt = select(User)
    user = (await session.execute(stmt)).first()

    if user is None:
        user = User(name="John Doe", email="ceramicy@example.com", password="password", role=UserRole.LECTURER)
        session.add(user)
        await session.commit()
    else:
        user = user[0]

    return user
