from pydantic import BaseModel
from typing import List


class Smell(BaseModel):
    """A class to represent a code smell in a file"""

    start: int
    end: int
    type: str


class File(BaseModel):
    """A class to represent a file and its code smells"""

    file_url: str
    smells: List[Smell]


class QuizCheckIn(BaseModel):
    """A class to represent a quiz and smells in it's files"""

    quiz_id: int
    files: List[File]


class QuizCheckOut(BaseModel):
    """A class to represent the results of a quiz check"""

    quiz_id: int
    score: int  # possible change to List[float] for more detailed results
    details: str
