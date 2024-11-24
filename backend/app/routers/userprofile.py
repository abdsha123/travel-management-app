from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from app.services.userprofile_service import add_booking, get_booking_history, has_bookings

router = APIRouter()

class AddBookingRequest(BaseModel):
    user_id: int
    seat_id: int
    travel_date: str
    seat_type: str

@router.post("/booking")
async def add_booking_endpoint(request: AddBookingRequest):
    """
    Endpoint to add a new booking for a user.
    """
    result = await add_booking(
        request.user_id, request.seat_id, request.travel_date, request.seat_type
    )
    if result["success"]:
        return {"success": True, "message": result["message"]}
    else:
        raise HTTPException(status_code=400, detail=result["error"])

@router.get("/history")
async def history(user_id: int):
    """
    Endpoint to retrieve the booking history for a user.
    """
    result = await get_booking_history(user_id)
    if result["success"]:
        return {"success": True, "history": result["history"]}
    else:
        raise HTTPException(status_code=404, detail=result["error"])

@router.get("/hasbookings")
async def bookings(user_id: int):
    """
    Endpoint to check if a user has any bookings.
    """
    result = await has_bookings(user_id)
    if result["success"]:
        return {"success": True, "hasBookings": result["hasBookings"]}
    else:
        raise HTTPException(status_code=400, detail=result["error"])
