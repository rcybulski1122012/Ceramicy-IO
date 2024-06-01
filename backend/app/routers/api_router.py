from fastapi import APIRouter

# TODO remove these imports - here to make sure the models are loaded to the registry
from app.models.session import *  # noqa
from app.routers.file import router as file_router
from app.routers.quiz import router as quiz_router
from app.routers.session import router as session_router

api_router = APIRouter(prefix="/api/v1")
api_router.include_router(quiz_router)
api_router.include_router(file_router)
api_router.include_router(session_router)
