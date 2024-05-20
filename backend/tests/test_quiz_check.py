from unittest import IsolatedAsyncioTestCase

from app.models.quiz import Quiz
from app.schemas.quiz_check import QuizCheckIn, QuizCheckOut
from app.routers.quiz import router
from app.schemas.quiz_check import Smell, File
from app.services.quiz_check import score_smells


class TestQuizRouter(IsolatedAsyncioTestCase):
    async def test_check_files(self):

        quiz = Quiz(
            code_smells={
                "http://example.com/": [
                    Smell(start=1, end=5, type="smell1"),
                    Smell(start=1, end=5, type="smell2"),
                    Smell(start=1, end=5, type="smell3"),
                    Smell(start=1, end=5, type="smell4"),
                ]
            }
        )

        check_in = QuizCheckIn(
            quiz_id="quiz_id",
            files=[
                File(
                    file_url="http://example.com/",
                    smells=[
                        Smell(start=1, end=5, type="smell1"),
                        Smell(start=1, end=5, type="smell2"),
                        Smell(start=1, end=5, type="smell5"),
                    ],
                )
            ],
        )

        check_out = QuizCheckOut(
            quiz_id="quiz_id",
            score=0,
            not_found_smells={
                "http://example.com/": [Smell(start=1, end=5, type="smell3"), Smell(start=1, end=5, type="smell4")]
            },
            incorrect_smells={
                "http://example.com/": [Smell(start=1, end=5, type="smell5")]
            },
            correct_smells={
                "http://example.com/": [Smell(start=1, end=5, type="smell1"), Smell(start=1, end=5, type="smell2")]
            },
        )

        response = score_smells(check_in, quiz)
        self.assertEqual(response.incorrect_smells, check_out.incorrect_smells)
        self.assertEqual(response.not_found_smells, check_out.not_found_smells)
        self.assertEqual(response.score, check_out.score)
        self.assertEqual(response.quiz_id, check_out.quiz_id)
