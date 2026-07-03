import { Routes, Route, Navigate } from "react-router-dom";
// 1. IMPORT YOUR PAGES (Make sure paths match your folder structure)
import Navbar from "./components/Navbar";
import Home from "./pages/Home";       // <--- NEW: Import Home
import Vote from "./pages/Vote";
import Results from "./pages/Results";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Admin from "./pages/Admin";

export default function App() {
  // Check role directly for the Admin route
  const role = localStorage.getItem("role");

  return (
    <div className="bg-gray-900 min-h-screen text-white">
      {/* Navbar shows on all pages */}
      <Navbar />
      
      <Routes>
        {/* 2. ADD THE HOME ROUTE (This fixes the blank screen on load) */}
        <Route path="/" element={<Home />} />

        <Route path="/vote" element={<Vote />} />
        <Route path="/results" element={<Results />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* Protected Admin Route */}
        <Route
          path="/admin"
          element={role === "admin" ? <Admin /> : <Navigate to="/login" />}
        />
      </Routes>
    </div>
  );
}