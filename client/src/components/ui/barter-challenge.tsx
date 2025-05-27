
import { useState } from 'react';

interface Trade {
  from: string;
  has: string;
  to: string;
  wants: string;
}

interface BarterChallengeProps {
  trades: Trade[];
  onComplete: () => void;
}

export function BarterChallenge({ trades, onComplete }: BarterChallengeProps) {
  const [selectedTrades, setSelectedTrades] = useState<Trade[]>([]);
  const [glowingIndex, setGlowingIndex] = useState(-1);

  const handleTradeSelect = (trade: Trade) => {
    if (selectedTrades.length === 0) {
      setSelectedTrades([trade]);
      setGlowingIndex(0);
    } else {
      const lastTrade = selectedTrades[selectedTrades.length - 1];
      if (lastTrade.to === trade.from) {
        setSelectedTrades([...selectedTrades, trade]);
        setGlowingIndex(selectedTrades.length);
        
        // Check if challenge is complete
        if (selectedTrades.length + 1 === trades.length) {
          onComplete();
        }
      }
    }
  };

  return (
    <div className="bg-amber-900/20 p-6 rounded-lg backdrop-blur-sm">
      <div className="grid grid-cols-2 gap-6">
        {trades.map((trade, index) => (
          <div 
            key={trade.from}
            className={`p-4 rounded-lg cursor-pointer transition-all
              ${selectedTrades.includes(trade) 
                ? 'bg-amber-600/30 border-amber-400' 
                : 'bg-amber-800/30 hover:bg-amber-700/30 border-amber-800'}
              ${glowingIndex === index ? 'animate-pulse' : ''}
              border-2`}
            onClick={() => handleTradeSelect(trade)}
          >
            <div className="flex justify-between items-center mb-4">
              <span className="text-amber-300 font-medium">{trade.from}</span>
              <svg className="w-6 h-6 text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
              <span className="text-amber-300 font-medium">{trade.to}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-amber-200">Has: {trade.has}</span>
              <span className="text-amber-200">Wants: {trade.wants}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
