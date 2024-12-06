import React, { useState } from "react";
import {
  insertSeat,
  bookSeat,
  cancelSeat,
  findNearestAvailableSeat,
} from "../services/avlTreeService";

const AVLTreeManager = () => {
  const [seatId, setSeatId] = useState("");
  const [isAvailable, setIsAvailable] = useState("true");
  const [seatType, setSeatType] = useState("");
  const [nearestSeat, setNearestSeat] = useState(null);
  const [message, setMessage] = useState("");

  const handleInsertSeat = async () => {
    if (!seatId || !seatType) {
      setMessage("Please provide both Seat ID and Seat Type.");
      return;
    }
    try {
      const result = await insertSeat(
        parseInt(seatId),
        isAvailable === "true",
        seatType,
      );
      // Now handle it like the SeatHashMap logic:
      if (result.error) {
        // Backend returned success: false, error: "Seat already exists"
        setMessage(result.error);
      } else {
        // Backend returned success: true, message: "Seat inserted successfully!"
        setMessage(result.message);
      }
      setSeatId("");
      setIsAvailable("true");
      setSeatType("");
    } catch (error) {
      // If we actually hit a network error or something unexpected
      setMessage(`Error inserting seat: ${error.message}`);
    }
  };

  const handleBookSeat = async () => {
    try {
      const result = await bookSeat(parseInt(seatId));
      if (result.error) {
        setMessage(result.error);
      } else {
        setMessage("Seat booked successfully!");
      }
    } catch (error) {
      setMessage(`Error booking seat: ${error.message}`);
    }
  };

  const handleCancelSeat = async () => {
    try {
      const result = await cancelSeat(parseInt(seatId));
      if (result.error) {
        setMessage(result.error);
      } else {
        setMessage("Seat canceled successfully!");
      }
    } catch (error) {
      setMessage(`Error canceling seat: ${error.message}`);
    }
  };

  const handleFindNearestSeat = async () => {
    try {
      const result = await findNearestAvailableSeat(parseInt(seatId));
      if (result.success === false && result.error) {
        // If nearest seat was not found or some other error from backend
        setNearestSeat(null);
        setMessage(result.error);
      } else if (result?.seatID) {
        setNearestSeat(result);
        setMessage("");
      } else {
        setNearestSeat(null);
        setMessage("No nearest seat found!");
      }
    } catch (error) {
      setNearestSeat(null);
      setMessage(`Error finding nearest seat: ${error.message}`);
    }
  };

  return (
    <div className="container my-4">
      <div className="card shadow-sm p-4 bg-light">
        <h2 className="card-title text-center text-primary">
          AVL Tree Manager
        </h2>
        <div className="card-body">
          {message && (
            <div className="alert alert-info text-center">{message}</div>
          )}
          <div className="form-group mb-3">
            <label htmlFor="seatId" className="form-label">
              Seat ID:
            </label>
            <input
              type="number"
              id="seatId"
              value={seatId}
              onChange={(e) => setSeatId(e.target.value)}
              className="form-control"
              placeholder="Enter Seat ID"
            />
          </div>
          <div className="form-group mb-3">
            <label htmlFor="isAvailable" className="form-label">
              Is Available:
            </label>
            <select
              id="isAvailable"
              value={isAvailable}
              onChange={(e) => setIsAvailable(e.target.value)}
              className="form-select"
            >
              <option value="true">True</option>
              <option value="false">False</option>
            </select>
          </div>
          <div className="form-group mb-3">
            <label htmlFor="seatType" className="form-label">
              Seat Type:
            </label>
            <input
              type="text"
              id="seatType"
              value={seatType}
              onChange={(e) => setSeatType(e.target.value)}
              className="form-control"
              placeholder="Enter Seat Type (e.g., Regular, VIP)"
            />
          </div>
          <div className="d-flex flex-wrap gap-2 justify-content-center">
            <button onClick={handleInsertSeat} className="btn btn-primary">
              Insert Seat
            </button>
            <button onClick={handleBookSeat} className="btn btn-success">
              Book Seat
            </button>
            <button onClick={handleCancelSeat} className="btn btn-danger">
              Cancel Seat
            </button>
          </div>
          <div className="mt-4">
            <button
              onClick={handleFindNearestSeat}
              className="btn btn-secondary w-100"
            >
              Find Nearest Seat
            </button>
            {nearestSeat && (
              <div className="mt-3 alert alert-warning">
                <strong>Nearest Available Seat:</strong> {nearestSeat.seatID}{" "}
                <br />
                <strong>Type:</strong> {nearestSeat.seatType} <br />
                <strong>Available:</strong>{" "}
                {nearestSeat.isAvailable ? "Yes" : "No"}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AVLTreeManager;
