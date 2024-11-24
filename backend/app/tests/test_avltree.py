import pytest
from fastapi.testclient import TestClient
from app.main import app

client = TestClient(app)

def test_insert_seat():
    response = client.post("/avltree/insert", json={"seat_id": 1, "is_available": True, "seat_type": "Regular"})
    assert response.status_code == 200
    assert response.json() == {"success": True}

def test_book_seat():
    response = client.post("/avltree/book", json={"seat_id": 1})
    assert response.status_code == 200
    assert response.json() == {"success": True}

def test_cancel_seat():
    response = client.post("/avltree/cancel", json={"seat_id": 1})
    assert response.status_code == 200
    assert response.json() == {"success": True}

def test_find_nearest_seat():
    response = client.get("/avltree/nearest", params={"seat_id": 1})
    assert response.status_code == 200
    assert "seatID" in response.json()
