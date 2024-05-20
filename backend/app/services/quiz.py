from typing import Any, Sequence

from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from app.models.quiz import Quiz


async def get_quizzes(session: AsyncSession) -> Sequence[Quiz]:
    statement = select(Quiz).order_by(Quiz.created_at)
    result = await session.execute(statement)
    return result.scalars().all()


async def create_quiz(session: AsyncSession, quiz: dict[str, Any]) -> Quiz:
    _quiz = Quiz(**quiz)
    session.add(_quiz)
    await session.commit()
    return _quiz
