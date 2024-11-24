import pytest
from fastapi.testclient import TestClient
from app.main import app

client = TestClient(app)

def test_add_booking():
    response = client.post("/userprofile/booking", json={
        "user_id": 1, "seat_id": 101, "travel_date": "2024-12-01", "seat_type": "VIP"
    })
    assert response.status_code == 200
    assert response.json() == {"success": True}

def test_get_booking_history():
    response = client.get("/userprofile/history", params={"user_id": 1})
    assert response.status_code == 200
    assert isinstance(response.json(), list)

def test_has_bookings():
    response = client.get("/userprofile/hasbookings", params={"user_id": 1})
    assert response.status_code == 200
    assert isinstance(response.json(), bool)
