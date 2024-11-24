import React, { useState } from "react";
import {
  addSeat,
  isSeatAvailable,
  updateSeatAvailability,
  getSeatInfo,
  getAllSeats,
} from "../services/seatHashMapService";

const SeatHashMapManager = () => {
  const [seatId, setSeatId] = useState("");
  const [isAvailable, setIsAvailable] = useState(true);
  const [seatType, setSeatType] = useState("");
  const [seatInfo, setSeatInfo] = useState(null);
  const [allSeats, setAllSeats] = useState([]);
  const [message, setMessage] = useState("");

  const handleAddSeat = async () => {
    if (!seatId || !seatType) {
      setMessage("Please provide both Seat ID and Seat Type.");
      return;
    }
    try {
      const result = await addSeat(parseInt(seatId), isAvailable, seatType);
      setMessage(result.message);
      setSeatId("");
      setIsAvailable(true);
      setSeatType("");
    } catch (error) {
      setMessage("Error adding seat: " + error.message);
    }
  };

  const handleCheckAvailability = async () => {
    if (!seatId) {
      setMessage("Please provide a Seat ID.");
      return;
    }
    try {
      const result = await isSeatAvailable(parseInt(seatId));
      setMessage(
        `Seat is ${result.available ? "available" : "not available"}.`,
      );
      setSeatInfo(null); // Clear seatInfo if this action is unrelated
    } catch (error) {
      setMessage("Error checking availability: " + error.message);
    }
  };

  const handleUpdateSeatAvailability = async () => {
    if (!seatId) {
      setMessage("Please provide a Seat ID.");
      return;
    }
    try {
      const result = await updateSeatAvailability(
        parseInt(seatId),
        isAvailable,
      );
      setMessage(result.message);
    } catch (error) {
      setMessage("Error updating availability: " + error.message);
    }
  };

  const handleGetSeatInfo = async () => {
    if (!seatId) {
      setMessage("Please provide a Seat ID.");
      return;
    }
    try {
      const result = await getSeatInfo(parseInt(seatId));
      if (result.success) {
        setSeatInfo(result);
        setMessage("");
      } else {
        setMessage(result.error || "Error fetching seat info.");
        setSeatInfo(null);
      }
    } catch (error) {
      setMessage("Error fetching seat info: " + error.message);
    }
  };

  const handleGetAllSeats = async () => {
    try {
      const result = await getAllSeats();
      console.log("API Response for all seats:", result); // Debugging log
      if (result.success && Array.isArray(result.seats)) {
        setAllSeats(result.seats);
        setMessage("");
      } else {
        setMessage("Error fetching all seats or no seats available.");
        setAllSeats([]); // Clear seats if response is empty
      }
    } catch (error) {
      setMessage("Error fetching all seats: " + error.message);
      setAllSeats([]);
    }
  };

  return (
    <div className="container my-4">
      <div className="card shadow-sm p-4 bg-light">
        <h2 className="card-title text-center text-primary">
          Seat HashMap Manager
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
            <label htmlFor="isAvailable" className="form-label">
              Is Available:
            </label>
            <select
              id="isAvailable"
              value={isAvailable}
              onChange={(e) => setIsAvailable(e.target.value === "true")}
              className="form-select"
            >
              <option value="true">True</option>
              <option value="false">False</option>
            </select>
          </div>
          <div className="mb-4">
            <label htmlFor="seatType" className="form-label">
              Seat Type:
            </label>
            <input
              type="text"
              id="seatType"
              value={seatType}
              onChange={(e) => setSeatType(e.target.value)}
              className="form-control"
              placeholder="Enter seat type"
            />
          </div>
          <div className="d-flex flex-wrap gap-2 mb-4">
            <button
              onClick={handleAddSeat}
              className="btn btn-primary flex-grow-1"
            >
              Add Seat
            </button>
            <button
              onClick={handleCheckAvailability}
              className="btn btn-success flex-grow-1"
            >
              Check Availability
            </button>
            <button
              onClick={handleUpdateSeatAvailability}
              className="btn btn-warning flex-grow-1"
            >
              Update Availability
            </button>
            <button
              onClick={handleGetSeatInfo}
              className="btn btn-secondary flex-grow-1"
            >
              Get Seat Info
            </button>
            <button
              onClick={handleGetAllSeats}
              className="btn btn-info flex-grow-1"
            >
              Get All Seats
            </button>
          </div>
          {seatInfo && (
            <div className="alert alert-light mt-4">
              <p>
                <strong>Seat ID:</strong> {seatInfo.seatID}
              </p>
              <p>
                <strong>Available:</strong>{" "}
                {seatInfo.isAvailable ? "Yes" : "No"}
              </p>
              <p>
                <strong>Type:</strong> {seatInfo.seatType}
              </p>
            </div>
          )}
          {allSeats.length > 0 ? (
            <div className="mt-4">
              <h5>All Seats:</h5>
              <ul className="list-group">
                {allSeats.map((seat) => (
                  <li key={seat.seatID} className="list-group-item">
                    <strong>Seat ID:</strong> {seat.seatID},{" "}
                    <strong>Available:</strong>{" "}
                    {seat.isAvailable ? "Yes" : "No"}, <strong>Type:</strong>{" "}
                    {seat.seatType}
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            <div className="mt-4 alert alert-warning">
              No seats available or data could not be fetched.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SeatHashMapManager;
