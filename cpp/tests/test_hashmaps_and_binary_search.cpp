#include "SeatHashMap.hpp"
#include "UserProfileManager.hpp"
#include "BinarySearchUtil.hpp"
#include <cassert>
#include <iostream>
#include <algorithm>

void testSeatHashMap() {
    SeatHashMap seatMap;

    // Add seats
    seatMap.addSeat(101, true, "Regular");
    seatMap.addSeat(102, false, "VIP");

    // Test seat availability
    assert(seatMap.isSeatAvailable(101) == true);
    seatMap.updateSeatAvailability(101, false);
    assert(seatMap.isSeatAvailable(101) == false);

    // Test retrieval and iteration
    auto seatInfo = seatMap.getSeatInfo(102);
    assert(seatInfo.seatID == 102);
    assert(seatInfo.isAvailable == false);
    assert(seatInfo.seatType == "VIP");

    seatMap.printAllSeats(); // Debugging output

    std::cout << "SeatHashMap tests passed!" << std::endl;
}

void testUserProfileManager() {
    UserProfileManager userManager;

    // Add booking
    userManager.addBooking(1, 101, "2024-12-01", "Regular");

    // Test user booking retrieval
    assert(userManager.hasBookings(1) == true);
    auto history = userManager.getBookingHistory(1);
    assert(history.size() == 1);
    assert(history[0].seatID == 101);
    assert(history[0].travelDate == "2024-12-01");
    assert(history[0].seatType == "Regular");

    // Test iteration
    userManager.printAllProfiles(); // Debugging output

    std::cout << "UserProfileManager tests passed!" << std::endl;
}

void testBinarySearchUtil() {
    std::vector<SeatRecord> records = {
        {101, "Regular", "2024-12-01"},
        {102, "VIP", "2024-12-02"},
        {103, "Regular", "2024-12-03"}
    };

    // Sort records by travel date
    std::sort(records.begin(), records.end(), [](const SeatRecord& a, const SeatRecord& b) {
        return a.travelDate < b.travelDate;
    });

    // Test binary search by date
    assert(BinarySearchUtil::searchByDate(records, "2024-12-02") == true);
    assert(BinarySearchUtil::searchByDate(records, "2024-12-05") == false);

    // Test binary search by seat type
    assert(BinarySearchUtil::searchBySeatType(records, "VIP") == true);
    assert(BinarySearchUtil::searchBySeatType(records, "Business") == false);

    // Debugging output
    BinarySearchUtil::printAllRecords(records);

    std::cout << "BinarySearchUtil tests passed!" << std::endl;
}

int main() {
    testSeatHashMap();
    testUserProfileManager();
    testBinarySearchUtil();

    std::cout << "All tests passed!" << std::endl;
    return 0;
}
