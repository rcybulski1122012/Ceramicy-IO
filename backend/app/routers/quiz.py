from typing import Annotated, Sequence

from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession

from app.db import get_session
from app.models.quiz import Quiz
from app.schemas.quiz import QuizOutList
from app.services import quiz as quiz_service

router = APIRouter(tags=["Quiz"], prefix="/quiz")


@router.get("/", response_model=list[QuizOutList])
async def get_quizzes(session: Annotated[AsyncSession, Depends(get_session)]) -> Sequence[Quiz]:
    return await quiz_service.get_quizzes(session)
