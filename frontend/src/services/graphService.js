import apiClient from "./apiClient";

// Add a new city to the graph
export const addCity = async (cityName) => {
  const response = await apiClient.post("/graph/city", {
    city_name: cityName, // Send city name in JSON body
  });
  if (response.data.success) {
    return response.data.message; // Return success message
  } else {
    throw new Error(response.data.message || "Failed to add city");
  }
};

// Add a route between two cities
export const addRoute = async (city1, city2, weight) => {
  const response = await apiClient.post("/graph/route", {
    city1, // Send city1, city2, and weight in JSON body
    city2,
    weight,
  });
  if (response.data.success) {
    return response.data.message; // Return success message
  } else {
    throw new Error(response.data.message || "Failed to add route");
  }
};

// Find the shortest path between two cities
export const findShortestPath = async (startCity, endCity) => {
  const response = await apiClient.get("/graph/path", {
    params: { start_city: startCity, end_city: endCity }, // Send parameters in query string
  });
  if (response.data.success) {
    return {
      path: response.data.path, // Extract path from the response
      cost: response.data.cost, // Extract cost from the response
    };
  } else {
    throw new Error(response.data.message || "Failed to find shortest path");
  }
};
