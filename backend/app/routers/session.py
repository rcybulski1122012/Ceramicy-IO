from fastapi import APIRouter, Depends

from typing import Annotated

from sqlalchemy.ext.asyncio import AsyncSession

import app.services.session as session_service
import app.services.quiz_check as quiz_check_service
from app.db import get_session
from app.models.session import Session
from app.models.user import User
from app.schemas.session import SessionIn, SessionJoinIn, SessionOut, UserSessionRankingOut
from app.schemas.quiz_check import UserQuizSolutionIn, QuizCheckOut
from app.services.user import get_current_user

router = APIRouter(tags=["Session"], prefix="/session")


@router.post("/", response_model=SessionOut)
async def create_session(
    db_session: Annotated[AsyncSession, Depends(get_session)],
    current_user: Annotated[User, Depends(get_current_user)],
    session_in: SessionIn,
) -> Session:
    return await session_service.create_session(db_session, session_in.quiz_id, current_user)


@router.get("/{session_id}", response_model=SessionOut)
async def get_session_obj(db_session: Annotated[AsyncSession, Depends(get_session)], session_id: str) -> Session:
    session_obj = await session_service.get_session_by_id(db_session, session_id)
    await session_obj.awaitable_attrs.quiz
    return session_obj


@router.post("/{session_id}/join", response_model=SessionOut)
async def join_session(
    db_session: Annotated[AsyncSession, Depends(get_session)], session_id: str, session_join_in: SessionJoinIn
) -> Session:
    return await session_service.join_session(db_session, session_id, session_join_in.user_name)


@router.delete("/{session_id}")
async def delete_session(
    db_session: Annotated[AsyncSession, Depends(get_session)],
    current_user: Annotated[User, Depends(get_current_user)],
    session_id: str,
) -> str:
    await session_service.delete_session(db_session, session_id, current_user.id)
    return session_id


@router.get("/{session_id}/ranking", response_model=list[UserSessionRankingOut])
async def get_session_ranking(
    db_session: Annotated[AsyncSession, Depends(get_session)], session_id: str
) -> list[UserSessionRankingOut]:
    return await session_service.get_session_ranking(db_session, session_id)


@router.post("/{session_id}/solution/submit", response_model=QuizCheckOut)
async def check_solution(
    db_session: Annotated[AsyncSession, Depends(get_session)],
    session_id: str,
    files_in: UserQuizSolutionIn,
) -> QuizCheckOut:
    await session_service.assign_solution_to_user_session(db_session, session_id, files_in.user_name)
    session = await session_service.get_session_by_id(db_session, session_id)
    return await quiz_check_service.check_files(db_session, session.quiz_id, files_in)
