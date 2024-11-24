#include "../src/PriorityQueue.hpp"
#include <cassert>
#include <iostream>

void testAddRequest() {
    PriorityQueue pq;

    pq.addRequest(1, 2);
    pq.addRequest(2, 5);
    pq.addRequest(3, 3);

    std::cout << "Request count after adding 3 requests: " << pq.getRequestCount() << std::endl;
    assert(pq.getRequestCount() == 3);

    std::cout << "Test Add Request -> Passed" << std::endl;
}

void testProcessRequest() {
    PriorityQueue pq;

    pq.addRequest(1, 2);
    pq.addRequest(2, 5);
    pq.addRequest(3, 3);

    BookingRequest req = pq.processRequest();
    std::cout << "Processing request with SeatID: " << req.seatID << " and Priority: " << req.priority << std::endl;
    assert(req.seatID == 2 && req.priority == 5);

    req = pq.processRequest();
    std::cout << "Processing request with SeatID: " << req.seatID << " and Priority: " << req.priority << std::endl;
    assert(req.seatID == 3 && req.priority == 3);

    req = pq.processRequest();
    std::cout << "Processing request with SeatID: " << req.seatID << " and Priority: " << req.priority << std::endl;
    assert(req.seatID == 1 && req.priority == 2);

    assert(pq.isEmpty());

    std::cout << "Test Process Request -> Passed" << std::endl;
}

void testEmptyQueue() {
    PriorityQueue pq;

    assert(pq.isEmpty());

    pq.addRequest(1, 2);
    assert(!pq.isEmpty());
    pq.processRequest();
    assert(pq.isEmpty());

    std::cout << "Test Empty Queue -> Passed" << std::endl;
}

int main() {
    testAddRequest();
    testProcessRequest();
    testEmptyQueue();

    std::cout << "All priority queue tests passed!" << std::endl;
    return 0;
}
