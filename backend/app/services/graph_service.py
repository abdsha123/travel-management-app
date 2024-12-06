# graph_service.py
from cpp_backend import Graph
import asyncio

# Singleton instance of Graph
graph = Graph()
lock = asyncio.Lock()

async def add_city(city_name: str):
    async with lock:
        graph.addCity(city_name)
    return {"success": True, "city_name": city_name}

async def add_route(city1: str, city2: str, weight: int):
    async with lock:
        graph.addRoute(city1, city2, weight)
    return {"success": True, "route": {"city1": city1, "city2": city2, "weight": weight}}

async def find_shortest_path(start_city: str, end_city: str):
    async with lock:
        result = graph.findShortestPath(start_city, end_city)
    if result.first == -1:
        return {"success": False, "error": "No path found"}
    return {"success": True, "path": result.second, "cost": result.first}

async def print_graph():
    async with lock:
        try:
            adjacency_list = graph.getAdjacencyList()
            graph_data = []
            for city, edges in adjacency_list.items():
                for edge in edges:
                    graph_data.append({
                        "city": city,
                        "destination": edge.destination,
                        "weight": edge.weight
                    })
            return {"success": True, "graph": graph_data}
        except Exception as e:
            return {"success": False, "error": f"Failed to retrieve graph data: {str(e)}"}

async def get_all_cities():
    async with lock:
        try:
            cities = graph.getAllCities()
            return {"success": True, "cities": cities}
        except Exception as e:
            return {"success": False, "error": f"Failed to retrieve cities: {str(e)}"}
