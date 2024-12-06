from fastapi import APIRouter
from pydantic import BaseModel
from app.services.seathashmap_service import (
    add_seat,
    is_seat_available,
    update_seat_availability,
    get_seat_info,
    get_all_seats,
)

router = APIRouter()

class AddSeatRequest(BaseModel):
    seat_id: int
    is_available: bool
    seat_type: str

class UpdateSeatAvailabilityRequest(BaseModel):
    seat_id: int
    is_available: bool

@router.post("/add")
async def add_seat_endpoint(request: AddSeatRequest):
    result = await add_seat(request.seat_id, request.is_available, request.seat_type)
    if result.get("error"):
        return {"success": False, "error": result["error"]}
    return {"success": True, "message": "Seat added successfully"}

@router.get("/available")
async def available(seat_id: int):
    result = await is_seat_available(seat_id)
    return result

@router.put("/update")
async def update_seat_endpoint(request: UpdateSeatAvailabilityRequest):
    result = await update_seat_availability(request.seat_id, request.is_available)
    return result

@router.get("/info")
async def info(seat_id: int):
    result = await get_seat_info(seat_id)
    return result

@router.get("/all")
async def all_seats():
    result = await get_all_seats()
    return result
