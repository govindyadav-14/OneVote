import { useState } from "react";
import { signup } from "../api/auth";
import { useNavigate, Link } from "react-router-dom";

export default function Signup() {
  const [form, setForm] = useState({
    name: "", email: "", mobile: "", address: "", aadhar: "", password: ""
  });
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      // 1. Call API
      const res = await signup(form);
      
      // 2. NOW this works because 'res' is the full Axios object
      console.log("Signup Response:", res); 
      
      const token = res.data.token;

      if (token) {
        localStorage.setItem("token", token);
        setSuccess(true);
        setTimeout(() => navigate("/vote"), 1500); 
      } else {
        setError("Signup successful but no token received.");
      }

    } catch (err) {
      console.error(err);
      setError(err.response?.data?.error || "Signup failed");
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
      <div className="bg-gray-800 p-8 rounded-xl shadow-2xl w-full max-w-md border border-gray-700">
        <h2 className="text-3xl font-bold text-white mb-6 text-center">Create Account</h2>

        {error && <div className="bg-red-500/20 text-red-300 p-3 rounded mb-4 text-sm border border-red-500/50">{error}</div>}
        {success && <div className="bg-green-500/20 text-green-300 p-3 rounded mb-4 text-sm border border-green-500/50">🎉 Account created! Redirecting...</div>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <input name="name" onChange={handleChange} placeholder="Full Name" className="w-full p-3 bg-gray-700 rounded border border-gray-600 text-white focus:outline-none focus:border-blue-500" required />
          <input name="email" type="email" onChange={handleChange} placeholder="Email" className="w-full p-3 bg-gray-700 rounded border border-gray-600 text-white focus:outline-none focus:border-blue-500" required />
          <input name="mobile" onChange={handleChange} placeholder="Mobile" className="w-full p-3 bg-gray-700 rounded border border-gray-600 text-white focus:outline-none focus:border-blue-500" />
          <input name="address" onChange={handleChange} placeholder="Address" className="w-full p-3 bg-gray-700 rounded border border-gray-600 text-white focus:outline-none focus:border-blue-500" />
          <input name="aadhar" type="number" onChange={handleChange} placeholder="Aadhar Number" className="w-full p-3 bg-gray-700 rounded border border-gray-600 text-white focus:outline-none focus:border-blue-500" required />
          <input name="password" type="password" onChange={handleChange} placeholder="Password" className="w-full p-3 bg-gray-700 rounded border border-gray-600 text-white focus:outline-none focus:border-blue-500" required />
          
          <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded transition-all mt-4">Sign Up</button>
        </form>
        <p className="text-gray-400 text-center mt-4 text-sm">
          Already have an account? <Link to="/login" className="text-blue-400 hover:underline">Login</Link>
        </p>
      </div>
    </div>
  );
}