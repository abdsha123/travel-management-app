import React, { useState } from "react";
import {
  addRequest,
  processRequest,
  getRequestCount,
  isQueueEmpty,
  getAllRequests,
} from "../services/priorityQueueService";

const PriorityQueueManager = () => {
  const [seatId, setSeatId] = useState("");
  const [priority, setPriority] = useState("");
  const [requestCount, setRequestCount] = useState(null);
  const [queueEmpty, setQueueEmpty] = useState(null);
  const [allRequests, setAllRequests] = useState([]);
  const [message, setMessage] = useState("");

  const handleAddRequest = async () => {
    try {
      // Validate that Seat ID and Priority are provided
      if (!seatId || seatId.trim() === "") {
        setMessage("Please provide a valid Seat ID.");
        return;
      }
      if (!priority || priority.trim() === "") {
        setMessage("Please provide a valid Priority.");
        return;
      }
  
      // Validate that Seat ID and Priority are non-negative
      if (parseInt(seatId) < 0) {
        setMessage("Seat ID must be a non-negative number.");
        return;
      }
      if (parseInt(priority) < 0) {
        setMessage("Priority must be a non-negative number.");
        return;
      }
  
      // Call the addRequest function
      const response = await addRequest(parseInt(seatId), parseInt(priority));
      if (response.success) {
        setMessage(response.message); // Success message
        setSeatId("");
        setPriority("");
      } else {
        setMessage(response.error); // Error message
      }
    } catch (error) {
      setMessage(`Error: ${error.message}`);
    }
  };
  

  const handleProcessRequest = async () => {
    try {
      const processedRequest = await processRequest();
      setMessage(
        `Processed Request - Seat ID: ${processedRequest.seatID}, Priority: ${processedRequest.priority}`,
      );
    } catch (error) {
      setMessage(error.message);
    }
  };

  const handleGetRequestCount = async () => {
    try {
      const count = await getRequestCount();
      setRequestCount(count);
      // If you want a success message:
      // setMessage("Request count retrieved successfully!");
      setMessage("");
    } catch (error) {
      setMessage(error.message);
      setRequestCount(null);
    }
  };

  const handleIsQueueEmpty = async () => {
    try {
      const empty = await isQueueEmpty();
      setQueueEmpty(empty);
      // If you want a success message:
      // setMessage("Queue empty state retrieved successfully!");
      setMessage("");
    } catch (error) {
      setMessage(error.message);
    }
  };

  const handleGetAllRequests = async () => {
    try {
      const requests = await getAllRequests();
      console.log("Backend Response (All Requests):", requests); // Debugging log
      setAllRequests(requests.requests || []); // Update state with requests
      setMessage(""); // Clear any previous messages
    } catch (error) {
      console.error("Error in handleGetAllRequests:", error); // Debugging log
      setMessage(error.message);
    }
  };
  

  return (

    
    <div className="container my-4">
      <div className="card shadow-sm p-4 bg-light">
        <h2 className="card-title text-center text-primary">
          Priority Queue Manager
        </h2>
        <div className="card-body">
          {message && (
            <div className="alert alert-info text-center">{message}</div>
          )}
          <div className="mb-4">
            <label htmlFor="seatId" className="form-label">
              Seat ID:
            </label>
            <input
              type="number"
              id="seatId"
              value={seatId}
              onChange={(e) => setSeatId(e.target.value)}
              className="form-control"
              placeholder="Enter seat ID"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="priority" className="form-label">
              Priority:
            </label>
            <input
              type="number"
              id="priority"
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
              className="form-control"
              placeholder="Enter priority"
            />
          </div>
          <div className="d-flex flex-wrap gap-2 mb-4">
            <button
              onClick={handleAddRequest}
              className="btn btn-primary flex-grow-1"
            >
              Add Request
            </button>
            <button
              onClick={handleProcessRequest}
              className="btn btn-success flex-grow-1"
            >
              Process Request
            </button>
          </div>
          <div className="d-flex flex-column gap-2">
            <button
              onClick={handleGetRequestCount}
              className="btn btn-secondary"
            >
              Get Request Count
            </button>
            {requestCount !== null && (
              <div className="alert alert-warning mt-2 text-center">
                Request Count: {requestCount}
              </div>
            )}
            <button onClick={handleIsQueueEmpty} className="btn btn-secondary">
              Is Queue Empty?
            </button>
            {queueEmpty !== null && (
              <div className="alert alert-warning mt-2 text-center">
                Queue is {queueEmpty ? "Empty" : "Not Empty"}
              </div>
            )}
            <button
              onClick={handleGetAllRequests}
              className="btn btn-info mt-3"
            >
              Get All Requests
            </button>
            {allRequests.length > 0 && (
              <div className="alert alert-light mt-3">
                <h5>All Requests:</h5>
                <ul className="list-group">
                  {allRequests.map((req, index) => (
                    <li key={index} className="list-group-item">
                      SeatID: {req.seatID}, Priority: {req.priority}
                    </li>
                  ))}
                </ul>
              </div>
            )}

          </div>
        </div>
      </div>
    </div>
  );
};

export default PriorityQueueManager;
