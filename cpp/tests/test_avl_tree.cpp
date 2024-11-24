#include "../src/AVLTree.hpp"
#include <iostream>
#include <cassert>

void testInsertion() {
    AVLTree<Seat> avl;
    avl.insert(Seat(10, true, "Regular"));
    avl.insert(Seat(20, true, "VIP"));
    avl.insert(Seat(30, true, "Regular"));
    avl.insert(Seat(40, true, "VIP"));
    avl.insert(Seat(50, true, "Regular"));
    avl.insert(Seat(25, true, "VIP"));

    std::cout << "Test Insertion (Inorder Traversal): " << std::endl;
    avl.printInorder();
    std::cout << " -> Passed" << std::endl;
}

void testSearch() {
    AVLTree<Seat> avl;
    avl.insert(Seat(15, true, "Regular"));
    avl.insert(Seat(25, true, "VIP"));
    avl.insert(Seat(35, true, "Regular"));

    assert(avl.search(15) == true);
    assert(avl.search(25) == true);
    assert(avl.search(35) == true);
    assert(avl.search(40) == false);

    std::cout << "Test Search -> Passed" << std::endl;
}

void testDeletion() {
    AVLTree<Seat> avl;
    avl.insert(Seat(5, true, "Regular"));
    avl.insert(Seat(10, true, "VIP"));
    avl.insert(Seat(15, true, "Regular"));
    avl.insert(Seat(20, true, "VIP"));
    avl.insert(Seat(25, true, "Regular"));

    avl.remove(Seat(10));
    assert(avl.search(10) == false);

    std::cout << "Test Deletion (Inorder Traversal after deletion): " << std::endl;
    avl.printInorder();
    std::cout << " -> Passed" << std::endl;
}

void testBooking() {
    AVLTree<Seat> avl;
    avl.insert(Seat(1, true, "VIP"));
    avl.insert(Seat(2, true, "Regular"));
    avl.insert(Seat(3, true, "VIP")); // Insert with initial availability set to true

    bool booked = avl.bookSeat(3);
    assert(booked == true); // Should succeed in booking (toggling to unavailable)
    assert(avl.bookSeat(3) == false); // Subsequent booking should fail (already booked)

    std::cout << "Test Booking -> Passed" << std::endl;
}

void testCancelBooking() {
    AVLTree<Seat> avl;
    avl.insert(Seat(5, true, "Regular"));
    avl.bookSeat(5);

    bool canceled = avl.cancelSeat(5);
    assert(canceled == true); // Should succeed in canceling
    assert(avl.cancelSeat(5) == false); // Subsequent cancel should fail (already canceled)

    std::cout << "Test Cancel Booking -> Passed" << std::endl;
}

void testFindNearestAvailableSeat() {
    AVLTree<Seat> avl;
    avl.insert(Seat(10, true, "Regular"));
    avl.insert(Seat(20, false, "VIP")); // Unavailable
    avl.insert(Seat(25, true, "Regular"));
    avl.insert(Seat(30, true, "VIP"));
    avl.insert(Seat(40, true, "Regular"));

    // Testing nearest available seat to SeatID 20
    auto nearestSeat = avl.findNearestAvailableSeat(20);
    assert(nearestSeat.has_value() && nearestSeat->seatID == 25);

    // Testing nearest available seat to SeatID 35
    nearestSeat = avl.findNearestAvailableSeat(35);
    assert(nearestSeat.has_value() && (nearestSeat->seatID == 30 || nearestSeat->seatID == 40));

    // Testing nearest available seat to SeatID 50 (beyond the highest seat)
    nearestSeat = avl.findNearestAvailableSeat(50);
    if (nearestSeat.has_value()) {
        std::cout << "Found seat beyond 50: SeatID " << nearestSeat->seatID << std::endl;
        assert(nearestSeat->seatID == 40 || nearestSeat->seatID == 30 || nearestSeat->seatID == 25);
    } else {
        std::cout << "No seat available beyond 50" << std::endl;
    }

    std::cout << "Test Find Nearest Available Seat -> Passed" << std::endl;
}

int main() {
    testInsertion();
    testSearch();
    testDeletion();
    testBooking();
    testCancelBooking();
    testFindNearestAvailableSeat();

    std::cout << "All tests passed!" << std::endl;
    return 0;
}
