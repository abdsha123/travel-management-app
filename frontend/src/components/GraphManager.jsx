import React, { useState } from "react";
import { addCity, addRoute, findShortestPath } from "../services/graphService";

const GraphManager = () => {
  const [cityName, setCityName] = useState("");
  const [route, setRoute] = useState({ city1: "", city2: "", weight: "" });
  const [shortestPath, setShortestPath] = useState(null);
  const [message, setMessage] = useState("");

  const handleAddCity = async () => {
    try {
      const resultMessage = await addCity(cityName);
      setMessage(resultMessage); // Display success message from backend
      setCityName("");
    } catch (error) {
      setMessage(`Error adding city: ${error.message}`);
    }
  };

  const handleAddRoute = async () => {
    try {
      if (!route.city1 || !route.city2 || !route.weight) {
        setMessage("Please provide valid route details.");
        return;
      }

      const resultMessage = await addRoute(
        route.city1,
        route.city2,
        parseInt(route.weight),
      );
      setMessage(resultMessage); // Display success message from backend
      setRoute({ city1: "", city2: "", weight: "" });
    } catch (error) {
      setMessage(`Error adding route: ${error.message}`);
    }
  };

  const handleFindShortestPath = async () => {
    try {
      if (!route.city1 || !route.city2) {
        setMessage("Please provide both city names for the path search.");
        return;
      }

      const result = await findShortestPath(route.city1, route.city2);
      setShortestPath(result); // Save the path and cost details
      setMessage("");
    } catch (error) {
      setMessage(`Error finding shortest path: ${error.message}`);
      setShortestPath(null); // Clear any previous path details
    }
  };

  return (
    <div className="container my-4">
      <div className="card shadow-sm p-4 bg-light">
        <h2 className="card-title text-center text-primary">Graph Manager</h2>
        <div className="card-body">
          {message && (
            <div className="alert alert-info text-center">{message}</div>
          )}
          <div className="mb-4">
            <label htmlFor="cityName" className="form-label">
              City Name:
            </label>
            <input
              type="text"
              id="cityName"
              value={cityName}
              onChange={(e) => setCityName(e.target.value)}
              className="form-control mb-2"
              placeholder="Enter city name"
            />
            <button onClick={handleAddCity} className="btn btn-primary w-100">
              Add City
            </button>
          </div>
          <div className="mb-4">
            <label htmlFor="routeDetails" className="form-label">
              Route Details:
            </label>
            <input
              type="text"
              placeholder="City 1"
              value={route.city1}
              onChange={(e) => setRoute({ ...route, city1: e.target.value })}
              className="form-control mb-2"
            />
            <input
              type="text"
              placeholder="City 2"
              value={route.city2}
              onChange={(e) => setRoute({ ...route, city2: e.target.value })}
              className="form-control mb-2"
            />
            <input
              type="number"
              placeholder="Weight"
              value={route.weight}
              onChange={(e) => setRoute({ ...route, weight: e.target.value })}
              className="form-control mb-2"
            />
            <div className="d-flex flex-wrap gap-2">
              <button
                onClick={handleAddRoute}
                className="btn btn-success flex-grow-1"
              >
                Add Route
              </button>
              <button
                onClick={handleFindShortestPath}
                className="btn btn-secondary flex-grow-1"
              >
                Find Shortest Path
              </button>
            </div>
          </div>
          {shortestPath && (
            <div className="mt-4 alert alert-warning">
              <p>
                <strong>Shortest Path:</strong> {shortestPath.path.join(" → ")}
              </p>
              <p>
                <strong>Cost:</strong> {shortestPath.cost}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default GraphManager;
