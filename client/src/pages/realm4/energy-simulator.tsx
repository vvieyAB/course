import { useState, useEffect } from 'react';
import { Zap, Check, BarChart, Sun, Droplets, Wind, Flame, Battery, Info } from 'lucide-react';

interface EnergySimulatorProps {
  onComplete: () => void;
}

interface EnergySource {
  id: string;
  name: string;
  type: 'solar' | 'hydro' | 'wind' | 'gas' | 'coal' | 'geothermal';
  renewable: boolean;
  costPerMWh: number;
  carbonIntensity: number;  // kg CO2 per MWh
  capacity: number;         // MW
  variability: number;      // 0-1 (0 = consistent, 1 = highly variable)
  available: boolean;
  icon: JSX.Element;
}

interface MiningOperation {
  id: string;
  name: string;
  location: string;
  energySource: string | null;
  energyUsage: number;    // MW
  hashrate: number;       // EH/s (exahashes per second)
  profit: number;         // USD per day
  carbonFootprint: number; // tons CO2 per day
}

export default function EnergySimulator({ onComplete }: EnergySimulatorProps) {
  const [energySources, setEnergySources] = useState<EnergySource[]>([
    { 
      id: 'solar', 
      name: 'Solar Farm', 
      type: 'solar',
      renewable: true, 
      costPerMWh: 36, 
      carbonIntensity: 41, 
      capacity: 100, 
      variability: 0.7,
      available: true,
      icon: <Sun className="h-5 w-5 text-yellow-400" />
    },
    { 
      id: 'hydro', 
      name: 'Hydroelectric Dam', 
      type: 'hydro',
      renewable: true, 
      costPerMWh: 40, 
      carbonIntensity: 24, 
      capacity: 500, 
      variability: 0.2,
      available: true,
      icon: <Droplets className="h-5 w-5 text-blue-400" />
    },
    { 
      id: 'wind', 
      name: 'Wind Farm', 
      type: 'wind',
      renewable: true, 
      costPerMWh: 38, 
      carbonIntensity: 11, 
      capacity: 200, 
      variability: 0.6,
      available: true,
      icon: <Wind className="h-5 w-5 text-teal-400" />
    },
    { 
      id: 'gas', 
      name: 'Natural Gas Plant', 
      type: 'gas',
      renewable: false, 
      costPerMWh: 60, 
      carbonIntensity: 490, 
      capacity: 800, 
      variability: 0.1,
      available: true,
      icon: <Flame className="h-5 w-5 text-blue-500" />
    },
    { 
      id: 'coal', 
      name: 'Coal Plant', 
      type: 'coal',
      renewable: false, 
      costPerMWh: 102, 
      carbonIntensity: 820, 
      capacity: 1000, 
      variability: 0.05,
      available: true,
      icon: <Flame className="h-5 w-5 text-orange-700" />
    },
    { 
      id: 'geothermal', 
      name: 'Geothermal Plant', 
      type: 'geothermal',
      renewable: true, 
      costPerMWh: 45, 
      carbonIntensity: 38, 
      capacity: 150, 
      variability: 0.05,
      available: true,
      icon: <Zap className="h-5 w-5 text-green-400" />
    }
  ]);
  
  const [miningOperations, setMiningOperations] = useState<MiningOperation[]>([
    {
      id: 'op1',
      name: 'Mining Farm Alpha',
      location: 'Texas, USA',
      energySource: null,
      energyUsage: 80,
      hashrate: 10,
      profit: 0,
      carbonFootprint: 0
    },
    {
      id: 'op2',
      name: 'Mountain Facility',
      location: 'Norway',
      energySource: null,
      energyUsage: 120,
      hashrate: 15,
      profit: 0,
      carbonFootprint: 0
    },
    {
      id: 'op3',
      name: 'Desert Datacenter',
      location: 'Morocco',
      energySource: null,
      energyUsage: 200,
      hashrate: 25,
      profit: 0,
      carbonFootprint: 0
    }
  ]);
  
  const [selectedOperation, setSelectedOperation] = useState<string | null>(null);
  const [selectedEnergySource, setSelectedEnergySource] = useState<string | null>(null);
  const [completed, setCompleted] = useState(false);
  const [btcPrice, setBtcPrice] = useState(40000);
  const [showMiningInfo, setShowMiningInfo] = useState(false);
  const [showEnergyInfo, setShowEnergyInfo] = useState(false);
  
  // Simulate time-of-day variability for renewable sources
  useEffect(() => {
    const interval = setInterval(() => {
      setEnergySources(prev => prev.map(source => {
        if (source.variability > 0.3) {
          // Simulate day/night cycle or weather changes for variable sources
          const randomFactor = Math.random();
          return {
            ...source,
            capacity: source.capacity * (0.6 + randomFactor * 0.8) // 60-140% of base capacity
          };
        }
        return source;
      }));
    }, 5000);
    
    return () => clearInterval(interval);
  }, []);
  
  // Calculate operation metrics whenever energy sources are assigned
  useEffect(() => {
    const updatedOperations = miningOperations.map(operation => {
      if (!operation.energySource) {
        return {
          ...operation,
          profit: 0,
          carbonFootprint: 0
        };
      }
      
      const source = energySources.find(s => s.id === operation.energySource);
      if (!source) return operation;
      
      // Calculate daily power cost
      const dailyPowerCost = operation.energyUsage * source.costPerMWh * 24;
      
      // Calculate daily BTC reward (simplified)
      // At 10 EH/s, approximately 0.5 BTC per day (very simplified model)
      const dailyBtcReward = (operation.hashrate / 10) * 0.5;
      
      // Calculate profit
      const dailyRevenue = dailyBtcReward * btcPrice;
      const profit = dailyRevenue - dailyPowerCost;
      
      // Calculate carbon footprint
      const carbonFootprint = (operation.energyUsage * source.carbonIntensity * 24) / 1000; // Convert to tons
      
      return {
        ...operation,
        profit,
        carbonFootprint
      };
    });
    
    setMiningOperations(updatedOperations);
    
    // Check if all operations have energy sources assigned
    const allAssigned = updatedOperations.every(op => op.energySource !== null);
    // Check if at least one renewable source is being used
    const usingRenewable = updatedOperations.some(op => {
      const source = energySources.find(s => s.id === op.energySource);
      return source?.renewable === true;
    });
    
    // Complete the challenge if criteria are met
    if (allAssigned && usingRenewable) {
      // Only complete if not already completed
      if (!completed) {
        setCompleted(true);
        setTimeout(onComplete, 2000);
      }
    }
  }, [miningOperations, energySources, btcPrice, completed, onComplete]);
  
  // Assign energy source to operation
  const assignEnergySource = () => {
    if (!selectedOperation || !selectedEnergySource) return;
    
    setMiningOperations(prev => prev.map(operation => 
      operation.id === selectedOperation
        ? { ...operation, energySource: selectedEnergySource }
        : operation
    ));
    
    // Reset selections
    setSelectedOperation(null);
    setSelectedEnergySource(null);
  };
  
  // Handle BTC price change
  const handlePriceChange = (newPrice: number) => {
    setBtcPrice(Math.max(10000, Math.min(100000, newPrice)));
  };
  
  return (
    <div className="bg-black text-gray-100 p-6 rounded-lg border border-orange-900/30">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-orange-500 mb-4">Energy & Bitcoin Mining Simulator</h2>
        <p className="text-gray-300 mb-6">
          Explore how different energy sources impact Bitcoin mining profitability and environmental footprint.
          Assign energy sources to mining operations and observe the results.
        </p>
        
        {/* Economic factors */}
        <div className="bg-gray-900 p-4 rounded-lg mb-6">
          <h3 className="text-orange-400 text-lg font-medium mb-3 flex items-center">
            <BarChart className="h-5 w-5 mr-2" />
            Market Conditions
          </h3>
          
          <div className="flex flex-col sm:flex-row sm:items-center gap-4">
            <div className="flex-grow">
              <label className="block text-sm text-gray-400 mb-1">Bitcoin Price: ${btcPrice.toLocaleString()}</label>
              <input 
                type="range" 
                min="10000" 
                max="100000" 
                step="1000"
                value={btcPrice} 
                onChange={(e) => handlePriceChange(parseInt(e.target.value))} 
                className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer"
              />
            </div>
            
            <div className="text-sm text-gray-300 flex-shrink-0">
              <div className="flex items-center gap-2">
                <Battery className="h-4 w-4 text-green-400" />
                <span>Network Hashrate: 350 EH/s</span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Energy sources */}
        <div className="bg-gray-900 p-4 rounded-lg mb-6">
          <div className="flex justify-between items-center mb-3">
            <h3 className="text-orange-400 text-lg font-medium flex items-center">
              <Zap className="h-5 w-5 mr-2" />
              Available Energy Sources
            </h3>
            
            <button 
              onClick={() => setShowEnergyInfo(!showEnergyInfo)} 
              className="text-xs px-2 py-1 bg-gray-800 rounded-full flex items-center hover:bg-gray-700"
            >
              <Info className="h-3 w-3 mr-1" />
              {showEnergyInfo ? 'Hide Info' : 'Show Info'}
            </button>
          </div>
          
          {showEnergyInfo && (
            <div className="mb-4 bg-black/30 p-3 rounded-lg text-xs text-gray-300">
              <p className="mb-2">
                <span className="text-orange-400 font-medium">Cost</span>: The cost per megawatt-hour (MWh) of electricity.
                Lower cost means higher mining profits.
              </p>
              <p className="mb-2">
                <span className="text-orange-400 font-medium">Carbon Intensity</span>: The amount of CO₂ emitted per MWh.
                Lower values are better for the environment.
              </p>
              <p>
                <span className="text-orange-400 font-medium">Variability</span>: How consistent the energy source is.
                Sources like solar and wind fluctuate with weather conditions, while others provide steady power.
              </p>
            </div>
          )}
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {energySources.map(source => (
              <div
                key={source.id}
                className={`p-3 border rounded-lg cursor-pointer transition-colors ${
                  selectedEnergySource === source.id
                    ? 'bg-orange-900/30 border-orange-500'
                    : source.renewable
                      ? 'bg-green-900/10 border-green-900/30 hover:border-green-500/50'
                      : 'bg-red-900/10 border-red-900/30 hover:border-red-500/50'
                }`}
                onClick={() => setSelectedEnergySource(source.id)}
              >
                <div className="flex justify-between items-start mb-2">
                  <div className="flex items-center">
                    <div className="mr-2">{source.icon}</div>
                    <div>
                      <div className="font-medium text-gray-200">{source.name}</div>
                      <div className="text-xs text-gray-400">
                        {source.renewable ? 'Renewable' : 'Non-renewable'}
                      </div>
                    </div>
                  </div>
                  {selectedEnergySource === source.id && (
                    <div className="bg-orange-500 rounded-full p-1">
                      <Check className="h-3 w-3 text-black" />
                    </div>
                  )}
                </div>
                
                <div className="grid grid-cols-3 gap-2 text-xs">
                  <div>
                    <div className="text-gray-500">Cost</div>
                    <div className="text-gray-300">${source.costPerMWh}/MWh</div>
                  </div>
                  <div>
                    <div className="text-gray-500">Carbon</div>
                    <div className="text-gray-300">{source.carbonIntensity} kg/MWh</div>
                  </div>
                  <div>
                    <div className="text-gray-500">Capacity</div>
                    <div className="text-gray-300">{Math.round(source.capacity)} MW</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Mining operations */}
        <div className="bg-gray-900 p-4 rounded-lg mb-6">
          <div className="flex justify-between items-center mb-3">
            <h3 className="text-orange-400 text-lg font-medium flex items-center">
              <BarChart className="h-5 w-5 mr-2" />
              Mining Operations
            </h3>
            
            <button 
              onClick={() => setShowMiningInfo(!showMiningInfo)} 
              className="text-xs px-2 py-1 bg-gray-800 rounded-full flex items-center hover:bg-gray-700"
            >
              <Info className="h-3 w-3 mr-1" />
              {showMiningInfo ? 'Hide Info' : 'Show Info'}
            </button>
          </div>
          
          {showMiningInfo && (
            <div className="mb-4 bg-black/30 p-3 rounded-lg text-xs text-gray-300">
              <p className="mb-2">
                <span className="text-orange-400 font-medium">Energy Usage</span>: The amount of electricity the operation consumes.
                Higher usage requires more capacity from the energy source.
              </p>
              <p className="mb-2">
                <span className="text-orange-400 font-medium">Hashrate</span>: The computational power of the mining operation.
                Higher hashrate means more Bitcoin rewards.
              </p>
              <p>
                <span className="text-orange-400 font-medium">Profit/Loss</span>: The daily profit after energy costs.
                This depends on both the energy source's cost and the current Bitcoin price.
              </p>
            </div>
          )}
          
          <div className="space-y-4">
            {miningOperations.map(operation => (
              <div
                key={operation.id}
                className={`p-3 border rounded-lg cursor-pointer transition-colors ${
                  selectedOperation === operation.id
                    ? 'bg-orange-900/30 border-orange-500'
                    : operation.energySource
                      ? 'bg-gray-800 border-gray-700'
                      : 'bg-gray-900 border-gray-800 hover:border-gray-700'
                }`}
                onClick={() => setSelectedOperation(operation.id)}
              >
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <div className="font-medium text-gray-200">{operation.name}</div>
                    <div className="text-xs text-gray-400">{operation.location}</div>
                  </div>
                  {selectedOperation === operation.id && (
                    <div className="bg-orange-500 rounded-full p-1">
                      <Check className="h-3 w-3 text-black" />
                    </div>
                  )}
                </div>
                
                <div className="grid grid-cols-2 gap-4 mb-3">
                  <div>
                    <div className="text-xs text-gray-500">Energy Source</div>
                    {operation.energySource ? (
                      <div className="text-sm text-gray-200 flex items-center">
                        {energySources.find(s => s.id === operation.energySource)?.icon}
                        <span className="ml-1">
                          {energySources.find(s => s.id === operation.energySource)?.name}
                        </span>
                      </div>
                    ) : (
                      <div className="text-sm text-orange-400">Not assigned</div>
                    )}
                  </div>
                  
                  <div>
                    <div className="text-xs text-gray-500">Energy Usage</div>
                    <div className="text-sm text-gray-200">{operation.energyUsage} MW</div>
                  </div>
                </div>
                
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <div className="text-xs text-gray-500">Hashrate</div>
                    <div className="text-sm text-gray-200">{operation.hashrate} EH/s</div>
                  </div>
                  
                  <div>
                    <div className="text-xs text-gray-500">Daily Profit/Loss</div>
                    <div className={`text-sm ${
                      operation.profit > 0 
                        ? 'text-green-400' 
                        : operation.profit < 0 
                          ? 'text-red-400' 
                          : 'text-gray-500'
                    }`}>
                      {operation.energySource 
                        ? `${operation.profit > 0 ? '+' : ''}$${Math.round(operation.profit).toLocaleString()}`
                        : '--'
                      }
                    </div>
                  </div>
                  
                  <div>
                    <div className="text-xs text-gray-500">Carbon Footprint</div>
                    <div className="text-sm text-gray-200">
                      {operation.energySource 
                        ? `${Math.round(operation.carbonFootprint).toLocaleString()} tons CO₂/day`
                        : '--'
                      }
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-6 flex justify-center">
            <button
              onClick={assignEnergySource}
              disabled={!selectedOperation || !selectedEnergySource}
              className={`px-6 py-2 rounded-md font-medium flex items-center ${
                !selectedOperation || !selectedEnergySource
                  ? 'bg-gray-700 text-gray-400 cursor-not-allowed'
                  : 'bg-orange-600 text-white hover:bg-orange-700'
              }`}
            >
              Assign Energy Source
            </button>
          </div>
        </div>
      </div>
      
      {/* Results */}
      {miningOperations.every(op => op.energySource) && (
        <div className="bg-gray-900 p-4 rounded-lg mb-6">
          <h3 className="text-orange-400 text-lg font-medium mb-3">Mining Network Analysis</h3>
          
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
            <div className="bg-gray-800 p-3 rounded-lg">
              <div className="text-sm text-gray-400 mb-1">Total Hashrate</div>
              <div className="text-xl font-medium text-gray-200">
                {miningOperations.reduce((total, op) => total + op.hashrate, 0)} EH/s
              </div>
            </div>
            
            <div className="bg-gray-800 p-3 rounded-lg">
              <div className="text-sm text-gray-400 mb-1">Total Profit/Loss</div>
              <div className={`text-xl font-medium ${
                miningOperations.reduce((total, op) => total + op.profit, 0) > 0
                  ? 'text-green-400'
                  : 'text-red-400'
              }`}>
                ${Math.round(miningOperations.reduce((total, op) => total + op.profit, 0)).toLocaleString()}/day
              </div>
            </div>
            
            <div className="bg-gray-800 p-3 rounded-lg">
              <div className="text-sm text-gray-400 mb-1">Renewable Energy</div>
              <div className="text-xl font-medium text-gray-200">
                {Math.round(miningOperations.reduce((total, op) => {
                  const source = energySources.find(s => s.id === op.energySource);
                  return total + (source?.renewable ? 1 : 0);
                }, 0) / miningOperations.length * 100)}%
              </div>
            </div>
          </div>
          
          <div className="bg-black/30 p-3 rounded-lg">
            <h4 className="text-sm font-medium text-orange-400 mb-2">Energy Insights</h4>
            <p className="text-sm text-gray-300">
              Bitcoin mining can be both profitable and environmentally responsible when using renewable energy sources.
              Your mining network is {miningOperations.some(op => {
                const source = energySources.find(s => s.id === op.energySource);
                return source?.renewable === true;
              }) ? 'utilizing renewable energy, which reduces its environmental impact' : 'entirely dependent on non-renewable energy, which has a higher environmental impact'}.
            </p>
            <p className="text-sm text-gray-300 mt-2">
              In the real world, many miners are actively transitioning to renewable energy sources due to both
              environmental concerns and economic incentives, as renewable energy is often cheaper in the long run.
            </p>
          </div>
        </div>
      )}
      
      {completed && (
        <div className="bg-green-900/20 border border-green-700 rounded-lg p-4 text-center">
          <h3 className="text-green-400 text-lg font-medium mb-2">Challenge Complete!</h3>
          <p className="text-gray-300">
            Congratulations! You've successfully set up a diversified mining operation that utilizes renewable energy.
            You've experienced how Bitcoin mining can be both profitable and environmentally responsible.
          </p>
        </div>
      )}
    </div>
  );
}