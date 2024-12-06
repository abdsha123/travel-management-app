#ifndef SEATHASHMAP_HPP
#define SEATHASHMAP_HPP

#include <unordered_map>
#include <string>
#include <iostream>
#include <functional>
#include <vector>

struct SeatInfo {
    int seatID = 0;
    bool isAvailable = true;
    std::string seatType = "Regular";

    SeatInfo() = default;
    SeatInfo(int id, bool available, const std::string& type)
        : seatID(id), isAvailable(available), seatType(type) {}
};

class SeatHashMap {
private:
    std::unordered_map<int, SeatInfo> seatMap;

public:
    void addSeat(int seatID, bool isAvailable, const std::string& seatType) {
        if (seatMap.find(seatID) != seatMap.end()) {
            std::cerr << "Seat already exists.\n";
        }
        seatMap[seatID] = SeatInfo(seatID, isAvailable, seatType);
    }

    bool isSeatAvailable(int seatID) const {
        auto it = seatMap.find(seatID);
        if (it != seatMap.end()) {
            return it->second.isAvailable;
        }
        std::cerr << "Seat not found.\n";
        return false;
    }

    void updateSeatAvailability(int seatID, bool availability) {
        if (seatMap.find(seatID) != seatMap.end()) {
            seatMap[seatID].isAvailable = availability;
        } else {
            std::cerr << "Seat not found.\n";
        }
    }

    SeatInfo getSeatInfo(int seatID) const {
        if (seatMap.find(seatID) != seatMap.end()) {
            return seatMap.at(seatID);
        } else {
            throw std::runtime_error("Seat not found.");
        }
    }

    void forEachSeat(const std::function<void(const SeatInfo&)>& callback) const {
        for (const auto& [seatID, seat] : seatMap) {
            callback(seat);
        }
    }

    void printAllSeats() const {
        forEachSeat([](const SeatInfo& seat) {
            std::cout << "SeatID: " << seat.seatID
                      << ", Available: " << seat.isAvailable
                      << ", Type: " << seat.seatType << std::endl;
        });
    }

    std::vector<SeatInfo> getAllSeats() const {
        std::vector<SeatInfo> seats;
        seats.reserve(seatMap.size());
        for (const auto& pair : seatMap) {
            seats.push_back(pair.second);
        }
        return seats;
    }
};

#endif // SEATHASHMAP_HPP
