from fastapi import APIRouter, UploadFile

from app.services.file import is_zip, upload_files_from_zip, upload_single_file

router = APIRouter(tags=["File"], prefix="/file")


@router.post("/")
async def upload_file(file: UploadFile) -> list[str]:
    if is_zip(file):
        return await upload_files_from_zip(file)
    return [await upload_single_file(file)]
