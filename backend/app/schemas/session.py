from app.schemas.base import SchemaBase
from app.schemas.quiz import QuizOut


class SessionIn(SchemaBase):
    quiz_id: str


class SessionJoinIn(SchemaBase):
    user_name: str


class SessionOut(SchemaBase):
    id: str
    host_id: str
    quiz: QuizOut

class UserSessionRankingOut(SchemaBase):
    user_name: str
    score: int
