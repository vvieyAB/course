import React from 'react';

interface ExclusionWebGameProps {
  barriers: any[];
  groups: any[];
  correctMatches: any[];
  stats: any[];
  caseStudies: any[];
  onComplete: () => void;
}

export function ExclusionWebGame({
  barriers,
  groups,
  correctMatches,
  stats,
  caseStudies,
  onComplete
}: ExclusionWebGameProps) {
  return (
    <div className="p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4">Exclusion Web Game</h2>
      <p className="mb-6">This component is a placeholder for the Exclusion Web Game.</p>
      <button 
        onClick={onComplete}
        className="px-4 py-2 bg-amber-600 text-white rounded hover:bg-amber-700 transition-colors"
      >
        Complete Simulation
      </button>
    </div>
  );
}