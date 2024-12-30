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
  const [seatType, setSeatType] = useState("economy");
  const [nearestSeat, setNearestSeat] = useState(null);
  const [message, setMessage] = useState("");

  const handleInsertSeat = async () => {
    // Validate Seat ID and Seat Type
    if (!seatId || parseInt(seatId) < 0) {  // Check for non-negative Seat ID
      setMessage("Seat ID must be a non-negative number.");
      return;
    }
    if (!seatType) {
      setMessage("Please select a Seat Type.");
      return;
    }
    
    try {
      const result = await insertSeat(
        parseInt(seatId),
        isAvailable === "true",
        seatType
      );
      if (result.error) {
        setMessage(result.error);
      } else {
        setMessage(result.message);
      }
      // Reset form fields
      setSeatId("");
      setIsAvailable("true");
      setSeatType("economy");
    } catch (error) {
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
            <label className="form-label">Seat Type:</label>
            <div className="form-check">
              <input
                type="radio"
                id="economy"
                name="seatType"
                value="economy"
                checked={seatType === "economy"}
                onChange={(e) => setSeatType(e.target.value)}
                className="form-check-input"
              />
              <label htmlFor="economy" className="form-check-label">
                Economy
              </label>
            </div>
            <div className="form-check">
              <input
                type="radio"
                id="regular"
                name="seatType"
                value="regular"
                checked={seatType === "regular"}
                onChange={(e) => setSeatType(e.target.value)}
                className="form-check-input"
              />
              <label htmlFor="regular" className="form-check-label">
                Regular
              </label>
            </div>
            <div className="form-check">
              <input
                type="radio"
                id="vip"
                name="seatType"
                value="vip"
                checked={seatType === "vip"}
                onChange={(e) => setSeatType(e.target.value)}
                className="form-check-input"
              />
              <label htmlFor="vip" className="form-check-label">
                VIP
              </label>
            </div>
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
