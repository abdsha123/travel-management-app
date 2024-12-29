// UNDER DEVELOPMENT

// TicketBooking.hpp
#ifndef TICKET_BOOKING_HPP
#define TICKET_BOOKING_HPP

// Forward declarations (if needed)
class Seat;
class AVLTree;
class UserProfileManager;
class SeatHashMap;

#include <string>

// Declare CBookingRecord structure and functions
struct CBookingRecord {
    int seatID;
    char travelDate[20];
    char seatType[50];
    bool isPaid;
    double amountPaid;
    char transactionID[50];
};

// Declare the necessary functions
void initialize_user_manager();
bool book_seat(int seat_id);
bool cancel_seat(int seat_id);
CBookingRecord* get_user_bookings(int user_id, int* count);
void free_user_bookings(CBookingRecord* bookings);

extern AVLTree<Seat> seatTree;   // External declaration of seatTree
extern UserProfileManager userManager;  // External declaration of userManager
extern SeatHashMap seatMap;      // External declaration of seatMap

#endif // TICKET_BOOKING_HPP
