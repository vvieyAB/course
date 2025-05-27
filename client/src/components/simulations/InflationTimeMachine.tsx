import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface ItemPrice {
  [year: number]: number;
}

interface Item {
  id: number;
  name: string;
  image: string;
  prices: ItemPrice;
}

interface HistoricalContext {
  [year: number]: string;
}

interface InflationTimeMachineProps {
  years: number[];
  items: Item[];
  historicalContext: HistoricalContext;
  onComplete?: () => void;
}

export function InflationTimeMachine({ 
  years, 
  items, 
  historicalContext, 
  onComplete 
}: InflationTimeMachineProps) {
  const [selectedYear, setSelectedYear] = useState(years[0]);
  const [yearIndex, setYearIndex] = useState(0);
  const [dissolveCoins, setDissolveCoins] = useState(false);
  const [viewedYears, setViewedYears] = useState<number[]>([]);
  
  useEffect(() => {
    if (!viewedYears.includes(selectedYear)) {
      setViewedYears([...viewedYears, selectedYear]);
    }
    
    // When enough years have been viewed, allow completion
    if (viewedYears.length > Math.min(4, years.length - 1) && onComplete) {
      const timer = setTimeout(() => {
        setDissolveCoins(true);
      }, 1000);
      
      return () => clearTimeout(timer);
    }
  }, [selectedYear, viewedYears, years.length, onComplete]);
  
  const handleYearChange = (direction: 'prev' | 'next') => {
    if (direction === 'prev' && yearIndex > 0) {
      setYearIndex(yearIndex - 1);
      setSelectedYear(years[yearIndex - 1]);
    } else if (direction === 'next' && yearIndex < years.length - 1) {
      setYearIndex(yearIndex + 1);
      setSelectedYear(years[yearIndex + 1]);
    }
  };
  
  const getInflationPercentage = (item: Item) => {
    const firstYear = years[0];
    const lastYear = years[years.length - 1];
    
    const startPrice = item.prices[firstYear];
    const endPrice = item.prices[lastYear];
    
    const inflationPercentage = ((endPrice - startPrice) / startPrice) * 100;
    return inflationPercentage.toFixed(1);
  };
  
  const handleComplete = () => {
    if (onComplete) {
      onComplete();
    }
  };
  
  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden">
      <div className="p-6 bg-amber-50">
        <h2 className="text-2xl font-bold text-amber-800 mb-2">
          Time Machine: The Silent Tax of Inflation
        </h2>
        <p className="text-amber-700 mb-6">
          Travel through time to see how prices have changed due to inflation.
        </p>
        
        {/* Time selector */}
        <div className="flex items-center justify-center mb-8">
          <button 
            className={`p-2 rounded-full ${yearIndex > 0 ? 'bg-amber-500 text-white' : 'bg-gray-200 text-gray-400 cursor-not-allowed'}`}
            onClick={() => handleYearChange('prev')}
            disabled={yearIndex === 0}
          >
            <ChevronLeft size={24} />
          </button>
          
          <div className="mx-4 text-center">
            <div className="text-3xl font-bold text-amber-600">{selectedYear}</div>
          </div>
          
          <button 
            className={`p-2 rounded-full ${yearIndex < years.length - 1 ? 'bg-amber-500 text-white' : 'bg-gray-200 text-gray-400 cursor-not-allowed'}`}
            onClick={() => handleYearChange('next')}
            disabled={yearIndex === years.length - 1}
          >
            <ChevronRight size={24} />
          </button>
        </div>
        
        {/* Timeline visualization */}
        <div className="relative h-8 mb-10">
          <div className="absolute left-0 right-0 top-1/2 h-1 bg-amber-200 transform -translate-y-1/2"></div>
          
          {years.map((year, idx) => (
            <div 
              key={year} 
              className={`absolute w-4 h-4 rounded-full cursor-pointer transition-all ${
                year === selectedYear ? 'bg-amber-600 w-6 h-6 -mt-1' : 'bg-amber-400'
              }`}
              style={{ left: `${(idx / (years.length - 1)) * 100}%`, top: '50%', transform: 'translate(-50%, -50%)' }}
              onClick={() => {
                setYearIndex(idx);
                setSelectedYear(year);
              }}
            >
              <div className="absolute top-6 left-1/2 transform -translate-x-1/2 whitespace-nowrap text-sm">
                {year}
              </div>
            </div>
          ))}
        </div>
        
        {/* Historical context */}
        <div className="p-4 mb-8 bg-amber-100 rounded-lg border-l-4 border-amber-500">
          <h3 className="font-semibold text-amber-800 mb-2">Historical Context</h3>
          <p className="text-gray-700">{historicalContext[selectedYear]}</p>
        </div>
        
        {/* Items grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {items.map(item => (
            <div key={item.id} className="bg-white p-4 rounded-lg shadow-md transition-all hover:shadow-lg">
              <div className="flex justify-center mb-4">
                {/* This would typically be an actual image, we're using a placeholder div */}
                <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center text-amber-600">
                  {item.name.charAt(0)}
                </div>
              </div>
              <h3 className="text-center font-semibold text-amber-700">{item.name}</h3>
              <p className="text-center text-2xl font-bold text-amber-600 my-2">
                ${item.prices[selectedYear].toFixed(2)}
              </p>
              
              {selectedYear !== years[0] && (
                <p className="text-center text-sm text-gray-500">
                  {item.prices[selectedYear] > item.prices[years[0]] ? (
                    <span>Up {(((item.prices[selectedYear] - item.prices[years[0]]) / item.prices[years[0]]) * 100).toFixed(1)}% since {years[0]}</span>
                  ) : (
                    <span>Down {(((item.prices[years[0]] - item.prices[selectedYear]) / item.prices[years[0]]) * 100).toFixed(1)}% since {years[0]}</span>
                  )}
                </p>
              )}
            </div>
          ))}
        </div>
        
        {/* Visualization of dissolving value */}
        <div className="mb-8">
          <h3 className="text-center font-semibold text-amber-800 mb-4">
            Value of $1 from {years[0]} over time
          </h3>
          <div className="flex justify-center">
            <div className="relative w-full max-w-md h-20">
              {years.map((year, idx) => {
                // Calculate purchasing power compared to first year
                const firstYearItem = items[0];
                const purchaseAmount = firstYearItem.prices[years[0]] / firstYearItem.prices[year];
                const diameter = Math.max(40 * purchaseAmount, 10); // Scale but ensure minimum visibility
                
                return (
                  <div 
                    key={year}
                    className={`absolute rounded-full bg-amber-500 flex items-center justify-center text-white text-xs font-bold ${
                      dissolveCoins && year > years[0] ? 'animate-pulse opacity-70' : ''
                    }`}
                    style={{ 
                      width: `${diameter}px`, 
                      height: `${diameter}px`, 
                      left: `${(idx / (years.length - 1)) * 100}%`, 
                      top: '50%', 
                      transform: 'translate(-50%, -50%)'
                    }}
                  >
                    {purchaseAmount.toFixed(2)}
                  </div>
                );
              })}
            </div>
          </div>
          <p className="text-center text-sm text-gray-500 mt-2">
            Purchasing power of $1 in {years[0]} (based on {items[0].name} prices)
          </p>
        </div>
        
        {/* Inflation summary */}
        <div className="bg-amber-50 p-4 rounded-lg mb-6">
          <h3 className="font-semibold text-amber-800 mb-2">Inflation Summary</h3>
          <ul className="space-y-2">
            {items.map(item => (
              <li key={item.id} className="flex justify-between">
                <span>{item.name}</span>
                <span className="font-semibold text-amber-600">
                  {getInflationPercentage(item)}% increase
                </span>
              </li>
            ))}
          </ul>
        </div>
        
        {/* Complete button (shows when enough years viewed) */}
        {viewedYears.length > Math.min(4, years.length - 1) && (
          <div className="flex justify-center">
            <button
              className="py-3 px-6 bg-amber-600 text-white rounded-lg font-semibold hover:bg-amber-700 transition-colors"
              onClick={handleComplete}
            >
              Complete Simulation
            </button>
          </div>
        )}
      </div>
    </div>
  );
}