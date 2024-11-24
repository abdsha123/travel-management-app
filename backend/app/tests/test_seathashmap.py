import pytest
from fastapi.testclient import TestClient
from app.main import app

client = TestClient(app)

def test_add_seat():
    response = client.post("/seathashmap/add", json={"seat_id": 101, "is_available": True, "seat_type": "VIP"})
    assert response.status_code == 200
    assert response.json() == {"success": True}

def test_is_seat_available():
    response = client.get("/seathashmap/available", params={"seat_id": 101})
    assert response.status_code == 200
    assert isinstance(response.json(), bool)

def test_update_seat_availability():
    response = client.put("/seathashmap/update", json={"seat_id": 101, "is_available": False})
    assert response.status_code == 200
    assert response.json() == {"success": True}

def test_get_seat_info():
    response = client.get("/seathashmap/info", params={"seat_id": 101})
    assert response.status_code == 200
    assert "seatID" in response.json()
