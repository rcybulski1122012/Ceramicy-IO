from sqlalchemy.ext.asyncio import AsyncSession
from app.schemas.quiz_check import QuizCheckIn, QuizCheckOut
from app.services.quiz import get_quiz_by_id


async def check_files(session: AsyncSession, file_check_in: QuizCheckIn) -> QuizCheckOut:
    quiz_id = file_check_in.quiz_id
    db_quiz = await get_quiz_by_id(session, quiz_id)
    db_smells = db_quiz.smells
    response_smells = [smell for file in file_check_in.files for smell in file.smells]
    score = len(db_smells)
    details = [] 

    for smell in response_smells:
        if smell not in db_smells:
            score -= 1
            details.append(f"Incorrect smell: {smell} was not found in the answers")

    for smell in db_smells:
        if smell not in response_smells:
            score -= 1
            details.append(f"Correct smell: {smell} was not found in the response")

    return QuizCheckOut(quiz_id=quiz_id, score=max(0, score), details=details)
