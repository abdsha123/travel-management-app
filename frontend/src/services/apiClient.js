import axios from "axios";

// Base Axios instance
const apiClient = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL, // Backend URL from .env
  headers: {
    "Content-Type": "application/json",
  },
});

export default apiClient;
