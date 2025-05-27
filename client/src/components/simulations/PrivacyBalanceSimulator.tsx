import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';

export interface PrivacyBalanceSimulatorProps {
  data?: any;
  onComplete?: () => void;
}

export function PrivacyBalanceSimulator({ 
  data,
  onComplete 
}: PrivacyBalanceSimulatorProps) {
  const [privacyLevel, setPrivacyLevel] = useState(50);
  const [currentView, setCurrentView] = useState<'intro' | 'simulator' | 'results'>('intro');
  const [selectedBenefits, setSelectedBenefits] = useState<string[]>([]);
  const [selectedRisks, setSelectedRisks] = useState<string[]>([]);
  
  const availableBenefits = [
    "Financial inclusion for the unbanked",
    "Reduced cash crime and theft",
    "Easier cross-border payments",
    "Streamlined government services",
    "More personalized financial services",
    "Better fraud detection"
  ];
  
  const availableRisks = [
    "Government surveillance",
    "Corporate data mining",
    "Digital financial exclusion",
    "Identity theft vulnerability",
    "Political oppression through financial control",
    "Loss of financial autonomy"
  ];
  
  const handleSelectBenefit = (benefit: string) => {
    if (selectedBenefits.includes(benefit)) {
      setSelectedBenefits(selectedBenefits.filter(b => b !== benefit));
    } else {
      setSelectedBenefits([...selectedBenefits, benefit]);
    }
  };
  
  const handleSelectRisk = (risk: string) => {
    if (selectedRisks.includes(risk)) {
      setSelectedRisks(selectedRisks.filter(r => r !== risk));
    } else {
      setSelectedRisks([...selectedRisks, risk]);
    }
  };
  
  const startSimulation = () => {
    setCurrentView('simulator');
  };
  
  const completeSimulation = () => {
    setCurrentView('results');
  };
  
  const finishExercise = () => {
    if (onComplete) {
      onComplete();
    }
  };
  
  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden">
      <div className="bg-indigo-800 p-4 text-white">
        <h3 className="text-xl font-bold">Privacy Balance Simulator</h3>
        <p className="text-sm opacity-80">
          {currentView === 'intro' ? 'Introduction' : 
           currentView === 'simulator' ? 'Balancing Exercise' : 'Results'}
        </p>
      </div>
      
      <div className="p-6">
        {currentView === 'intro' && (
          <div className="space-y-6">
            <h4 className="text-lg font-semibold text-indigo-900">The Privacy Balancing Act</h4>
            <p className="text-slate-600">
              In this simulation, you'll explore the tradeoffs between financial privacy and other benefits 
              of modern financial systems. There's no "right answer" - different contexts call for different 
              privacy balances.
            </p>
            
            <div className="bg-indigo-50 p-4 rounded-lg">
              <h5 className="font-medium text-indigo-800">Your Mission</h5>
              <ol className="mt-2 space-y-2 list-decimal pl-5">
                <li>Consider both the benefits and risks of different privacy levels</li>
                <li>Adjust the privacy slider based on your values and priorities</li>
                <li>Select specific benefits you want to preserve</li>
                <li>Identify specific risks you want to avoid</li>
              </ol>
            </div>
            
            <div className="mt-6 flex justify-end">
              <Button 
                onClick={startSimulation}
                className="bg-indigo-700 hover:bg-indigo-600 text-white"
              >
                Begin Simulation
              </Button>
            </div>
          </div>
        )}
        
        {currentView === 'simulator' && (
          <div className="space-y-6">
            <div>
              <h4 className="text-lg font-semibold text-indigo-900 mb-4">Set Your Ideal Privacy Level</h4>
              <div className="flex items-center space-x-4">
                <div className="text-sm text-indigo-900 font-medium w-20">Full Transparency</div>
                <div className="flex-1">
                  <Slider 
                    value={[privacyLevel]} 
                    onValueChange={(values) => setPrivacyLevel(values[0])}
                    min={0}
                    max={100}
                    step={1}
                    className="flex-1"
                  />
                </div>
                <div className="text-sm text-indigo-900 font-medium w-20 text-right">Complete Privacy</div>
              </div>
              <div className="text-center mt-2 text-sm text-indigo-700">
                Current Setting: {privacyLevel}% Privacy
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
              <div>
                <h4 className="text-md font-semibold text-indigo-900 mb-3">Select Benefits to Preserve</h4>
                <div className="space-y-2">
                  {availableBenefits.map((benefit, index) => (
                    <div 
                      key={index}
                      onClick={() => handleSelectBenefit(benefit)}
                      className={`p-3 rounded-lg cursor-pointer border ${
                        selectedBenefits.includes(benefit) 
                          ? 'bg-indigo-100 border-indigo-300' 
                          : 'bg-white border-gray-200 hover:bg-gray-50'
                      }`}
                    >
                      <div className="flex items-center">
                        <div className={`w-4 h-4 rounded-full mr-2 ${
                          selectedBenefits.includes(benefit) ? 'bg-indigo-600' : 'bg-gray-200'
                        }`}></div>
                        <span className="text-sm">{benefit}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              <div>
                <h4 className="text-md font-semibold text-indigo-900 mb-3">Select Risks to Avoid</h4>
                <div className="space-y-2">
                  {availableRisks.map((risk, index) => (
                    <div 
                      key={index}
                      onClick={() => handleSelectRisk(risk)}
                      className={`p-3 rounded-lg cursor-pointer border ${
                        selectedRisks.includes(risk) 
                          ? 'bg-rose-100 border-rose-300' 
                          : 'bg-white border-gray-200 hover:bg-gray-50'
                      }`}
                    >
                      <div className="flex items-center">
                        <div className={`w-4 h-4 rounded-full mr-2 ${
                          selectedRisks.includes(risk) ? 'bg-rose-600' : 'bg-gray-200'
                        }`}></div>
                        <span className="text-sm">{risk}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="mt-8 flex justify-end">
              <Button 
                onClick={completeSimulation}
                className="bg-indigo-700 hover:bg-indigo-600 text-white"
                disabled={selectedBenefits.length === 0 || selectedRisks.length === 0}
              >
                Submit Preferences
              </Button>
            </div>
          </div>
        )}
        
        {currentView === 'results' && (
          <div className="space-y-6">
            <h4 className="text-lg font-semibold text-indigo-900">Your Privacy Balance Results</h4>
            
            <div className="bg-indigo-50 p-4 rounded-lg">
              <h5 className="font-medium text-indigo-800">Your Privacy Preference</h5>
              <div className="mt-2">
                <div className="w-full bg-gray-200 rounded-full h-4">
                  <div 
                    className="bg-indigo-600 h-4 rounded-full" 
                    style={{ width: `${privacyLevel}%` }}
                  ></div>
                </div>
                <div className="flex justify-between text-xs mt-1">
                  <span>Full Transparency</span>
                  <span>Complete Privacy</span>
                </div>
              </div>
              
              <div className="mt-4">
                <p className="text-sm text-indigo-900">
                  {privacyLevel < 30 ? (
                    "You've prioritized transparency and functionality over privacy. This approach maximizes financial inclusion and efficiency but may expose users to greater surveillance risks."
                  ) : privacyLevel < 70 ? (
                    "You've chosen a balanced approach that attempts to preserve both useful financial functionality and reasonable privacy protections."
                  ) : (
                    "You've prioritized privacy above other considerations. This approach maximizes user control and minimizes surveillance but may sacrifice some convenience and functionality."
                  )}
                </p>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h5 className="font-medium text-indigo-800 mb-2">Benefits You Selected</h5>
                <ul className="space-y-1">
                  {selectedBenefits.map((benefit, index) => (
                    <li key={index} className="text-sm flex items-center">
                      <span className="text-green-500 mr-2">✓</span>
                      {benefit}
                    </li>
                  ))}
                </ul>
                
                {privacyLevel > 80 && selectedBenefits.length > 3 && (
                  <div className="mt-3 p-2 bg-amber-100 rounded text-xs text-amber-800">
                    Note: Some of these benefits may be difficult to achieve with your high privacy setting.
                  </div>
                )}
              </div>
              
              <div>
                <h5 className="font-medium text-indigo-800 mb-2">Risks You Selected</h5>
                <ul className="space-y-1">
                  {selectedRisks.map((risk, index) => (
                    <li key={index} className="text-sm flex items-center">
                      <span className="text-rose-500 mr-2">✗</span>
                      {risk}
                    </li>
                  ))}
                </ul>
                
                {privacyLevel < 30 && selectedRisks.length > 3 && (
                  <div className="mt-3 p-2 bg-amber-100 rounded text-xs text-amber-800">
                    Note: Your low privacy setting may make it difficult to mitigate these risks effectively.
                  </div>
                )}
              </div>
            </div>
            
            <div className="bg-green-50 p-4 rounded-lg mt-4">
              <h5 className="font-medium text-green-800">Reflection</h5>
              <p className="text-sm text-green-700 mt-1">
                Different cultures, contexts, and individuals may reasonably prefer different privacy balances. 
                What works in one context may not be appropriate in another. Various money systems with different 
                privacy properties can coexist to serve different needs.
              </p>
            </div>
            
            <div className="mt-6 flex justify-end">
              <Button 
                onClick={finishExercise}
                className="bg-indigo-700 hover:bg-indigo-600 text-white"
              >
                Complete Exercise
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}