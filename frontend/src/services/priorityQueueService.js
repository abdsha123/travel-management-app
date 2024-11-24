import apiClient from "./apiClient";

// Add a new request to the priority queue
export const addRequest = async (seatId, priority) => {
  const response = await apiClient.post("/priorityqueue/add", {
    seat_id: seatId,
    priority,
  });
  if (response.data.success) {
    return response.data.message; // Return success message
  } else {
    throw new Error(response.data.message || "Failed to add request");
  }
};

// Process the top request from the queue
export const processRequest = async () => {
  const response = await apiClient.post("/priorityqueue/process");
  if (response.data.success) {
    return response.data.processed_request; // Return processed request details
  } else {
    throw new Error(response.data.message || "Failed to process request");
  }
};

// Get the count of requests in the queue
export const getRequestCount = async () => {
  const response = await apiClient.get("/priorityqueue/count");
  if (response.data.success) {
    return response.data.request_count; // Return request count
  } else {
    throw new Error(response.data.message || "Failed to fetch request count");
  }
};

// Check if the queue is empty
export const isQueueEmpty = async () => {
  const response = await apiClient.get("/priorityqueue/empty");
  if (response.data.success) {
    return response.data.is_empty; // Return true/false for queue emptiness
  } else {
    throw new Error(response.data.message || "Failed to check queue state");
  }
};
