// Graph.hpp
#ifndef GRAPH_HPP
#define GRAPH_HPP

#include <iostream>
#include <unordered_map>
#include <vector>
#include <queue>
#include <limits>
#include <string>
#include <functional>
#include <algorithm>

class Graph {
public:
    // Represents a route between two cities with a weight for distance, time, or cost
    struct Edge {
        std::string destination;
        int weight;
        Edge(std::string dest, int w) : destination(dest), weight(w) {}
    };

    // Adds a city (node) to the graph
    void addCity(const std::string& city) {
        adjList[city] = std::vector<Edge>();
    }

    // Adds a route (edge) between two cities with a specified weight
    void addRoute(const std::string& city1, const std::string& city2, int weight) {
        adjList[city1].emplace_back(city2, weight);
        adjList[city2].emplace_back(city1, weight);  // Assuming undirected graph for bi-directional travel
    }

    // Finds the shortest path between two cities using Dijkstra's algorithm
    std::pair<int, std::vector<std::string>> findShortestPath(const std::string& startCity, const std::string& endCity) {
        std::unordered_map<std::string, int> distances;
        std::unordered_map<std::string, std::string> predecessors;
        for (const auto& pair : adjList) {
            distances[pair.first] = std::numeric_limits<int>::max();
        }
        distances[startCity] = 0;

        auto compare = [](std::pair<int, std::string> left, std::pair<int, std::string> right) { return left.first > right.first; };
        std::priority_queue<std::pair<int, std::string>, std::vector<std::pair<int, std::string>>, decltype(compare)> minHeap(compare);
        minHeap.emplace(0, startCity);

        while (!minHeap.empty()) {
            int dist = minHeap.top().first;
            std::string city = minHeap.top().second;
            minHeap.pop();

            if (city == endCity) break;

            for (const Edge& edge : adjList[city]) {
                int newDist = dist + edge.weight;
                if (newDist < distances[edge.destination]) {
                    distances[edge.destination] = newDist;
                    predecessors[edge.destination] = city;
                    minHeap.emplace(newDist, edge.destination);
                }
            }
        }

        std::vector<std::string> path;
        if (distances[endCity] == std::numeric_limits<int>::max()) {
            return { -1, path };  // No path found
        }

        for (std::string at = endCity; at != ""; at = predecessors[at]) {
            path.push_back(at);
            if (predecessors.find(at) == predecessors.end()) break;  // Prevent infinite loop
        }
        std::reverse(path.begin(), path.end());
        return { distances[endCity], path };
    }

    // Iterates over each city in the graph
    void forEachCity(const std::function<void(const std::string&)>& callback) const {
        for (const auto& [city, _] : adjList) {
            callback(city);
        }
    }

    // Iterates over each route in the graph
    void forEachRoute(const std::function<void(const std::string&, const std::string&, int)>& callback) const {
        for (const auto& [city, edges] : adjList) {
            for (const auto& edge : edges) {
                callback(city, edge.destination, edge.weight);
            }
        }
    }

    // Prints the adjacency list for debugging purposes
    void printGraph() const {
        for (const auto& pair : adjList) {
            std::cout << pair.first << ": ";
            for (const auto& edge : pair.second) {
                std::cout << "(" << edge.destination << ", " << edge.weight << ") ";
            }
            std::cout << std::endl;
        }
    }

    // Returns all cities in the graph
    std::vector<std::string> getAllCities() const {
        std::vector<std::string> cities;
        for (const auto& pair : adjList) {
            cities.push_back(pair.first);
        }
        return cities;
    }

    // Returns the adjacency list
    std::unordered_map<std::string, std::vector<Edge>> getAdjacencyList() const {
        return adjList;
    }

private:
    std::unordered_map<std::string, std::vector<Edge>> adjList;
};

#endif // GRAPH_HPP
