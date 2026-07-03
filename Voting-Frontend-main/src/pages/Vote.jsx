import { useEffect, useState } from "react";
import { getCandidates, voteCandidate } from "../api/candidate"; 
import CandidateCard from "../components/CandidateCard";
import { useNavigate } from "react-router-dom";
import { io } from "socket.io-client";

const socket = io(import.meta.env.VITE_API_BASE_URL || "http://localhost:5001");

export default function Vote() {
  const [candidates, setCandidates] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/login");
    }
    getCandidates().then((res) => setCandidates(res.data));

    // Socket Listener
    socket.on("voteUpdate", (updatedCandidates) => {
      setCandidates(updatedCandidates);
    });

    return () => socket.off("voteUpdate");
  }, []);

  const vote = async (id) => {
    try {
      await voteCandidate(id);
      alert("Vote recorded successfully!");
    } catch (err) {
      alert(err.response?.data?.error || "Error Voting");
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 p-6 text-white">
      <h2 className="text-3xl font-bold mb-8 text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-green-400">
        Live Voting Dashboard
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {candidates.map((candidate) => (
          <CandidateCard 
            key={candidate._id} 
            candidate={candidate} 
            onVote={() => vote(candidate._id)} 
          />
        ))}
      </div>
    </div>
  );
}