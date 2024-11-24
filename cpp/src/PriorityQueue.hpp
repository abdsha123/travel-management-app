#ifndef PRIORITYQUEUE_HPP
#define PRIORITYQUEUE_HPP

#include <queue>
#include <vector>
#include <iostream>
#include <chrono>
#include <functional>

// Structure for storing booking requests with priority
struct BookingRequest {
    int seatID;
    int priority;  // Higher values mean higher priority (e.g., VIPs)
    std::chrono::time_point<std::chrono::steady_clock> timestamp;

    // Constructor to initialize booking request with seatID and priority
    BookingRequest(int id, int p) : seatID(id), priority(p) {
        timestamp = std::chrono::steady_clock::now();
    }

    // Comparison operator for priority queue (higher priority first)
    bool operator<(const BookingRequest& other) const {
        if (priority == other.priority) {
            return timestamp > other.timestamp;  // Earlier requests get higher priority if the same level
        }
        return priority < other.priority;
    }
};

// PriorityQueue class
class PriorityQueue {
private:
    std::priority_queue<BookingRequest> queue;

public:
    // Adds a booking request to the priority queue
    void addRequest(int seatID, int priority) {
        queue.push(BookingRequest(seatID, priority));
    }

    // Processes the highest-priority request in the queue
    BookingRequest processRequest() {
        if (queue.empty()) {
            throw std::runtime_error("No booking requests to process");
        }
        BookingRequest topRequest = queue.top();
        queue.pop();
        return topRequest;
    }

    // Checks if the queue is empty
    bool isEmpty() const {
        return queue.empty();
    }

    // Returns the number of pending booking requests
    int getRequestCount() const {
        return queue.size();
    }

    // Iterates over all requests in the queue without modifying it
    void forEachRequest(const std::function<void(const BookingRequest&)>& callback) const {
        auto tempQueue = queue;  // Make a copy to avoid modifying the original queue
        while (!tempQueue.empty()) {
            callback(tempQueue.top());
            tempQueue.pop();
        }
    }

    // Prints all requests in the queue
    void printAllRequests() const {
        forEachRequest([](const BookingRequest& request) {
            std::cout << "SeatID: " << request.seatID
                      << ", Priority: " << request.priority
                      << ", Timestamp: "
                      << std::chrono::duration_cast<std::chrono::milliseconds>(
                             request.timestamp.time_since_epoch())
                             .count()
                      << "ms since epoch" << std::endl;
        });
    }
};

#endif // PRIORITYQUEUE_HPP
