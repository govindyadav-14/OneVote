import React from 'react';

export default function CandidateCard({ candidate, onVote }) {
  // Define colors based on party name for a visual touch
  const getPartyColor = (party) => {
    if (party.toLowerCase().includes("bjp")) return "bg-orange-500";
    if (party.toLowerCase().includes("inc")) return "bg-blue-500";
    if (party.toLowerCase().includes("aap")) return "bg-yellow-500";
    return "bg-gray-600";
  };

  return (
    <div className="bg-gray-800 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all hover:-translate-y-1 border border-gray-700 group">
      {/* Top Color Bar */}
      <div className={`h-2 w-full ${getPartyColor(candidate.party)}`}></div>
      
      <div className="p-6">
        <h3 className="text-2xl font-bold text-white mb-1 group-hover:text-blue-400 transition-colors">
          {candidate.name}
        </h3>
        <p className="text-gray-400 text-sm font-medium uppercase tracking-wider mb-6">
          {candidate.party}
        </p>

        <button 
          onClick={() => onVote(candidate._id)}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg transition-colors flex items-center justify-center gap-2"
        >
          <span>🗳️</span> Vote for {candidate.party}
        </button>
      </div>
    </div>
  );
}