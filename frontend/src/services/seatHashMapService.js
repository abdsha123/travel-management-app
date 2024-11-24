import apiClient from "./apiClient";

// Add a new seat to the hash map
export const addSeat = async (seatId, isAvailable, seatType) => {
  const response = await apiClient.post("/seathashmap/add", {
    seat_id: seatId,
    is_available: isAvailable,
    seat_type: seatType,
  });
  return response.data;
};

// Check if a seat is available
export const isSeatAvailable = async (seatId) => {
  const response = await apiClient.get("/seathashmap/available", {
    params: { seat_id: seatId },
  });
  return response.data;
};

// Update the availability of a seat
export const updateSeatAvailability = async (seatId, isAvailable) => {
  const response = await apiClient.put("/seathashmap/update", {
    seat_id: seatId,
    is_available: isAvailable,
  });
  return response.data;
};

// Get information about a specific seat
export const getSeatInfo = async (seatId) => {
  const response = await apiClient.get("/seathashmap/info", {
    params: { seat_id: seatId },
  });
  return response.data;
};

// Get all seats in the hash map
export const getAllSeats = async () => {
  const response = await apiClient.get("/seathashmap/all");
  return response.data;
};
