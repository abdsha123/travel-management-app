cmake_minimum_required(VERSION 3.10)
project(TicketBookingSystem VERSION 1.0)

# Set the C++ standard
set(CMAKE_CXX_STANDARD 23)
set(CMAKE_CXX_STANDARD_REQUIRED True)

# Include the src directory for header files
include_directories(${PROJECT_SOURCE_DIR}/src)

# Find pybind11
find_package(pybind11 REQUIRED)

# Specify the source files
set(SOURCES
    src/AVLTree.hpp
    src/PriorityQueue.hpp
    src/Graph.hpp
    src/SeatHashMap.hpp
    src/UserProfileManager.hpp
    src/BinarySearchUtil.hpp
    src/ticket_booking.cpp
)

# Create the shared library with ticket_booking.cpp
add_library(ticket_booking SHARED ${SOURCES})

# Build the Python bindings
add_library(cpp_backend MODULE src/bindings.cpp)
set_target_properties(cpp_backend PROPERTIES PREFIX "" SUFFIX ".so")
target_link_libraries(cpp_backend PRIVATE pybind11::module)

# Set the output directory for shared libraries
set_target_properties(ticket_booking PROPERTIES LIBRARY_OUTPUT_DIRECTORY "${CMAKE_BINARY_DIR}")
set_target_properties(cpp_backend PROPERTIES LIBRARY_OUTPUT_DIRECTORY "${CMAKE_BINARY_DIR}")

# Create a separate executable for each test file and link to the shared library
add_executable(test_avl_tree tests/test_avl_tree.cpp)
target_link_libraries(test_avl_tree ticket_booking)

add_executable(test_priority_queue tests/test_priority_queue.cpp)
target_link_libraries(test_priority_queue ticket_booking)

add_executable(test_graph tests/test_graph.cpp)
target_link_libraries(test_graph ticket_booking)

add_executable(test_hashmaps_and_binary_search tests/test_hashmaps_and_binary_search.cpp)
target_link_libraries(test_hashmaps_and_binary_search ticket_booking)

# Enable additional compiler warnings
set(CMAKE_CXX_FLAGS "${CMAKE_CXX_FLAGS} -Wall -Wextra -pedantic")
