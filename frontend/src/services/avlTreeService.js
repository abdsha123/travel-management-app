import apiClient from "./apiClient";

// Insert a new seat into the AVL tree
export const insertSeat = async (seatId, isAvailable, seatType) => {
  try {
    const response = await apiClient.post("/avltree/insert", {
      seat_id: seatId,
      is_available: isAvailable,
      seat_type: seatType,
    });
    // Return the entire data (just like seatHashMap)
    // If the backend returns {success: false, error: "..."}, we handle it on the component side
    return response.data;
  } catch (error) {
    // If a network or unexpected error occurs, handle it here
    const errMsg =
      error.response?.data?.error ||
      error.response?.data?.detail ||
      "Failed to insert seat.";
    throw new Error(errMsg);
  }
};

// Book a seat in the AVL tree
export const bookSeat = async (seatId) => {
  try {
    const response = await apiClient.post("/avltree/book", null, {
      params: { seat_id: seatId },
    });
    return response.data;
  } catch (error) {
    const errMsg =
      error.response?.data?.error ||
      error.response?.data?.detail ||
      "Failed to book seat.";
    throw new Error(errMsg);
  }
};

// Cancel a seat booking
export const cancelSeat = async (seatId) => {
  try {
    const response = await apiClient.post("/avltree/cancel", null, {
      params: { seat_id: seatId },
    });
    return response.data;
  } catch (error) {
    const errMsg =
      error.response?.data?.error ||
      error.response?.data?.detail ||
      "Failed to cancel seat.";
    throw new Error(errMsg);
  }
};

// Find the nearest available seat
export const findNearestAvailableSeat = async (seatId) => {
  try {
    const response = await apiClient.get("/avltree/nearest", {
      params: { seat_id: seatId },
    });
    return response.data;
  } catch (error) {
    const errMsg =
      error.response?.data?.error ||
      error.response?.data?.detail ||
      "Failed to find the nearest seat.";
    throw new Error(errMsg);
  }
};
