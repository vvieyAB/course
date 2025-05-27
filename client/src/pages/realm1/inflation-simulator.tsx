import { useState, useEffect } from 'react';

// Define TypeScript interfaces
interface Item {
  id: number;
  name: string;
  basePrice: number;
  currentPrice: number;
  inflationRate: number;
  quantity: number;
}

interface InflationSimulatorProps {
  onComplete?: () => void;
}

const InflationSimulator = ({ onComplete }: InflationSimulatorProps) => {
  const [day, setDay] = useState(1);
  const [money, setMoney] = useState(1000);
  const [items, setItems] = useState<Item[]>([
    { id: 1, name: 'Bread', basePrice: 50, currentPrice: 50, inflationRate: 0.05, quantity: 0 },
    { id: 2, name: 'Fish', basePrice: 100, currentPrice: 100, inflationRate: 0.08, quantity: 0 },
    { id: 3, name: 'Salt', basePrice: 25, currentPrice: 25, inflationRate: 0.03, quantity: 0 },
    { id: 4, name: 'Cloth', basePrice: 200, currentPrice: 200, inflationRate: 0.10, quantity: 0 }
  ]);
  const [inflationRate, setInflationRate] = useState(0.05);
  const [gameSpeed, setGameSpeed] = useState(1000);
  const [isRunning, setIsRunning] = useState(false);
  const [isGameOver, setIsGameOver] = useState(false);
  const [log, setLog] = useState<string[]>([]);

  // Timer for day progression
  useEffect(() => {
    let timer: NodeJS.Timeout | undefined;
    
    if (isRunning && !isGameOver) {
      timer = setInterval(() => {
        setDay(prevDay => prevDay + 1);
      }, gameSpeed);
    }
    
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [isRunning, gameSpeed, isGameOver]);

  // Update prices based on inflation
  useEffect(() => {
    if (day > 1) {
      setItems(prevItems => 
        prevItems.map(item => ({
          ...item,
          currentPrice: Math.round(item.currentPrice * (1 + (item.inflationRate * inflationRate)))
        }))
      );
      
      addToLog(`Day ${day}: Prices increased due to inflation.`);
      
      // Check if player can afford any items
      const canAffordAny = items.some(item => item.currentPrice <= money);
      if (!canAffordAny) {
        setIsGameOver(true);
        setIsRunning(false);
        addToLog(`Day ${day}: You can no longer afford any items. Game over!`);
        
        // Call onComplete if provided when the game is over
        if (onComplete) {
          onComplete();
        }
      }
    }
  }, [day, items, money, inflationRate, onComplete]);

  const addToLog = (message: string): void => {
    setLog(prevLog => [message, ...prevLog].slice(0, 10));
  };

  const buyItem = (itemId: number): void => {
    const item = items.find(i => i.id === itemId);
    
    if (item && money >= item.currentPrice) {
      setMoney(prevMoney => prevMoney - item.currentPrice);
      setItems(prevItems => 
        prevItems.map(i => 
          i.id === itemId 
            ? { ...i, quantity: i.quantity + 1 } 
            : i
        )
      );
      addToLog(`Day ${day}: Bought 1 ${item.name} for ${item.currentPrice} coins.`);
    } else if (item) {
      addToLog(`Day ${day}: Cannot afford ${item.name}.`);
    }
  };

  const toggleRunning = (): void => {
    setIsRunning(prevIsRunning => !prevIsRunning);
    if (!isRunning) {
      addToLog(`Day ${day}: Market opened.`);
    } else {
      addToLog(`Day ${day}: Market paused.`);
    }
  };

  const resetGame = (): void => {
    setDay(1);
    setMoney(1000);
    setItems(items.map(item => ({ ...item, currentPrice: item.basePrice, quantity: 0 })));
    setIsRunning(false);
    setIsGameOver(false);
    setLog([]);
    addToLog("Game reset. New simulation started.");
    
    // Call onComplete if provided when the game is reset or completed
    if (onComplete && isGameOver) {
      onComplete();
    }
  };

  // Calculate total value of purchases at both current and original prices
  const calculateValue = (): { originalValue: number; currentValue: number } => {
    const originalValue = items.reduce((sum, item) => sum + (item.basePrice * item.quantity), 0);
    const currentValue = items.reduce((sum, item) => sum + (item.currentPrice * item.quantity), 0);
    return { originalValue, currentValue };
  };

  const { originalValue, currentValue } = calculateValue();

  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="bg-amber-50 rounded-xl p-6 mb-8 shadow-lg relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-orange-500 via-yellow-400 to-orange-500"></div>
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-serif text-orange-800 relative inline-block">
            Inflation Simulator
            <span className="absolute -bottom-2 left-0 w-full h-1 bg-orange-500"></span>
          </h2>
          <div className="flex items-center gap-4">
            <span className="text-orange-700 font-semibold">Day: {day}</span>
            <button 
              onClick={toggleRunning}
              disabled={isGameOver}
              className={`px-4 py-2 ${isRunning ? 'bg-red-500' : 'bg-green-500'} text-white rounded-lg transition border-2 border-yellow-300 hover:shadow-lg`}
            >
              {isRunning ? 'Pause' : 'Start'}
            </button>
            <button 
              onClick={resetGame}
              className="px-4 py-2 bg-orange-500 text-white rounded-lg transition border-2 border-yellow-300 hover:shadow-lg"
            >
              Reset
            </button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Market section */}
          <div className="md:col-span-2 bg-white p-4 rounded-xl border-2 border-yellow-300 shadow">
            <h3 className="text-xl font-serif text-orange-800 mb-4">Market</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              {items.map(item => {
                const priceChange = item.currentPrice - item.basePrice;
                const priceChangePercent = ((item.currentPrice / item.basePrice) - 1) * 100;
                
                return (
                  <div 
                    key={item.id}
                    className="bg-amber-50 p-3 rounded-lg border-2 border-yellow-300 flex flex-col"
                  >
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-semibold text-orange-800">{item.name}</span>
                      <span className="text-sm">Owned: {item.quantity}</span>
                    </div>
                    
                    <div className="flex justify-between items-center mb-2">
                      <div>
                        <span className="font-bold text-orange-800">{item.currentPrice} coins</span>
                        <div className="text-xs">
                          {priceChange > 0 ? (
                            <span className="text-red-600">
                              (+{priceChange.toFixed(0)} coins / +{priceChangePercent.toFixed(1)}%)
                            </span>
                          ) : (
                            <span>Base price</span>
                          )}
                        </div>
                      </div>
                      
                      <button
                        onClick={() => buyItem(item.id)}
                        disabled={item.currentPrice > money || isGameOver}
                        className={`px-3 py-1 rounded bg-orange-500 text-white ${
                          item.currentPrice > money ? 'opacity-50 cursor-not-allowed' : 'hover:bg-orange-600'
                        }`}
                      >
                        Buy
                      </button>
                    </div>
                    
                    <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                      <div 
                        className="bg-orange-500 h-2 rounded-full" 
                        style={{ width: `${Math.min(priceChangePercent * 2, 100)}%` }}
                      ></div>
                    </div>
                  </div>
                );
              })}
            </div>
            
            <div className="flex justify-between items-center p-3 bg-amber-100 rounded-lg border-2 border-yellow-300">
              <div>
                <label className="block text-sm text-orange-800 mb-1">Inflation Rate:</label>
                <input 
                  type="range" 
                  min="0" 
                  max="0.2" 
                  step="0.01"
                  value={inflationRate}
                  onChange={(e) => setInflationRate(parseFloat(e.target.value))}
                  className="w-32 accent-orange-500"
                />
                <span className="ml-2 text-orange-800">{(inflationRate * 100).toFixed(0)}%</span>
              </div>
              
              <div>
                <label className="block text-sm text-orange-800 mb-1">Game Speed:</label>
                <input 
                  type="range" 
                  min="500" 
                  max="2000" 
                  step="100"
                  value={gameSpeed}
                  onChange={(e) => setGameSpeed(parseInt(e.target.value))}
                  className="w-32 accent-orange-500"
                />
                <span className="ml-2 text-orange-800">{gameSpeed}ms</span>
              </div>
            </div>
          </div>
          
          {/* Player section */}
          <div className="bg-white p-4 rounded-xl border-2 border-yellow-300 shadow flex flex-col">
            <h3 className="text-xl font-serif text-orange-800 mb-4">Your Resources</h3>
            
            <div className="mb-4 p-3 bg-amber-50 rounded-lg border-2 border-yellow-300">
              <div className="flex justify-between items-center">
                <span className="text-orange-800">Money:</span>
                <span className="font-bold text-orange-800">{money} coins</span>
              </div>
            </div>
            
            <div className="mb-4 p-3 bg-amber-50 rounded-lg border-2 border-yellow-300">
              <div className="mb-2">
                <span className="text-orange-800">Purchases value (original):</span>
                <span className="block font-bold text-orange-800">{originalValue} coins</span>
              </div>
              <div>
                <span className="text-orange-800">Purchases value (current):</span>
                <span className="block font-bold text-orange-800">{currentValue} coins</span>
              </div>
              {originalValue > 0 && (
                <div className="mt-2 text-sm">
                  <span className={currentValue > originalValue ? "text-green-600" : "text-red-600"}>
                    {currentValue > originalValue ? "Gained" : "Lost"} {Math.abs(currentValue - originalValue)} coins in value
                  </span>
                </div>
              )}
            </div>
            
            <div className="flex-grow">
              <h4 className="text-orange-800 font-semibold mb-2">Market Log:</h4>
              <div className="bg-amber-50 p-2 rounded-lg border-2 border-yellow-300 h-64 overflow-y-auto">
                {log.map((message, idx) => (
                  <div key={idx} className="text-sm mb-1 text-orange-800">
                    {message}
                  </div>
                ))}
                {log.length === 0 && (
                  <div className="text-sm italic text-orange-800">Press Start to begin simulation</div>
                )}
              </div>
            </div>
          </div>
        </div>
        
        {isGameOver && (
          <div className="mt-6 bg-red-50 p-4 rounded-xl border-2 border-red-300">
            <h3 className="text-xl font-serif text-red-800 mb-2">Game Over!</h3>
            <p className="text-red-700">
              You can no longer afford any items due to inflation. This is what happens when 
              currency loses its value too quickly.
            </p>
          </div>
        )}
      </div>
      
      <div className="bg-orange-50 rounded-xl p-6 relative overflow-hidden border-2 border-orange-300">
        <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-orange-500 via-yellow-400 to-orange-500"></div>
        <h3 className="text-xl font-serif text-orange-800 mb-3">Reflection Question</h3>
        <p className="text-orange-700 border-l-4 border-orange-500 pl-4 py-2 mb-4 bg-orange-50">
          How does inflation affect the purchasing power of a currency? What strategies could you use to protect your wealth?
        </p>
        <textarea 
          className="w-full p-3 border-2 border-yellow-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 bg-white" 
          rows={4}
          placeholder="Type your thoughts..."
        />
      </div>
    </div>
  );
};

export default InflationSimulator;
