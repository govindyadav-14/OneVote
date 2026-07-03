import { useEffect, useState } from "react";
import { getResults } from "../api/candidate"; // Ensure this matches your file path
import { io } from "socket.io-client";

const socket = io(import.meta.env.VITE_API_BASE_URL || "http://localhost:5001");

export default function Results() {
  const [results, setResults] = useState([]);

  useEffect(() => {
    // Initial Load
    getResults().then(res => setResults(res.data));

    // Real-Time Listener
    socket.on("voteUpdate", (rawCandidates) => {
      const formattedResults = rawCandidates.map(c => ({
        party: c.party,
        count: c.voteCount
      }));
      setResults(formattedResults);
    });

    return () => socket.off("voteUpdate");
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <h2 className="text-3xl font-bold mb-8 text-center text-blue-400">Live Election Results</h2>
      
      <div className="max-w-2xl mx-auto space-y-4">
        {results.map((r) => (
          <div key={r.party} className="bg-gray-800 p-5 rounded-lg border border-gray-700 flex justify-between items-center shadow-lg hover:bg-gray-750 transition-colors">
            <span className="text-xl font-semibold text-gray-200">{r.party}</span>
            <span className="text-2xl font-bold text-green-400">{r.count} Votes</span>
          </div>
        ))}
      </div>
    </div>
  );
}