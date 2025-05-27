import { useState, useEffect } from 'react';
import { Clock, Coins, TrendingUp, Scale, ArrowRight, ChartBar, Wallet, DollarSign } from 'lucide-react';

interface HalvingSimulatorProps {
  onComplete: () => void;
}

interface Halving {
  number: number;
  date: string;
  blockHeight: number;
  rewardBefore: number;
  rewardAfter: number;
}

interface MinerStats {
  blockReward: number;
  hashrate: number;
  difficulty: number;
  costPerTH: number;
  electricityCost: number;
  bitcoinPrice: number;
  revenuePerDay: number;
  costPerDay: number;
  profitPerDay: number;
  roi: number;
}

export default function HalvingSimulator({ onComplete }: HalvingSimulatorProps) {
  const [halvings, setHalvings] = useState<Halving[]>([
    { number: 1, date: "November 28, 2012", blockHeight: 210000, rewardBefore: 50, rewardAfter: 25 },
    { number: 2, date: "July 9, 2016", blockHeight: 420000, rewardBefore: 25, rewardAfter: 12.5 },
    { number: 3, date: "May 11, 2020", blockHeight: 630000, rewardBefore: 12.5, rewardAfter: 6.25 },
    { number: 4, date: "April 2024 (est.)", blockHeight: 840000, rewardBefore: 6.25, rewardAfter: 3.125 }
  ]);
  
  const [currentHalvingIndex, setCurrentHalvingIndex] = useState(0);
  const [activeTab, setActiveTab] = useState<'supply' | 'mining' | 'economics'>('supply');
  const [userStrategy, setUserStrategy] = useState<'upgrade' | 'expand' | 'reduce' | null>(null);
  const [timeRemaining, setTimeRemaining] = useState(60); // seconds
  const [simulationRunning, setSimulationRunning] = useState(false);
  const [completed, setCompleted] = useState(false);
  const [showInfo, setShowInfo] = useState(false);
  
  // Statistics before halving
  const [preHalvingStats, setPreHalvingStats] = useState<MinerStats>({
    blockReward: 0,
    hashrate: 100, // TH/s
    difficulty: 1,
    costPerTH: 50, // $ per TH/s of mining hardware
    electricityCost: 0.05, // $ per kWh
    bitcoinPrice: 0,
    revenuePerDay: 0,
    costPerDay: 0,
    profitPerDay: 0,
    roi: 0
  });
  
  // Statistics after halving
  const [postHalvingStats, setPostHalvingStats] = useState<MinerStats | null>(null);
  
  // Update pre-halving stats when halving changes
  useEffect(() => {
    if (halvings[currentHalvingIndex]) {
      const halving = halvings[currentHalvingIndex];
      const price = calculateExpectedPrice(currentHalvingIndex);
      const difficulty = calculateDifficulty(currentHalvingIndex);
      
      const stats: MinerStats = {
        blockReward: halving.rewardBefore,
        hashrate: 100 * Math.pow(5, currentHalvingIndex), // Increase with each halving
        difficulty: difficulty,
        costPerTH: 50 / Math.pow(1.5, currentHalvingIndex), // Hardware gets cheaper over time
        electricityCost: 0.05,
        bitcoinPrice: price,
        revenuePerDay: 0,
        costPerDay: 0,
        profitPerDay: 0,
        roi: 0
      };
      
      // Calculate revenue, cost, and profit
      stats.revenuePerDay = calculateRevenuePerDay(stats.hashrate, stats.blockReward, stats.difficulty, stats.bitcoinPrice);
      stats.costPerDay = calculateCostPerDay(stats.hashrate, stats.electricityCost);
      stats.profitPerDay = stats.revenuePerDay - stats.costPerDay;
      stats.roi = (stats.profitPerDay * 365) / (stats.costPerTH * stats.hashrate) * 100;
      
      setPreHalvingStats(stats);
    }
  }, [currentHalvingIndex, halvings]);
  
  // Calculate expected Bitcoin price for each halving
  const calculateExpectedPrice = (halvingIndex: number): number => {
    // Starting price before first halving
    const basePrice = 12;
    
    // Price multiplier for each halving
    const multipliers = [10, 25, 100, 2]; // Historical price movements after halvings
    
    let price = basePrice;
    for (let i = 0; i <= halvingIndex; i++) {
      price *= multipliers[i];
    }
    
    return price;
  };
  
  // Calculate network difficulty
  const calculateDifficulty = (halvingIndex: number): number => {
    // Base difficulty
    const baseDifficulty = 1;
    
    // Difficulty increases with each halving
    return baseDifficulty * Math.pow(10, halvingIndex);
  };
  
  // Calculate daily revenue
  const calculateRevenuePerDay = (hashrate: number, blockReward: number, difficulty: number, bitcoinPrice: number): number => {
    // Simplified calculation: (hashrate/network hashrate) * blocks per day * reward * price
    // We'll assume network hashrate is proportional to difficulty
    const networkHashrate = difficulty * 1000; // Simplified relationship
    const blocksPerDay = 144; // 6 blocks per hour * 24 hours
    
    return (hashrate / networkHashrate) * blocksPerDay * blockReward * bitcoinPrice;
  };
  
  // Calculate daily cost
  const calculateCostPerDay = (hashrate: number, electricityCost: number): number => {
    // Assume 0.1 kWh per TH/s per day (simplified)
    const kWhPerDay = hashrate * 0.1;
    return kWhPerDay * electricityCost;
  };
  
  // Start simulation
  const startSimulation = () => {
    setSimulationRunning(true);
    
    // Set timer for simulation
    const timer = setInterval(() => {
      setTimeRemaining(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          simulateHalving();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    
    return () => clearInterval(timer);
  };
  
  // Apply user strategy and simulate halving effects
  const simulateHalving = () => {
    if (!userStrategy) {
      // If no strategy selected, default to 'upgrade'
      setUserStrategy('upgrade');
    }
    
    const halving = halvings[currentHalvingIndex];
    const newPrice = calculateExpectedPrice(currentHalvingIndex) * 1.5; // Price typically increases after halving
    const newDifficulty = preHalvingStats.difficulty * 1.2; // Difficulty increases as hashrate grows
    
    let newHashrate = preHalvingStats.hashrate;
    let newCostPerTH = preHalvingStats.costPerTH;
    
    // Apply user strategy
    switch (userStrategy) {
      case 'upgrade':
        // Upgrade to more efficient hardware
        newHashrate = preHalvingStats.hashrate * 1.5;
        newCostPerTH = preHalvingStats.costPerTH * 0.8; // More efficient hardware
        break;
      case 'expand':
        // Add more miners
        newHashrate = preHalvingStats.hashrate * 2;
        break;
      case 'reduce':
        // Reduce operating costs
        newHashrate = preHalvingStats.hashrate * 0.8;
        break;
    }
    
    const postStats: MinerStats = {
      blockReward: halving.rewardAfter,
      hashrate: newHashrate,
      difficulty: newDifficulty,
      costPerTH: newCostPerTH,
      electricityCost: preHalvingStats.electricityCost,
      bitcoinPrice: newPrice,
      revenuePerDay: 0,
      costPerDay: 0,
      profitPerDay: 0,
      roi: 0
    };
    
    // Calculate new revenue, cost, and profit
    postStats.revenuePerDay = calculateRevenuePerDay(postStats.hashrate, postStats.blockReward, postStats.difficulty, postStats.bitcoinPrice);
    postStats.costPerDay = calculateCostPerDay(postStats.hashrate, postStats.electricityCost);
    postStats.profitPerDay = postStats.revenuePerDay - postStats.costPerDay;
    postStats.roi = (postStats.profitPerDay * 365) / (postStats.costPerTH * postStats.hashrate) * 100;
    
    setPostHalvingStats(postStats);
    setSimulationRunning(false);
    
    // If user has completed all halvings or achieved positive ROI after halving
    if (currentHalvingIndex >= 3 || postStats.roi > 30) {
      setCompleted(true);
      setTimeout(onComplete, 2000);
    }
  };
  
  // Move to the next halving
  const nextHalving = () => {
    if (currentHalvingIndex < halvings.length - 1) {
      setCurrentHalvingIndex(currentHalvingIndex + 1);
      setPostHalvingStats(null);
      setUserStrategy(null);
      setTimeRemaining(60);
    }
  };
  
  // Format time for display
  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };
  
  return (
    <div className="bg-black text-gray-100 p-6 rounded-lg border border-orange-900/30">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-orange-500 mb-4">Bitcoin Halving Simulator</h2>
        <p className="text-gray-300 mb-6">
          Experience the economic impact of Bitcoin's halving events. Every 210,000 blocks (approximately 4 years),
          the block reward for miners is cut in half, reducing new Bitcoin issuance and affecting mining economics.
        </p>
        
        {/* Halving timeline */}
        <div className="bg-gray-900 p-4 rounded-lg mb-6">
          <h3 className="text-orange-400 text-lg font-medium mb-3 flex items-center">
            <Clock className="h-5 w-5 mr-2" />
            Bitcoin Halving Timeline
          </h3>
          
          <div className="relative mb-6">
            <div className="absolute top-1/2 h-0.5 w-full bg-gray-700 -translate-y-1/2"></div>
            
            <div className="relative flex justify-between">
              {halvings.map((halving, index) => (
                <div 
                  key={halving.number}
                  className={`relative flex flex-col items-center ${
                    index === currentHalvingIndex 
                      ? 'text-orange-400' 
                      : index < currentHalvingIndex 
                        ? 'text-gray-400' 
                        : 'text-gray-600'
                  }`}
                >
                  <div 
                    className={`w-6 h-6 rounded-full ${
                      index === currentHalvingIndex 
                        ? 'bg-orange-600' 
                        : index < currentHalvingIndex 
                          ? 'bg-gray-600' 
                          : 'bg-gray-800'
                    } flex items-center justify-center text-xs mb-2`}
                  >
                    {halving.number}
                  </div>
                  <div className="text-xs text-center min-w-max">
                    <div>{halving.date}</div>
                    <div>{halving.blockHeight}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="bg-black/30 p-3 rounded-lg">
            <h4 className="text-sm font-medium text-orange-400 mb-2">Current Halving: {halvings[currentHalvingIndex].number}</h4>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <div className="text-xs text-gray-500">Reward Before</div>
                <div className="flex items-center text-xl text-gray-100">
                  <Coins className="h-5 w-5 mr-2 text-yellow-400" />
                  {halvings[currentHalvingIndex].rewardBefore} BTC
                </div>
              </div>
              
              <div>
                <div className="text-xs text-gray-500">Reward After</div>
                <div className="flex items-center text-xl text-gray-100">
                  <Coins className="h-5 w-5 mr-2 text-yellow-400" />
                  {halvings[currentHalvingIndex].rewardAfter} BTC
                </div>
              </div>
            </div>
            
            <div className="mt-4 text-sm text-gray-400">
              <p>
                Every 210,000 blocks (approximately 4 years), the reward for mining a Bitcoin block is cut in half.
                This event, known as "the halving," reduces the rate at which new bitcoins are created, enforcing
                Bitcoin's limited supply of 21 million coins.
              </p>
            </div>
          </div>
        </div>
        
        {/* Simulation tabs */}
        <div className="bg-gray-900 p-4 rounded-lg mb-6">
          {/* Tab navigation */}
          <div className="flex border-b border-gray-800 mb-4">
            <button
              className={`px-4 py-2 text-sm font-medium ${
                activeTab === 'supply' 
                  ? 'text-orange-400 border-b-2 border-orange-500' 
                  : 'text-gray-400 hover:text-gray-300'
              }`}
              onClick={() => setActiveTab('supply')}
            >
              Bitcoin Supply
            </button>
            <button
              className={`px-4 py-2 text-sm font-medium ${
                activeTab === 'mining' 
                  ? 'text-orange-400 border-b-2 border-orange-500' 
                  : 'text-gray-400 hover:text-gray-300'
              }`}
              onClick={() => setActiveTab('mining')}
            >
              Mining Economics
            </button>
            <button
              className={`px-4 py-2 text-sm font-medium ${
                activeTab === 'economics' 
                  ? 'text-orange-400 border-b-2 border-orange-500' 
                  : 'text-gray-400 hover:text-gray-300'
              }`}
              onClick={() => setActiveTab('economics')}
            >
              Market Impact
            </button>
          </div>
          
          {/* Supply tab */}
          {activeTab === 'supply' && (
            <div>
              <h3 className="text-lg font-medium text-orange-400 mb-3">Bitcoin's Fixed Supply</h3>
              
              <div className="bg-black/30 p-4 rounded-lg mb-4">
                <div className="flex items-center mb-4">
                  <Coins className="h-6 w-6 mr-3 text-yellow-500" />
                  <div>
                    <div className="text-sm text-gray-400">Maximum Supply</div>
                    <div className="text-xl font-medium text-gray-100">21,000,000 BTC</div>
                  </div>
                </div>
                
                <div className="space-y-4 mb-4">
                  <div>
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-gray-400">Circulating Supply</span>
                      <span className="text-gray-300">
                        {/* Approximate circulating supply after each halving */}
                        {currentHalvingIndex === 0 ? '10,500,000' : 
                         currentHalvingIndex === 1 ? '15,750,000' : 
                         currentHalvingIndex === 2 ? '18,375,000' : 
                         '19,687,500'} BTC
                      </span>
                    </div>
                    <div className="h-2 rounded-full bg-gray-800">
                      <div 
                        className="h-2 rounded-full bg-orange-500" 
                        style={{ width: `${(currentHalvingIndex === 0 ? 50 : 
                                             currentHalvingIndex === 1 ? 75 : 
                                             currentHalvingIndex === 2 ? 87.5 : 
                                             93.75)}%` 
                        }}
                      ></div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-gray-400">New BTC Issued Per Day</span>
                      <span className="text-gray-300">
                        {halvings[currentHalvingIndex].rewardBefore * 144} BTC
                      </span>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-gray-400">New BTC After Halving</span>
                      <span className="text-gray-300">
                        {halvings[currentHalvingIndex].rewardAfter * 144} BTC
                      </span>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-gray-400">Inflation Rate Before</span>
                      <span className="text-gray-300">
                        {currentHalvingIndex === 0 ? '8.4%' : 
                         currentHalvingIndex === 1 ? '4.2%' : 
                         currentHalvingIndex === 2 ? '1.8%' : 
                         '0.9%'} per year
                      </span>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-gray-400">Inflation Rate After</span>
                      <span className="text-gray-300">
                        {currentHalvingIndex === 0 ? '4.2%' : 
                         currentHalvingIndex === 1 ? '1.8%' : 
                         currentHalvingIndex === 2 ? '0.9%' : 
                         '0.45%'} per year
                      </span>
                    </div>
                  </div>
                </div>
                
                <p className="text-sm text-gray-400">
                  Bitcoin's monetary policy is built around a fixed supply cap and predictable issuance schedule. 
                  Each halving reduces the rate at which new bitcoins are created, making Bitcoin increasingly scarce over time.
                </p>
              </div>
            </div>
          )}
          
          {/* Mining tab */}
          {activeTab === 'mining' && (
            <div>
              <h3 className="text-lg font-medium text-orange-400 mb-3">Mining Economics</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div className="bg-black/30 p-4 rounded-lg">
                  <h4 className="text-sm font-medium text-orange-400 mb-3 flex items-center">
                    <ChartBar className="h-4 w-4 mr-1" />
                    Pre-Halving Mining Stats
                  </h4>
                  
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-400">Block Reward:</span>
                      <span className="text-sm text-gray-200">{preHalvingStats.blockReward} BTC</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-400">Bitcoin Price:</span>
                      <span className="text-sm text-gray-200">${preHalvingStats.bitcoinPrice.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-400">Mining Hashrate:</span>
                      <span className="text-sm text-gray-200">{preHalvingStats.hashrate.toLocaleString()} TH/s</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-400">Revenue Per Day:</span>
                      <span className="text-sm text-green-400">${preHalvingStats.revenuePerDay.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-400">Costs Per Day:</span>
                      <span className="text-sm text-red-400">${preHalvingStats.costPerDay.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-400">Profit Per Day:</span>
                      <span className={`text-sm ${preHalvingStats.profitPerDay >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                        ${preHalvingStats.profitPerDay.toFixed(2)}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-400">ROI:</span>
                      <span className={`text-sm ${preHalvingStats.roi >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                        {preHalvingStats.roi.toFixed(1)}%
                      </span>
                    </div>
                  </div>
                </div>
                
                <div className="bg-black/30 p-4 rounded-lg">
                  <h4 className="text-sm font-medium text-orange-400 mb-3 flex items-center">
                    <ChartBar className="h-4 w-4 mr-1" />
                    Post-Halving Mining Stats
                  </h4>
                  
                  {postHalvingStats ? (
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-400">Block Reward:</span>
                        <span className="text-sm text-gray-200">{postHalvingStats.blockReward} BTC</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-400">Bitcoin Price:</span>
                        <span className="text-sm text-gray-200">${postHalvingStats.bitcoinPrice.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-400">Mining Hashrate:</span>
                        <span className="text-sm text-gray-200">{postHalvingStats.hashrate.toLocaleString()} TH/s</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-400">Revenue Per Day:</span>
                        <span className="text-sm text-green-400">${postHalvingStats.revenuePerDay.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-400">Costs Per Day:</span>
                        <span className="text-sm text-red-400">${postHalvingStats.costPerDay.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-400">Profit Per Day:</span>
                        <span className={`text-sm ${postHalvingStats.profitPerDay >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                          ${postHalvingStats.profitPerDay.toFixed(2)}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-400">ROI:</span>
                        <span className={`text-sm ${postHalvingStats.roi >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                          {postHalvingStats.roi.toFixed(1)}%
                        </span>
                      </div>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center h-52">
                      <p className="text-gray-500 text-center mb-4">
                        Simulate the halving to see how mining economics change
                      </p>
                    </div>
                  )}
                </div>
              </div>
              
              {/* Strategy selection */}
              <div className="bg-black/30 p-4 rounded-lg">
                <h4 className="text-sm font-medium text-orange-400 mb-3">Prepare for the Halving</h4>
                
                {!simulationRunning && !postHalvingStats ? (
                  <div className="space-y-4">
                    <p className="text-sm text-gray-400">
                      The halving will reduce your mining revenue by 50%. Choose a strategy to adapt:
                    </p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                      <div 
                        className={`p-3 border rounded-lg cursor-pointer ${
                          userStrategy === 'upgrade' 
                            ? 'bg-orange-900/30 border-orange-500' 
                            : 'bg-black/20 border-gray-800 hover:border-gray-700'
                        }`}
                        onClick={() => setUserStrategy('upgrade')}
                      >
                        <h5 className="font-medium text-orange-300 mb-1">Upgrade Hardware</h5>
                        <p className="text-xs text-gray-400">
                          Invest in more efficient miners to reduce electricity costs.
                        </p>
                      </div>
                      
                      <div 
                        className={`p-3 border rounded-lg cursor-pointer ${
                          userStrategy === 'expand' 
                            ? 'bg-orange-900/30 border-orange-500' 
                            : 'bg-black/20 border-gray-800 hover:border-gray-700'
                        }`}
                        onClick={() => setUserStrategy('expand')}
                      >
                        <h5 className="font-medium text-orange-300 mb-1">Expand Operation</h5>
                        <p className="text-xs text-gray-400">
                          Add more miners to increase your hashrate and total revenue.
                        </p>
                      </div>
                      
                      <div 
                        className={`p-3 border rounded-lg cursor-pointer ${
                          userStrategy === 'reduce' 
                            ? 'bg-orange-900/30 border-orange-500' 
                            : 'bg-black/20 border-gray-800 hover:border-gray-700'
                        }`}
                        onClick={() => setUserStrategy('reduce')}
                      >
                        <h5 className="font-medium text-orange-300 mb-1">Reduce Operations</h5>
                        <p className="text-xs text-gray-400">
                          Scale back to focus on only the most profitable equipment.
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex justify-center">
                      <button
                        onClick={startSimulation}
                        disabled={!userStrategy}
                        className={`px-6 py-2 rounded-md font-medium flex items-center ${
                          !userStrategy
                            ? 'bg-gray-700 text-gray-400 cursor-not-allowed'
                            : 'bg-orange-600 text-white hover:bg-orange-700'
                        }`}
                      >
                        Simulate Halving
                      </button>
                    </div>
                  </div>
                ) : simulationRunning ? (
                  <div className="flex flex-col items-center p-6">
                    <div className="w-24 h-24 border-4 border-t-orange-500 border-orange-200/20 rounded-full animate-spin mb-4"></div>
                    <div className="text-xl text-orange-400 mb-2">Halving in progress...</div>
                    <div className="text-gray-400">Time remaining: {formatTime(timeRemaining)}</div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className={`p-4 rounded-lg border ${
                      postHalvingStats && postHalvingStats.profitPerDay >= 0
                        ? 'bg-green-900/20 border-green-700 text-green-300'
                        : 'bg-red-900/20 border-red-700 text-red-300'
                    }`}>
                      <h5 className="font-medium mb-2">Strategy Results</h5>
                      <p className="text-sm">
                        {postHalvingStats && postHalvingStats.profitPerDay >= 0
                          ? "Your strategy successfully maintained profitability after the halving!"
                          : "Your mining operation is currently unprofitable after the halving. Consider adjusting your strategy for the next cycle."}
                      </p>
                    </div>
                    
                    <div className="flex justify-center space-x-4">
                      {currentHalvingIndex < halvings.length - 1 && (
                        <button
                          onClick={nextHalving}
                          className="px-6 py-2 bg-orange-600 text-white rounded-md hover:bg-orange-700 flex items-center"
                        >
                          Next Halving
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </button>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
          
          {/* Economics tab */}
          {activeTab === 'economics' && (
            <div>
              <h3 className="text-lg font-medium text-orange-400 mb-3">Market Impact</h3>
              
              <div className="bg-black/30 p-4 rounded-lg mb-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-3 bg-black/30 rounded-lg">
                    <h4 className="text-sm font-medium text-orange-400 mb-2 flex items-center">
                      <Scale className="h-4 w-4 mr-1" />
                      Supply & Demand
                    </h4>
                    <p className="text-xs text-gray-400">
                      The halving reduces the rate of new Bitcoin supply, creating scarcity. With consistent or growing demand,
                      this reduction in new supply can contribute to price appreciation over time.
                    </p>
                  </div>
                  
                  <div className="p-3 bg-black/30 rounded-lg">
                    <h4 className="text-sm font-medium text-orange-400 mb-2 flex items-center">
                      <TrendingUp className="h-4 w-4 mr-1" />
                      Historical Impact
                    </h4>
                    <p className="text-xs text-gray-400">
                      After previous halvings, Bitcoin has typically experienced significant price growth in the following 12-18 months.
                      However, market cycles are complex and influenced by many factors beyond the halving event.
                    </p>
                  </div>
                  
                  <div className="p-3 bg-black/30 rounded-lg">
                    <h4 className="text-sm font-medium text-orange-400 mb-2 flex items-center">
                      <Wallet className="h-4 w-4 mr-1" />
                      Miner Behavior
                    </h4>
                    <p className="text-xs text-gray-400">
                      After a halving, miners may need to sell fewer coins to remain profitable if the Bitcoin price increases.
                      This reduction in selling pressure can further contribute to price stability or growth.
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="bg-black/30 p-4 rounded-lg">
                <div className="flex justify-between items-center mb-3">
                  <h4 className="text-sm font-medium text-orange-400 flex items-center">
                    <DollarSign className="h-4 w-4 mr-1" />
                    Bitcoin Price Movement
                  </h4>
                  
                  <button
                    onClick={() => setShowInfo(!showInfo)}
                    className="text-xs px-2 py-1 bg-gray-800 rounded-full text-gray-400 hover:bg-gray-700"
                  >
                    {showInfo ? 'Hide Info' : 'Show Info'}
                  </button>
                </div>
                
                {showInfo && (
                  <div className="mb-4 p-3 bg-black/50 rounded-lg text-xs text-gray-400">
                    <p className="mb-2">
                      <span className="text-orange-400 font-medium">First Halving (2012):</span> Bitcoin price rose from ~$12 to ~$1,100 in the year following the halving.
                    </p>
                    <p className="mb-2">
                      <span className="text-orange-400 font-medium">Second Halving (2016):</span> Price went from ~$650 to ~$20,000 during the subsequent bull market.
                    </p>
                    <p>
                      <span className="text-orange-400 font-medium">Third Halving (2020):</span> Price increased from ~$8,700 to ~$69,000 in the following 18 months.
                    </p>
                  </div>
                )}
                
                <div className="relative h-60 w-full">
                  {/* Simple price chart visualization */}
                  <div className="absolute bottom-0 left-0 right-0 top-0 flex items-end">
                    <div className="w-1/4 bg-gray-800 h-12 mr-px"></div>
                    <div className="w-1/4 bg-gray-800 h-36 mr-px"></div>
                    <div className="w-1/4 bg-gray-800 h-20 mr-px"></div>
                    <div className="w-1/4 bg-gray-800 h-60"></div>
                  </div>
                  
                  {/* Halving lines */}
                  <div className="absolute top-0 bottom-0 left-1/4 w-px bg-orange-500 z-10"></div>
                  <div className="absolute top-0 bottom-0 left-2/4 w-px bg-orange-500 z-10"></div>
                  <div className="absolute top-0 bottom-0 left-3/4 w-px bg-orange-500 z-10"></div>
                  
                  {/* Halving labels */}
                  <div className="absolute top-2 left-1/4 transform -translate-x-1/2 bg-orange-900/80 text-orange-300 px-2 py-1 rounded text-xs z-20">
                    Halving 1
                  </div>
                  <div className="absolute top-2 left-2/4 transform -translate-x-1/2 bg-orange-900/80 text-orange-300 px-2 py-1 rounded text-xs z-20">
                    Halving 2
                  </div>
                  <div className="absolute top-2 left-3/4 transform -translate-x-1/2 bg-orange-900/80 text-orange-300 px-2 py-1 rounded text-xs z-20">
                    Halving 3
                  </div>
                  
                  {/* Price overlays */}
                  <div className="absolute bottom-0 left-0 right-0 top-0 flex items-end opacity-70">
                    <div className="w-1/4 bg-gradient-to-t from-orange-700/50 to-orange-700/0 h-6"></div>
                    <div className="w-1/4 bg-gradient-to-t from-orange-700/50 to-orange-700/0 h-72"></div>
                    <div className="w-1/4 bg-gradient-to-t from-orange-700/50 to-orange-700/0 h-48"></div>
                    <div className="w-1/4 bg-gradient-to-t from-orange-700/50 to-orange-700/0 h-96"></div>
                  </div>
                  
                  {/* Price labels */}
                  <div className="absolute bottom-4 left-[12.5%] transform -translate-x-1/2 text-xs text-gray-400">$12-$1,100</div>
                  <div className="absolute bottom-4 left-[37.5%] transform -translate-x-1/2 text-xs text-gray-400">$650-$20,000</div>
                  <div className="absolute bottom-4 left-[62.5%] transform -translate-x-1/2 text-xs text-gray-400">$8,700-$69,000</div>
                  <div className="absolute bottom-4 left-[87.5%] transform -translate-x-1/2 text-xs text-gray-400">???</div>
                </div>
                
                <p className="text-xs text-gray-400 mt-4">
                  Note: Past performance does not guarantee future results. The Bitcoin market has matured over time,
                  and each halving cycle has unique macroeconomic conditions and market dynamics.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
      
      {completed && (
        <div className="bg-green-900/20 border border-green-700 rounded-lg p-4 text-center">
          <h3 className="text-green-400 text-lg font-medium mb-2">Challenge Complete!</h3>
          <p className="text-gray-300">
            Congratulations! You've successfully navigated through Bitcoin's halving cycles and adapted your strategy
            to maintain profitability. You now understand how Bitcoin's programmed scarcity through halvings affects
            both mining economics and the broader market.
          </p>
        </div>
      )}
    </div>
  );
}