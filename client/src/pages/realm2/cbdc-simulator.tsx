import { useState } from 'react';
import { motion } from 'framer-motion';

interface CBDCSimulatorProps {
  onComplete: () => void;
}

export default function CBDCSimulator({ onComplete }: CBDCSimulatorProps) {
  const [step, setStep] = useState(1);
  const [design, setDesign] = useState<{
    privacy: number;
    programmability: number;
    control: number;
  }>({
    privacy: 50,
    programmability: 50,
    control: 50
  });
  
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>([]);
  const [completed, setCompleted] = useState(false);
  
  const handleDesignChange = (field: keyof typeof design, value: number) => {
    setDesign(prev => ({
      ...prev,
      [field]: value
    }));
  };
  
  const toggleFeature = (feature: string) => {
    setSelectedFeatures(prev => 
      prev.includes(feature) 
        ? prev.filter(f => f !== feature) 
        : [...prev, feature]
    );
  };
  
  const handleNextStep = () => {
    if (step < 3) {
      setStep(step + 1);
    } else if (!completed) {
      setCompleted(true);
      setTimeout(() => {
        onComplete();
      }, 1000);
    }
  };
  
  return (
    <div className="mt-4 mb-8">
      <div className="bg-black/30 border border-purple-900 rounded-lg p-6 mb-6">
        <h3 className="text-xl font-semibold text-purple-400 mb-4">
          Central Bank Digital Currency Designer
        </h3>

        {/* Introduction to CBDCs */}
        <div className="bg-purple-900/20 border border-purple-800/50 rounded-lg p-4 mb-6">
          <h4 className="text-lg font-medium text-purple-300 mb-2">What are CBDCs?</h4>
          <p className="text-gray-300">
            Central Bank Digital Currencies (CBDCs) are digital forms of a country's official currency, issued and regulated by its central bank. Unlike cryptocurrencies like Bitcoin, CBDCs are centralized and typically operate under full government control. They represent a potential evolution of traditional money into the digital age, combining aspects of electronic banking with new technological capabilities for programmable money and enhanced monetary policy tools.
          </p>
        </div>
        
        {/* Step indicator */}
        <div className="flex justify-center mb-6">
          <div className="flex items-center">
            <div className={`h-8 w-8 rounded-full flex items-center justify-center ${step >= 1 ? 'bg-purple-600' : 'bg-gray-700'}`}>
              1
            </div>
            <div className={`h-1 w-12 ${step >= 2 ? 'bg-purple-600' : 'bg-gray-700'}`}></div>
            <div className={`h-8 w-8 rounded-full flex items-center justify-center ${step >= 2 ? 'bg-purple-600' : 'bg-gray-700'}`}>
              2
            </div>
            <div className={`h-1 w-12 ${step >= 3 ? 'bg-purple-600' : 'bg-gray-700'}`}></div>
            <div className={`h-8 w-8 rounded-full flex items-center justify-center ${step >= 3 ? 'bg-purple-600' : 'bg-gray-700'}`}>
              3
            </div>
          </div>
        </div>
        
        {step === 1 && (
          <>
            <p className="text-gray-300 mb-6">
              You're tasked with designing a Central Bank Digital Currency (CBDC) for the Citadel. 
              Set the fundamental parameters for your digital currency system.
            </p>
            
            <div className="space-y-6 mb-8">
              <div>
                <label className="block text-gray-300 mb-2">
                  Privacy Level: {design.privacy}%
                  <span className="text-sm text-gray-400 ml-2">
                    {design.privacy < 30 ? '(Full Surveillance)' : 
                     design.privacy < 70 ? '(Limited Privacy)' : 
                     '(Enhanced Privacy)'}
                  </span>
                </label>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={design.privacy}
                  onChange={(e) => handleDesignChange('privacy', Number(e.target.value))}
                  className="w-full h-2 bg-purple-900/50 rounded-lg appearance-none cursor-pointer"
                />
                <div className="flex justify-between text-xs text-gray-400 mt-1">
                  <span>Fully Tracked</span>
                  <span>Partially Private</span>
                  <span>Maximum Privacy</span>
                </div>
              </div>
              
              <div>
                <label className="block text-gray-300 mb-2">
                  Programmability: {design.programmability}%
                  <span className="text-sm text-gray-400 ml-2">
                    {design.programmability < 30 ? '(Basic Money)' : 
                     design.programmability < 70 ? '(Smart Money)' : 
                     '(Fully Programmable)'}
                  </span>
                </label>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={design.programmability}
                  onChange={(e) => handleDesignChange('programmability', Number(e.target.value))}
                  className="w-full h-2 bg-purple-900/50 rounded-lg appearance-none cursor-pointer"
                />
                <div className="flex justify-between text-xs text-gray-400 mt-1">
                  <span>Simple Transfer</span>
                  <span>Basic Rules</span>
                  <span>Complex Conditions</span>
                </div>
              </div>
              
              <div>
                <label className="block text-gray-300 mb-2">
                  Authority Control: {design.control}%
                  <span className="text-sm text-gray-400 ml-2">
                    {design.control < 30 ? '(User Autonomy)' : 
                     design.control < 70 ? '(Balanced Control)' : 
                     '(Full Authority)'}
                  </span>
                </label>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={design.control}
                  onChange={(e) => handleDesignChange('control', Number(e.target.value))}
                  className="w-full h-2 bg-purple-900/50 rounded-lg appearance-none cursor-pointer"
                />
                <div className="flex justify-between text-xs text-gray-400 mt-1">
                  <span>User-Controlled</span>
                  <span>Shared Authority</span>
                  <span>Full Central Control</span>
                </div>
              </div>
            </div>
            
            <div className="bg-purple-900/20 border border-purple-800/50 rounded-lg p-4 mb-6">
              <h4 className="text-lg font-medium text-purple-300 mb-2">Design Assessment</h4>
              <motion.p 
                key={`${design.privacy}-${design.programmability}-${design.control}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="text-gray-300"
              >
                {design.privacy < 30 && design.control > 70 ? 
                  "Your design creates a high-surveillance financial system where authorities have complete visibility into all transactions and financial behaviors, raising serious privacy concerns." : 
                 design.privacy > 70 && design.control < 30 ? 
                  "Your design prioritizes user privacy and autonomy, limiting central authority tracking and control capabilities. This approaches some cryptocurrency properties but may concern regulators." :
                 design.programmability > 70 && design.control > 70 ? 
                  "Your highly programmable, authority-controlled CBDC enables extensive monetary policy tools, including automatic taxation, spending restrictions, and expiring currency--a powerful tool for centralized control." :
                  "Your CBDC design balances various trade-offs between privacy, programmability, and control. This creates a digital currency that extends central bank capabilities while maintaining some user freedoms."}
              </motion.p>
            </div>
          </>
        )}
        
        {step === 2 && (
          <>
            <p className="text-gray-300 mb-6">
              Select specific features you want to implement in your CBDC. These capabilities will define how the system functions in practice.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div 
                className={`p-4 rounded-lg border cursor-pointer transition-colors ${
                  selectedFeatures.includes('tracking') 
                    ? 'bg-purple-900/40 border-purple-500' 
                    : 'bg-black/40 border-purple-900/50 hover:border-purple-700'
                }`}
                onClick={() => toggleFeature('tracking')}
              >
                <h4 className="font-medium text-purple-300 mb-2 flex items-center">
                  <span className={`inline-block w-5 h-5 mr-2 border rounded-sm ${
                    selectedFeatures.includes('tracking') ? 'bg-purple-600 border-purple-600' : 'border-purple-600'
                  }`}></span>
                  Complete Transaction Tracking
                </h4>
                <p className="text-sm text-gray-400">
                  Full record of all transactions with identity data, location, and purpose of payment.
                </p>
              </div>
              
              <div 
                className={`p-4 rounded-lg border cursor-pointer transition-colors ${
                  selectedFeatures.includes('expiry') 
                    ? 'bg-purple-900/40 border-purple-500' 
                    : 'bg-black/40 border-purple-900/50 hover:border-purple-700'
                }`}
                onClick={() => toggleFeature('expiry')}
              >
                <h4 className="font-medium text-purple-300 mb-2 flex items-center">
                  <span className={`inline-block w-5 h-5 mr-2 border rounded-sm ${
                    selectedFeatures.includes('expiry') ? 'bg-purple-600 border-purple-600' : 'border-purple-600'
                  }`}></span>
                  Expiring Currency
                </h4>
                <p className="text-sm text-gray-400">
                  Money that expires if not spent within a set timeframe to stimulate economic activity.
                </p>
              </div>
              
              <div 
                className={`p-4 rounded-lg border cursor-pointer transition-colors ${
                  selectedFeatures.includes('restrictions') 
                    ? 'bg-purple-900/40 border-purple-500' 
                    : 'bg-black/40 border-purple-900/50 hover:border-purple-700'
                }`}
                onClick={() => toggleFeature('restrictions')}
              >
                <h4 className="font-medium text-purple-300 mb-2 flex items-center">
                  <span className={`inline-block w-5 h-5 mr-2 border rounded-sm ${
                    selectedFeatures.includes('restrictions') ? 'bg-purple-600 border-purple-600' : 'border-purple-600'
                  }`}></span>
                  Spending Restrictions
                </h4>
                <p className="text-sm text-gray-400">
                  Limit what money can be spent on based on citizen status, location, or government priorities.
                </p>
              </div>
              
              <div 
                className={`p-4 rounded-lg border cursor-pointer transition-colors ${
                  selectedFeatures.includes('freezing') 
                    ? 'bg-purple-900/40 border-purple-500' 
                    : 'bg-black/40 border-purple-900/50 hover:border-purple-700'
                }`}
                onClick={() => toggleFeature('freezing')}
              >
                <h4 className="font-medium text-purple-300 mb-2 flex items-center">
                  <span className={`inline-block w-5 h-5 mr-2 border rounded-sm ${
                    selectedFeatures.includes('freezing') ? 'bg-purple-600 border-purple-600' : 'border-purple-600'
                  }`}></span>
                  Account Freezing
                </h4>
                <p className="text-sm text-gray-400">
                  Ability for authorities to instantly freeze or seize funds without judicial process.
                </p>
              </div>
              
              <div 
                className={`p-4 rounded-lg border cursor-pointer transition-colors ${
                  selectedFeatures.includes('negative') 
                    ? 'bg-purple-900/40 border-purple-500' 
                    : 'bg-black/40 border-purple-900/50 hover:border-purple-700'
                }`}
                onClick={() => toggleFeature('negative')}
              >
                <h4 className="font-medium text-purple-300 mb-2 flex items-center">
                  <span className={`inline-block w-5 h-5 mr-2 border rounded-sm ${
                    selectedFeatures.includes('negative') ? 'bg-purple-600 border-purple-600' : 'border-purple-600'
                  }`}></span>
                  Negative Interest Rates
                </h4>
                <p className="text-sm text-gray-400">
                  Ability to implement negative interest that automatically reduces balances over time.
                </p>
              </div>
              
              <div 
                className={`p-4 rounded-lg border cursor-pointer transition-colors ${
                  selectedFeatures.includes('scoring') 
                    ? 'bg-purple-900/40 border-purple-500' 
                    : 'bg-black/40 border-purple-900/50 hover:border-purple-700'
                }`}
                onClick={() => toggleFeature('scoring')}
              >
                <h4 className="font-medium text-purple-300 mb-2 flex items-center">
                  <span className={`inline-block w-5 h-5 mr-2 border rounded-sm ${
                    selectedFeatures.includes('scoring') ? 'bg-purple-600 border-purple-600' : 'border-purple-600'
                  }`}></span>
                  Social Credit Integration
                </h4>
                <p className="text-sm text-gray-400">
                  Link financial permissions to social behavior scoring system.
                </p>
              </div>
            </div>
            
            <div className="bg-purple-900/20 border border-purple-800/50 rounded-lg p-4 mb-6">
              <h4 className="text-lg font-medium text-purple-300 mb-2">Feature Analysis</h4>
              <p className="text-gray-300">
                {selectedFeatures.length === 0 ? 
                  "You haven't selected any special features, resulting in a basic digital currency without advanced control mechanisms." :
                 selectedFeatures.length >= 5 ? 
                  "Your CBDC design incorporates extensive control mechanisms that give authorities unprecedented power over citizens' economic lives." :
                 selectedFeatures.includes('scoring') ? 
                  "By integrating social credit with money, your CBDC creates a powerful system for behavioral control beyond just financial transactions." :
                  "Your selected features create a CBDC with significant central authority control over how, when and where money can be used."}
              </p>
            </div>
          </>
        )}
        
        {step === 3 && (
          <>
            <p className="text-gray-300 mb-6">
              Now, compare your CBDC design to Bitcoin to understand the fundamental differences in approach.
            </p>
            
            <div className="overflow-x-auto mb-6">
              <table className="min-w-full bg-black/40 border border-purple-900/50 rounded-lg">
                <thead>
                  <tr className="border-b border-purple-900/50">
                    <th className="py-3 px-4 text-left text-sm font-medium text-purple-300">Feature</th>
                    <th className="py-3 px-4 text-left text-sm font-medium text-purple-300">Your CBDC Design</th>
                    <th className="py-3 px-4 text-left text-sm font-medium text-purple-300">Bitcoin</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-purple-900/30">
                  <tr>
                    <td className="py-3 px-4 text-gray-300">Control Authority</td>
                    <td className="py-3 px-4 text-gray-300">
                      {design.control > 70 ? "Central authorities" : 
                       design.control > 30 ? "Shared control" : "User-centric"}
                    </td>
                    <td className="py-3 px-4 text-gray-300">Decentralized network consensus</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 text-gray-300">Privacy Model</td>
                    <td className="py-3 px-4 text-gray-300">
                      {design.privacy < 30 ? "Full surveillance" : 
                       design.privacy < 70 ? "Partial privacy" : "Enhanced privacy"}
                    </td>
                    <td className="py-3 px-4 text-gray-300">Pseudonymous by default</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 text-gray-300">Supply Control</td>
                    <td className="py-3 px-4 text-gray-300">Managed by central authority</td>
                    <td className="py-3 px-4 text-gray-300">Fixed, predictable, algorithmically controlled</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 text-gray-300">Funds Freezing</td>
                    <td className="py-3 px-4 text-gray-300">
                      {selectedFeatures.includes('freezing') ? "Possible by authorities" : "Limited capability"}
                    </td>
                    <td className="py-3 px-4 text-gray-300">Impossible without private keys</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 text-gray-300">Spending Restrictions</td>
                    <td className="py-3 px-4 text-gray-300">
                      {selectedFeatures.includes('restrictions') ? "Can be implemented" : "Not included"}
                    </td>
                    <td className="py-3 px-4 text-gray-300">Not possible, user-controlled</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 text-gray-300">Transaction Validation</td>
                    <td className="py-3 px-4 text-gray-300">Centralized authority</td>
                    <td className="py-3 px-4 text-gray-300">Decentralized network consensus</td>
                  </tr>
                </tbody>
              </table>
            </div>
            
            <div className="bg-purple-900/20 border border-purple-800/50 rounded-lg p-4 mb-6">
              <h4 className="text-lg font-medium text-purple-300 mb-2">Conclusion</h4>
              <p className="text-gray-300 mb-3">
                Your CBDC design demonstrates how central authorities can use digital currency technology to implement economic policies and controls. CBDCs are fundamentally different from Bitcoin in several key aspects:
              </p>
              <ul className="list-disc pl-5 space-y-1 text-gray-300">
                <li>Bitcoin was designed specifically to prevent centralized control of money</li>
                <li>Bitcoin's fixed supply cannot be manipulated for monetary policy</li>
                <li>Bitcoin transactions cannot be censored, reversed, or blocked by authorities</li>
                <li>Bitcoin balances cannot be "programmed" to expire or devalue</li>
                <li>Bitcoin ownership is based on key possession, not permissions</li>
              </ul>
              <p className="text-gray-300 mt-3">
                CBDCs offer convenience and government integration, but at the potential cost of financial privacy and autonomy.
              </p>
            </div>
          </>
        )}
        
        <div className="flex justify-end">
          <button
            onClick={handleNextStep}
            className="px-5 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors"
          >
            {step < 3 ? "Continue" : "Complete Challenge"}
          </button>
        </div>
      </div>
    </div>
  );
}