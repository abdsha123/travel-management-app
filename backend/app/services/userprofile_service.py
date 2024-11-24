from cpp_backend import UserProfileManager, BookingRecord
import asyncio

# Singleton instance of UserProfileManager
user_profile_manager = UserProfileManager()
lock = asyncio.Lock()

async def add_booking(user_id: int, seat_id: int, travel_date: str, seat_type: str):
    """
    Adds a new booking for a user.
    """
    async with lock:
        try:
            user_profile_manager.addBooking(user_id, seat_id, travel_date, seat_type)
            return {"success": True, "message": "Booking added successfully"}
        except Exception as e:
            return {"success": False, "error": str(e)}

async def get_booking_history(user_id: int):
    """
    Retrieves the booking history for a user.
    """
    async with lock:
        try:
            history = user_profile_manager.getBookingHistory(user_id)
            booking_list = []
            for booking in history:
                booking_list.append({
                    "seatID": booking.seatID,
                    "travelDate": booking.travelDate,
                    "seatType": booking.seatType,
                })
            return {
                "success": True,
                "history": booking_list
            }
        except Exception as e:
            return {"success": False, "error": f"Failed to retrieve booking history: {str(e)}"}

async def has_bookings(user_id: int):
    """
    Checks if a user has any bookings.
    """
    async with lock:
        try:
            has_booking = user_profile_manager.hasBookings(user_id)
            return {"success": True, "hasBookings": has_booking}
        except Exception as e:
            return {"success": False, "error": f"Failed to check bookings: {str(e)}"}
