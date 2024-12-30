// importing libraries
import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import AVLTreeManager from "./components/AVLTreeManager";
import PriorityQueueManager from "./components/PriorityQueueManager";
import GraphManager from "./components/GraphManager";
import SeatHashMapManager from "./components/SeatHashMapManager";
import UserProfileManager from "./components/UserProfileManager";
import "bootstrap/dist/css/bootstrap.min.css";
// function that render html on browser. 
const App = () => {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100 p-4">
        <header className="text-center mb-4">
          <h1 className="text-2xl font-bold">Travel Management System</h1>
          <nav className="mt-4">
            <Link to="/avltree" className="mx-2 text-blue-500">
              AVL Tree
            </Link>
            <Link to="/priorityqueue" className="mx-2 text-blue-500">
              Priority Queue
            </Link>
            <Link to="/graph" className="mx-2 text-blue-500">
              Graph
            </Link>
            <Link to="/seathashmap" className="mx-2 text-blue-500">
              Seat HashMap
            </Link>
            <Link to="/userprofile" className="mx-2 text-blue-500">
              User Profiles
            </Link>
          </nav>
        </header>
        <main className="mt-4">
          <Routes>
            <Route path="/avltree" element={<AVLTreeManager />} />
            <Route path="/priorityqueue" element={<PriorityQueueManager />} />
            <Route path="/graph" element={<GraphManager />} />
            <Route path="/seathashmap" element={<SeatHashMapManager />} />
            <Route path="/userprofile" element={<UserProfileManager />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
};
//  making that file accessible. 
export default App;
