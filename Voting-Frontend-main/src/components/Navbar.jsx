import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const role = localStorage.getItem("role");
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/login");
  };

  return (
    <nav className="bg-gray-800 p-4 shadow-lg border-b border-gray-700 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Logo / Brand */}
        <Link to="/" className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500 hover:scale-105 transition-transform">
          OneVote
        </Link>

        {/* Links */}
        <div className="space-x-6 text-sm font-medium">
          <Link to="/vote" className="text-gray-300 hover:text-white transition-colors">Vote</Link>
          <Link to="/results" className="text-gray-300 hover:text-white transition-colors">Results</Link>
          
          {role === "admin" && (
            <Link to="/admin" className="text-yellow-400 hover:text-yellow-300 transition-colors">Admin Panel</Link>
          )}

          {/* Show Logout if logged in, Login if not */}
          {token ? (
             <button onClick={handleLogout} className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md transition-all">
               Logout
             </button>
          ) : (
             <Link to="/login" className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition-all">
               Login
             </Link>
          )}
        </div>
      </div>
    </nav>
  );
}