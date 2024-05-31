from fastapi import APIRouter, Depends

from typing import Annotated, Sequence

from sqlalchemy.ext.asyncio import AsyncSession

from app.db import get_session
from app.models.quiz import Quiz
from app.schemas.quiz import QuizIn, QuizOut, QuizOutList
from app.schemas.quiz_check import QuizCheckIn, QuizCheckOut
from app.services import quiz as quiz_service
from app.services import quiz_check as file_check_service

router = APIRouter(tags=["Quiz"], prefix="/quiz")


@router.get("/", response_model=list[QuizOutList])
async def get_quizzes(session: Annotated[AsyncSession, Depends(get_session)]) -> Sequence[Quiz]:
    return await quiz_service.get_quizzes(session)


@router.post("/check/{quiz_id}", response_model=QuizCheckOut)
async def check_files(
    session: Annotated[AsyncSession, Depends(get_session)],
    quiz_id: str,
    file_check_in: QuizCheckIn,
) -> QuizCheckOut:
    return await file_check_service.check_files(session, quiz_id, file_check_in)


@router.post("/", response_model=QuizOut)
async def create_quiz(
    session: Annotated[AsyncSession, Depends(get_session)],
    quiz_in: QuizIn,
) -> Quiz:
    quiz = await quiz_service.create_quiz(session, quiz_in.model_dump())
    return quiz
