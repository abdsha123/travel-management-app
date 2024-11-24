#include "../src/Graph.hpp"
#include <cassert>
#include <iostream>

void testAddCityAndRoute() {
    Graph graph;

    // Add cities
    graph.addCity("CityA");
    graph.addCity("CityB");
    graph.addCity("CityC");

    // Add routes
    graph.addRoute("CityA", "CityB", 10);
    graph.addRoute("CityB", "CityC", 5);
    graph.addRoute("CityA", "CityC", 15);

    // Print graph for debugging
    graph.printGraph();

    std::cout << "Test Add City and Route -> Passed" << std::endl;
}

void testFindShortestPath() {
    Graph graph;

    // Add cities
    graph.addCity("CityA");
    graph.addCity("CityB");
    graph.addCity("CityC");
    graph.addCity("CityD");

    // Add routes
    graph.addRoute("CityA", "CityB", 10);
    graph.addRoute("CityB", "CityC", 5);
    graph.addRoute("CityA", "CityC", 15);
    graph.addRoute("CityC", "CityD", 10);

    // Find shortest path
    auto result = graph.findShortestPath("CityA", "CityD");

    // Debugging output
    std::cout << "Actual shortest path cost: " << result.first << std::endl;
    std::cout << "Actual shortest path: ";
    for (const auto& city : result.second) {
        std::cout << city << " ";
    }
    std::cout << std::endl;

    // Validate results
    assert(result.first == 25);  // Expected path cost: CityA -> CityC -> CityD
    assert(result.second == std::vector<std::string>({"CityA", "CityC", "CityD"}));

    std::cout << "Test Find Shortest Path -> Passed" << std::endl;
}

void testNoPathAvailable() {
    Graph graph;

    // Add cities
    graph.addCity("CityA");
    graph.addCity("CityB");
    graph.addCity("CityC");

    // Add a single route
    graph.addRoute("CityA", "CityB", 10);

    // Attempt to find a path between disconnected cities
    auto result = graph.findShortestPath("CityA", "CityC");

    // Validate results
    assert(result.first == -1);  // No path available
    assert(result.second.empty());

    std::cout << "Test No Path Available -> Passed" << std::endl;
}

int main() {
    testAddCityAndRoute();
    testFindShortestPath();
    testNoPathAvailable();

    std::cout << "All graph tests passed!" << std::endl;
    return 0;
}
