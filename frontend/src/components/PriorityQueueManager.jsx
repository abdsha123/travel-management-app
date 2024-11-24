import React, { useState } from "react";
import {
  addRequest,
  processRequest,
  getRequestCount,
  isQueueEmpty,
} from "../services/priorityQueueService";

const PriorityQueueManager = () => {
  const [seatId, setSeatId] = useState("");
  const [priority, setPriority] = useState("");
  const [requestCount, setRequestCount] = useState(null);
  const [queueEmpty, setQueueEmpty] = useState(null);
  const [message, setMessage] = useState("");

  const handleAddRequest = async () => {
    try {
      const resultMessage = await addRequest(
        parseInt(seatId),
        parseInt(priority),
      );
      setMessage(resultMessage);
      setSeatId("");
      setPriority("");
    } catch (error) {
      setMessage("Error adding request: " + error.message);
    }
  };

  const handleProcessRequest = async () => {
    try {
      const processedRequest = await processRequest();
      setMessage(
        `Processed Request - Seat ID: ${processedRequest.seat_id}, Priority: ${processedRequest.priority}`,
      );
    } catch (error) {
      setMessage("Error processing request: " + error.message);
    }
  };

  const handleGetRequestCount = async () => {
    try {
      const response = await getRequestCount();
      setRequestCount(response); // Store the entire response object
      setMessage("");
    } catch (error) {
      setMessage("Error fetching request count: " + error.message);
      setRequestCount(null);
    }
  };

  const handleIsQueueEmpty = async () => {
    try {
      const empty = await isQueueEmpty();
      setQueueEmpty(empty);
      setMessage("");
    } catch (error) {
      setMessage("Error checking if queue is empty: " + error.message);
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
                Request Count: {requestCount.count}{" "}
                {/* Access `count` explicitly */}
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default PriorityQueueManager;
