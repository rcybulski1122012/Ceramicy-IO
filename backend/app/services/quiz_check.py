from sqlalchemy.ext.asyncio import AsyncSession
from app.schemas.quiz_check import QuizCheckIn, QuizCheckOut
from app.services.quiz import get_quiz_by_id
from app.schemas.quiz_check import Smell


async def check_files(session: AsyncSession, file_check_in: QuizCheckIn) -> QuizCheckOut:
    quiz_id = file_check_in.quiz_id
    db_quiz = await get_quiz_by_id(session, quiz_id)
    db_smells = db_quiz.code_smells
    # assert isinstance(db_smells, dict) TODO: it fails!
    # db_smells = {
    #                 "http://example.com/": [
    #                     Smell(start=1, end=5, type="smell1"),
    #                     Smell(start=1, end=5, type="smell2"),
    #                     Smell(start=1, end=5, type="smell3"),
    #                     Smell(start=1, end=5, type="smell4"),
    #                 ]
    #             } 
    # TODO: with the dict above, the tests will pass, 
    # even tho it should be the same dict as the one 
    # in the mock_get_quiz_by_id
   
    response_files = [file for file in file_check_in.files]
    response_smells = {}
    for file in response_files:
        response_smells[str(file.file_url)] = []
        for smell in file.smells:
            response_smells[str(file.file_url)].append(smell)

    incorrect_smells = {}
    not_found_smells = {}
    
    for file in db_smells:
        not_found_smells[file] = db_smells[file]
        incorrect_smells[file] = []
            
    for file in response_smells:
        if file not in db_smells:
            incorrect_smells[file] = response_smells[file]
        else:
            for smell in response_smells[file]:
                if smell in db_smells[file]:
                    not_found_smells[file].remove(smell)
                else:
                    incorrect_smells[file].append(smell)
    
    score = 0
    for file in db_smells:
        score += len(db_smells[file])
        score -= len(not_found_smells[file]) + len(incorrect_smells[file])

    return QuizCheckOut(quiz_id=quiz_id, score=max(0, score), not_found_smells=not_found_smells, incorrect_smells=incorrect_smells)
