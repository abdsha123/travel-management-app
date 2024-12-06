#include <pybind11/pybind11.h>
#include <pybind11/stl.h>
#include "AVLTree.hpp"
#include "PriorityQueue.hpp"
#include "Graph.hpp"
#include "SeatHashMap.hpp"
#include "UserProfileManager.hpp"
#include "BinarySearchUtil.hpp"

namespace py = pybind11;

PYBIND11_MODULE(cpp_backend, m) {
    // Seat class
    py::class_<Seat>(m, "Seat")
        .def(py::init<int, bool, std::string>())
        .def_readwrite("seatID", &Seat::seatID)
        .def_readwrite("isAvailable", &Seat::isAvailable)
        .def_readwrite("seatType", &Seat::seatType);

    // AVLTree class
    py::class_<AVLTree<Seat>>(m, "AVLTree")
        .def(py::init<>())
        .def("insert", static_cast<void (AVLTree<Seat>::*)(Seat)>(&AVLTree<Seat>::insert))
        .def("remove", static_cast<void (AVLTree<Seat>::*)(Seat)>(&AVLTree<Seat>::remove))
        .def("bookSeat", &AVLTree<Seat>::bookSeat)
        .def("cancelSeat", &AVLTree<Seat>::cancelSeat)
        .def("findNearestAvailableSeat", &AVLTree<Seat>::findNearestAvailableSeat)
        .def("printInorder", &AVLTree<Seat>::printInorder)
        // Explicitly cast the search function pointer
        .def("search", (bool (AVLTree<Seat>::*)(int) const) &AVLTree<Seat>::search);

    // BookingRequest class
    py::class_<BookingRequest>(m, "BookingRequest")
        .def(py::init<int, int>())
        .def_readwrite("seatID", &BookingRequest::seatID)
        .def_readwrite("priority", &BookingRequest::priority);

    // PriorityQueue class
    py::class_<PriorityQueue>(m, "PriorityQueue")
        .def(py::init<>())
        .def("addRequest", &PriorityQueue::addRequest)
        .def("processRequest", &PriorityQueue::processRequest)
        .def("isEmpty", &PriorityQueue::isEmpty)
        .def("getRequestCount", &PriorityQueue::getRequestCount)
        .def("printAllRequests", &PriorityQueue::printAllRequests);

    // Graph class
    py::class_<Graph::Edge>(m, "Edge")
        .def(py::init<std::string, int>())
        .def_readwrite("destination", &Graph::Edge::destination)
        .def_readwrite("weight", &Graph::Edge::weight);

    py::class_<Graph>(m, "Graph")
        .def(py::init<>())
        .def("addCity", &Graph::addCity)
        .def("addRoute", &Graph::addRoute)
        .def("findShortestPath", &Graph::findShortestPath)
        .def("printGraph", &Graph::printGraph);

    // SeatHashMap class
    py::class_<SeatInfo>(m, "SeatInfo")
        .def(py::init<int, bool, std::string>())
        .def_readwrite("seatID", &SeatInfo::seatID)
        .def_readwrite("isAvailable", &SeatInfo::isAvailable)
        .def_readwrite("seatType", &SeatInfo::seatType);

    py::class_<SeatHashMap>(m, "SeatHashMap")
        .def(py::init<>())
        .def("addSeat", &SeatHashMap::addSeat)
        .def("isSeatAvailable", &SeatHashMap::isSeatAvailable)
        .def("updateSeatAvailability", &SeatHashMap::updateSeatAvailability)
        .def("getSeatInfo", &SeatHashMap::getSeatInfo)
        .def("printAllSeats", &SeatHashMap::printAllSeats)
        .def("getAllSeats", &SeatHashMap::getAllSeats);

    // BookingRecord class
    py::class_<BookingRecord>(m, "BookingRecord")
        .def(py::init<int, std::string, std::string>())
        .def_readwrite("seatID", &BookingRecord::seatID)
        .def_readwrite("travelDate", &BookingRecord::travelDate)
        .def_readwrite("seatType", &BookingRecord::seatType)
        .def("__repr__", [](const BookingRecord &record) {
            return "<BookingRecord seatID=" + std::to_string(record.seatID) +
                   ", travelDate='" + record.travelDate +
                   "', seatType='" + record.seatType + "'>";
        });

    // UserProfile and UserProfileManager
    py::class_<UserProfile>(m, "UserProfile")
        .def_readwrite("name", &UserProfile::name)
        .def_readwrite("contact", &UserProfile::contact)
        .def_readwrite("email", &UserProfile::email)
        .def_readwrite("bookings", &UserProfile::bookings);

    py::class_<UserProfileManager>(m, "UserProfileManager")
        .def(py::init<>())
        .def("setUserDetails", &UserProfileManager::setUserDetails)
        .def("addBooking", &UserProfileManager::addBooking)
        .def("getBookingHistory", &UserProfileManager::getBookingHistory)
        .def("hasBookings", &UserProfileManager::hasBookings);

    // BinarySearchUtil class
    py::class_<BinarySearchUtil>(m, "BinarySearchUtil")
        .def_static("searchByDate", &BinarySearchUtil::searchByDate)
        .def_static("searchBySeatType", &BinarySearchUtil::searchBySeatType);
}
