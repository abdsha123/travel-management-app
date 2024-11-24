import pytest
from fastapi.testclient import TestClient
from app.main import app

client = TestClient(app)

def test_add_request():
    response = client.post("/priorityqueue/add", json={"seat_id": 1, "priority": 10})
    assert response.status_code == 200
    assert response.json() == {"success": True}

def test_process_request():
    response = client.post("/priorityqueue/process")
    assert response.status_code == 200
    assert "seatID" in response.json()
    assert "priority" in response.json()

def test_get_request_count():
    response = client.get("/priorityqueue/count")
    assert response.status_code == 200
    assert isinstance(response.json(), int)

def test_is_empty():
    response = client.get("/priorityqueue/empty")
    assert response.status_code == 200
    assert isinstance(response.json(), bool)
