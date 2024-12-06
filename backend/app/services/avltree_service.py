from cpp_backend import AVLTree, Seat
import asyncio

# Singleton instance of AVLTree
avl_tree = AVLTree()
lock = asyncio.Lock()

async def insert_seat(seat_id: int, is_available: bool, seat_type: str):
    async with lock:
        # Check if seat already exists before inserting
        # Use the AVLTree search method
        if avl_tree.search(seat_id):
            return {"success": False, "error": "Seat already exists"}
        seat = Seat(seat_id, is_available, seat_type)
        avl_tree.insert(seat)
    return {"success": True}

async def remove_seat(seat_id: int, is_available: bool, seat_type: str):
    async with lock:
        seat = Seat(seat_id, is_available, seat_type)
        avl_tree.remove(seat)
    return {"success": True}

async def book_seat(seat_id: int):
    async with lock:
        success = avl_tree.bookSeat(seat_id)
    return {"success": success, "error": None} if success else {"success": False, "error": "Seat not available"}

async def cancel_seat(seat_id: int):
    async with lock:
        success = avl_tree.cancelSeat(seat_id)
    return {"success": success, "error": None} if success else {"success": False, "error": "Seat not booked"}

async def find_nearest_seat(seat_id: int):
    async with lock:
        nearest_seat = avl_tree.findNearestAvailableSeat(seat_id)
    if nearest_seat:
        return {
            "seatID": nearest_seat.seatID,
            "isAvailable": nearest_seat.isAvailable,
            "seatType": nearest_seat.seatType,
        }
    return {"success": False, "error": "No available seats found"}
