from sqlalchemy.ext.asyncio import AsyncSession
from app.schemas.quiz_check import QuizCheckIn, QuizCheckOut, Smell
from app.services.quiz import get_quiz_by_id
from app.models.quiz import Quiz


def score_smells(file_check_in: QuizCheckIn, db_quiz: Quiz) -> QuizCheckOut:
    quiz_id = file_check_in.quiz_id
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

    print("Bagno")

    for file in db_smells:
        not_found_smells[file] = db_smells[file]
        incorrect_smells[file] = []
        correct_smells[file] = []

    print("Bagno")

    for file in response_smells:
        if file not in db_smells:
            print(type(file))
            print(type(db_smells))
            print(type(db_smells[0]))
            incorrect_smells[file] = response_smells[file]
        else:
            print(type(file))
            print(type(db_smells))
            print(db_smells)
            for smell in response_smells[file]:
                print(smell)
                print(response_smells[file])
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
        quiz_id=quiz_id,
        score=max(0, score),
        not_found_smells=not_found_smells,
        incorrect_smells=incorrect_smells,
        correct_smells=correct_smells,
    )


async def check_files(session: AsyncSession, file_check_in: QuizCheckIn) -> QuizCheckOut:
    quiz_id = file_check_in.quiz_id
    print(quiz_id)
    db_quiz = await get_quiz_by_id(session, quiz_id)
    return score_smells(file_check_in, db_quiz)
