from fastapi import APIRouter
from app.routers.quiz import router as quiz_router

# TODO remove these imports - here to make sure the models are loaded to the registry
from app.models.user import *   # noqa
from app.models.session import *    # noqa

api_router = APIRouter(prefix="/api/v1")
api_router.include_router(quiz_router)
