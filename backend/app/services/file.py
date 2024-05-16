from fastapi import UploadFile

import uuid

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
        await blob_client.upload_blob(file_bytes)

    blob_url = (
        f"https://{settings.BLOB_ACCOUNT_NAME}.blob.core.windows.net/"
        f"{settings.BLOB_STORAGE_CONTAINER_NAME}/{blob_path}"
    )
    return blob_url
