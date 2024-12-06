# graph.py
from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from app.services.graph_service import add_city, add_route, find_shortest_path, print_graph, get_all_cities

router = APIRouter()

class CityRequest(BaseModel):
    city_name: str

class RouteRequest(BaseModel):
    city1: str
    city2: str
    weight: int

@router.post("/city")
async def add_city_endpoint(city: CityRequest):
    result = await add_city(city.city_name)  # Await the async function
    return {
        "success": True,
        "message": f"City '{city.city_name}' added successfully",
        "result": result,
    }

@router.post("/route")
async def add_route_endpoint(route: RouteRequest):
    result = await add_route(route.city1, route.city2, route.weight)  # Await the async function
    return {
        "success": True,
        "message": f"Route added between '{route.city1}' and '{route.city2}' with weight {route.weight}",
        "result": result,
    }

@router.get("/path")
async def shortest_path_endpoint(start_city: str, end_city: str):
    result = await find_shortest_path(start_city, end_city)  # Await the async function
    if result["success"]:
        return {
            "success": True,
            "message": f"Shortest path from '{start_city}' to '{end_city}' found",
            "path": result["path"],
            "cost": result["cost"],
        }
    else:
        return {
            "success": False,
            "message": f"No path found from '{start_city}' to '{end_city}'",
            "error": result["error"],
        }

@router.get("/graph")
async def graph_endpoint():
    result = await print_graph()  # Await the async function
    if not result["success"]:
        raise HTTPException(status_code=500, detail=result["error"])
    return {
        "success": True,
        "graph": result["graph"]
    }

@router.get("/cities")
async def get_cities_endpoint():
    result = await get_all_cities()  # Await the async function
    if not result["success"]:
        raise HTTPException(status_code=500, detail=result["error"])
    return {
        "success": True,
        "cities": result["cities"]
    }
