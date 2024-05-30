from fastapi import HTTPException, UploadFile, status

import asyncio
import contextlib
import uuid
from pathlib import Path
from typing import AsyncContextManager
from urllib.parse import quote
from zipfile import ZipFile

import aiofiles
from azure.storage.blob.aio import BlobServiceClient

from app.settings import settings

TMP_PATH = Path("/tmp")


MEGABYTE = 1024 * 1024
CHUNK_SIZE = 50 * MEGABYTE
MAX_FILE_SIZE = 500 * MEGABYTE


def verify_file_size(file: UploadFile) -> UploadFile:
    if file.size > MAX_FILE_SIZE:
        raise HTTPException(status.HTTP_400_BAD_REQUEST, f"File size exceeds {MAX_FILE_SIZE} bytes")
    return file


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


def _is_file_text_based(file: bytes) -> bool:
    try:
        file.decode("utf-8")
        return True
    except UnicodeDecodeError:
        return False


def _get_blob_url(blob_path: str) -> str:
    quoted_blob_path = quote(blob_path)
    return f"{settings.BLOB_STORAGE_URL}/{quoted_blob_path}"


def is_zip(file: UploadFile) -> bool:
    return file.content_type == "application/zip"


async def upload_files_from_zip(zip_file: UploadFile) -> list[str]:
    tmp_root_dir_name = str(uuid.uuid4())
    async with unzip_file(zip_file, tmp_root_dir_name) as extracted_files:
        return await upload_multiple_files(extracted_files, tmp_root_dir_name)


@contextlib.asynccontextmanager
async def unzip_file(file: UploadFile, root_dir_name: str) -> AsyncContextManager[list[Path]]:
    temp_dir = TMP_PATH / root_dir_name
    extracted_files_path = temp_dir / "extracted_files"
    extracted_files_path.mkdir(parents=True, exist_ok=True)
    zip_file_path = await _save_zip_file(file, temp_dir)

    with ZipFile(zip_file_path.absolute(), "r") as zip_ref:
        zip_ref.extractall(extracted_files_path)

    extracted_files = _list_all_files_in_directory(extracted_files_path)

    try:
        yield extracted_files
    finally:
        _delete_files(temp_dir)


async def _save_zip_file(file: UploadFile, directory: Path) -> Path:
    zip_path = directory / file.filename

    async with aiofiles.open(zip_path, "wb") as f:
        while chunk := await file.read(CHUNK_SIZE):
            await f.write(chunk)

    return zip_path


def _list_all_files_in_directory(directory_path: Path) -> list[Path]:
    file_paths = []
    for path in directory_path.iterdir():
        # MacOS creates some hidden folder
        if "__MACOSX" in path.parts:
            continue
        elif path.is_file():
            file_paths.append(path)
        else:
            file_paths.extend(_list_all_files_in_directory(path))

    return file_paths


def _delete_files(path: Path) -> None:
    for file in path.iterdir():
        if file.is_file():
            file.unlink()
        else:
            _delete_files(file)
    path.rmdir()


async def upload_multiple_files(file_paths: list[Path], root_dir_name: str) -> list[str]:
    async with (BlobServiceClient.from_connection_string(settings.BLOB_STORAGE_CONNECTION_STRING) as client):
        tasks = [_upload_single_file_from_disc(client, root_dir_name, file_path) for file_path in file_paths]
        return [url for url in await asyncio.gather(*tasks) if url is not None]


async def _upload_single_file_from_disc(
    blob_service_client: BlobServiceClient, root_dir_name: str, file_path: Path
) -> str | None:
    file_relative_path = str(file_path.absolute()).split(f"{root_dir_name}/extracted_files")[-1].strip("/")
    blob_path = f"{root_dir_name}/{file_relative_path}"

    async with (
        aiofiles.open(file_path, "rb") as f,
        blob_service_client.get_blob_client(settings.BLOB_STORAGE_CONTAINER_NAME, blob_path) as blob_client,
    ):
        file_bytes = await f.read()

        if not _is_file_text_based(file_bytes):
            return None

        await blob_client.upload_blob(file_bytes)

    return _get_blob_url(blob_path)
