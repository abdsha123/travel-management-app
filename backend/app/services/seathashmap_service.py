from cpp_backend import SeatHashMap
import asyncio
from contextlib import redirect_stdout
import io

# Singleton instance of SeatHashMap
seat_hash_map = SeatHashMap()
lock = asyncio.Lock()

async def add_seat(seat_id: int, is_available: bool, seat_type: str):
    async with lock:
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

async def print_all_seats():
    async with lock:
        try:
            buffer = io.StringIO()
            with redirect_stdout(buffer):
                seat_hash_map.printAllSeats()
            output = buffer.getvalue()

            # Parse the output
            seats = []
            for line in output.splitlines():
                if line.strip():  # Ignore empty lines
                    try:
                        parts = line.split(", ")
                        seatID = int(parts[0].split(": ")[1])
                        isAvailable = parts[1].split(": ")[1] == "true"
                        seatType = parts[2].split(": ")[1]
                        seats.append({
                            "seatID": seatID,
                            "isAvailable": isAvailable,
                            "seatType": seatType,
                        })
                    except (IndexError, ValueError) as e:
                        raise ValueError(f"Error parsing seat information: {line}") from e

            return {"success": True, "seats": seats}
        except Exception as e:
            return {"success": False, "error": str(e)}
