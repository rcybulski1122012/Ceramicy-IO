from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.routers.api_router import api_router

app = FastAPI(title="Ceramicy-IO", version="0.1.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(api_router)
