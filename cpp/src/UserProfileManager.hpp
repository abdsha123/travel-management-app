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

struct UserProfile {
    std::string name;
    std::string contact;
    std::string email;
    std::vector<BookingRecord> bookings;
};

class UserProfileManager {
private:
    std::unordered_map<int, UserProfile> userProfiles;

public:
    void setUserDetails(int userID, const std::string& name, const std::string& contact, const std::string& email) {
        userProfiles[userID].name = name;
        userProfiles[userID].contact = contact;
        userProfiles[userID].email = email;
    }

    void addBooking(int userID, int seatID, const std::string& travelDate, const std::string& seatType) {
        userProfiles[userID].bookings.emplace_back(seatID, travelDate, seatType);
    }

    std::vector<BookingRecord> getBookingHistory(int userID) const {
        if (userProfiles.find(userID) != userProfiles.end()) {
            return userProfiles.at(userID).bookings;
        } else {
            return {};
        }
    }

    bool hasBookings(int userID) const {
        return userProfiles.find(userID) != userProfiles.end() && !userProfiles.at(userID).bookings.empty();
    }

    void printAllProfiles() const {
        for (const auto& [userID, profile] : userProfiles) {
            std::cout << "UserID: " << userID << "\n";
            std::cout << "Name: " << profile.name << ", Contact: " << profile.contact << ", Email: " << profile.email << "\n";
            for (const auto& booking : profile.bookings) {
                std::cout << "  SeatID: " << booking.seatID
                          << ", TravelDate: " << booking.travelDate
                          << ", SeatType: " << booking.seatType << "\n";
            }
        }
    }
};

#endif // USERPROFILEMANAGER_HPP
