import apiClient from "./apiClient";

// Add a new request to the priority queue
export const addRequest = async (seatId, priority) => {
  try {
    const response = await apiClient.post("/priorityqueue/add", {
      seat_id: seatId,
      priority,
    });
    if (response.data.success) {
      return response.data.message;
    } else {
      throw new Error(response.data.message || "Failed to add request");
    }
  } catch (error) {
    const errMsg =
      error.response?.data?.error ||
      error.response?.data?.detail ||
      "Failed to add request.";
    throw new Error(errMsg);
  }
};

// Process the top request from the queue
export const processRequest = async () => {
  try {
    const response = await apiClient.post("/priorityqueue/process");
    if (response.data.success) {
      return response.data.processed_request;
    } else {
      throw new Error(response.data.error || "Failed to process request");
    }
  } catch (error) {
    const errMsg =
      error.response?.data?.error ||
      error.response?.data?.detail ||
      "Failed to process request.";
    throw new Error(errMsg);
  }
};

// Get the count of requests in the queue
export const getRequestCount = async () => {
  try {
    const response = await apiClient.get("/priorityqueue/count");
    if (response.data.success) {
      // Now we must access response.data.request_count.count
      return response.data.request_count.count;
    } else {
      throw new Error(response.data.error || "Failed to fetch request count");
    }
  } catch (error) {
    const errMsg =
      error.response?.data?.error ||
      error.response?.data?.detail ||
      "Failed to fetch request count.";
    throw new Error(errMsg);
  }
};

// Check if the queue is empty
export const isQueueEmpty = async () => {
  try {
    const response = await apiClient.get("/priorityqueue/empty");
    if (response.data.success) {
      // Now we must access response.data.is_empty.empty
      return response.data.is_empty.empty;
    } else {
      throw new Error(response.data.error || "Failed to check queue state");
    }
  } catch (error) {
    const errMsg =
      error.response?.data?.error ||
      error.response?.data?.detail ||
      "Failed to check queue state.";
    throw new Error(errMsg);
  }
};

// Get all requests in the queue
export const getAllRequests = async () => {
  try {
    const response = await apiClient.get("/priorityqueue/all");
    if (response.data.success) {
      return response.data.requests;
    } else {
      throw new Error(response.data.error || "Failed to get requests");
    }
  } catch (error) {
    const errMsg =
      error.response?.data?.error ||
      error.response?.data?.detail ||
      "Failed to get requests.";
    throw new Error(errMsg);
  }
};
