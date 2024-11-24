#ifndef BINARYSEARCHUTIL_HPP
#define BINARYSEARCHUTIL_HPP

#include <vector>
#include <algorithm>
#include <string>

struct SeatRecord {
    int seatID;
    std::string seatType;
    std::string travelDate;

    SeatRecord(int id, const std::string& type, const std::string& date)
        : seatID(id), seatType(type), travelDate(date) {}
};

class BinarySearchUtil {
public:
    static bool searchByDate(const std::vector<SeatRecord>& sortedRecords, const std::string& targetDate) {
        auto it = std::lower_bound(sortedRecords.begin(), sortedRecords.end(), targetDate,
                                   [](const SeatRecord& record, const std::string& date) {
                                       return record.travelDate < date;
                                   });
        return (it != sortedRecords.end() && it->travelDate == targetDate);
    }

    static bool searchBySeatType(const std::vector<SeatRecord>& sortedRecords, const std::string& targetType) {
        auto it = std::find_if(sortedRecords.begin(), sortedRecords.end(),
                               [&targetType](const SeatRecord& record) {
                                   return record.seatType == targetType;
                               });
        return it != sortedRecords.end();
    }

    static void printAllRecords(const std::vector<SeatRecord>& records) {
        for (const auto& record : records) {
            std::cout << "SeatID: " << record.seatID
                      << ", SeatType: " << record.seatType
                      << ", TravelDate: " << record.travelDate << std::endl;
        }
    }
};

#endif // BINARYSEARCHUTIL_HPP
