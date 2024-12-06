#include "AVLTree.hpp"
#include "UserProfileManager.hpp"
#include "SeatHashMap.hpp"
#include <optional>
#include <cstring>
#include <iostream>
#include <string>

// Specify the type for AVLTree<Seat>
AVLTree<Seat> seatTree;  // Use AVLTree with the Seat type
UserProfileManager userManager;
SeatHashMap seatMap;

extern "C" {

struct CSeatInfo {
    int seatID;
    bool isAvailable;
    char seatType[50];
};

struct CBookingRecord {
    int seatID;
    char travelDate[20];
    char seatType[50];
};

void initialize_user_manager() {
    std::cout << "User manager initialized.\n";
}

void save_user_manager() {
    std::cout << "User manager state saved.\n";
}

CSeatInfo get_seat(int seat_id) {
    std::optional<Seat> seatOpt = seatTree.findNearestAvailableSeat(seat_id);

    CSeatInfo c_seat;
    if (seatOpt) {
        c_seat.seatID = seatOpt->seatID;
        c_seat.isAvailable = seatOpt->isAvailable;
        std::strncpy(c_seat.seatType, seatOpt->seatType.c_str(), sizeof(c_seat.seatType) - 1);
        c_seat.seatType[sizeof(c_seat.seatType) - 1] = '\0';
    } else {
        c_seat.seatID = -1;
        c_seat.isAvailable = false;
        std::strncpy(c_seat.seatType, "Unknown", sizeof(c_seat.seatType) - 1);
        c_seat.seatType[sizeof(c_seat.seatType) - 1] = '\0';
    }
    return c_seat;
}

bool book_seat(int seat_id) {
    if (!seatTree.search(seat_id)) {
        std::cerr << "Error: Seat with ID " << seat_id << " does not exist.\n";
        return false;
    }
    return seatTree.bookSeat(seat_id);
}

bool cancel_seat(int seat_id) {
    if (!seatTree.search(seat_id)) {
        std::cerr << "Error: Seat with ID " << seat_id << " does not exist.\n";
        return false;
    }
    return seatTree.cancelSeat(seat_id);
}

CBookingRecord* get_user_bookings(int user_id, int* count) {
    if (!userManager.hasBookings(user_id)) {
        std::cerr << "Error: User with ID " << user_id << " has no bookings.\n";
        *count = 0;
        return nullptr;
    }

    std::vector<BookingRecord> bookings = userManager.getBookingHistory(user_id);
    *count = bookings.size();

    CBookingRecord* c_bookings = new CBookingRecord[*count];
    for (int i = 0; i < *count; ++i) {
        c_bookings[i].seatID = bookings[i].seatID;
        std::strncpy(c_bookings[i].travelDate, bookings[i].travelDate.c_str(), sizeof(c_bookings[i].travelDate) - 1);
        c_bookings[i].travelDate[sizeof(c_bookings[i].travelDate) - 1] = '\0';
        std::strncpy(c_bookings[i].seatType, bookings[i].seatType.c_str(), sizeof(c_bookings[i].seatType) - 1);
        c_bookings[i].seatType[sizeof(c_bookings[i].seatType) - 1] = '\0';
    }
    return c_bookings;
}

void free_user_bookings(CBookingRecord* bookings) {
    delete[] bookings;
}

}
