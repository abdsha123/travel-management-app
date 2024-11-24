from cpp_backend import PriorityQueue, BookingRequest
import asyncio

# Singleton instance of PriorityQueue
priority_queue = PriorityQueue()
lock = asyncio.Lock()

async def add_request(seat_id: int, priority: int):
    async with lock:
        priority_queue.addRequest(seat_id, priority)
    return {"success": True}

async def process_request():
    async with lock:
        if priority_queue.isEmpty():
            return {"success": False, "error": "No requests to process"}
        request = priority_queue.processRequest()
    return {"success": True, "seatID": request.seatID, "priority": request.priority}

async def get_request_count():
    async with lock:
        count = priority_queue.getRequestCount()
    return {"success": True, "count": count}

async def is_queue_empty():
    async with lock:
        empty = priority_queue.isEmpty()
    return {"success": True, "empty": empty}
