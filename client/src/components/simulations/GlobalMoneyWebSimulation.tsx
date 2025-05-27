import React from 'react';

interface GlobalFlowType {
  nodes: any[];
  correctConnections: any[];
}

interface DollarShockType {
  initialYear: number;
  events: any[];
}

interface GlobalMoneyWebSimulationProps {
  globalFlow: GlobalFlowType;
  dollarShock: DollarShockType;
  onComplete: () => void;
}

export function GlobalMoneyWebSimulation({
  globalFlow,
  dollarShock,
  onComplete
}: GlobalMoneyWebSimulationProps) {
  return (
    <div className="p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4">Global Money Web Simulation</h2>
      <p className="mb-6">This component is a placeholder for the Global Money Web Simulation.</p>
      <button 
        onClick={onComplete}
        className="px-4 py-2 bg-amber-600 text-white rounded hover:bg-amber-700 transition-colors"
      >
        Complete Simulation
      </button>
    </div>
  );
}