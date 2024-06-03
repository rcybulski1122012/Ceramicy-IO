from fastapi import HTTPException, status

from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from app.models.session import Session, UserSession
from app.models.user import User
from app.services.quiz import get_quiz_by_id


async def create_session(db_session: AsyncSession, quiz_id: str, current_user: User, session_url: str) -> Session:
    await get_quiz_by_id(db_session, quiz_id)
    session_obj = Session(quiz_id=quiz_id, host=current_user, session_url=session_url)
    db_session.add(session_obj)
    await db_session.commit()
    await db_session.refresh(session_obj)
    await session_obj.awaitable_attrs.quiz

    return session_obj


async def get_session_by_id(db_session: AsyncSession, session_id: str) -> Session:
    statement = select(Session).filter(Session.id == session_id)
    result = await db_session.execute(statement)
    session = result.scalar_one_or_none()
    if session is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Session not found")
    return session


async def join_session(db_session: AsyncSession, session_id: str, user_name: str) -> Session:
    session_obj = await get_session_by_id(db_session, session_id)
    session_association = UserSession(user_name=user_name, session_id=session_id)
    db_session.add(session_association)
    await db_session.commit()
    await session_obj.awaitable_attrs.quiz

    return session_obj


async def delete_session(db_session: AsyncSession, session_id: str, current_user_id: str) -> None:
    session_obj = await get_session_by_id(db_session, session_id)

    if session_obj.host_id != current_user_id:
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="You are not the host of this session")

    await db_session.delete(session_obj)
    await db_session.commit()
