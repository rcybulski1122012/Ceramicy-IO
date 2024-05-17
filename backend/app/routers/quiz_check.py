from fastapi import APIRouter, Depends
from typing import Annotated
from sqlalchemy.ext.asyncio import AsyncSession
from app.db import get_session
from backend.app.schemas.quiz_check import QuizCheckIn, QuizCheckOut
from backend.app.services import quiz_check as file_check_service

router = APIRouter(tags=["Quiz Check"], prefix="/file_check")


@router.post("/", response_model=QuizCheckOut)
async def check_files(
    session: Annotated[AsyncSession, Depends(get_session)],
    file_check_in: QuizCheckIn,
) -> QuizCheckOut:
    return await file_check_service.check_files(session, file_check_in)
