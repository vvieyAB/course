import React, { useState } from 'react';

interface Trader {
  name: string;
  has: string;
  wants: string;
}

interface BarterActivityProps {
  traders: Trader[];
  correctOrder: string[];
  onComplete: () => void;
}

export function BarterActivity({ traders, correctOrder, onComplete }: BarterActivityProps) {
  // correctOrder is available for future advanced validation logic
  const [selectedTraders, setSelectedTraders] = useState<Trader[]>([]);
  const [message, setMessage] = useState<string | null>(null);
  const [isComplete, setIsComplete] = useState(false);
  const [shake, setShake] = useState(false);

  const handleTraderSelect = (trader: Trader) => {
    if (isComplete) return;
    
    // If trader is already selected, remove them and all traders after them
    const existingIndex = selectedTraders.findIndex(t => t.name === trader.name);
    if (existingIndex >= 0) {
      setSelectedTraders(selectedTraders.slice(0, existingIndex));
      return;
    }
    
    // Otherwise, add the trader to the selection
    const newSelection = [...selectedTraders, trader];
    setSelectedTraders(newSelection);
    
    // If the last selection completes a circle, check if it's correct
    if (newSelection.length === traders.length) {
      // Check if the circle is complete (last trader wants what first trader has)
      const isCircleComplete = newSelection[newSelection.length - 1].wants === newSelection[0].has;
      
      if (isCircleComplete) {
        setIsComplete(true);
        setMessage("Great job! You've completed the barter circle.");
        onComplete();
      } else {
        setMessage("The barter circle isn't complete. The last person doesn't want what the first person has.");
        setShake(true);
        setTimeout(() => setShake(false), 500);
      }
    }
  };

  const resetSelection = () => {
    setSelectedTraders([]);
    setMessage(null);
    setIsComplete(false);
  };

  return (
    <div className="bg-amber-900/20 border border-amber-900/30 rounded-lg p-6">
      <h3 className="text-xl font-semibold text-amber-300 mb-4">Barter Challenge</h3>
      
      <p className="text-amber-100 mb-6">
        Create a complete barter circle by selecting traders in the correct order. 
        Each person must want what the next person has.
      </p>
      
      {/* Available traders */}
      <div className="mb-6">
        <h4 className="text-lg text-amber-200 mb-3">Village Traders:</h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
          {traders.map((trader) => (
            <div 
              key={trader.name}
              className={`p-3 border rounded-md cursor-pointer transition-all 
                ${selectedTraders.some(t => t.name === trader.name) 
                  ? 'bg-amber-800/60 border-amber-600' 
                  : 'bg-gray-800/40 border-gray-700 hover:border-amber-700'}`}
              onClick={() => handleTraderSelect(trader)}
            >
              <div className="font-medium text-amber-200">{trader.name}</div>
              <div className="text-sm text-amber-100/80">Has: {trader.has}</div>
              <div className="text-sm text-amber-100/80">Wants: {trader.wants}</div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Current selection */}
      <div className="mb-6">
        <h4 className="text-lg text-amber-200 mb-3">Your Trading Circle:</h4>
        
        {selectedTraders.length === 0 ? (
          <div className="text-amber-100/60 italic text-center p-4 border border-dashed border-amber-800/40 rounded-md">
            Select traders to create your circle
          </div>
        ) : (
          <div className={`p-3 bg-gray-800/30 border border-amber-800/30 rounded-md ${shake ? 'animate-shake' : ''}`}>
            {selectedTraders.map((trader, index) => (
              <div key={index} className="flex items-center mb-2 last:mb-0">
                <div className="flex-1">
                  <span className="text-amber-200">{trader.name}</span>
                  <span className="text-amber-100/70"> (has {trader.has})</span>
                </div>
                
                {index < selectedTraders.length - 1 && (
                  <div className="mx-2 text-amber-400">
                    →
                  </div>
                )}
                
                {index < selectedTraders.length - 1 && (
                  <div className="flex-1">
                    <span className="text-amber-200">{selectedTraders[index + 1].name}</span>
                    <span className="text-amber-100/70"> (wants {trader.has})</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
      
      {/* Message */}
      {message && (
        <div className={`p-3 rounded-md mb-4 text-center ${isComplete ? 'bg-green-900/30 text-green-200' : 'bg-amber-800/30 text-amber-200'}`}>
          {message}
        </div>
      )}
      
      {/* Controls */}
      <div className="flex justify-center space-x-4">
        <button
          onClick={resetSelection}
          className="px-4 py-2 bg-gray-800 text-amber-200 rounded-md hover:bg-gray-700 transition-colors"
        >
          Reset
        </button>
        
        {isComplete && (
          <button
            onClick={onComplete}
            className="px-4 py-2 bg-amber-600 text-amber-100 rounded-md hover:bg-amber-500 transition-colors"
          >
            Continue
          </button>
        )}
      </div>
    </div>
  );
}

// Define a CSS animation for the shake effect
const shakeStyles = `
@keyframes shake {
  0% { transform: translateX(0); }
  25% { transform: translateX(5px); }
  50% { transform: translateX(-5px); }
  75% { transform: translateX(5px); }
  100% { transform: translateX(0); }
}

.animate-shake {
  animation: shake 0.5s ease-in-out;
}
`;

// Add the styles to the document
if (typeof document !== 'undefined') {
  const styleElement = document.createElement('style');
  styleElement.textContent = shakeStyles;
  document.head.appendChild(styleElement);
}