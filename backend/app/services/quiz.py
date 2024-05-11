from typing import Sequence

from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from app.models.quiz import Quiz


async def get_quizzes(session: AsyncSession) -> Sequence[Quiz]:
    statement = select(Quiz).order_by(Quiz.created_at)
    result = await session.execute(statement)
    return result.scalars().all()
