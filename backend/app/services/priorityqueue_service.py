from cpp_backend import PriorityQueue, BookingRequest
import asyncio
from contextlib import redirect_stdout
import io

# Singleton instance of PriorityQueue
priority_queue = PriorityQueue()
lock = asyncio.Lock()

# Maintain a set to track seat IDs already in the queue
queued_seats = set()

async def add_request(seat_id: int, priority: int):
    async with lock:
        if seat_id in queued_seats:  # Check if the seat is already in the queue
            return {"success": False, "error": f"Seat ID {seat_id} is already in the queue"}
        
        # Add the seat to the queue and update the tracking set
        priority_queue.addRequest(seat_id, priority)
        queued_seats.add(seat_id)

    return {"success": True, "message": f"Request for seat ID {seat_id} added successfully"}

async def process_request():
    async with lock:
        if priority_queue.isEmpty():
            return {"success": False, "error": "No requests to process"}
        
        # Process the highest-priority request
        request = priority_queue.processRequest()
        
        # Remove the processed seat ID from the tracking set
        queued_seats.discard(request.seatID)

    return {"success": True, "seatID": request.seatID, "priority": request.priority}

async def get_request_count():
    async with lock:
        count = priority_queue.getRequestCount()
    return {"success": True, "count": count}

async def is_queue_empty():
    async with lock:
        empty = priority_queue.isEmpty()
    return {"success": True, "empty": empty}

async def get_all_requests():
    async with lock:
        buffer = io.StringIO()
        with redirect_stdout(buffer):
            priority_queue.printAllRequests()
        output = buffer.getvalue()

        requests = []
        for line in output.splitlines():
            if line.strip():
                # Output format:
                # "SeatID: X, Priority: Y, Timestamp: Zms since epoch"
                try:
                    parts = line.split(", ")
                    seatID = int(parts[0].split(": ")[1])
                    priority = int(parts[1].split(": ")[1])
                    # Timestamp not particularly needed for now
                    requests.append({"seatID": seatID, "priority": priority})
                except Exception as e:
                    pass
    return {"success": True, "requests": requests}
