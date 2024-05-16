from fastapi import HTTPException, UploadFile, status

import uuid
from urllib.parse import quote

from azure.storage.blob.aio import BlobServiceClient

from app.settings import settings


async def upload_single_file(file: UploadFile) -> str:
    directory_name = str(uuid.uuid4())
    blob_path = f"{directory_name}/{file.filename}"
    async with (
        BlobServiceClient.from_connection_string(settings.BLOB_STORAGE_CONNECTION_STRING) as client,
        client.get_blob_client(settings.BLOB_STORAGE_CONTAINER_NAME, blob_path) as blob_client,
    ):
        file_bytes = await file.read()
        _check_if_text_based_file(file_bytes, file.content_type)
        await blob_client.upload_blob(file_bytes)

    return _get_blob_url(blob_path)


def _check_if_text_based_file(file: bytes, mime_type: str) -> None:
    try:
        file.decode("utf-8")
    except UnicodeDecodeError:
        raise HTTPException(status.HTTP_400_BAD_REQUEST, f"File with mime type {mime_type} is not text-based")


def _get_blob_url(blob_path: str) -> str:
    quoted_blob_path = quote(blob_path)
    return f"{settings.BLOB_STORAGE_URL}/{quoted_blob_path}"
