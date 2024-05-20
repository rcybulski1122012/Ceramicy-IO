from unittest import IsolatedAsyncioTestCase
from unittest.mock import AsyncMock, MagicMock, patch

from app.models.quiz import Quiz
from app.schemas.quiz_check import QuizCheckIn, QuizCheckOut
from app.routers.quiz import router
from sqlalchemy.ext.asyncio import AsyncSession
from app.schemas.quiz_check import Smell, File
from app.services.quiz_check import check_files


class TestQuizRouter(IsolatedAsyncioTestCase):
    async def test_check_files(self):
        mock_session = AsyncMock(spec=AsyncSession)

        mock_get_quiz_by_id = AsyncMock(
            return_value=Quiz(
                code_smells = {
                    "http://example.com/": [
                        Smell(start=1, end=5, type="smell1"),
                        Smell(start=1, end=5, type="smell2"),
                        Smell(start=1, end=5, type="smell3"),
                        Smell(start=1, end=5, type="smell4"),
                    ]
                }
            )
        )

        mock_quiz_check_in = QuizCheckIn(
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

        mock_quiz_check_out = QuizCheckOut(
            quiz_id="quiz_id",
            score=0,
            not_found_smells={
                "http://example.com/": [Smell(start=1, end=5, type="smell3"), Smell(start=1, end=5, type="smell4")]
            },
            incorrect_smells={ "http://example.com/": [Smell(start=1, end=5, type="smell5")]}
        )

        with patch("app.services.quiz.get_quiz_by_id", mock_get_quiz_by_id):
            response = await check_files(mock_session, mock_quiz_check_in)

        self.assertEqual(response.incorrect_smells, mock_quiz_check_out.incorrect_smells)
        self.assertEqual(response.not_found_smells, mock_quiz_check_out.not_found_smells)
        self.assertEqual(response.score, mock_quiz_check_out.score)
        self.assertEqual(response.quiz_id, mock_quiz_check_out.quiz_id)
