from fastapi import APIRouter

from app.models.session import *  # noqa

# TODO remove these imports - here to make sure the models are loaded to the registry
from app.models.user import *  # noqa
from app.routers.file import router as file_router
from app.routers.quiz import router as quiz_router

api_router = APIRouter(prefix="/api/v1")
api_router.include_router(quiz_router)
api_router.include_router(file_router)
