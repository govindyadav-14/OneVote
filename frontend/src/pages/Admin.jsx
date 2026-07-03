import { useState } from "react";
// 1. Import the function from your API file (Clean Code)
import { addCandidate } from "../api/candidate"; 

export default function Admin() {
  const [form, setForm] = useState({
    name: "",
    party: "",
    age: ""
  });
  const [message, setMessage] = useState(null);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(null);

    // Basic Validation
    if(!form.name || !form.party || !form.age) {
        setMessage({ type: "error", text: "Please fill all fields" });
        return;
    }

    try {
      // 2. Call the API function
      // Your axios.js will automatically attach the Token here!
      await addCandidate({
          name: form.name,
          party: form.party,
          age: Number(form.age) // Ensure age is a number
      });
      
      setMessage({ type: "success", text: " Candidate Added Successfully!" });
      setForm({ name: "", party: "", age: "" }); // Clear inputs

    } catch (err) {
      console.error("Admin Error:", err);
      // Handle "Forbidden" (403) or "Unauthorized" (401)
      const errorMsg = err.response?.data?.error || "Failed to add candidate";
      setMessage({ type: "error", text: `Error: ${errorMsg}` });
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
      <div className="bg-gray-800 p-8 rounded-xl shadow-2xl w-full max-w-lg border border-gray-700">
        <h2 className="text-3xl font-bold text-white mb-6 text-center text-yellow-500">
            Admin Panel
        </h2>

        {message && (
            <div className={`p-3 rounded mb-4 text-center border ${
                message.type === 'success' 
                ? 'bg-green-500/20 border-green-500 text-green-300' 
                : 'bg-red-500/20 border-red-500 text-red-300'
            }`}>
                {message.text}
            </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-gray-400 text-sm mb-1 block">Candidate Name</label>
            <input 
                name="name" 
                value={form.name}
                onChange={handleChange} 
                placeholder="e.g. Narendra Modi" 
                className="w-full p-3 bg-gray-700 rounded border border-gray-600 text-white focus:outline-none focus:border-yellow-500" 
            />
          </div>

          <div>
            <label className="text-gray-400 text-sm mb-1 block">Party Name</label>
            <input 
                name="party" 
                value={form.party}
                onChange={handleChange} 
                placeholder="e.g. BJP" 
                className="w-full p-3 bg-gray-700 rounded border border-gray-600 text-white focus:outline-none focus:border-yellow-500" 
            />
          </div>

          <div>
            <label className="text-gray-400 text-sm mb-1 block">Age</label>
            <input 
                name="age" 
                type="number" 
                value={form.age}
                onChange={handleChange} 
                placeholder="e.g. 70" 
                className="w-full p-3 bg-gray-700 rounded border border-gray-600 text-white focus:outline-none focus:border-yellow-500" 
            />
          </div>

          <button type="submit" className="w-full bg-yellow-600 hover:bg-yellow-700 text-gray-900 font-bold py-3 rounded transition-all mt-4 shadow-lg shadow-yellow-500/20">
            Add Candidate
          </button>
        </form>
      </div>
    </div>
  );
}