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

using namespace std;

class Graph {
public:
    // Represents a route between two cities with a weight for distance, time, or cost
    struct Edge {
        string destination;
        int weight;
        Edge(string dest, int w) : destination(dest), weight(w) {}
    };

    // Adds a city (node) to the graph
    void addCity(const string& city) {
        adjList[city] = vector<Edge>();
    }

    // Adds a route (edge) between two cities with a specified weight
    void addRoute(const string& city1, const string& city2, int weight) {
        adjList[city1].emplace_back(city2, weight);
        adjList[city2].emplace_back(city1, weight);  // Assuming undirected graph for bi-directional travel
    }

    // Finds the shortest path between two cities using Dijkstra's algorithm
    pair<int, vector<string>> findShortestPath(const string& startCity, const string& endCity) {
        unordered_map<string, int> distances;
        unordered_map<string, string> predecessors;
        for (const auto& pair : adjList) {
            distances[pair.first] = numeric_limits<int>::max();
        }
        distances[startCity] = 0;

        auto compare = [](pair<int, string> left, pair<int, string> right) { return left.first > right.first; };
        priority_queue<pair<int, string>, vector<pair<int, string>>, decltype(compare)> minHeap(compare);
        minHeap.emplace(0, startCity);

        while (!minHeap.empty()) {
            int dist = minHeap.top().first;
            string city = minHeap.top().second;
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

        vector<string> path;
        if (distances[endCity] == numeric_limits<int>::max()) {
            return { -1, path };  // No path found
        }

        for (string at = endCity; at != ""; at = predecessors[at]) {
            path.push_back(at);
        }
        reverse(path.begin(), path.end());
        return { distances[endCity], path };
    }

    // Iterates over each city in the graph
    void forEachCity(const std::function<void(const string&)>& callback) const {
        for (const auto& [city, _] : adjList) {
            callback(city);
        }
    }

    // Iterates over each route in the graph
    void forEachRoute(const std::function<void(const string&, const string&, int)>& callback) const {
        for (const auto& [city, edges] : adjList) {
            for (const auto& edge : edges) {
                callback(city, edge.destination, edge.weight);
            }
        }
    }

    // Prints the adjacency list for debugging purposes
    void printGraph() const {
        for (const auto& pair : adjList) {
            cout << pair.first << ": ";
            for (const auto& edge : pair.second) {
                cout << "(" << edge.destination << ", " << edge.weight << ") ";
            }
            cout << endl;
        }
    }

private:
    unordered_map<string, vector<Edge>> adjList;
};

#endif // GRAPH_HPP
