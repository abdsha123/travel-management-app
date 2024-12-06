from cpp_backend import SeatHashMap
import asyncio

# Singleton instance of SeatHashMap
seat_hash_map = SeatHashMap()
lock = asyncio.Lock()

async def add_seat(seat_id: int, is_available: bool, seat_type: str):
    async with lock:
        # Check if seat already exists
        try:
            seat_hash_map.getSeatInfo(seat_id)
            # If no exception, seat exists
            return {"success": False, "error": "Seat already exists"}
        except:
            # Seat does not exist, safe to add
            seat_hash_map.addSeat(seat_id, is_available, seat_type)
    return {"success": True}

async def is_seat_available(seat_id: int):
    async with lock:
        available = seat_hash_map.isSeatAvailable(seat_id)
    return {"success": True, "available": available}

async def update_seat_availability(seat_id: int, is_available: bool):
    async with lock:
        seat_hash_map.updateSeatAvailability(seat_id, is_available)
    return {"success": True, "message": f"Seat {seat_id} availability updated"}

async def get_seat_info(seat_id: int):
    async with lock:
        try:
            seat_info = seat_hash_map.getSeatInfo(seat_id)
            return {
                "success": True,
                "seatID": seat_info.seatID,
                "isAvailable": seat_info.isAvailable,
                "seatType": seat_info.seatType,
            }
        except Exception as e:
            return {"success": False, "error": str(e)}

async def get_all_seats():
    async with lock:
        seats = seat_hash_map.getAllSeats()
        # seats is a list of SeatInfo objects
        seat_list = []
        for seat in seats:
            seat_list.append({
                "seatID": seat.seatID,
                "isAvailable": seat.isAvailable,
                "seatType": seat.seatType
            })
    return {"success": True, "seats": seat_list}
