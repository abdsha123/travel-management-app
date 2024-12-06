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
    return response.data;
  } catch (error) {
    const errMsg =
      error.response?.data?.error ||
      error.response?.data?.detail ||
      "Failed to add booking. Please try again.";
    throw new Error(errMsg);
  }
};

// Get the booking history of a user
export const getBookingHistory = async (userId) => {
  try {
    const response = await apiClient.get("/userprofile/history", {
      params: { user_id: userId },
    });
    return response.data;
  } catch (error) {
    const errMsg =
      error.response?.data?.error ||
      error.response?.data?.detail ||
      "Failed to retrieve booking history. Please try again.";
    throw new Error(errMsg);
  }
};

// Check if a user has bookings
export const hasBookings = async (userId) => {
  try {
    const response = await apiClient.get("/userprofile/hasbookings", {
      params: { user_id: userId },
    });
    return response.data;
  } catch (error) {
    const errMsg =
      error.response?.data?.error ||
      error.response?.data?.detail ||
      "Failed to check bookings. Please try again.";
    throw new Error(errMsg);
  }
};

// Set user details (name, contact, email)
export const addUser = async (userId, name, contact, email) => {
  try {
    const response = await apiClient.post("/userprofile/details", {
      user_id: userId,
      name,
      contact,
      email,
    });
    return response.data.message;
  } catch (error) {
    const errMsg =
      error.response?.data?.error ||
      error.response?.data?.detail ||
      "Failed to add user details. Please try again.";
    throw new Error(errMsg);
  }
};
