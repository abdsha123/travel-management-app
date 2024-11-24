import apiClient from "./apiClient";

// Insert a new seat into the AVL tree
export const insertSeat = async (seatId, isAvailable, seatType) => {
  const response = await apiClient.post("/avltree/insert", {
    seat_id: seatId,
    is_available: isAvailable,
    seat_type: seatType,
  });
  return response.data;
};

// Book a seat in the AVL tree
export const bookSeat = async (seatId) => {
  const response = await apiClient.post("/avltree/book", null, {
    params: { seat_id: seatId }, // Send seat_id as a query parameter
  });
  return response.data;
};

// Cancel a seat booking
export const cancelSeat = async (seatId) => {
  const response = await apiClient.post("/avltree/cancel", null, {
    params: { seat_id: seatId }, // Send seat_id as a query parameter
  });
  return response.data;
};

// Find the nearest available seat
export const findNearestAvailableSeat = async (seatId) => {
  const response = await apiClient.get("/avltree/nearest", {
    params: { seat_id: seatId },
  });
  return response.data; // Ensure response contains seatID (not seat_id)
};
