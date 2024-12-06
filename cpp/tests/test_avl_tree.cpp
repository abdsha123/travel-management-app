#include "AVLTree.hpp"
#include <cassert>
#include <optional>

void testInsertion() {
    AVLTree<Seat> avl;  // Specify the type for AVLTree

    // Insert seats
    avl.insert(Seat(10, true, "Regular"));
    avl.insert(Seat(20, true, "VIP"));
    avl.insert(Seat(5, true, "Regular"));

    // Attempt to insert a duplicate seat
    avl.insert(Seat(10, true, "Regular"));  // Should trigger duplicate error
}

void testSearch() {
    AVLTree<Seat> avl;  // Specify the type for AVLTree

    // Insert seats
    avl.insert(Seat(10, true, "Regular"));
    avl.insert(Seat(20, true, "VIP"));
    avl.insert(Seat(5, true, "Regular"));

    // Search for existing and non-existing seats
    assert(avl.search(10) == true);
    assert(avl.search(15) == false);
}

void testDeletion() {
    AVLTree<Seat> avl;  // Specify the type for AVLTree

    // Insert seats
    avl.insert(Seat(10, true, "Regular"));
    avl.insert(Seat(20, true, "VIP"));
    avl.insert(Seat(5, true, "Regular"));

    // Delete a seat
    avl.remove(Seat(10));

    // Ensure the seat is deleted
    assert(avl.search(10) == false);

    // Attempt to delete a non-existing seat
    avl.remove(Seat(15));  // Should trigger not found error
}

void testBooking() {
    AVLTree<Seat> avl;  // Specify the type for AVLTree

    // Insert seats
    avl.insert(Seat(3, true, "Regular"));
    avl.insert(Seat(5, true, "VIP"));

    // Book a seat
    bool booked = avl.bookSeat(3);
    assert(booked == true);
    assert(avl.search(3) == true);  // Seat still exists

    // Attempt to book an already booked seat
    booked = avl.bookSeat(3);
    assert(booked == false);
}

void testCancelBooking() {
    AVLTree<Seat> avl;  // Specify the type for AVLTree

    // Insert seats
    avl.insert(Seat(5, false, "VIP"));
    avl.insert(Seat(7, true, "Regular"));

    // Cancel a booking
    bool canceled = avl.cancelSeat(5);
    assert(canceled == true);
    // Ensure the seat is now available
    // Assuming you have a method to check availability, but currently `search` only checks existence
    // If you have a method like `isAvailable`, use it here
}

void testFindNearestAvailableSeat() {
    AVLTree<Seat> avl;  // Specify the type for AVLTree

    // Insert seats
    avl.insert(Seat(1, false, "Regular"));
    avl.insert(Seat(3, true, "VIP"));
    avl.insert(Seat(5, true, "Regular"));
    avl.insert(Seat(7, false, "VIP"));

    // Find nearest available seat to seatID=4
    std::optional<Seat> nearest = avl.findNearestAvailableSeat(4);
    assert(nearest.has_value());
    assert(nearest->seatID == 3);  // Or 5, depending on implementation

    // Find nearest available seat to seatID=6
    nearest = avl.findNearestAvailableSeat(6);
    assert(nearest.has_value());
    assert(nearest->seatID == 5);
}

int main() {
    testInsertion();
    testSearch();
    testDeletion();
    testBooking();
    testCancelBooking();
    testFindNearestAvailableSeat();

    std::cout << "All AVLTree tests passed successfully.\n";
    return 0;
}
