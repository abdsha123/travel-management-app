from fastapi import APIRouter
from pydantic import BaseModel
from app.services.priorityqueue_service import (
    add_request,
    process_request,
    get_request_count,
    is_queue_empty,
    get_all_requests,
)

router = APIRouter()

class AddRequest(BaseModel):
    seat_id: int
    priority: int

@router.post("/add")
async def add(request: AddRequest):
    result = await add_request(request.seat_id, request.priority)
    return {"success": True, "message": "Request added successfully!", "result": result}

@router.post("/process")
async def process():
    result = await process_request()
    if not result["success"]:
        return {"success": False, "error": result["error"]}
    return {"success": True, "processed_request": result}

@router.get("/count")
async def count():
    result = await get_request_count()
    return {"success": True, "request_count": result}

@router.get("/empty")
async def empty():
    result = await is_queue_empty()
    return {"success": True, "is_empty": result}

@router.get("/all")
async def all_requests():
    result = await get_all_requests()
    return result
