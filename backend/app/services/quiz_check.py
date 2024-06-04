from sqlalchemy.ext.asyncio import AsyncSession

from app.models.quiz import Quiz
from app.schemas.quiz_check import QuizCheckIn, QuizCheckOut
from app.services.quiz import get_quiz_by_id


def score_smells(file_check_in: QuizCheckIn, db_quiz: Quiz) -> QuizCheckOut:
    db_smells = db_quiz.code_smells
    response_files = [file for file in file_check_in.files]
    response_smells = {}
    for file in response_files:
        response_smells[str(file.file_url)] = []
        for smell in file.smells:
            response_smells[str(file.file_url)].append(smell)

    incorrect_smells = {}
    not_found_smells = {}
    correct_smells = {}

    for file in db_smells:
        not_found_smells[file] = db_smells[file]
        incorrect_smells[file] = []
        correct_smells[file] = []

    for file in response_smells:
        if file not in db_smells:
            incorrect_smells[file] = response_smells[file]
        else:
            for smell in response_smells[file]:
                if smell in db_smells[file]:
                    not_found_smells[file].remove(smell)
                    correct_smells[file].append(smell)
                else:
                    incorrect_smells[file].append(smell)

    score = 0
    for file in db_smells:
        score += len(db_smells[file])
        score -= len(not_found_smells[file]) + len(incorrect_smells[file])

    return QuizCheckOut(
        score=max(0, score),
        not_found_smells=not_found_smells,
        incorrect_smells=incorrect_smells,
        correct_smells=correct_smells,
    )


async def check_files(session: AsyncSession, quiz_id: str, file_check_in: QuizCheckIn) -> QuizCheckOut:
    db_quiz = await get_quiz_by_id(session, quiz_id)
    return score_smells(file_check_in, db_quiz)
