from fastapi import APIRouter, Depends, UploadFile

from typing import Annotated

from app.services.file import is_zip, upload_files_from_zip, upload_single_file, verify_file_size

router = APIRouter(tags=["File"], prefix="/file")


@router.post("/")
async def upload_file(file: Annotated[UploadFile, Depends(verify_file_size)]) -> list[str]:
    if is_zip(file):
        return await upload_files_from_zip(file)
    return [await upload_single_file(file)]
