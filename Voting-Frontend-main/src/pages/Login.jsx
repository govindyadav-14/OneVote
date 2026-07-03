import { useState } from "react";
import axios from "../api/axios"; // Make sure this path is correct!
import { useNavigate, Link } from "react-router-dom";

export default function Login() {
  const [form, setForm] = useState({ aadhar: "", password: "" });
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      // 1. Login
      const res = await axios.post("/user/login", form);
      localStorage.setItem("token", res.data.token);

      // 2. Check Role (Admin vs Voter)
      const profile = await axios.get("/user/profile", {
        headers: { Authorization: `Bearer ${res.data.token}` }
      });
      const role = profile.data.user.role;
      localStorage.setItem("role", role);

      // 3. Redirect
      if (role === "admin") navigate("/admin");
      else navigate("/vote");

    } catch (err) {
      setError("Invalid Aadhar or Password");
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
      <div className="bg-gray-800 p-8 rounded-xl shadow-2xl w-full max-w-md border border-gray-700">
        <h2 className="text-3xl font-bold text-white mb-6 text-center">Welcome Back</h2>

        {error && <div className="bg-red-500/20 text-red-300 p-3 rounded mb-4 text-sm border border-red-500/50">{error}</div>}

        <form onSubmit={handleLogin} className="space-y-4">
          <input name="aadhar" type="number" onChange={handleChange} placeholder="Aadhar Number" className="w-full p-3 bg-gray-700 rounded border border-gray-600 text-white focus:outline-none focus:border-blue-500" required />
          <input name="password" type="password" onChange={handleChange} placeholder="Password" className="w-full p-3 bg-gray-700 rounded border border-gray-600 text-white focus:outline-none focus:border-blue-500" required />
          
          <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded transition-all mt-4">Login</button>
        </form>
        <p className="text-gray-400 text-center mt-4 text-sm">
          New here? <Link to="/signup" className="text-blue-400 hover:underline">Create Account</Link>
        </p>
      </div>
    </div>
  );
}