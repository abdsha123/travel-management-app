import apiClient from "./apiClient";

// Add a new city to the graph
export const addCity = async (cityName) => {
  try {
    const response = await apiClient.post("/graph/city", {
      city_name: cityName,
    });
    return response.data.message;
  } catch (error) {
    throw new Error(error.response?.data?.detail || "Failed to add city.");
  }
};

// Add a route between two cities
export const addRoute = async (city1, city2, weight) => {
  try {
    const response = await apiClient.post("/graph/route", {
      city1,
      city2,
      weight,
    });
    return response.data.message;
  } catch (error) {
    throw new Error(error.response?.data?.detail || "Failed to add route.");
  }
};

// Find the shortest path between two cities
export const findShortestPath = async (startCity, endCity) => {
  try {
    const response = await apiClient.get("/graph/path", {
      params: { start_city: startCity, end_city: endCity },
    });
    return {
      path: response.data.path,
      cost: response.data.cost,
    };
  } catch (error) {
    throw new Error(
      error.response?.data?.detail || "Failed to find shortest path.",
    );
  }
};
