import React from 'react';

interface EscapeSurveillanceGameProps {
  playerStartFunds: number;
  routes: Record<string, any>;
  resistanceNetworks: any[];
  onComplete: () => void;
}

export function EscapeSurveillanceGame({
  playerStartFunds,
  routes,
  resistanceNetworks,
  onComplete
}: EscapeSurveillanceGameProps) {
  return (
    <div className="p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4">Escape Surveillance Game</h2>
      <p className="mb-6">This component is a placeholder for the Escape Surveillance Game.</p>
      <button 
        onClick={onComplete}
        className="px-4 py-2 bg-amber-600 text-white rounded hover:bg-amber-700 transition-colors"
      >
        Complete Simulation
      </button>
    </div>
  );
}