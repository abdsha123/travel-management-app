from fastapi import APIRouter
from pydantic import BaseModel
from app.services.avltree_service import (
    insert_seat,
    remove_seat,
    book_seat,
    cancel_seat,
    find_nearest_seat,
)

router = APIRouter()

class SeatRequest(BaseModel):
    seat_id: int
    is_available: bool
    seat_type: str

@router.post("/insert")
async def insert(seat: SeatRequest):
    result = await insert_seat(seat.seat_id, seat.is_available, seat.seat_type)
    return result

@router.delete("/remove")
async def remove(seat: SeatRequest):
    result = await remove_seat(seat.seat_id, seat.is_available, seat.seat_type)
    return result

@router.post("/book")
async def book(seat_id: int):
    result = await book_seat(seat_id)
    return result

@router.post("/cancel")
async def cancel(seat_id: int):
    result = await cancel_seat(seat_id)
    return result

@router.get("/nearest")
async def find_nearest(seat_id: int):
    result = await find_nearest_seat(seat_id)
    return result
