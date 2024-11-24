import apiClient from "./apiClient";

// Add a booking for a user
export const addBooking = async (userId, seatId, travelDate, seatType) => {
  try {
    const response = await apiClient.post("/userprofile/booking", {
      user_id: userId,
      seat_id: seatId,
      travel_date: travelDate,
      seat_type: seatType,
    });
    return response.data; // Expected to include { success: true, message: "..."}
  } catch (error) {
    // Catch HTTP or network errors
    throw new Error(
      error.response?.data?.detail ||
        "Failed to add booking. Please try again.",
    );
  }
};

// Get the booking history of a user
export const getBookingHistory = async (userId) => {
  try {
    const response = await apiClient.get("/userprofile/history", {
      params: { user_id: userId },
    });
    return response.data; // Expected to include { success: true, history: [...] }
  } catch (error) {
    // Catch HTTP or network errors
    throw new Error(
      error.response?.data?.detail ||
        "Failed to retrieve booking history. Please try again.",
    );
  }
};

// Check if a user has bookings
export const hasBookings = async (userId) => {
  try {
    const response = await apiClient.get("/userprofile/hasbookings", {
      params: { user_id: userId },
    });
    return response.data; // Expected to include { success: true, hasBookings: true/false }
  } catch (error) {
    // Catch HTTP or network errors
    throw new Error(
      error.response?.data?.detail ||
        "Failed to check bookings. Please try again.",
    );
  }
};
