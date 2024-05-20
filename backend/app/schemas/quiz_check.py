from pydantic import BaseModel, HttpUrl


class Smell(BaseModel):
    """A class to represent a code smell in a file"""

    start: int
    end: int
    type: str


class File(BaseModel):
    """A class to represent a file and its code smells"""

    file_url: HttpUrl
    smells: list[Smell]


class QuizCheckIn(BaseModel):
    """A class to represent a quiz and smells in it's files"""

    quiz_id: str
    files: list[File]


class QuizCheckOut(BaseModel):
    """A class to represent the results of a quiz check"""

    quiz_id: str
    score: int  # possible change to List[float] for more detailed scoring 
    not_found_smells: dict[str, list[Smell]]
    incorrect_smells: dict[str, list[Smell]]
    correct_smells: dict[str, list[Smell]]
    