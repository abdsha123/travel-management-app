import pytest
from fastapi.testclient import TestClient
from app.main import app

client = TestClient(app)

def test_add_city():
    response = client.post("/graph/city", json={"city_name": "CityA"})
    assert response.status_code == 200
    assert response.json() == {"success": True}

def test_add_route():
    response = client.post("/graph/route", json={"city1": "CityA", "city2": "CityB", "weight": 10})
    assert response.status_code == 200
    assert response.json() == {"success": True}

def test_find_shortest_path():
    response = client.get("/graph/path", params={"start_city": "CityA", "end_city": "CityB"})
    assert response.status_code == 200
    assert "path" in response.json()
    assert "distance" in response.json()
