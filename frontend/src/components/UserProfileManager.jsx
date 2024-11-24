import React, { useState } from "react";
import {
  addBooking,
  getBookingHistory,
  hasBookings,
} from "../services/userProfileService";

const UserProfileManager = () => {
  const [userId, setUserId] = useState("");
  const [booking, setBooking] = useState({
    seatId: "",
    travelDate: "",
    seatType: "",
  });
  const [bookingHistory, setBookingHistory] = useState([]);
  const [hasBooking, setHasBooking] = useState(false);
  const [message, setMessage] = useState("");

  const handleAddBooking = async () => {
    try {
      const result = await addBooking(
        parseInt(userId),
        parseInt(booking.seatId),
        booking.travelDate,
        booking.seatType,
      );
      setMessage(result.message || "Booking added successfully!");
      setBooking({ seatId: "", travelDate: "", seatType: "" });
    } catch (error) {
      setMessage("Error adding booking: " + error.message);
    }
  };

  const handleGetBookingHistory = async () => {
    try {
      const result = await getBookingHistory(parseInt(userId));
      if (result.success) {
        setBookingHistory(result.history || []);
        setMessage("");
      } else {
        setMessage(result.error || "Error fetching booking history.");
        setBookingHistory([]);
      }
    } catch (error) {
      setMessage("Error fetching booking history: " + error.message);
    }
  };

  const handleHasBookings = async () => {
    try {
      const result = await hasBookings(parseInt(userId));
      if (result.success) {
        setHasBooking(result.hasBookings);
        setMessage(
          result.hasBookings ? "User has bookings!" : "No bookings found.",
        );
      } else {
        setMessage(result.error || "Error checking bookings.");
      }
    } catch (error) {
      setMessage("Error checking bookings: " + error.message);
    }
  };

  return (
    <div className="container my-4">
      <div className="card shadow-sm p-4 bg-light">
        <h2 className="card-title text-center text-primary">
          User Profile Manager
        </h2>
        <div className="card-body">
          {message && (
            <div className="alert alert-info text-center">{message}</div>
          )}
          <div className="mb-4">
            <label htmlFor="userId" className="form-label">
              User ID:
            </label>
            <input
              type="number"
              id="userId"
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
              className="form-control"
              placeholder="Enter user ID"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="bookingDetails" className="form-label">
              Booking Details:
            </label>
            <input
              type="number"
              id="seatId"
              placeholder="Seat ID"
              value={booking.seatId}
              onChange={(e) =>
                setBooking({ ...booking, seatId: e.target.value })
              }
              className="form-control mb-2"
            />
            <input
              type="text"
              id="travelDate"
              placeholder="Travel Date"
              value={booking.travelDate}
              onChange={(e) =>
                setBooking({ ...booking, travelDate: e.target.value })
              }
              className="form-control mb-2"
            />
            <input
              type="text"
              id="seatType"
              placeholder="Seat Type"
              value={booking.seatType}
              onChange={(e) =>
                setBooking({ ...booking, seatType: e.target.value })
              }
              className="form-control"
            />
            <button
              onClick={handleAddBooking}
              className="btn btn-primary mt-3 w-100"
            >
              Add Booking
            </button>
          </div>
          <div className="d-flex gap-2">
            <button
              onClick={handleGetBookingHistory}
              className="btn btn-secondary flex-grow-1"
            >
              Get Booking History
            </button>
            <button
              onClick={handleHasBookings}
              className="btn btn-success flex-grow-1"
            >
              Has Bookings?
            </button>
          </div>
          <div className="mt-4">
            {hasBooking && (
              <div className="alert alert-success text-center">
                User has bookings!
              </div>
            )}
            {bookingHistory.length > 0 && (
              <div className="mt-3">
                <h5>Booking History:</h5>
                <ul className="list-group">
                  {bookingHistory.map((b, index) => (
                    <li key={index} className="list-group-item">
                      <strong>Seat ID:</strong> {b.seatID},{" "}
                      <strong>Travel Date:</strong> {b.travelDate},{" "}
                      <strong>Type:</strong> {b.seatType}
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

export default UserProfileManager;
