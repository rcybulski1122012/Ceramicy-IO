from sqlalchemy.ext.asyncio import AsyncSession
from app.schemas.quiz_check import QuizCheckIn, QuizCheckOut
from app.services.quiz import get_quiz_by_id
from collections import defaultdict


async def check_files(session: AsyncSession, file_check_in: QuizCheckIn) -> QuizCheckOut:
    quiz_id = file_check_in.quiz_id
    db_quiz = await get_quiz_by_id(session, quiz_id)
    db_smells = db_quiz.code_smells
    score = len(db_smells)

    incorrect_smells = defaultdict(list)
    not_found_smells = defaultdict(list)

    response_files = [file for file in file_check_in.files]
    for response_file in response_files:
        for smell in response_file.smells:
            if smell not in db_smells:
                score -= 1
                incorrect_smells[response_file].append(smell)


    response_smells = [smell for file in response_files for smell in file.smells]
    for file, smell in db_smells:
        if smell not in response_smells:
            score -= 1
            not_found_smells[file].append(smell)

    return QuizCheckOut(quiz_id=quiz_id, score=max(0, score), not_found_smells=not_found_smells, incorrect_smells=incorrect_smells)
