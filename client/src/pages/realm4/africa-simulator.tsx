import { useState, useEffect } from 'react';
import { MapPin, Check, Zap, Globe, Building, BarChart, Users, DollarSign } from 'lucide-react';

interface AfricaSimulatorProps {
  onComplete: () => void;
}

interface Country {
  id: string;
  name: string;
  energyResources: Array<{
    type: string;
    name: string;
    icon: JSX.Element;
    potential: number; // 1-10 scale
    developed: number; // Percentage already developed
  }>;
  infrastructureLevel: number; // 1-10 scale
  laborCost: number; // USD per hour average
  regulatoryFriendliness: number; // 1-10 scale
  internetConnectivity: number; // 1-10 scale
  politicalStability: number; // 1-10 scale
  selected: boolean;
}

interface MiningOperation {
  countryId: string | null;
  energyType: string | null;
  hashrate: number | null;
  jobs: number | null;
  investment: number | null;
  profitability: number | null;
  energyCapacity: number | null;
  score: number;
}

export default function AfricaSimulator({ onComplete }: AfricaSimulatorProps) {
  const [countries, setCountries] = useState<Country[]>([
    {
      id: 'ethiopia',
      name: 'Ethiopia',
      energyResources: [
        { 
          type: 'hydro', 
          name: 'Hydroelectric', 
          icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-blue-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 14a2 2 0 1 1 0-4 2 2 0 0 1 0 4Z"/><path d="M20 4v6"/><path d="M20 14v6"/><path d="M4 4v6"/><path d="M4 14v6"/><path d="M4 10a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2"/></svg>, 
          potential: 9, 
          developed: 15 
        },
        { 
          type: 'solar', 
          name: 'Solar', 
          icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-yellow-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="m17.66 17.66 1.41 1.41"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m6.34 17.66-1.41 1.41"/><path d="m19.07 4.93-1.41 1.41"/></svg>, 
          potential: 8, 
          developed: 5 
        },
        { 
          type: 'geothermal', 
          name: 'Geothermal', 
          icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-red-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 4v16"/><path d="M7 8v12"/><path d="M25 18H3"/><path d="M13 12v8"/><path d="M13 4v4"/><path d="M13 20v-4"/></svg>, 
          potential: 7, 
          developed: 3 
        }
      ],
      infrastructureLevel: 4,
      laborCost: 1.2,
      regulatoryFriendliness: 5,
      internetConnectivity: 4,
      politicalStability: 5,
      selected: false
    },
    {
      id: 'kenya',
      name: 'Kenya',
      energyResources: [
        { 
          type: 'geothermal', 
          name: 'Geothermal', 
          icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-red-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 4v16"/><path d="M7 8v12"/><path d="M25 18H3"/><path d="M13 12v8"/><path d="M13 4v4"/><path d="M13 20v-4"/></svg>, 
          potential: 9, 
          developed: 25 
        },
        { 
          type: 'solar', 
          name: 'Solar', 
          icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-yellow-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="m17.66 17.66 1.41 1.41"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m6.34 17.66-1.41 1.41"/><path d="m19.07 4.93-1.41 1.41"/></svg>, 
          potential: 8, 
          developed: 10 
        },
        { 
          type: 'wind', 
          name: 'Wind', 
          icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-teal-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17.7 7.7a2.5 2.5 0 1 1 1.8 4.3H2"/><path d="M9.6 4.6A2 2 0 1 1 11 8H2"/><path d="M12.6 19.4A2 2 0 1 0 14 16H2"/></svg>, 
          potential: 6, 
          developed: 8 
        }
      ],
      infrastructureLevel: 5,
      laborCost: 1.6,
      regulatoryFriendliness: 7,
      internetConnectivity: 6,
      politicalStability: 6,
      selected: false
    },
    {
      id: 'nigeria',
      name: 'Nigeria',
      energyResources: [
        { 
          type: 'gas', 
          name: 'Natural Gas', 
          icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-blue-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 20V4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v16l-4-2-4 2-4-2-4 2Z"/></svg>, 
          potential: 10, 
          developed: 40 
        },
        { 
          type: 'solar', 
          name: 'Solar', 
          icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-yellow-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="m17.66 17.66 1.41 1.41"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m6.34 17.66-1.41 1.41"/><path d="m19.07 4.93-1.41 1.41"/></svg>, 
          potential: 7, 
          developed: 4 
        },
        { 
          type: 'hydro', 
          name: 'Hydroelectric', 
          icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-blue-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 14a2 2 0 1 1 0-4 2 2 0 0 1 0 4Z"/><path d="M20 4v6"/><path d="M20 14v6"/><path d="M4 4v6"/><path d="M4 14v6"/><path d="M4 10a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2"/></svg>, 
          potential: 5, 
          developed: 20 
        }
      ],
      infrastructureLevel: 5,
      laborCost: 1.4,
      regulatoryFriendliness: 4,
      internetConnectivity: 5,
      politicalStability: 4,
      selected: false
    },
    {
      id: 'drc',
      name: 'DR Congo',
      energyResources: [
        { 
          type: 'hydro', 
          name: 'Hydroelectric', 
          icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-blue-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 14a2 2 0 1 1 0-4 2 2 0 0 1 0 4Z"/><path d="M20 4v6"/><path d="M20 14v6"/><path d="M4 4v6"/><path d="M4 14v6"/><path d="M4 10a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2"/></svg>, 
          potential: 10, 
          developed: 8 
        },
        { 
          type: 'solar', 
          name: 'Solar', 
          icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-yellow-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="m17.66 17.66 1.41 1.41"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m6.34 17.66-1.41 1.41"/><path d="m19.07 4.93-1.41 1.41"/></svg>, 
          potential: 7, 
          developed: 2 
        }
      ],
      infrastructureLevel: 2,
      laborCost: 0.9,
      regulatoryFriendliness: 3,
      internetConnectivity: 3,
      politicalStability: 2,
      selected: false
    },
    {
      id: 'morocco',
      name: 'Morocco',
      energyResources: [
        { 
          type: 'solar', 
          name: 'Solar', 
          icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-yellow-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="m17.66 17.66 1.41 1.41"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m6.34 17.66-1.41 1.41"/><path d="m19.07 4.93-1.41 1.41"/></svg>, 
          potential: 9, 
          developed: 30 
        },
        { 
          type: 'wind', 
          name: 'Wind', 
          icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-teal-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17.7 7.7a2.5 2.5 0 1 1 1.8 4.3H2"/><path d="M9.6 4.6A2 2 0 1 1 11 8H2"/><path d="M12.6 19.4A2 2 0 1 0 14 16H2"/></svg>, 
          potential: 8, 
          developed: 25 
        }
      ],
      infrastructureLevel: 7,
      laborCost: 2.2,
      regulatoryFriendliness: 6,
      internetConnectivity: 7,
      politicalStability: 7,
      selected: false
    }
  ]);
  
  const [miningOperation, setMiningOperation] = useState<MiningOperation>({
    countryId: null,
    energyType: null,
    hashrate: null,
    jobs: null,
    investment: null,
    profitability: null,
    energyCapacity: null,
    score: 0
  });
  
  const [selectedCountry, setSelectedCountry] = useState<Country | null>(null);
  const [selectedEnergyType, setSelectedEnergyType] = useState<string | null>(null);
  const [investmentAmount, setInvestmentAmount] = useState<number>(10); // In millions USD
  const [completed, setCompleted] = useState(false);
  const [showEconomicImpacts, setShowEconomicImpacts] = useState(false);
  
  // Update selected country when it changes in countries state
  useEffect(() => {
    if (selectedCountry) {
      const updatedCountry = countries.find(c => c.id === selectedCountry.id);
      if (updatedCountry) {
        setSelectedCountry(updatedCountry);
      }
    }
  }, [countries, selectedCountry]);
  
  // Handle country selection
  const selectCountry = (countryId: string) => {
    // Deselect all countries
    setCountries(countries.map(country => ({
      ...country,
      selected: country.id === countryId
    })));
    
    // Set selected country
    const country = countries.find(c => c.id === countryId);
    setSelectedCountry(country || null);
    
    // Reset energy type if country changes
    setSelectedEnergyType(null);
    
    // Update mining operation
    setMiningOperation(prev => ({
      ...prev,
      countryId: countryId,
      energyType: null
    }));
  };
  
  // Handle energy type selection
  const selectEnergyType = (type: string) => {
    setSelectedEnergyType(type);
    
    // Update mining operation
    setMiningOperation(prev => ({
      ...prev,
      energyType: type
    }));
  };
  
  // Handle investment amount change
  const changeInvestment = (amount: number) => {
    setInvestmentAmount(amount);
  };
  
  // Start mining operation
  const startMiningOperation = () => {
    if (!selectedCountry || !selectedEnergyType) return;
    
    // Find the selected energy resource
    const energyResource = selectedCountry.energyResources.find(r => r.type === selectedEnergyType);
    if (!energyResource) return;
    
    // Calculate mining operation metrics
    const infrastructureFactor = selectedCountry.infrastructureLevel / 10; // 0.1 to 1
    const regulatoryFactor = selectedCountry.regulatoryFriendliness / 10; // 0.1 to 1
    const stabilityFactor = selectedCountry.politicalStability / 10; // 0.1 to 1
    const internetFactor = selectedCountry.internetConnectivity / 10; // 0.1 to 1
    
    // Calculate energy capacity (MW)
    const energyCapacity = investmentAmount * 5 * infrastructureFactor * (energyResource.potential / 10);
    
    // Calculate hashrate (EH/s)
    const hashrate = energyCapacity * 0.08; // Approximate conversion
    
    // Calculate jobs created
    const jobsFactor = (1.1 - (selectedCountry.laborCost / 3)); // Higher labor cost = fewer jobs
    const jobs = Math.round(investmentAmount * 30 * jobsFactor);
    
    // Calculate profitability (annual ROI %)
    const profitability = (
      10 + // Base ROI
      (energyResource.potential - energyResource.developed/10) * 0.5 + // Energy advantage
      infrastructureFactor * 5 + // Infrastructure bonus
      regulatoryFactor * 5 + // Regulatory bonus
      stabilityFactor * 3 + // Stability bonus
      internetFactor * 2 - // Internet bonus
      (selectedCountry.laborCost * 0.5) // Labor cost impact
    );
    
    // Calculate overall score
    const score = (
      hashrate * 10 + // Weight hashrate highly
      profitability * 2 + // Profitability is important
      (jobs / 100) + // Jobs contribute some value
      (energyResource.potential - energyResource.developed/10) * 5 // Untapped potential is valuable
    );
    
    // Update mining operation
    setMiningOperation({
      countryId: selectedCountry.id,
      energyType: selectedEnergyType,
      hashrate: parseFloat(hashrate.toFixed(2)),
      jobs: jobs,
      investment: investmentAmount,
      profitability: parseFloat(profitability.toFixed(1)),
      energyCapacity: Math.round(energyCapacity),
      score: Math.round(score)
    });
    
    // Mark challenge as complete if score is above threshold
    if (score > 30) {
      setCompleted(true);
      setTimeout(onComplete, 2000);
    }
  };
  
  return (
    <div className="bg-black text-gray-100 p-6 rounded-lg border border-orange-900/30">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-orange-500 mb-4">African Mining Opportunities Simulator</h2>
        <p className="text-gray-300 mb-6">
          Explore the potential for Bitcoin mining across different African countries. Analyze energy resources,
          infrastructure, and economic factors to establish successful mining operations.
        </p>
        
        {/* Country selection */}
        <div className="bg-gray-900 p-4 rounded-lg mb-6">
          <h3 className="text-orange-400 text-lg font-medium mb-3 flex items-center">
            <Globe className="h-5 w-5 mr-2" />
            Select Country
          </h3>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {countries.map(country => (
              <div
                key={country.id}
                className={`p-3 border rounded-lg cursor-pointer transition-colors ${
                  country.selected
                    ? 'bg-orange-900/30 border-orange-500'
                    : 'bg-black/30 border-gray-800 hover:border-orange-800/50'
                }`}
                onClick={() => selectCountry(country.id)}
              >
                <div className="flex justify-between items-start">
                  <div className="flex items-center">
                    <MapPin className="h-5 w-5 mr-2 text-orange-400" />
                    <div className="font-medium text-gray-200">{country.name}</div>
                  </div>
                  {country.selected && (
                    <div className="bg-orange-500 rounded-full p-1">
                      <Check className="h-3 w-3 text-black" />
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Country details */}
        {selectedCountry && (
          <div className="bg-gray-900 p-4 rounded-lg mb-6">
            <h3 className="text-orange-400 text-lg font-medium mb-3 flex items-center">
              <MapPin className="h-5 w-5 mr-2" />
              {selectedCountry.name} Details
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <h4 className="text-gray-300 font-medium mb-2 flex items-center">
                  <Zap className="h-4 w-4 mr-1 text-yellow-400" />
                  Energy Resources
                </h4>
                <div className="grid gap-3">
                  {selectedCountry.energyResources.map(resource => (
                    <div
                      key={resource.type}
                      className={`p-3 border rounded-lg cursor-pointer transition-colors ${
                        selectedEnergyType === resource.type
                          ? 'bg-orange-900/30 border-orange-500'
                          : 'bg-black/20 border-gray-800 hover:border-gray-700'
                      }`}
                      onClick={() => selectEnergyType(resource.type)}
                    >
                      <div className="flex justify-between items-start mb-2">
                        <div className="flex items-center">
                          {resource.icon}
                          <span className="ml-2 text-gray-200">{resource.name}</span>
                        </div>
                        {selectedEnergyType === resource.type && (
                          <div className="bg-orange-500 rounded-full p-1">
                            <Check className="h-3 w-3 text-black" />
                          </div>
                        )}
                      </div>
                      
                      <div className="grid grid-cols-2 gap-2 text-xs">
                        <div>
                          <div className="text-gray-500">Potential</div>
                          <div className="flex items-center text-gray-300">
                            <div className="h-2 rounded-full bg-gray-700 w-20 mr-2">
                              <div 
                                className="h-2 rounded-full bg-green-500" 
                                style={{ width: `${resource.potential * 10}%` }}
                              ></div>
                            </div>
                            <span>{resource.potential}/10</span>
                          </div>
                        </div>
                        <div>
                          <div className="text-gray-500">Developed</div>
                          <div className="flex items-center text-gray-300">
                            <div className="h-2 rounded-full bg-gray-700 w-20 mr-2">
                              <div 
                                className="h-2 rounded-full bg-blue-500" 
                                style={{ width: `${resource.developed}%` }}
                              ></div>
                            </div>
                            <span>{resource.developed}%</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              <div>
                <h4 className="text-gray-300 font-medium mb-2 flex items-center">
                  <Building className="h-4 w-4 mr-1 text-blue-400" />
                  Country Factors
                </h4>
                
                <div className="space-y-3 bg-black/20 p-3 rounded-lg border border-gray-800">
                  <div>
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-gray-500">Infrastructure</span>
                      <span className="text-gray-300">{selectedCountry.infrastructureLevel}/10</span>
                    </div>
                    <div className="h-2 rounded-full bg-gray-700">
                      <div 
                        className="h-2 rounded-full bg-blue-500" 
                        style={{ width: `${selectedCountry.infrastructureLevel * 10}%` }}
                      ></div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-gray-500">Regulatory Friendliness</span>
                      <span className="text-gray-300">{selectedCountry.regulatoryFriendliness}/10</span>
                    </div>
                    <div className="h-2 rounded-full bg-gray-700">
                      <div 
                        className="h-2 rounded-full bg-green-500" 
                        style={{ width: `${selectedCountry.regulatoryFriendliness * 10}%` }}
                      ></div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-gray-500">Internet Connectivity</span>
                      <span className="text-gray-300">{selectedCountry.internetConnectivity}/10</span>
                    </div>
                    <div className="h-2 rounded-full bg-gray-700">
                      <div 
                        className="h-2 rounded-full bg-purple-500" 
                        style={{ width: `${selectedCountry.internetConnectivity * 10}%` }}
                      ></div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-gray-500">Political Stability</span>
                      <span className="text-gray-300">{selectedCountry.politicalStability}/10</span>
                    </div>
                    <div className="h-2 rounded-full bg-gray-700">
                      <div 
                        className="h-2 rounded-full bg-yellow-500" 
                        style={{ width: `${selectedCountry.politicalStability * 10}%` }}
                      ></div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-gray-500">Labor Cost</span>
                      <span className="text-gray-300">${selectedCountry.laborCost.toFixed(2)}/hour (avg)</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Investment controls */}
            <div className="bg-black/20 p-3 rounded-lg border border-gray-800 mb-6">
              <h4 className="text-gray-300 font-medium mb-3 flex items-center">
                <DollarSign className="h-4 w-4 mr-1 text-green-400" />
                Investment Amount
              </h4>
              
              <div className="flex items-center">
                <input 
                  type="range" 
                  min="1" 
                  max="50" 
                  value={investmentAmount} 
                  onChange={(e) => changeInvestment(parseInt(e.target.value))} 
                  className="flex-grow h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer"
                />
                <span className="ml-4 text-lg text-orange-400 font-medium w-20 text-right">
                  ${investmentAmount}M
                </span>
              </div>
            </div>
            
            <div className="flex justify-center">
              <button
                onClick={startMiningOperation}
                disabled={!selectedEnergyType}
                className={`px-6 py-2 rounded-md font-medium flex items-center ${
                  !selectedEnergyType
                    ? 'bg-gray-700 text-gray-400 cursor-not-allowed'
                    : 'bg-orange-600 text-white hover:bg-orange-700'
                }`}
              >
                Analyze Mining Potential
              </button>
            </div>
          </div>
        )}
        
        {/* Mining operation results */}
        {miningOperation.countryId && miningOperation.energyType && miningOperation.hashrate && (
          <div className="bg-gray-900 p-4 rounded-lg mb-6">
            <h3 className="text-orange-400 text-lg font-medium mb-3 flex items-center">
              <BarChart className="h-5 w-5 mr-2" />
              Mining Operation Analysis
            </h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              <div className="bg-black/20 p-3 rounded-lg">
                <div className="text-xs text-gray-500 mb-1">Hashrate</div>
                <div className="text-xl font-medium text-orange-400">{miningOperation.hashrate} EH/s</div>
              </div>
              
              <div className="bg-black/20 p-3 rounded-lg">
                <div className="text-xs text-gray-500 mb-1">Energy Capacity</div>
                <div className="text-xl font-medium text-blue-400">{miningOperation.energyCapacity} MW</div>
              </div>
              
              <div className="bg-black/20 p-3 rounded-lg">
                <div className="text-xs text-gray-500 mb-1">Profitability (ROI)</div>
                <div className="text-xl font-medium text-green-400">{miningOperation.profitability}%</div>
              </div>
              
              <div className="bg-black/20 p-3 rounded-lg">
                <div className="text-xs text-gray-500 mb-1">Overall Score</div>
                <div className="text-xl font-medium text-purple-400">{miningOperation.score}</div>
              </div>
            </div>
            
            <div className="mb-4">
              <button
                onClick={() => setShowEconomicImpacts(!showEconomicImpacts)}
                className="text-orange-400 text-sm underline"
              >
                {showEconomicImpacts ? 'Hide Economic Impacts' : 'Show Economic Impacts'}
              </button>
            </div>
            
            {showEconomicImpacts && (
              <div className="bg-black/20 p-4 rounded-lg border border-gray-800 mb-4">
                <h4 className="text-gray-300 font-medium mb-3 flex items-center">
                  <Users className="h-4 w-4 mr-1 text-blue-400" />
                  Economic Development Impact
                </h4>
                
                <div className="space-y-4">
                  <div className="flex items-center">
                    <div className="w-40 text-sm text-gray-400">Jobs Created:</div>
                    <div className="text-lg text-gray-200">~{miningOperation.jobs}</div>
                  </div>
                  
                  <div className="flex items-center">
                    <div className="w-40 text-sm text-gray-400">Infrastructure Boost:</div>
                    <div className="text-lg text-gray-200">
                      ${(miningOperation.investment ? miningOperation.investment * 0.3 : 0).toFixed(1)}M in supporting infrastructure
                    </div>
                  </div>
                  
                  <div className="flex items-center">
                    <div className="w-40 text-sm text-gray-400">Tax Revenue:</div>
                    <div className="text-lg text-gray-200">
                      ~${((miningOperation.hashrate || 0) * (miningOperation.profitability || 0) * 0.2).toFixed(1)}M annual
                    </div>
                  </div>
                  
                  <div className="flex items-center">
                    <div className="w-40 text-sm text-gray-400">Energy Development:</div>
                    <div className="text-lg text-gray-200">
                      Supports ${((miningOperation.energyCapacity || 0) * 0.5).toFixed(1)}M in energy infrastructure
                    </div>
                  </div>
                  
                  <div className="flex items-center">
                    <div className="w-40 text-sm text-gray-400">Skills Training:</div>
                    <div className="text-lg text-gray-200">
                      Technical training for {Math.round((miningOperation.jobs ?? 0) * 0.7)} workers
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            <div className="bg-black/30 p-4 rounded-lg border border-gray-800">
              <h4 className="text-gray-300 font-medium mb-2">Analysis Summary</h4>
              <p className="text-sm text-gray-400">
                A ${miningOperation.investment ?? 0}M Bitcoin mining operation in {countries.find(c => c.id === miningOperation.countryId)?.name} using {
                  countries.find(c => c.id === miningOperation.countryId)?.energyResources.find(r => r.type === miningOperation.energyType)?.name
                } energy would generate approximately {miningOperation.hashrate ?? 0} EH/s of mining power with an estimated ROI of {miningOperation.profitability ?? 0}%.
              </p>
              <p className="text-sm text-gray-400 mt-2">
                This operation would create around {miningOperation.jobs ?? 0} direct and indirect jobs while supporting local infrastructure development.
                The mining facility would require {miningOperation.energyCapacity ?? 0} MW of power capacity, providing a steady customer for local energy production.
              </p>
              <p className="text-sm text-gray-400 mt-2">
                {miningOperation.score >= 30 
                  ? "This analysis indicates a highly viable mining opportunity with significant economic benefits for the region."
                  : miningOperation.score >= 20
                    ? "This mining opportunity shows promise but faces some challenges. Consider increasing investment or selecting a different energy source."
                    : "This mining opportunity faces significant challenges. Consider a different location or energy source for better results."
                }
              </p>
            </div>
          </div>
        )}
      </div>
      
      {completed && (
        <div className="bg-green-900/20 border border-green-700 rounded-lg p-4 text-center">
          <h3 className="text-green-400 text-lg font-medium mb-2">Challenge Complete!</h3>
          <p className="text-gray-300">
            Congratulations! You've successfully analyzed and developed a viable Bitcoin mining operation in Africa.
            This venture would not only be profitable but would contribute significantly to local economic development
            through job creation, infrastructure investment, and energy development.
          </p>
        </div>
      )}
    </div>
  );
}