import { useState, useEffect } from 'react';
import { Route, City } from '@/lib/realm1-missions';

interface TradeRouteMapProps {
  routes: Route[];
  cities: City[];
  onComplete?: () => void;
}

export function TradeRouteMap({ 
  routes = [], 
  cities = [], 
  onComplete 
}: TradeRouteMapProps) {
  const [selectedRoutes, setSelectedRoutes] = useState<Route[]>([]);
  const [visitedCities, setVisitedCities] = useState<string[]>([]);
  const [currentCity, setCurrentCity] = useState<string>('');
  const [isComplete, setIsComplete] = useState(false);
  const [totalValue, setTotalValue] = useState(0);
  const [log, setLog] = useState<string[]>([]);
  
  // Initialize starting city (first city alphabetically)
  useEffect(() => {
    if (cities.length > 0 && currentCity === '') {
      const startCity = cities[0].id;
      setCurrentCity(startCity);
      setVisitedCities([startCity]);
      addToLog(`Starting journey in ${cities.find(c => c.id === startCity)?.name}`);
    }
  }, [cities, currentCity]);
  
  // Add a message to the log
  const addToLog = (message: string) => {
    setLog(prev => [...prev, message]);
  };
  
  // Get available routes from current city
  const getAvailableRoutes = () => {
    return routes.filter(route => 
      route.from === currentCity && 
      !selectedRoutes.some(r => r.id === route.id)
    );
  };
  
  // Select a trade route
  const selectRoute = (route: Route) => {
    // Add route to selected routes
    setSelectedRoutes([...selectedRoutes, route]);
    
    // Move to the destination city
    setCurrentCity(route.to);
    
    // If the city hasn't been visited before, add it to visited cities
    if (!visitedCities.includes(route.to)) {
      setVisitedCities([...visitedCities, route.to]);
    }
    
    // Update total value gained from the route
    setTotalValue(totalValue + route.value);
    
    // Add to log
    const fromCity = cities.find(c => c.id === route.from)?.name;
    const toCity = cities.find(c => c.id === route.to)?.name;
    addToLog(`Traveled from ${fromCity} to ${toCity}, trading ${route.goods} for ${route.value} gold`);
    
    // Check if the mission is complete (visited all cities or used all available routes)
    if (visitedCities.length + 1 >= cities.length || selectedRoutes.length + 1 >= routes.length) {
      setIsComplete(true);
      addToLog(`Trade journey complete! Total earnings: ${totalValue + route.value} gold`);
    }
  };
  
  // Get city info by ID
  const getCityById = (id: string) => {
    return cities.find(city => city.id === id);
  };
  
  // Get city name by ID
  const getCityName = (id: string) => {
    return getCityById(id)?.name || 'Unknown';
  };
  
  // Reset the map
  const resetMap = () => {
    const startCity = cities[0].id;
    setCurrentCity(startCity);
    setVisitedCities([startCity]);
    setSelectedRoutes([]);
    setIsComplete(false);
    setTotalValue(0);
    setLog([`Starting journey in ${cities.find(c => c.id === startCity)?.name}`]);
  };
  
  // Complete the challenge
  const completeChallenge = () => {
    if (onComplete) onComplete();
  };
  
  return (
    <div className="bg-amber-50 bg-opacity-40 rounded-xl p-6">
      <h3 className="text-center text-xl font-semibold text-amber-900 mb-2">
        Trade Route Map
      </h3>
      <p className="text-center text-amber-800 mb-6">
        Navigate through trade routes to earn the most gold. Visit all cities to complete the journey.
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        {/* Map and routes */}
        <div className="bg-white rounded-lg p-4">
          <h4 className="font-medium text-amber-900 mb-4">Trade Map</h4>
          
          <div className="relative h-80 border border-amber-200 rounded-lg bg-amber-50 overflow-hidden">
            {/* Render cities */}
            {cities.map((city) => {
              const isVisited = visitedCities.includes(city.id);
              const isCurrent = currentCity === city.id;
              
              return (
                <div 
                  key={city.id}
                  className={`absolute p-2 rounded-full ${
                    isCurrent 
                      ? 'bg-amber-600 text-white' 
                      : isVisited 
                        ? 'bg-amber-300 text-amber-900'
                        : 'bg-gray-300 text-gray-700'
                  }`}
                  style={{ 
                    left: `${city.position.x}%`, 
                    top: `${city.position.y}%`,
                    transform: 'translate(-50%, -50%)'
                  }}
                >
                  <div className="text-xs font-medium whitespace-nowrap">{city.name}</div>
                </div>
              );
            })}
            
            {/* Render routes */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none">
              {routes.map((route) => {
                const fromCity = getCityById(route.from);
                const toCity = getCityById(route.to);
                const isSelected = selectedRoutes.some(r => r.id === route.id);
                
                if (!fromCity || !toCity) return null;
                
                return (
                  <g key={route.id}>
                    <line 
                      x1={`${fromCity.position.x}%`}
                      y1={`${fromCity.position.y}%`}
                      x2={`${toCity.position.x}%`}
                      y2={`${toCity.position.y}%`}
                      stroke={isSelected ? '#d97706' : '#cbd5e1'}
                      strokeWidth={isSelected ? 3 : 2}
                      strokeDasharray={isSelected ? "none" : "5,5"}
                    />
                    
                    {/* Route label */}
                    <text
                      x={`${(fromCity.position.x + toCity.position.x) / 2}%`}
                      y={`${(fromCity.position.y + toCity.position.y) / 2 - 2}%`}
                      fill={isSelected ? '#92400e' : '#475569'}
                      fontSize="10"
                      textAnchor="middle"
                      fontWeight={isSelected ? "bold" : "normal"}
                    >
                      {route.goods}
                    </text>
                  </g>
                );
              })}
            </svg>
          </div>
          
          <div className="mt-4 flex justify-between items-center">
            <div className="text-sm">
              <span className="font-medium">Cities Visited:</span> {visitedCities.length}/{cities.length}
            </div>
            <div className="text-sm">
              <span className="font-medium">Total Gold:</span> {totalValue}
            </div>
          </div>
        </div>
        
        {/* Controls and available routes */}
        <div>
          <div className="bg-white rounded-lg p-4 mb-4">
            <h4 className="font-medium text-amber-900 mb-2">Current Location</h4>
            <div className="p-3 bg-amber-100 rounded-lg">
              <div className="font-bold text-amber-900">{getCityName(currentCity)}</div>
              <div className="text-sm text-amber-700">
                Available Routes: {getAvailableRoutes().length}
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg p-4">
            <h4 className="font-medium text-amber-900 mb-2">Available Routes</h4>
            
            {getAvailableRoutes().length === 0 ? (
              <div className="text-gray-500 italic">
                No available routes from this city. Your journey is complete.
              </div>
            ) : (
              <div className="space-y-2">
                {getAvailableRoutes().map((route) => (
                  <div
                    key={route.id}
                    className="p-3 border border-amber-200 rounded-lg hover:bg-amber-50 cursor-pointer"
                    onClick={() => selectRoute(route)}
                  >
                    <div className="font-medium">To: {getCityName(route.to)}</div>
                    <div className="flex justify-between text-sm">
                      <span>Trading: {route.goods}</span>
                      <span className="text-amber-700">+{route.value} gold</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
      
      {/* Journey log */}
      <div className="bg-white rounded-lg p-4 mb-6">
        <h4 className="font-medium text-amber-900 mb-2">Journey Log</h4>
        <div className="h-40 overflow-y-auto p-2 bg-amber-50 rounded border border-amber-200">
          {log.map((entry, index) => (
            <div key={index} className="mb-1 last:mb-0">
              {entry}
            </div>
          ))}
        </div>
      </div>
      
      {/* Actions */}
      <div className="flex justify-end space-x-4">
        <button
          className="px-4 py-2 bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400 transition-colors"
          onClick={resetMap}
          disabled={isComplete && selectedRoutes.length === 0}
        >
          Reset Journey
        </button>
        
        {isComplete && (
          <button
            className="px-4 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition-colors"
            onClick={completeChallenge}
          >
            Complete Challenge
          </button>
        )}
      </div>
    </div>
  );
}