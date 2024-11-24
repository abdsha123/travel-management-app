#ifndef USERPROFILEMANAGER_HPP
#define USERPROFILEMANAGER_HPP

#include <unordered_map>
#include <vector>
#include <string>
#include <iostream>

struct BookingRecord {
    int seatID;
    std::string travelDate;
    std::string seatType;

    BookingRecord(int id, const std::string& date, const std::string& type)
        : seatID(id), travelDate(date), seatType(type) {}
};

class UserProfileManager {
private:
    std::unordered_map<int, std::vector<BookingRecord>> userProfiles;

public:
    void addBooking(int userID, int seatID, const std::string& travelDate, const std::string& seatType) {
        userProfiles[userID].emplace_back(seatID, travelDate, seatType);
    }

    std::vector<BookingRecord> getBookingHistory(int userID) const {
        if (userProfiles.find(userID) != userProfiles.end()) {
            return userProfiles.at(userID);
        } else {
            return {};
        }
    }

    bool hasBookings(int userID) const {
        return userProfiles.find(userID) != userProfiles.end();
    }

    void printAllProfiles() const {
        for (const auto& [userID, bookings] : userProfiles) {
            std::cout << "UserID: " << userID << "\n";
            for (const auto& booking : bookings) {
                std::cout << "  SeatID: " << booking.seatID
                          << ", TravelDate: " << booking.travelDate
                          << ", SeatType: " << booking.seatType << "\n";
            }
        }
    }
};

#endif // USERPROFILEMANAGER_HPP
