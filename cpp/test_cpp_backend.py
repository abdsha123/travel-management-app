import cpp_backend

# Test AVLTree
tree = cpp_backend.AVLTree()
seat = cpp_backend.Seat(1, True, "Regular")
tree.insert(seat)
tree.printInorder()  # This should show the inserted seat

# Test PriorityQueue
pq = cpp_backend.PriorityQueue()
pq.addRequest(1, 10)  # Add a seatID with priority
pq.addRequest(2, 20)
top_request = pq.processRequest()
print(f"Processed request: SeatID {top_request.seatID}, Priority {top_request.priority}")

# Test Graph
graph = cpp_backend.Graph()
graph.addCity("CityA")
graph.addCity("CityB")
graph.addRoute("CityA", "CityB", 10)
print(graph.findShortestPath("CityA", "CityB"))

# Test SeatHashMap
seat_map = cpp_backend.SeatHashMap()
seat_map.addSeat(101, True, "VIP")
print(seat_map.isSeatAvailable(101))

# Test UserProfileManager
profile_manager = cpp_backend.UserProfileManager()
profile_manager.addBooking(1, 101, "2024-12-01", "VIP")
print(profile_manager.getBookingHistory(1))
