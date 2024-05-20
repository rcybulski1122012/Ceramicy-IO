from fastapi import APIRouter, UploadFile

from app.services.file import upload_single_file

router = APIRouter(tags=["File"], prefix="/file")


@router.post("/")
async def upload_file(file: UploadFile) -> list[str]:
    if file.content_type == "application/zip":
        raise NotImplementedError("Zip files are not supported yet")
    return [await upload_single_file(file)]
