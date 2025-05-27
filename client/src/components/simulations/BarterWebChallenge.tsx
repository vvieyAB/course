import { useState } from 'react';
import { Trader } from '@/lib/realm1-missions';

interface BarterWebChallengeProps {
  traders: Trader[];
  onComplete?: () => void;
}

export function BarterWebChallenge({ traders = [], onComplete }: BarterWebChallengeProps) {
  const [selectedTrader, setSelectedTrader] = useState<Trader | null>(null);
  const [currentItem, setCurrentItem] = useState('clay pot');
  const [steps, setSteps] = useState<string[]>([]);
  const [tradeCount, setTradeCount] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const [targetItem] = useState('salt block');
  
  // Handle trader selection
  const handleTraderClick = (trader: Trader) => {
    // Only allow selection if the trader wants what we have
    if (trader.wants.toLowerCase() === currentItem.toLowerCase()) {
      setSelectedTrader(trader);
      
      // Record this step
      setSteps(prev => [...prev, 
        `Traded ${currentItem} with ${trader.name} for ${trader.has}`
      ]);
      
      // Update current item
      setCurrentItem(trader.has);
      setTradeCount(prev => prev + 1);
      
      // Check if we've reached the target item
      if (trader.has.toLowerCase() === targetItem.toLowerCase()) {
        setIsComplete(true);
      }
    }
  };
  
  // Reset the barter challenge
  const handleReset = () => {
    setSelectedTrader(null);
    setCurrentItem('clay pot');
    setSteps([]);
    setTradeCount(0);
    setIsComplete(false);
  };
  
  // Continue to next section
  const handleContinue = () => {
    if (onComplete) onComplete();
  };
  
  return (
    <div className="bg-amber-50 bg-opacity-40 rounded-xl p-6">
      <h3 className="text-center text-xl font-semibold text-amber-900 mb-2">
        Barter Web Challenge
      </h3>
      <p className="text-center text-amber-800 mb-6">
        Trade your way through the market to acquire a salt block. You currently have: 
        <span className="font-bold mx-1">{currentItem}</span>
      </p>
      
      {isComplete ? (
        <div className="mb-6 bg-green-100 border-l-4 border-green-600 p-4 rounded">
          <h4 className="font-bold text-green-800 mb-2">Challenge Complete!</h4>
          <p className="text-green-700 mb-4">
            You successfully traded your way to a salt block in {tradeCount} trades!
          </p>
          <div className="bg-white p-3 rounded-lg mb-4">
            <h5 className="font-semibold mb-2 text-amber-900">Your Trading Journey:</h5>
            <ol className="list-decimal pl-5 space-y-1">
              {steps.map((step, index) => (
                <li key={index} className="text-gray-700">{step}</li>
              ))}
            </ol>
          </div>
          <button
            className="w-full py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition-colors"
            onClick={handleContinue}
          >
            Continue to Next Section
          </button>
        </div>
      ) : (
        <div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
            {traders.map((trader) => (
              <div
                key={trader.id}
                className={`p-4 border rounded-lg cursor-pointer transition-all ${
                  trader.wants.toLowerCase() === currentItem.toLowerCase()
                    ? 'bg-amber-100 border-amber-500 hover:bg-amber-200 transform hover:scale-105'
                    : 'bg-gray-100 border-gray-300 opacity-60'
                }`}
                onClick={() => handleTraderClick(trader)}
              >
                <div className="flex items-center mb-3">
                  <div className="bg-amber-700 text-white rounded-full w-10 h-10 flex items-center justify-center mr-3">
                    {trader.name.charAt(0)}
                  </div>
                  <h4 className="font-medium">{trader.name}</h4>
                </div>
                <div className="flex justify-between">
                  <div>
                    <div className="text-sm text-gray-600 mb-1">Has:</div>
                    <div className="font-semibold text-amber-900">{trader.has}</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-600 mb-1">Wants:</div>
                    <div className="font-semibold text-amber-900">{trader.wants}</div>
                  </div>
                </div>
                {trader.wants.toLowerCase() === currentItem.toLowerCase() && (
                  <div className="mt-2 text-xs text-emerald-700 flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    You can trade with this person!
                  </div>
                )}
              </div>
            ))}
          </div>
          
          {steps.length > 0 && (
            <div className="bg-white p-3 rounded-lg mb-4">
              <h5 className="font-semibold mb-2 text-amber-900">Your Trading Journey:</h5>
              <ol className="list-decimal pl-5 space-y-1">
                {steps.map((step, index) => (
                  <li key={index} className="text-gray-700">{step}</li>
                ))}
              </ol>
            </div>
          )}
          
          <div className="flex justify-end">
            <button 
              className="px-4 py-2 bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400 transition-colors"
              onClick={handleReset}
            >
              Reset Challenge
            </button>
          </div>
        </div>
      )}
    </div>
  );
}