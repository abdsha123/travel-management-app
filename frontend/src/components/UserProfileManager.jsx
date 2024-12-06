import React, { useState } from "react";
import {
  addBooking,
  getBookingHistory,
  hasBookings,
  addUser,
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

  // Additional user details
  const [userName, setUserName] = useState("");
  const [userContact, setUserContact] = useState("");
  const [userEmail, setUserEmail] = useState("");

  const handleAddBooking = async () => {
    if (
      !userId ||
      !booking.seatId ||
      !booking.travelDate ||
      !booking.seatType
    ) {
      setMessage("Please fill out all booking details.");
      return;
    }
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
      setMessage(`Error adding booking: ${error.message}`);
    }
  };

  const handleGetBookingHistory = async () => {
    if (!userId) {
      setMessage("Please provide a User ID.");
      return;
    }
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
      setMessage(`Error fetching booking history: ${error.message}`);
    }
  };

  const handleHasBookings = async () => {
    if (!userId) {
      setMessage("Please provide a User ID.");
      return;
    }
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
      setMessage(`Error checking bookings: ${error.message}`);
    }
  };

  const handleAddUserDetails = async () => {
    if (!userId || !userName || !userContact || !userEmail) {
      setMessage("Please fill out all user details.");
      return;
    }
    try {
      const msg = await addUser(
        parseInt(userId),
        userName,
        userContact,
        userEmail,
      );
      setMessage(msg);
    } catch (error) {
      setMessage(`Error adding user details: ${error.message}`);
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

          <h5 className="mt-3">User Details</h5>
          <div className="mb-4">
            <input
              type="text"
              placeholder="Name"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              className="form-control mb-2"
            />
            <input
              type="text"
              placeholder="Contact"
              value={userContact}
              onChange={(e) => setUserContact(e.target.value)}
              className="form-control mb-2"
            />
            <input
              type="email"
              placeholder="Email"
              value={userEmail}
              onChange={(e) => setUserEmail(e.target.value)}
              className="form-control mb-2"
            />
            <button
              onClick={handleAddUserDetails}
              className="btn btn-primary w-100"
            >
              Set User Details
            </button>
          </div>

          <h5>Booking Details</h5>
          <div className="mb-4">
            <input
              type="number"
              placeholder="Seat ID"
              value={booking.seatId}
              onChange={(e) =>
                setBooking({ ...booking, seatId: e.target.value })
              }
              className="form-control mb-2"
            />
            <input
              type="text"
              placeholder="Travel Date"
              value={booking.travelDate}
              onChange={(e) =>
                setBooking({ ...booking, travelDate: e.target.value })
              }
              className="form-control mb-2"
            />
            <input
              type="text"
              placeholder="Seat Type"
              value={booking.seatType}
              onChange={(e) =>
                setBooking({ ...booking, seatType: e.target.value })
              }
              className="form-control mb-2"
            />
            <button
              onClick={handleAddBooking}
              className="btn btn-primary w-100"
            >
              Add Booking
            </button>
          </div>
          <div className="d-flex gap-2 mb-4">
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
