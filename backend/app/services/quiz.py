from typing import Any, Sequence

from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession
from fastapi import HTTPException

from app.models.quiz import Quiz


async def get_quizzes(session: AsyncSession) -> Sequence[Quiz]:
    statement = select(Quiz).order_by(Quiz.created_at)
    result = await session.execute(statement)
    return result.scalars().all()


async def get_quiz_by_id(session: AsyncSession, quiz_id: str) -> Quiz:
    statement = select(Quiz).filter(Quiz.id == quiz_id)
    result = await session.execute(statement)
    quiz = await result.scalar_one_or_none()
    if quiz is None:
        raise HTTPException(status_code=404, detail="Quiz not found")
    return quiz
async def create_quiz(session: AsyncSession, quiz: dict[str, Any]) -> Quiz:
    _quiz = Quiz(**quiz)
    session.add(_quiz)
    await session.commit()
    return _quiz
