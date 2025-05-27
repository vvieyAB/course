import React, { useState, useEffect } from 'react';
import { FaBitcoin, FaServer, FaTools, FaBolt, FaTemperatureHigh, FaChartLine, FaArrowUp, FaLock, FaCheck } from 'react-icons/fa';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
// Theme defined inline in this component

// Define interfaces for our types
interface MiningHardware {
  id: string;
  name: string;
  hashrate: number;
  power: number;
  price: number;
  description: string;
  thermals: number;
}

interface HardwareUpgrade {
  id: string;
  name: string;
  price: number;
  effects: {
    hashrate?: number;
    power?: number;
    thermals?: number;
  };
  description: string;
}

interface Miner {
  id: number;
  name: string;
  hashrate: number;
  power: number;
  price: number;
  description: string;
  thermals: number;
  upgrades: string[];
  efficiency: number;
  status: 'active' | 'inactive';
}

interface BlockHeader {
  version: string;
  previousHash: string;
  merkleRoot: string;
  timestamp: number;
  bits: string;
  nonce: number;
}

// Mining hardware templates
const hardwareTemplates: MiningHardware[] = [
  {
    id: 'basic-gpu',
    name: 'Basic GPU Miner',
    hashrate: 30,
    power: 150,
    price: 0.5,
    description: 'Entry-level gaming GPU repurposed for mining.',
    thermals: 70,
  },
  {
    id: 'mid-gpu',
    name: 'Mid-Range GPU',
    hashrate: 60,
    power: 180,
    price: 1.2,
    description: 'Decent performance GPU with good efficiency.',
    thermals: 75,
  },
  {
    id: 'high-gpu',
    name: 'High-End GPU',
    hashrate: 100,
    power: 250,
    price: 2.5,
    description: 'Premium GPU with excellent mining capabilities.',
    thermals: 80,
  },
  {
    id: 'asic-basic',
    name: 'Basic ASIC Miner',
    hashrate: 250,
    power: 1200,
    price: 5,
    description: 'Entry-level ASIC miner designed specifically for Bitcoin.',
    thermals: 85,
  },
  {
    id: 'asic-pro',
    name: 'Professional ASIC',
    hashrate: 500,
    power: 1800,
    price: 10,
    description: 'High performance ASIC with excellent efficiency.',
    thermals: 90,
  },
  {
    id: 'asic-industrial',
    name: 'Industrial ASIC',
    hashrate: 1000,
    power: 3000,
    price: 20,
    description: 'Enterprise-grade ASIC miner for serious operations.',
    thermals: 95,
  },
];

// Upgrades for miners
const upgradeTemplates: HardwareUpgrade[] = [
  {
    id: 'cooling-basic',
    name: 'Basic Cooling System',
    price: 0.3,
    effects: { thermals: -10 },
    description: 'Improve airflow and reduce operating temperatures.',
  },
  {
    id: 'power-optimizer',
    name: 'Power Optimizer',
    price: 0.5,
    effects: { power: -15 },
    description: 'Reduce power consumption with intelligent voltage regulation.',
  },
  {
    id: 'overclock-kit',
    name: 'Overclocking Kit',
    price: 0.8,
    effects: { hashrate: 20, thermals: 15 },
    description: 'Increase hashrate at the cost of higher temperatures.',
  },
  {
    id: 'efficiency-module',
    name: 'Efficiency Module',
    price: 1.5,
    effects: { hashrate: 10, power: -10 },
    description: 'Balanced improvement to both hashrate and power consumption.',
  },
];

// Function to generate a pseudo block header
const generateBlockHeader = (previousHash: string, merkleRoot: string, timestamp: number, difficulty: number) => {
  return {
    version: "0x20000000",
    previousHash,
    merkleRoot,
    timestamp,
    bits: difficulty.toString(16).padStart(8, '0'),
    nonce: 0
  };
};

// Format large numbers with K, M, G, T suffixes
const formatNumber = (num: number) => {
  if (num >= 1000000000000) {
    return (num / 1000000000000).toFixed(2) + 'T';
  }
  if (num >= 1000000000) {
    return (num / 1000000000).toFixed(2) + 'G';
  }
  if (num >= 1000000) {
    return (num / 1000000).toFixed(2) + 'M';
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(2) + 'K';
  }
  return num.toFixed(2);
};

interface BitcoinMiningSimulatorProps {
  onComplete?: () => void;
}

// Main component
const BitcoinMiningSimulator: React.FC<BitcoinMiningSimulatorProps> = ({ onComplete }) => {
  // State declarations
  const [bitcoin, setBitcoin] = useState(0);
  const [bitcoinPrice, setBitcoinPrice] = useState(45000);
  const [priceHistory, setPriceHistory] = useState([45000]);
  const [priceChangeDirection, setPriceChangeDirection] = useState(1);
  const [totalHashRate, setTotalHashRate] = useState(0);
  const [powerUsage, setPowerUsage] = useState(0);
  const [electricityCost] = useState(0.12); // $ per kWh (fixed rate)
  const [miners, setMiners] = useState<Miner[]>([]);
  const [dayCount, setDayCount] = useState(1);
  const [running, setRunning] = useState(false);
  const [selectedTab, setSelectedTab] = useState('mine');
  const [mining, setMining] = useState(false);
  const [miningProgress, setMiningProgress] = useState(0);
  const [currentNonce, setCurrentNonce] = useState(0);
  const [blockFound, setBlockFound] = useState(false);
  const [blockReward, setBlockReward] = useState(6.25);
  const [networkDifficulty, setNetworkDifficulty] = useState(1);
  const [notification, setNotification] = useState<string | null>(null);
  const [tutorial, setTutorial] = useState(true);
  
  // Blockchain simulation state
  const [blockHeader, setBlockHeader] = useState<BlockHeader | null>(null);
  const [blocksMined, setBlocksMined] = useState(0);
  
  // Initialize block header when component mounts
  useEffect(() => {
    const initialHeader = generateBlockHeader(
      "0000000000000000000a23aeac5a4ac2cd0de95e82ae908e5eda4d97d88cc15e",
      "38a1bff54c3e4fe4802a926a0010cd84edbcae8687f85b7e44cd5b04b4292fd3",
      Math.floor(Date.now() / 1000),
      networkDifficulty
    );
    setBlockHeader(initialHeader);
    
    // Give initial funds to get started
    setBitcoin(1);
  }, []);
  
  // Main game loop
  useEffect(() => {
    if (!running) return;
    
    const gameInterval = setInterval(() => {
      // Update day counter
      setDayCount(prev => prev + 1);
      
      // Update Bitcoin price with some randomness
      const random = Math.random();
      if (random > 0.95) {
        // Larger price change occasionally (5% chance)
        setPriceChangeDirection(Math.random() > 0.5 ? 1 : -1);
      } else if (random > 0.7) {
        // Smaller direction change (25% chance)
        setPriceChangeDirection(prev => Math.random() > 0.5 ? prev : -prev);
      }
      
      const changePercent = (Math.random() * 2) * priceChangeDirection;
      const newPrice = Math.max(1000, bitcoinPrice * (1 + changePercent / 100));
      setBitcoinPrice(newPrice);
      setPriceHistory(prev => [...prev.slice(-30), newPrice]);
      
      // Calculate passive income from miners
      const dailyBtcEarnings = (totalHashRate / 1000000) * 0.0001 * Math.pow(0.8, networkDifficulty - 1);
      setBitcoin(prev => prev + dailyBtcEarnings);
      
      // Calculate electricity costs
      const dailyPowerCost = (powerUsage / 1000) * 24 * electricityCost / 30; // Cost per day
      setBitcoin(prev => Math.max(0, prev - dailyPowerCost / bitcoinPrice));
      
      // Update difficulty occasionally
      if (dayCount % 14 === 0 && networkDifficulty < 5) {
        setNetworkDifficulty(prev => prev + 1);
        showNotification("Network difficulty increased!");
        
        // Generate new block header when difficulty changes
        const newHeader = generateBlockHeader(
          Math.random().toString(16).substring(2, 66),
          Math.random().toString(16).substring(2, 66),
          Math.floor(Date.now() / 1000),
          networkDifficulty + 1
        );
        setBlockHeader(newHeader);
      }
      
      // Occasional hardware failure or temperature issue
      if (miners.length > 0 && Math.random() > 0.97) {
        const randomMinerIndex = Math.floor(Math.random() * miners.length);
        if (miners[randomMinerIndex].thermals > 85) {
          showNotification(`Warning: ${miners[randomMinerIndex].name} is overheating!`);
        }
      }
      
      // Adjust block reward over time (halving)
      if (dayCount % 210 === 0) {
        setBlockReward(prev => prev / 2);
        showNotification("Bitcoin halving event occurred! Block reward reduced.");
      }
      
    }, 2000); // 2 seconds = 1 day in simulation
    
    return () => clearInterval(gameInterval);
  }, [running, bitcoinPrice, priceChangeDirection, totalHashRate, powerUsage, electricityCost, networkDifficulty, dayCount, miners, blockReward]);
  
  // Simulation of mining process
  useEffect(() => {
    if (!mining || !blockHeader) return;
    
    let nonceCounter = currentNonce;
    let progress = 0;
    const difficultyFactor = Math.pow(16, networkDifficulty);
    const hashPower = totalHashRate;
    
    const miningInterval = setInterval(() => {
      // Simulate hash attempts
      const hashesPerTick = hashPower / 10;
      nonceCounter += hashesPerTick;
      
      // Update nonce display every few ticks (for UI)
      if (Math.random() > 0.7) {
        setCurrentNonce(Math.floor(nonceCounter));
      }
      
      // Calculate chance of finding a block based on hashrate and difficulty
      const blockChance = hashPower / difficultyFactor / 1000000;
      progress += blockChance * 100;
      
      // If we're simulating a success
      if (progress >= 100 || Math.random() < blockChance * 5) {
        clearInterval(miningInterval);
        setMiningProgress(100);
        setBlockFound(true);
        setBlocksMined(prev => prev + 1);
        setBitcoin(prev => prev + blockReward);
        showNotification(`Success! You mined a block and earned ${blockReward} BTC!`);
        
        // Generate new block for next mining session
        setTimeout(() => {
          const newHeader = generateBlockHeader(
            Math.random().toString(16).substring(2, 66),
            Math.random().toString(16).substring(2, 66),
            Math.floor(Date.now() / 1000),
            networkDifficulty
          );
          setBlockHeader(newHeader);
          setBlockFound(false);
          setMining(false);
          setMiningProgress(0);
          setCurrentNonce(0);
        }, 3000);
      } else {
        setMiningProgress(progress);
      }
    }, 200);
    
    return () => clearInterval(miningInterval);
  }, [mining, blockHeader, totalHashRate, networkDifficulty, currentNonce, blockReward]);
  
  // Function to add a new mining rig
  const addMiner = (hardwareTemplate: MiningHardware) => {
    if (bitcoin < hardwareTemplate.price) {
      showNotification("Not enough Bitcoin to purchase this hardware!");
      return;
    }
    
    setBitcoin(prev => prev - hardwareTemplate.price);
    
    // Create a new miner from the hardware template
    const newMiner: Miner = {
      id: Date.now(),
      name: hardwareTemplate.name,
      hashrate: hardwareTemplate.hashrate,
      power: hardwareTemplate.power,
      price: hardwareTemplate.price,
      description: hardwareTemplate.description,
      thermals: hardwareTemplate.thermals,
      upgrades: [],
      efficiency: 1.0,
      status: 'active'
    };
    
    setMiners(prev => [...prev, newMiner]);
    updateMiningStats([...miners, newMiner]);
    showNotification(`Purchased new ${hardwareTemplate.name}!`);
  };
  
  // Function to add upgrade to a miner
  const addUpgrade = (minerId: number, upgrade: HardwareUpgrade) => {
    if (bitcoin < upgrade.price) {
      showNotification("Not enough Bitcoin to purchase this upgrade!");
      return;
    }
    
    setBitcoin(prev => prev - upgrade.price);
    
    const updatedMiners = miners.map((miner: Miner) => {
      if (miner.id === minerId) {
        // Apply upgrade effects
        const updatedMiner: Miner = { ...miner };
        updatedMiner.upgrades = [...miner.upgrades, upgrade.id];
        
        if (upgrade.effects.hashrate !== undefined) {
          updatedMiner.hashrate += upgrade.effects.hashrate;
        }
        if (upgrade.effects.power !== undefined) {
          updatedMiner.power += upgrade.effects.power;
        }
        if (upgrade.effects.thermals !== undefined) {
          updatedMiner.thermals += upgrade.effects.thermals;
        }
        
        return updatedMiner;
      }
      return miner;
    });
    
    setMiners(updatedMiners);
    updateMiningStats(updatedMiners);
    showNotification(`Upgrade installed on your mining hardware!`);
  };
  
  // Update total hashrate and power usage when miners change
  const updateMiningStats = (currentMiners: Miner[]) => {
    let totalHash = 0;
    let totalPower = 0;
    
    currentMiners.forEach(miner => {
      if (miner.status === 'active') {
        totalHash += miner.hashrate;
        totalPower += miner.power;
      }
    });
    
    setTotalHashRate(totalHash);
    setPowerUsage(totalPower);
  };
  
  // Toggle miner status (on/off)
  const toggleMinerStatus = (minerId: number) => {
    const updatedMiners = miners.map((miner: Miner) => {
      if (miner.id === minerId) {
        return {
          ...miner,
          status: miner.status === 'active' ? 'inactive' : 'active'
        } as Miner;
      }
      return miner;
    });
    
    setMiners(updatedMiners);
    updateMiningStats(updatedMiners);
  };
  
  // Toggle mining process
  const toggleMining = () => {
    if (totalHashRate <= 0) {
      showNotification("You need mining hardware to start mining!");
      return;
    }
    setMining(!mining);
  };
  
  // Handle notifications
  const showNotification = (message: string) => {
    setNotification(message);
    setTimeout(() => setNotification(null), 4000);
  };
  
  // Format a date string from day count
  const getDateString = () => {
    const startDate = new Date(2021, 0, 1);
    const currentDate = new Date(startDate);
    currentDate.setDate(startDate.getDate() + dayCount);
    return currentDate.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
  };
  
  // Calculate daily profit
  const calculateDailyProfit = () => {
    const dailyBtcEarnings = (totalHashRate / 1000000) * 0.0001 * Math.pow(0.8, networkDifficulty - 1);
    const dailyPowerCost = (powerUsage / 1000) * 24 * electricityCost / 30; // Cost per day in USD
    const dailyPowerCostBtc = dailyPowerCost / bitcoinPrice;
    
    return dailyBtcEarnings - dailyPowerCostBtc;
  };
  
  // Calculate ROI days for a hardware purchase
  const calculateROI = (price: number) => {
    const dailyProfit = calculateDailyProfit();
    if (dailyProfit <= 0) return "∞";
    
    const daysToROI = price / dailyProfit;
    return daysToROI > 1000 ? "∞" : Math.ceil(daysToROI);
  };
  
  // Format block header for display
  const formatBlockHeader = (header: BlockHeader | null) => {
    if (!header) return "";
    return (
      `Version: ${header.version}\n` +
      `Previous Block Hash: ${header.previousHash}\n` +
      `Merkle Root: ${header.merkleRoot}\n` +
      `Timestamp: ${header.timestamp}\n` +
      `Difficulty Target: ${header.bits}\n` +
      `Nonce: ${currentNonce}`
    );
  };

  // Handle tutorial completion
  const completeTutorial = () => {
    setTutorial(false);
    setRunning(true);
  };

  // Handle simulation completion
  const completeSimulation = () => {
    if (onComplete) {
      onComplete();
    }
  };

  // Tutorial screen
  if (tutorial) {
    return (
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg p-6">
        <h2 className="text-2xl font-bold text-amber-800 mb-4 flex items-center">
          <FaBitcoin className="mr-2 text-amber-600" /> Bitcoin Mining Simulator
        </h2>
        <p className="text-gray-700 mb-6">
          Welcome to the Bitcoin mining simulator! This educational tool will help you understand how Bitcoin mining works, 
          from the hardware and economics to the technical process of finding blocks.
        </p>
        
        <div className="space-y-4 mb-6">
          <h3 className="text-lg font-semibold text-amber-700">How to play:</h3>
          <div className="bg-amber-50 p-4 rounded-md">
            <p className="font-medium text-amber-900 mb-2">1. Get mining hardware</p>
            <p className="text-gray-700">Start by purchasing mining hardware from the shop. Each piece of hardware has different hashrate (mining power), electricity consumption, and thermal characteristics.</p>
          </div>
          <div className="bg-amber-50 p-4 rounded-md">
            <p className="font-medium text-amber-900 mb-2">2. Mine bitcoins</p>
            <p className="text-gray-700">Use your hardware to mine blocks and earn bitcoin rewards. The mining process is a competition to find a valid block hash before other miners.</p>
          </div>
          <div className="bg-amber-50 p-4 rounded-md">
            <p className="font-medium text-amber-900 mb-2">3. Manage your operation</p>
            <p className="text-gray-700">Balance electricity costs, hardware temperatures, and mining rewards. Upgrade your hardware to improve efficiency.</p>
          </div>
          <div className="bg-amber-50 p-4 rounded-md">
            <p className="font-medium text-amber-900 mb-2">4. Adapt to changes</p>
            <p className="text-gray-700">The Bitcoin network difficulty increases over time, and halvings reduce the block reward periodically. The Bitcoin price also fluctuates, affecting your profitability.</p>
          </div>
        </div>
        
        <div className="flex justify-between">
          <Button onClick={completeSimulation} variant="outline">
            Skip Simulation
          </Button>
          <Button onClick={completeTutorial} className="bg-amber-600 hover:bg-amber-700 text-white">
            Start Mining
          </Button>
        </div>
      </div>
    );
  }

  // Completion screen if player has mined enough blocks
  if (blocksMined >= 10) {
    return (
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg p-6 text-center">
        <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-green-100 flex items-center justify-center">
          <FaCheck className="h-10 w-10 text-green-600" />
        </div>
        <h2 className="text-2xl font-bold text-amber-800 mb-4">Mining Mastery Achieved!</h2>
        <p className="text-gray-700 mb-6">
          Congratulations! You've successfully mined {blocksMined} blocks and mastered the basics of Bitcoin mining!
        </p>
        
        <div className="bg-amber-50 p-4 rounded-md mb-6 text-left">
          <h3 className="font-semibold text-amber-900 mb-2">Key concepts you've learned:</h3>
          <ul className="space-y-2">
            <li className="flex items-start">
              <div className="mt-1 mr-2 w-4 h-4 rounded-full bg-amber-200 flex items-center justify-center text-amber-800 font-semibold text-xs">•</div>
              <span>How mining hardware characteristics (hashrate, power, thermals) affect profitability</span>
            </li>
            <li className="flex items-start">
              <div className="mt-1 mr-2 w-4 h-4 rounded-full bg-amber-200 flex items-center justify-center text-amber-800 font-semibold text-xs">•</div>
              <span>The role of difficulty adjustment in maintaining block time</span>
            </li>
            <li className="flex items-start">
              <div className="mt-1 mr-2 w-4 h-4 rounded-full bg-amber-200 flex items-center justify-center text-amber-800 font-semibold text-xs">•</div>
              <span>How the Bitcoin halving affects mining economics</span>
            </li>
            <li className="flex items-start">
              <div className="mt-1 mr-2 w-4 h-4 rounded-full bg-amber-200 flex items-center justify-center text-amber-800 font-semibold text-xs">•</div>
              <span>The process of finding a valid block hash using a nonce</span>
            </li>
            <li className="flex items-start">
              <div className="mt-1 mr-2 w-4 h-4 rounded-full bg-amber-200 flex items-center justify-center text-amber-800 font-semibold text-xs">•</div>
              <span>The economic balance between hashrate, electricity cost, and Bitcoin price</span>
            </li>
          </ul>
        </div>
        
        <Button onClick={completeSimulation} className="bg-amber-600 hover:bg-amber-700 text-white">
          Complete Mission
        </Button>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto">
      <div className="bg-gradient-to-r from-amber-700 to-amber-900 text-white p-6 rounded-xl mb-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold flex items-center"><FaBitcoin className="mr-2" /> Bitcoin Mining Simulator</h1>
        <div>
          {running ? (
            <Button 
              variant="outline" 
              className="border-white text-white hover:bg-amber-800"
              onClick={() => setRunning(false)}
            >
              Pause Simulation
            </Button>
          ) : (
            <Button 
              variant="outline" 
              className="border-white text-white hover:bg-amber-800"
              onClick={() => setRunning(true)}
            >
              Start Simulation
            </Button>
          )}
        </div>
      </div>
      
      <Card className="mb-4">
        <CardContent className="pt-6">
          <div className="flex justify-between mb-4">
            <h2 className="text-xl font-bold">Simulation Day: {dayCount} ({getDateString()})</h2>
            <div className="flex gap-2">
              <Button 
                variant={selectedTab === 'mine' ? 'default' : 'outline'}
                onClick={() => setSelectedTab('mine')}
                className={selectedTab === 'mine' ? 'bg-amber-600 hover:bg-amber-700' : ''}
              >
                Mining Operation
              </Button>
              <Button 
                variant={selectedTab === 'shop' ? 'default' : 'outline'}
                onClick={() => setSelectedTab('shop')}
                className={selectedTab === 'shop' ? 'bg-amber-600 hover:bg-amber-700' : ''}
              >
                Hardware Shop
              </Button>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-4">
            <Card>
              <CardContent className="pt-4">
                <h3 className="text-sm font-medium text-gray-500 flex items-center"><FaBitcoin className="mr-1 text-amber-500" /> Bitcoin Balance</h3>
                <p className="text-xl font-bold">{bitcoin.toFixed(8)}</p>
                <p className="text-xs text-gray-500">(${(bitcoin * bitcoinPrice).toFixed(2)})</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="pt-4">
                <h3 className="text-sm font-medium text-gray-500 flex items-center"><FaChartLine className="mr-1 text-amber-500" /> BTC Price</h3>
                <p className="text-xl font-bold">${bitcoinPrice.toFixed(2)}</p>
                <p className={`text-xs flex items-center ${priceChangeDirection > 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {priceChangeDirection > 0 ? <FaArrowUp className="mr-1" /> : '↓'}
                  {Math.abs(((priceHistory[priceHistory.length-1] / priceHistory[Math.max(0, priceHistory.length-2)]) - 1) * 100).toFixed(2)}%
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="pt-4">
                <h3 className="text-sm font-medium text-gray-500 flex items-center"><FaServer className="mr-1 text-amber-500" /> Total Hashrate</h3>
                <p className="text-xl font-bold">{formatNumber(totalHashRate)} H/s</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="pt-4">
                <h3 className="text-sm font-medium text-gray-500 flex items-center"><FaBolt className="mr-1 text-amber-500" /> Power Usage</h3>
                <p className="text-xl font-bold">{powerUsage}W</p>
                <p className="text-xs text-gray-500">${((powerUsage / 1000) * 24 * electricityCost).toFixed(2)}/day</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="pt-4">
                <h3 className="text-sm font-medium text-gray-500 flex items-center"><FaLock className="mr-1 text-amber-500" /> Blocks Mined</h3>
                <p className="text-xl font-bold">{blocksMined}</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="pt-4">
                <h3 className="text-sm font-medium text-gray-500 flex items-center"><FaTemperatureHigh className="mr-1 text-amber-500" /> Network Difficulty</h3>
                <div className="flex gap-1 mt-1">
                  {[1, 2, 3, 4, 5].map((level: number) => (
                    <div 
                      key={level} 
                      className={`w-3 h-3 rounded-full ${level <= networkDifficulty ? 'bg-amber-500' : 'bg-gray-200'}`}
                    />
                  ))}
                </div>
                <p className="text-xs text-gray-500 mt-1">Reward: {blockReward} BTC</p>
              </CardContent>
            </Card>
          </div>
        </CardContent>
      </Card>
      
      {selectedTab === 'mine' && (
        <div className="space-y-4">
          <Card>
            <CardContent className="p-6 relative">
              <h3 className="text-lg font-bold mb-3">Bitcoin Mining Simulation</h3>
              
              <div className="bg-gray-900 font-mono text-green-400 p-4 rounded mb-4 text-sm h-[200px] overflow-auto">
                {formatBlockHeader(blockHeader)}
              </div>
              
              <div className="flex items-center justify-between mb-4">
                <span className="font-medium">Target: </span>
                <span className="font-mono">{'0'.repeat(networkDifficulty) + '1' + '0'.repeat(63 - networkDifficulty)}</span>
              </div>
              
              <div className="flex items-center gap-4">
                <Button 
                  className="bg-amber-600 hover:bg-amber-700"
                  onClick={toggleMining}
                  disabled={mining || totalHashRate <= 0 || blockFound}
                >
                  {mining ? 'Mining...' : 'Start Mining'}
                </Button>
                
                {mining && (
                  <div className="flex-1">
                    <div className="flex justify-between text-xs font-medium mb-1">
                      <span>Current Nonce: {currentNonce.toLocaleString()}</span>
                      <span>{miningProgress.toFixed(1)}% complete</span>
                    </div>
                    <Progress value={miningProgress} className="h-2" />
                  </div>
                )}
              </div>
              
              {blockFound && (
                <div className="absolute inset-0 bg-black/70 flex flex-col items-center justify-center rounded-md text-white p-8">
                  <FaBitcoin className="text-amber-500 text-5xl mb-4" />
                  <h3 className="text-2xl font-bold mb-2">Block Found!</h3>
                  <p className="mb-2">You successfully mined a new block</p>
                  <p className="text-xl font-bold text-amber-400 mb-4">+{blockReward} BTC</p>
                  <p className="text-sm opacity-75">A new block will be ready to mine shortly...</p>
                </div>
              )}
            </CardContent>
          </Card>
          
          {miners.length === 0 ? (
            <Card className="p-6 text-center">
              <p className="text-gray-500 mb-4">You don't have any mining hardware yet.</p>
              <Button 
                className="bg-amber-600 hover:bg-amber-700"
                onClick={() => setSelectedTab('shop')}
              >
                Go to Hardware Shop
              </Button>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {miners.map((miner: Miner) => (
                <Card key={miner.id}>
                  <CardContent className="p-4">
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="font-bold">{miner.name}</h3>
                      <Button
                        size="sm"
                        variant={miner.status === 'active' ? 'default' : 'destructive'}
                        onClick={() => toggleMinerStatus(miner.id)}
                      >
                        {miner.status === 'active' ? 'Running' : 'Stopped'}
                      </Button>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-2 mb-4">
                      <div className="text-sm">
                        <span className="text-gray-500">Hashrate: </span>
                        <span className="font-medium">{formatNumber(miner.hashrate)} H/s</span>
                      </div>
                      <div className="text-sm">
                        <span className="text-gray-500">Power: </span>
                        <span className="font-medium">{miner.power}W</span>
                      </div>
                      <div className="text-sm">
                        <span className="text-gray-500">Efficiency: </span>
                        <span className="font-medium">{(miner.hashrate / miner.power).toFixed(2)} H/W</span>
                      </div>
                      <div className="text-sm">
                        <span className="text-gray-500">Temperature: </span>
                        <span 
                          className="font-medium"
                          style={{ 
                            color: miner.thermals > 85 ? '#dc3545' :
                                   miner.thermals > 75 ? '#ffc107' : '#28a745'
                          }}
                        >
                          {miner.thermals}°C
                        </span>
                      </div>
                    </div>
                    
                    <div className="mb-4">
                      <p className="text-sm text-gray-500 mb-1">Upgrades:</p>
                      {miner.upgrades.length === 0 ? (
                        <p className="text-sm text-gray-400">No upgrades installed</p>
                      ) : (
                        <div className="flex flex-wrap gap-1">
                          {miner.upgrades.map((upgradeId: string) => {
                            const upgradeInfo = upgradeTemplates.find(u => u.id === upgradeId);
                            return (
                              <span 
                                key={upgradeId}
                                className="text-xs bg-gray-100 rounded-full px-2 py-1"
                              >
                                {upgradeInfo?.name || upgradeId}
                              </span>
                            );
                          })}
                        </div>
                      )}
                    </div>
                    
                    <Button 
                      className="w-full bg-blue-600 hover:bg-blue-700"
                      size="sm"
                      onClick={() => {
                        // Get available upgrades
                        const availableUpgrades = upgradeTemplates.filter(
                          upgrade => !miner.upgrades.includes(upgrade.id)
                        );
                        
                        if (availableUpgrades.length === 0) {
                          showNotification("No more upgrades available for this hardware!");
                          return;
                        }
                        
                        // For simplicity, just pick the first available upgrade
                        addUpgrade(miner.id, availableUpgrades[0]);
                      }}
                    >
                      <FaTools className="mr-1" /> Upgrade
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      )}
      
      {selectedTab === 'shop' && (
        <Card>
          <CardContent className="p-6">
            <h3 className="text-lg font-bold mb-2">Hardware Shop</h3>
            <p className="text-gray-500 mb-4">Your balance: {bitcoin.toFixed(8)} BTC (${(bitcoin * bitcoinPrice).toFixed(2)})</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
              {hardwareTemplates.map((hardware: MiningHardware) => (
                <Card key={hardware.id} className="border">
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start mb-3">
                      <h4 className="font-bold">{hardware.name}</h4>
                      <div className="text-amber-600 font-bold flex items-center">
                        <FaBitcoin className="mr-1" /> {hardware.price.toFixed(2)}
                      </div>
                    </div>
                    
                    <p className="text-sm text-gray-500 mb-4">{hardware.description}</p>
                    
                    <div className="space-y-1 mb-4">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-500">Hashrate:</span>
                        <span className="font-medium">{formatNumber(hardware.hashrate)} H/s</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-500">Power:</span>
                        <span className="font-medium">{hardware.power}W</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-500">Efficiency:</span>
                        <span className="font-medium">{(hardware.hashrate / hardware.power).toFixed(2)} H/W</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-500">ROI:</span>
                        <span className="font-medium">~{calculateROI(hardware.price)} days</span>
                      </div>
                    </div>
                    
                    <Button 
                      className="w-full bg-amber-600 hover:bg-amber-700"
                      disabled={bitcoin < hardware.price}
                      onClick={() => addMiner(hardware)}
                    >
                      {bitcoin < hardware.price ? 'Insufficient Funds' : 'Purchase Hardware'}
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
            
            <h3 className="text-lg font-bold mb-2">Upgrades Shop</h3>
            <p className="text-gray-500 mb-4">Install these upgrades on your existing hardware to improve performance</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {upgradeTemplates.map((upgrade: HardwareUpgrade) => (
                <Card key={upgrade.id} className="border">
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start mb-3">
                      <h4 className="font-bold">{upgrade.name}</h4>
                      <div className="text-amber-600 font-bold flex items-center">
                        <FaBitcoin className="mr-1" /> {upgrade.price.toFixed(2)}
                      </div>
                    </div>
                    
                    <p className="text-sm text-gray-500 mb-4">{upgrade.description}</p>
                    
                    <div className="space-y-1 mb-4">
                      {upgrade.effects.hashrate && (
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-500">Hashrate:</span>
                          <span className="font-medium text-green-600">+{upgrade.effects.hashrate} H/s</span>
                        </div>
                      )}
                      {upgrade.effects.power && (
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-500">Power:</span>
                          <span 
                            className={`font-medium ${upgrade.effects.power < 0 ? 'text-green-600' : 'text-red-600'}`}
                          >
                            {upgrade.effects.power > 0 ? '+' : ''}{upgrade.effects.power}W
                          </span>
                        </div>
                      )}
                      {upgrade.effects.thermals && (
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-500">Temperature:</span>
                          <span 
                            className={`font-medium ${upgrade.effects.thermals < 0 ? 'text-green-600' : 'text-red-600'}`}
                          >
                            {upgrade.effects.thermals > 0 ? '+' : ''}{upgrade.effects.thermals}°C
                          </span>
                        </div>
                      )}
                    </div>
                    
                    <Button 
                      className="w-full bg-blue-600 hover:bg-blue-700"
                      disabled={bitcoin < upgrade.price || miners.length === 0}
                      onClick={() => {
                        if (miners.length === 0) {
                          showNotification("You need mining hardware first!");
                          return;
                        }
                        
                        // For simplicity, upgrade the first miner
                        addUpgrade(miners[0].id, upgrade);
                      }}
                    >
                      {bitcoin < upgrade.price ? 'Insufficient Funds' : miners.length === 0 ? 'No Hardware' : 'Purchase Upgrade'}
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
      
      {notification && (
        <div className="fixed bottom-4 right-4 bg-green-600 text-white p-4 rounded-lg shadow-lg max-w-xs z-50 animate-fade-in-out">
          {notification}
        </div>
      )}
    </div>
  );
};

export default BitcoinMiningSimulator;