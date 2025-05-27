import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';

export interface CBDCSimulatorProps {
  data?: any;
  onComplete?: () => void;
}

export function CBDCSimulator({ 
  data,
  onComplete 
}: CBDCSimulatorProps) {
  const [currentStage, setCurrentStage] = useState<'intro' | 'scenario' | 'impacts' | 'conclusion'>('intro');
  const [progress, setProgress] = useState(0);
  const [selectedChoices, setSelectedChoices] = useState<Record<string, boolean>>({});
  
  const handleNextStage = (nextStage: 'intro' | 'scenario' | 'impacts' | 'conclusion') => {
    setCurrentStage(nextStage);
    
    // Update progress based on the stage
    if (nextStage === 'intro') setProgress(0);
    else if (nextStage === 'scenario') setProgress(25);
    else if (nextStage === 'impacts') setProgress(50);
    else if (nextStage === 'conclusion') setProgress(75);
  };
  
  const handleComplete = () => {
    if (onComplete) {
      onComplete();
    }
  };
  
  const toggleChoice = (id: string) => {
    setSelectedChoices({
      ...selectedChoices,
      [id]: !selectedChoices[id]
    });
  };
  
  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden">
      <div className="bg-purple-900 p-4 text-white">
        <h3 className="text-xl font-bold">Central Bank Digital Currency (CBDC) Simulator</h3>
        <div className="mt-2">
          <Progress value={progress} className="h-2" />
          <p className="text-xs mt-1 text-purple-200">Progress: {progress}%</p>
        </div>
      </div>
      
      <div className="p-6">
        {currentStage === 'intro' && (
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-purple-900">Understanding Central Bank Digital Currencies</h4>
            
            <p className="text-gray-700">
              Central Bank Digital Currencies (CBDCs) are digital forms of a country's official currency, issued and regulated
              by the national monetary authority or central bank. Unlike cryptocurrencies like Bitcoin, CBDCs are centralized
              and represent a direct liability of the central bank.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
              <div className="bg-purple-50 p-4 rounded-lg">
                <h5 className="font-medium text-purple-900 mb-2">Key Features of CBDCs</h5>
                <ul className="space-y-1 text-sm text-purple-800">
                  <li>• Digital form of national currency</li>
                  <li>• Issued and regulated by central bank</li>
                  <li>• Centralized control and oversight</li>
                  <li>• Can be programmed with specific rules</li>
                  <li>• May offer greater financial inclusion</li>
                  <li>• Typically offers less privacy than cash</li>
                </ul>
              </div>
              
              <div className="bg-gray-50 p-4 rounded-lg">
                <h5 className="font-medium text-gray-900 mb-2">CBDCs vs. Traditional Money</h5>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-700">Physical Cash:</span>
                    <span className="text-green-600">High privacy, usable offline</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-700">Bank Deposits:</span>
                    <span className="text-yellow-600">Medium privacy, digital transfer</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-700">CBDCs:</span>
                    <span className="text-red-600">Low privacy, programmable features</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-blue-50 p-4 rounded-lg mt-4">
              <h5 className="font-medium text-blue-900">Real-World Examples</h5>
              <p className="text-sm text-blue-800 mt-1">
                Several countries are exploring or implementing CBDCs:
              </p>
              <ul className="mt-2 space-y-1 text-sm text-blue-800">
                <li>• <strong>eNaira (Nigeria)</strong> - Launched October 2021, first in Africa</li>
                <li>• <strong>Digital Yuan (China)</strong> - Advanced trials in multiple cities</li>
                <li>• <strong>Sand Dollar (Bahamas)</strong> - First fully deployed CBDC</li>
                <li>• <strong>DCash (Eastern Caribbean)</strong> - Regional CBDC for multiple island nations</li>
              </ul>
            </div>
            
            <div className="mt-8 flex justify-end">
              <Button 
                onClick={() => handleNextStage('scenario')}
                className="bg-purple-700 hover:bg-purple-600"
              >
                Continue to Scenario
              </Button>
            </div>
          </div>
        )}
        
        {currentStage === 'scenario' && (
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-purple-900">CBDC Scenario: The Digital Cedi</h4>
            
            <div className="bg-purple-50 p-4 rounded-lg">
              <p className="text-purple-900">
                <span className="font-semibold">Scenario:</span> In this simulation, we'll explore the implementation of a 
                fictional "Digital Cedi" CBDC in Ghana, and its implications for citizens, businesses, and the economy.
              </p>
            </div>
            
            <p className="text-gray-700">
              Ghana's central bank has announced the Digital Cedi, a CBDC designed to increase financial inclusion, 
              reduce cash handling costs, and improve monetary policy implementation. As a citizen, you'll experience 
              the transition and its effects on daily life.
            </p>
            
            <div className="border border-gray-200 rounded-lg p-4 mt-6">
              <h5 className="font-medium text-purple-900 mb-3">Key Implementation Details</h5>
              
              <div className="space-y-3">
                <div>
                  <p className="font-medium">Access Options:</p>
                  <div className="ml-4 text-sm text-gray-700">
                    • Mobile app for smartphone users<br />
                    • Smart card solution for those without smartphones<br />
                    • Agent network for rural areas with limited connectivity
                  </div>
                </div>
                
                <div>
                  <p className="font-medium">Privacy Features:</p>
                  <div className="ml-4 text-sm text-gray-700">
                    • Transactions under 100 cedis ($15) are not individually tracked<br />
                    • Larger transactions require identity verification<br />
                    • Government agencies can access transaction history with appropriate authorization
                  </div>
                </div>
                
                <div>
                  <p className="font-medium">Programmable Features:</p>
                  <div className="ml-4 text-sm text-gray-700">
                    • Agricultural subsidies that can only be spent on farming supplies<br />
                    • Emergency relief funds with time-limited spending windows<br />
                    • Interest rates that adjust based on economic conditions
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mt-8 flex justify-end">
              <Button 
                onClick={() => handleNextStage('impacts')}
                className="bg-purple-700 hover:bg-purple-600"
              >
                Explore Impacts
              </Button>
            </div>
          </div>
        )}
        
        {currentStage === 'impacts' && (
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-purple-900">Digital Cedi: Potential Impacts</h4>
            
            <p className="text-gray-700">
              The introduction of a CBDC would have significant effects across society. Select the impacts 
              you think are most likely or concerning:
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              <div 
                className={`p-3 rounded-lg cursor-pointer border ${selectedChoices['impact1'] ? 'bg-green-50 border-green-200' : 'bg-white border-gray-200'}`}
                onClick={() => toggleChoice('impact1')}
              >
                <h5 className="font-medium text-green-800">Financial Inclusion</h5>
                <p className="text-sm text-gray-600 mt-1">
                  The Digital Cedi could bring financial services to the 7 million unbanked Ghanaians, especially in rural areas.
                </p>
              </div>
              
              <div 
                className={`p-3 rounded-lg cursor-pointer border ${selectedChoices['impact2'] ? 'bg-red-50 border-red-200' : 'bg-white border-gray-200'}`}
                onClick={() => toggleChoice('impact2')}
              >
                <h5 className="font-medium text-red-800">Privacy Concerns</h5>
                <p className="text-sm text-gray-600 mt-1">
                  Unlike cash, most CBDC transactions would create digital records that could be monitored or accessed by authorities.
                </p>
              </div>
              
              <div 
                className={`p-3 rounded-lg cursor-pointer border ${selectedChoices['impact3'] ? 'bg-blue-50 border-blue-200' : 'bg-white border-gray-200'}`}
                onClick={() => toggleChoice('impact3')}
              >
                <h5 className="font-medium text-blue-800">Improved Monetary Policy</h5>
                <p className="text-sm text-gray-600 mt-1">
                  The central bank could implement monetary policy more directly and precisely, including negative interest rates if needed.
                </p>
              </div>
              
              <div 
                className={`p-3 rounded-lg cursor-pointer border ${selectedChoices['impact4'] ? 'bg-yellow-50 border-yellow-200' : 'bg-white border-gray-200'}`}
                onClick={() => toggleChoice('impact4')}
              >
                <h5 className="font-medium text-yellow-800">Financial Sovereignty</h5>
                <p className="text-sm text-gray-600 mt-1">
                  Countries without CBDCs may become more dependent on foreign digital currencies or private payment systems.
                </p>
              </div>
              
              <div 
                className={`p-3 rounded-lg cursor-pointer border ${selectedChoices['impact5'] ? 'bg-purple-50 border-purple-200' : 'bg-white border-gray-200'}`}
                onClick={() => toggleChoice('impact5')}
              >
                <h5 className="font-medium text-purple-800">Social Control Potential</h5>
                <p className="text-sm text-gray-600 mt-1">
                  Programmable money could be used to restrict purchasing ability or freeze assets based on behavior or social factors.
                </p>
              </div>
              
              <div 
                className={`p-3 rounded-lg cursor-pointer border ${selectedChoices['impact6'] ? 'bg-indigo-50 border-indigo-200' : 'bg-white border-gray-200'}`}
                onClick={() => toggleChoice('impact6')}
              >
                <h5 className="font-medium text-indigo-800">Efficient Aid Distribution</h5>
                <p className="text-sm text-gray-600 mt-1">
                  Humanitarian aid and government subsidies could be delivered instantly, with less corruption and administrative overhead.
                </p>
              </div>
            </div>
            
            <div className="mt-8 flex justify-end">
              <Button 
                onClick={() => handleNextStage('conclusion')}
                className="bg-purple-700 hover:bg-purple-600"
              >
                Continue to Conclusion
              </Button>
            </div>
          </div>
        )}
        
        {currentStage === 'conclusion' && (
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-purple-900">CBDC Simulation: Key Takeaways</h4>
            
            <p className="text-gray-700">
              Central Bank Digital Currencies represent one of the most significant changes to money in generations. 
              Your exploration of the Digital Cedi scenario highlights the complex balance of benefits and risks they present.
            </p>
            
            <div className="bg-purple-50 p-4 rounded-lg mt-4">
              <h5 className="font-medium text-purple-900 mb-2">Critical Considerations for CBDCs</h5>
              <ul className="space-y-2 text-sm text-gray-700">
                <li>
                  <span className="font-medium">Design Choices Matter:</span> How a CBDC is designed determines its impact on privacy, financial inclusion, and monetary policy.
                </li>
                <li>
                  <span className="font-medium">Tradeoffs Are Inevitable:</span> Greater control and efficiency often come at the cost of privacy and autonomy.
                </li>
                <li>
                  <span className="font-medium">Complementary Systems:</span> The most balanced approach may involve multiple forms of money coexisting - CBDCs, traditional banking, cash, and cryptocurrencies.
                </li>
              </ul>
            </div>
            
            <div className="bg-amber-50 p-4 rounded-lg mt-4">
              <h5 className="font-medium text-amber-800">CBDC vs. Bitcoin: Fundamental Differences</h5>
              <div className="mt-2 space-y-2 text-sm">
                <div className="grid grid-cols-3 gap-2">
                  <div className="font-medium"></div>
                  <div className="font-medium text-purple-800 text-center">CBDCs</div>
                  <div className="font-medium text-amber-800 text-center">Bitcoin</div>
                </div>
                <div className="grid grid-cols-3 gap-2">
                  <div className="font-medium text-gray-700">Control</div>
                  <div className="text-center">Centralized</div>
                  <div className="text-center">Decentralized</div>
                </div>
                <div className="grid grid-cols-3 gap-2">
                  <div className="font-medium text-gray-700">Supply</div>
                  <div className="text-center">Variable</div>
                  <div className="text-center">Fixed at 21M</div>
                </div>
                <div className="grid grid-cols-3 gap-2">
                  <div className="font-medium text-gray-700">Privacy</div>
                  <div className="text-center">Limited</div>
                  <div className="text-center">Pseudonymous</div>
                </div>
                <div className="grid grid-cols-3 gap-2">
                  <div className="font-medium text-gray-700">Censorship</div>
                  <div className="text-center">Possible</div>
                  <div className="text-center">Resistant</div>
                </div>
              </div>
            </div>
            
            <div className="bg-green-50 p-4 rounded-lg mt-4">
              <h5 className="font-medium text-green-800">Reflection Question</h5>
              <p className="text-sm text-green-700 mt-1">
                Given what you've learned about CBDCs, do you think they represent a positive development for citizens in Africa and globally? What privacy safeguards would you want to see implemented in a CBDC system?
              </p>
            </div>
            
            <div className="mt-6 flex justify-end">
              <Button 
                onClick={handleComplete}
                className="bg-purple-700 hover:bg-purple-600"
              >
                Complete Simulation
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}