import { useState, useEffect, useRef } from 'react';
import { BasicItem, Event } from '@/lib/realm1-missions';

interface InflationSimulatorProps {
  basicItems: BasicItem[];
  events: Event[];
  onComplete?: () => void;
}

export function InflationSimulator({ 
  basicItems = [], 
  events = [], 
  onComplete 
}: InflationSimulatorProps) {
  const [year, setYear] = useState(1900);
  const [currentEventIndex, setCurrentEventIndex] = useState(0);
  const [prices, setPrices] = useState<Record<string, number>>({});
  const [simulation, setSimulation] = useState({
    isRunning: false,
    isComplete: false,
    speed: 1, // years per second
  });
  const [currentEvent, setCurrentEvent] = useState<Event | null>(null);
  const [inflation, setInflation] = useState<number[]>([0]);
  
  // Reference to track animation frame
  const animationRef = useRef<number | null>(null);
  const lastTimeRef = useRef<number>(0);
  
  // Initialize prices for each item
  useEffect(() => {
    const initialPrices: Record<string, number> = {};
    basicItems.forEach(item => {
      initialPrices[item.id] = item.initialPrice;
    });
    setPrices(initialPrices);
  }, [basicItems]);
  
  // Sort events by year
  const sortedEvents = [...events].sort((a, b) => a.year - b.year);
  
  // Animation loop for the simulation
  useEffect(() => {
    if (!simulation.isRunning) {
      if (animationRef.current !== null) {
        cancelAnimationFrame(animationRef.current);
      }
      return;
    }
    
    const animate = (time: number) => {
      if (lastTimeRef.current === 0) {
        lastTimeRef.current = time;
      }
      
      const deltaTime = time - lastTimeRef.current;
      
      // Update 1 year per (1000 / speed) milliseconds
      if (deltaTime > 1000 / simulation.speed) {
        lastTimeRef.current = time;
        
        // Update year
        const newYear = year + 1;
        setYear(newYear);
        
        // Check if there's an event for this year
        const eventIndex = sortedEvents.findIndex(e => e.year === newYear);
        if (eventIndex !== -1) {
          setCurrentEvent(sortedEvents[eventIndex]);
          setCurrentEventIndex(eventIndex);
          
          // Apply price changes from the event
          const event = sortedEvents[eventIndex];
          const newPrices = { ...prices };
          
          // Apply multiplier to all prices
          Object.keys(newPrices).forEach(itemId => {
            newPrices[itemId] *= event.priceMultiplier;
          });
          
          setPrices(newPrices);
          
          // Update inflation data for chart
          const newInflation = [...inflation];
          newInflation.push((event.priceMultiplier - 1) * 100);
          setInflation(newInflation);
        } else {
          // Just add a small amount of inflation (0.5%)
          const newPrices = { ...prices };
          const smallInflation = 1.005; // 0.5% inflation
          
          Object.keys(newPrices).forEach(itemId => {
            newPrices[itemId] *= smallInflation;
          });
          
          setPrices(newPrices);
          
          // Update inflation data for chart
          const newInflation = [...inflation];
          newInflation.push(0.5); // 0.5% inflation
          setInflation(newInflation);
        }
        
        // Check if simulation is complete
        if (newYear >= sortedEvents[sortedEvents.length - 1].year + 5) {
          setSimulation({
            ...simulation,
            isRunning: false,
            isComplete: true,
          });
        }
      }
      
      if (simulation.isRunning) {
        animationRef.current = requestAnimationFrame(animate);
      }
    };
    
    animationRef.current = requestAnimationFrame(animate);
    
    return () => {
      if (animationRef.current !== null) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [simulation.isRunning, simulation.speed, year, prices, events, sortedEvents, inflation]);
  
  // Start the simulation
  const startSimulation = () => {
    setSimulation({
      ...simulation,
      isRunning: true,
    });
  };
  
  // Pause the simulation
  const pauseSimulation = () => {
    setSimulation({
      ...simulation,
      isRunning: false,
    });
  };
  
  // Change simulation speed
  const changeSpeed = (newSpeed: number) => {
    setSimulation({
      ...simulation,
      speed: newSpeed,
    });
  };
  
  // Reset the simulation
  const resetSimulation = () => {
    // Reset year, prices, and inflation
    setYear(1900);
    const initialPrices: Record<string, number> = {};
    basicItems.forEach(item => {
      initialPrices[item.id] = item.initialPrice;
    });
    setPrices(initialPrices);
    setCurrentEvent(null);
    setCurrentEventIndex(0);
    setInflation([0]);
    setSimulation({
      ...simulation,
      isRunning: false,
      isComplete: false,
    });
    lastTimeRef.current = 0;
  };
  
  // Continue to next section
  const handleContinue = () => {
    if (onComplete) onComplete();
  };
  
  return (
    <div className="bg-amber-50 bg-opacity-40 rounded-xl p-6">
      <h3 className="text-center text-xl font-semibold text-amber-900 mb-2">
        Inflation Simulator
      </h3>
      <p className="text-center text-amber-800 mb-6">
        Watch how prices change over time due to inflation and historical events.
      </p>
      
      {/* Year and controls */}
      <div className="flex justify-between items-center mb-6 bg-white rounded-lg p-4 shadow">
        <div className="text-2xl font-bold text-amber-900">Year: {year}</div>
        <div className="flex space-x-3">
          <button
            className={`px-4 py-2 rounded-lg ${
              simulation.isRunning
                ? 'bg-amber-200 text-amber-800'
                : 'bg-amber-600 text-white'
            }`}
            onClick={simulation.isRunning ? pauseSimulation : startSimulation}
            disabled={simulation.isComplete}
          >
            {simulation.isRunning ? 'Pause' : 'Start'}
          </button>
          
          <button
            className="px-4 py-2 bg-gray-300 text-gray-800 rounded-lg"
            onClick={resetSimulation}
            disabled={simulation.isRunning}
          >
            Reset
          </button>
          
          <div className="border-l border-gray-300 pl-3 flex items-center space-x-2">
            <span className="text-sm text-gray-600">Speed:</span>
            <button
              className={`px-2 py-1 rounded ${
                simulation.speed === 1 ? 'bg-amber-600 text-white' : 'bg-gray-200'
              }`}
              onClick={() => changeSpeed(1)}
            >
              1x
            </button>
            <button
              className={`px-2 py-1 rounded ${
                simulation.speed === 3 ? 'bg-amber-600 text-white' : 'bg-gray-200'
              }`}
              onClick={() => changeSpeed(3)}
            >
              3x
            </button>
            <button
              className={`px-2 py-1 rounded ${
                simulation.speed === 5 ? 'bg-amber-600 text-white' : 'bg-gray-200'
              }`}
              onClick={() => changeSpeed(5)}
            >
              5x
            </button>
          </div>
        </div>
      </div>
      
      {/* Current event display */}
      {currentEvent && (
        <div className="mb-6 bg-amber-100 p-4 border-l-4 border-amber-600 rounded-r-lg">
          <h4 className="font-bold text-amber-900">{currentEvent.year}: {currentEvent.title}</h4>
          <p className="text-amber-800 mt-1">{currentEvent.description}</p>
          <div className="mt-2 text-sm text-amber-700">
            Effect: Prices {currentEvent.priceMultiplier > 1 ? 'increased by' : 'decreased by'} 
            {' '}{Math.abs((currentEvent.priceMultiplier - 1) * 100).toFixed(1)}%
          </div>
        </div>
      )}
      
      {/* Price table */}
      <div className="mb-6 bg-white rounded-lg overflow-hidden shadow">
        <table className="w-full">
          <thead className="bg-amber-600 text-white">
            <tr>
              <th className="py-3 px-4 text-left">Item</th>
              <th className="py-3 px-4 text-right">Initial Price (1900)</th>
              <th className="py-3 px-4 text-right">Current Price ({year})</th>
              <th className="py-3 px-4 text-right">% Change</th>
            </tr>
          </thead>
          <tbody>
            {basicItems.map((item) => {
              const initialPrice = item.initialPrice;
              const currentPrice = prices[item.id] || initialPrice;
              const percentChange = ((currentPrice - initialPrice) / initialPrice) * 100;
              
              return (
                <tr key={item.id} className="border-b border-gray-200">
                  <td className="py-3 px-4 font-medium">{item.name}</td>
                  <td className="py-3 px-4 text-right">${initialPrice.toFixed(2)}</td>
                  <td className="py-3 px-4 text-right font-medium">${currentPrice.toFixed(2)}</td>
                  <td className={`py-3 px-4 text-right ${percentChange > 0 ? 'text-red-600' : 'text-green-600'}`}>
                    {percentChange.toFixed(1)}%
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      
      {/* Simple inflation chart (visualization) */}
      <div className="mb-6 bg-white p-4 rounded-lg shadow">
        <h4 className="text-amber-900 font-medium mb-2">Inflation Over Time</h4>
        <div className="h-32 relative w-full">
          {inflation.map((value, index) => {
            // Normalize to height
            const height = Math.min(value * 2, 100);
            const width = 100 / inflation.length;
            
            return (
              <div
                key={index}
                className="absolute bottom-0 inline-block"
                style={{
                  height: `${height}%`,
                  width: `${width}%`,
                  left: `${index * width}%`,
                  backgroundColor: value > 5 ? '#ef4444' : value > 2 ? '#f97316' : '#84cc16',
                  opacity: 0.7,
                }}
              ></div>
            );
          })}
          
          {/* Chart labels */}
          <div className="absolute bottom-0 left-0 w-full border-t border-gray-300"></div>
          <div className="absolute top-0 left-0 h-full border-r border-gray-300"></div>
          <div className="absolute bottom-0 left-0">0%</div>
          <div className="absolute bottom-0 right-0">
            {inflation.length > 0 ? `${year - inflation.length + 1}-${year}` : '1900'}
          </div>
        </div>
      </div>
      
      {/* Complete button */}
      {simulation.isComplete && (
        <div className="text-center">
          <button
            className="px-6 py-3 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition-colors"
            onClick={handleContinue}
          >
            Complete Simulation
          </button>
        </div>
      )}
    </div>
  );
}