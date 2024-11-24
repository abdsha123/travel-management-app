from fastapi import APIRouter
from pydantic import BaseModel
from app.services.priorityqueue_service import (
    add_request,
    process_request,
    get_request_count,
    is_queue_empty,
)

router = APIRouter()

class AddRequest(BaseModel):
    seat_id: int
    priority: int

@router.post("/add")
async def add(request: AddRequest):
    # Await the service function to resolve any coroutine
    result = await add_request(request.seat_id, request.priority)
    return {"success": True, "message": "Request added successfully!", "result": result}

@router.post("/process")
async def process():
    # Await the service function to resolve any coroutine
    result = await process_request()
    return {"success": True, "processed_request": result}

@router.get("/count")
async def count():
    # Await the service function to resolve any coroutine
    result = await get_request_count()
    return {"success": True, "request_count": result}

@router.get("/empty")
async def is_empty():
    # Await the service function to resolve any coroutine
    result = await is_queue_empty()
    return {"success": True, "is_empty": result}
