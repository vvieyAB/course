import React, { useState, useEffect } from 'react';

interface PriceDay {
  day: number;
  breadPrice: number;
}

interface BudgetSimulationProps {
  days: PriceDay[];
  challenge: string;
  onComplete: () => void;
}

interface InventoryItem {
  name: string;
  quantity: number;
  sellPrice: number;
}

interface FamilyMember {
  name: string;
  breadNeeded: number;
}

export function BudgetSimulation({ days, challenge, onComplete }: BudgetSimulationProps) {
  const [currentDay, setCurrentDay] = useState<number>(1);
  const [money, setMoney] = useState<number>(1000);
  const [bread, setBread] = useState<number>(10);
  const [inventory, setInventory] = useState<InventoryItem[]>([
    { name: "Flour", quantity: 50, sellPrice: 50 },
    { name: "Yams", quantity: 30, sellPrice: 70 },
    { name: "Salt", quantity: 20, sellPrice: 30 }
  ]);
  // Using family state but not updating it in this component
  const [family] = useState<FamilyMember[]>([
    { name: "Child 1", breadNeeded: 1 },
    { name: "Child 2", breadNeeded: 1 },
    { name: "You", breadNeeded: 2 },
    { name: "Grandparent", breadNeeded: 1 }
  ]);
  const [dailyBreadNeeded, setDailyBreadNeeded] = useState<number>(5);
  const [message, setMessage] = useState<string | null>(null);
  const [gameOver, setGameOver] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);
  const [logs, setLogs] = useState<string[]>([
    "Day 1: The market seems busy today."
  ]);

  // Calculate family's daily bread need
  useEffect(() => {
    const total = family.reduce((sum, member) => sum + member.breadNeeded, 0);
    setDailyBreadNeeded(total);
  }, [family]);

  // Get current day's bread price
  const getCurrentBreadPrice = () => {
    const dayInfo = days.find(d => d.day === currentDay) || days[0];
    return dayInfo.breadPrice;
  };

  const buyBread = (amount: number) => {
    const price = getCurrentBreadPrice();
    const cost = price * amount;
    
    if (cost > money) {
      setMessage("You don't have enough money to buy that much bread.");
      return;
    }
    
    setMoney(money - cost);
    setBread(bread + amount);
    addLog(`Bought ${amount} bread for ${cost} money.`);
  };

  const sellItem = (itemIndex: number, amount: number) => {
    const item = inventory[itemIndex];
    
    if (amount > item.quantity) {
      setMessage(`You only have ${item.quantity} ${item.name} to sell.`);
      return;
    }
    
    const newInventory = [...inventory];
    newInventory[itemIndex] = {
      ...item,
      quantity: item.quantity - amount
    };
    
    const earnings = amount * item.sellPrice;
    setMoney(money + earnings);
    setInventory(newInventory);
    addLog(`Sold ${amount} ${item.name} for ${earnings} money.`);
  };

  const addLog = (entry: string) => {
    setLogs([...logs, entry]);
  };

  const advanceDay = () => {
    // Check if family has enough bread for the day
    if (bread < dailyBreadNeeded) {
      setMessage(`Your family needs ${dailyBreadNeeded} bread for today, but you only have ${bread}.`);
      setGameOver(true);
      return;
    }
    
    // Consume bread
    setBread(bread - dailyBreadNeeded);
    
    // Move to next day
    const nextDay = currentDay + 1;
    setCurrentDay(nextDay);
    
    // Check if game is complete
    const lastDay = days[days.length - 1].day;
    if (nextDay > lastDay) {
      setSuccess(true);
      setMessage("Congratulations! You've successfully managed your budget through all the inflation.");
      onComplete();
      return;
    }
    
    // Add day summary to log
    const currentPrice = getCurrentBreadPrice();
    const nextDayInfo = days.find(d => d.day === nextDay);
    const nextPrice = nextDayInfo ? nextDayInfo.breadPrice : currentPrice;
    
    let dayLog = `Day ${nextDay}: `;
    if (nextPrice > currentPrice) {
      const increase = ((nextPrice - currentPrice) / currentPrice * 100).toFixed(0);
      dayLog += `Prices have risen by ${increase}%! Bread now costs ${nextPrice}.`;
    } else if (nextPrice < currentPrice) {
      dayLog += `Good news! Prices have fallen a bit. Bread now costs ${nextPrice}.`;
    } else {
      dayLog += `Prices remain stable. Bread still costs ${nextPrice}.`;
    }
    
    addLog(dayLog);
  };

  const resetGame = () => {
    setCurrentDay(1);
    setMoney(1000);
    setBread(10);
    setInventory([
      { name: "Flour", quantity: 50, sellPrice: 50 },
      { name: "Yams", quantity: 30, sellPrice: 70 },
      { name: "Salt", quantity: 20, sellPrice: 30 }
    ]);
    setMessage(null);
    setGameOver(false);
    setSuccess(false);
    setLogs(["Day 1: The market seems busy today."]);
  };

  return (
    <div className="bg-amber-900/20 border border-amber-900/30 rounded-lg p-6">
      <h3 className="text-xl font-semibold text-amber-300 mb-2">Inflation Simulation</h3>
      <p className="text-amber-100 mb-6">{challenge}</p>
      
      {/* Status bar */}
      <div className="flex flex-wrap justify-between items-center mb-6 bg-gray-900/50 p-3 rounded-md">
        <div>
          <span className="text-amber-300 font-medium">Day:</span> 
          <span className="ml-2 text-amber-100">{currentDay}</span>
        </div>
        <div>
          <span className="text-amber-300 font-medium">Money:</span> 
          <span className="ml-2 text-amber-100">{money}</span>
        </div>
        <div>
          <span className="text-amber-300 font-medium">Bread:</span> 
          <span className="ml-2 text-amber-100">{bread}</span>
        </div>
        <div>
          <span className="text-amber-300 font-medium">Bread Price:</span> 
          <span className="ml-2 text-amber-100">{getCurrentBreadPrice()}</span>
        </div>
      </div>
      
      {/* Family needs */}
      <div className="mb-6">
        <h4 className="text-lg text-amber-200 mb-2">Family Needs</h4>
        <div className="bg-gray-800/40 p-3 rounded-md">
          <p className="text-amber-100 mb-2">
            Your family needs <span className="font-medium text-amber-300">{dailyBreadNeeded} bread</span> each day.
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {family.map((member, index) => (
              <div key={index} className="bg-gray-700/30 p-2 rounded">
                <div className="font-medium text-amber-200">{member.name}</div>
                <div className="text-sm text-amber-100/80">Needs {member.breadNeeded} bread</div>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Market section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        {/* Buy bread */}
        <div>
          <h4 className="text-lg text-amber-200 mb-2">Buy Bread</h4>
          <div className="bg-gray-800/40 p-3 rounded-md">
            <p className="text-amber-100 mb-3">
              Current price: <span className="font-medium">{getCurrentBreadPrice()} per loaf</span>
            </p>
            <div className="flex space-x-2">
              {[1, 5, 10].map(amount => (
                <button
                  key={amount}
                  onClick={() => buyBread(amount)}
                  disabled={gameOver || success}
                  className={`px-3 py-1 rounded ${gameOver || success 
                    ? 'bg-gray-700 text-gray-500 cursor-not-allowed' 
                    : 'bg-amber-700 text-amber-100 hover:bg-amber-600'}`}
                >
                  Buy {amount}
                </button>
              ))}
            </div>
          </div>
        </div>
        
        {/* Inventory */}
        <div>
          <h4 className="text-lg text-amber-200 mb-2">Your Inventory</h4>
          <div className="bg-gray-800/40 p-3 rounded-md">
            {inventory.map((item, index) => (
              <div key={index} className="flex justify-between items-center mb-2 last:mb-0">
                <div>
                  <span className="text-amber-200">{item.name}</span>
                  <span className="text-sm text-amber-100/80 ml-2">({item.quantity} left)</span>
                </div>
                <div className="flex space-x-1">
                  {[1, 5].map(amount => (
                    <button
                      key={amount}
                      onClick={() => sellItem(index, amount)}
                      disabled={gameOver || success || item.quantity < amount}
                      className={`px-2 py-1 text-xs rounded ${
                        gameOver || success || item.quantity < amount
                          ? 'bg-gray-700 text-gray-500 cursor-not-allowed' 
                          : 'bg-amber-700 text-amber-100 hover:bg-amber-600'
                      }`}
                    >
                      Sell {amount} ({item.sellPrice * amount})
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Event log */}
      <div className="mb-6">
        <h4 className="text-lg text-amber-200 mb-2">Event Log</h4>
        <div className="bg-gray-800/40 p-3 rounded-md h-40 overflow-y-auto">
          {logs.map((log, index) => (
            <div key={index} className="text-amber-100 mb-1 last:mb-0">
              {log}
            </div>
          ))}
        </div>
      </div>
      
      {/* Message */}
      {message && (
        <div className={`p-3 rounded-md mb-4 text-center ${success ? 'bg-green-900/30 text-green-200' : gameOver ? 'bg-red-900/30 text-red-200' : 'bg-amber-800/30 text-amber-200'}`}>
          {message}
        </div>
      )}
      
      {/* Controls */}
      <div className="flex justify-center space-x-4">
        {!gameOver && !success && (
          <button
            onClick={advanceDay}
            className="px-4 py-2 bg-amber-600 text-amber-100 rounded-md hover:bg-amber-500 transition-colors"
          >
            End Day
          </button>
        )}
        
        <button
          onClick={resetGame}
          className="px-4 py-2 bg-gray-800 text-amber-200 rounded-md hover:bg-gray-700 transition-colors"
        >
          Reset Simulation
        </button>
        
        {(success || gameOver) && (
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