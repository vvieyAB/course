import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';

export interface BitcoinPrivacySimulatorProps {
  data?: any;
  onComplete?: () => void;
}

export function BitcoinPrivacySimulator({ 
  data,
  onComplete 
}: BitcoinPrivacySimulatorProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 4;
  
  const handleNextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    } else {
      if (onComplete) {
        onComplete();
      }
    }
  };
  
  const stepProgress = Math.round((currentStep / totalSteps) * 100);
  
  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden">
      <div className="bg-orange-900 p-4 text-white">
        <h3 className="text-xl font-bold">Bitcoin Privacy Features</h3>
        <div className="mt-2">
          <Progress value={stepProgress} className="h-2" />
          <p className="text-xs mt-1 text-orange-200">Step {currentStep} of {totalSteps}</p>
        </div>
      </div>
      
      <div className="p-6">
        {currentStep === 1 && (
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-orange-800">Bitcoin's Privacy Paradox</h4>
            
            <p className="text-gray-700">
              Bitcoin presents an interesting privacy paradox. On one hand, the network is built on 
              pseudonymous addresses rather than identities. On the other hand, all transactions are 
              recorded on a public blockchain that anyone can view.
            </p>
            
            <div className="bg-gradient-to-r from-orange-50 to-amber-50 p-4 rounded-lg">
              <h5 className="font-medium text-orange-800">Key Privacy Concepts</h5>
              <div className="mt-2 space-y-3">
                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <div className="text-orange-800 font-bold">1</div>
                  </div>
                  <div>
                    <p className="font-medium text-orange-800">Pseudonymity vs. Anonymity</p>
                    <p className="text-sm text-gray-600">
                      Bitcoin addresses are pseudonyms, not directly tied to real identities, but not fully anonymous.
                    </p>
                  </div>
                </div>
                
                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <div className="text-orange-800 font-bold">2</div>
                  </div>
                  <div>
                    <p className="font-medium text-orange-800">Transparent Ledger</p>
                    <p className="text-sm text-gray-600">
                      All transactions are publicly visible on the blockchain, creating a permanent record.
                    </p>
                  </div>
                </div>
                
                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <div className="text-orange-800 font-bold">3</div>
                  </div>
                  <div>
                    <p className="font-medium text-orange-800">Chain Analysis</p>
                    <p className="text-sm text-gray-600">
                      Companies and governments can analyze the blockchain to identify patterns and potentially link addresses to identities.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mt-6">
              <Button 
                onClick={handleNextStep}
                className="w-full bg-orange-600 hover:bg-orange-700"
              >
                Explore Privacy Challenges
              </Button>
            </div>
          </div>
        )}
        
        {currentStep === 2 && (
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-orange-800">Privacy Challenges in Bitcoin</h4>
            
            <p className="text-gray-700">
              Even though Bitcoin doesn't require ID verification to create an address, several factors can compromise privacy:
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-red-50 p-4 rounded-lg">
                <h5 className="font-medium text-red-800 mb-2">Address Reuse</h5>
                <p className="text-sm text-gray-600">
                  Using the same Bitcoin address multiple times creates a transaction history that can be analyzed to reveal patterns and connections.
                </p>
                <div className="mt-3 p-2 bg-red-100 rounded text-xs">
                  <strong>Example:</strong> A merchant using a single Bitcoin address for all customers reveals which customers shop there and how much they spend.
                </div>
              </div>
              
              <div className="bg-red-50 p-4 rounded-lg">
                <h5 className="font-medium text-red-800 mb-2">Exchange KYC</h5>
                <p className="text-sm text-gray-600">
                  Most cryptocurrency exchanges require Know Your Customer (KYC) verification, linking your identity to your Bitcoin addresses.
                </p>
                <div className="mt-3 p-2 bg-red-100 rounded text-xs">
                  <strong>Example:</strong> When you withdraw Bitcoin from an exchange to your personal wallet, the exchange knows which address belongs to you.
                </div>
              </div>
              
              <div className="bg-red-50 p-4 rounded-lg">
                <h5 className="font-medium text-red-800 mb-2">Change Outputs</h5>
                <p className="text-sm text-gray-600">
                  Bitcoin transactions often send "change" back to a new address controlled by the sender, linking multiple addresses to the same owner.
                </p>
                <div className="mt-3 p-2 bg-red-100 rounded text-xs">
                  <strong>Example:</strong> If you spend 0.1 BTC from a 1 BTC input, the remaining 0.9 BTC goes to a change address that can be linked to you.
                </div>
              </div>
              
              <div className="bg-red-50 p-4 rounded-lg">
                <h5 className="font-medium text-red-800 mb-2">Metadata Leakage</h5>
                <p className="text-sm text-gray-600">
                  IP addresses can be recorded when broadcasting transactions, potentially revealing your location and identity.
                </p>
                <div className="mt-3 p-2 bg-red-100 rounded text-xs">
                  <strong>Example:</strong> Without using protection like Tor, your IP address can be associated with your Bitcoin transactions.
                </div>
              </div>
            </div>
            
            <div className="mt-6">
              <Button 
                onClick={handleNextStep}
                className="w-full bg-orange-600 hover:bg-orange-700"
              >
                Discover Privacy Solutions
              </Button>
            </div>
          </div>
        )}
        
        {currentStep === 3 && (
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-orange-800">Bitcoin Privacy Enhancements</h4>
            
            <p className="text-gray-700">
              The Bitcoin community has developed techniques and tools to improve privacy:
            </p>
            
            <div className="space-y-4">
              <div className="bg-green-50 p-4 rounded-lg">
                <h5 className="font-medium text-green-800 mb-2">CoinJoin Techniques</h5>
                <p className="text-sm text-gray-600">
                  CoinJoin combines multiple payments from multiple spenders into a single transaction, making it 
                  difficult to determine which input is paying which output.
                </p>
                <div className="mt-3 grid grid-cols-5 gap-2">
                  <div className="col-span-2">
                    <div className="bg-gray-100 p-2 rounded text-center text-xs">
                      <div>Input A</div>
                      <div>0.1 BTC</div>
                    </div>
                  </div>
                  <div className="flex items-center justify-center">
                    <div className="w-6 h-6 bg-green-200 rounded-full flex items-center justify-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-green-800" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
                        <path fillRule="evenodd" d="M10 3a1 1 0 011 1v12a1 1 0 11-2 0V4a1 1 0 011-1z" clipRule="evenodd" />
                      </svg>
                    </div>
                  </div>
                  <div className="col-span-2">
                    <div className="bg-gray-100 p-2 rounded text-center text-xs">
                      <div>Output X</div>
                      <div>0.07 BTC</div>
                    </div>
                  </div>
                  
                  <div className="col-span-2">
                    <div className="bg-gray-100 p-2 rounded text-center text-xs">
                      <div>Input B</div>
                      <div>0.2 BTC</div>
                    </div>
                  </div>
                  <div className="flex items-center justify-center">
                    <div className="w-6 h-6 bg-green-200 rounded-full flex items-center justify-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-green-800" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
                        <path fillRule="evenodd" d="M10 3a1 1 0 011 1v12a1 1 0 11-2 0V4a1 1 0 011-1z" clipRule="evenodd" />
                      </svg>
                    </div>
                  </div>
                  <div className="col-span-2">
                    <div className="bg-gray-100 p-2 rounded text-center text-xs">
                      <div>Output Y</div>
                      <div>0.13 BTC</div>
                    </div>
                  </div>
                  
                  <div className="col-span-2">
                    <div className="bg-gray-100 p-2 rounded text-center text-xs">
                      <div>Input C</div>
                      <div>0.05 BTC</div>
                    </div>
                  </div>
                  <div className="flex items-center justify-center">
                    <div className="w-6 h-6 bg-green-200 rounded-full flex items-center justify-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-green-800" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
                        <path fillRule="evenodd" d="M10 3a1 1 0 011 1v12a1 1 0 11-2 0V4a1 1 0 011-1z" clipRule="evenodd" />
                      </svg>
                    </div>
                  </div>
                  <div className="col-span-2">
                    <div className="bg-gray-100 p-2 rounded text-center text-xs">
                      <div>Output Z</div>
                      <div>0.15 BTC</div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-green-50 p-4 rounded-lg">
                  <h5 className="font-medium text-green-800 mb-2">Single-Use Addresses</h5>
                  <p className="text-sm text-gray-600">
                    Creating a new address for each transaction prevents address reuse and improves privacy.
                  </p>
                </div>
                
                <div className="bg-green-50 p-4 rounded-lg">
                  <h5 className="font-medium text-green-800 mb-2">Network Privacy</h5>
                  <p className="text-sm text-gray-600">
                    Using Tor or VPNs when connecting to the Bitcoin network hides your IP address.
                  </p>
                </div>
                
                <div className="bg-green-50 p-4 rounded-lg">
                  <h5 className="font-medium text-green-800 mb-2">Non-KYC Acquisition</h5>
                  <p className="text-sm text-gray-600">
                    Acquiring Bitcoin through peer-to-peer methods rather than KYC exchanges.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="mt-6">
              <Button 
                onClick={handleNextStep}
                className="w-full bg-orange-600 hover:bg-orange-700"
              >
                Review Privacy Comparison
              </Button>
            </div>
          </div>
        )}
        
        {currentStep === 4 && (
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-orange-800">Bitcoin vs. Other Financial Systems</h4>
            
            <p className="text-gray-700">
              Let's compare the privacy characteristics of Bitcoin with other financial systems:
            </p>
            
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-orange-100">
                    <th className="border border-orange-200 p-2 text-left text-sm">System</th>
                    <th className="border border-orange-200 p-2 text-left text-sm">Identity Requirement</th>
                    <th className="border border-orange-200 p-2 text-left text-sm">Transaction Visibility</th>
                    <th className="border border-orange-200 p-2 text-left text-sm">Privacy Enhancement Options</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-orange-200 p-2 text-sm font-medium">Physical Cash</td>
                    <td className="border border-orange-200 p-2 text-sm">None for usage</td>
                    <td className="border border-orange-200 p-2 text-sm">Visible only to participants</td>
                    <td className="border border-orange-200 p-2 text-sm">Inherently private</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="border border-orange-200 p-2 text-sm font-medium">Traditional Banking</td>
                    <td className="border border-orange-200 p-2 text-sm">Full ID required</td>
                    <td className="border border-orange-200 p-2 text-sm">Visible to banks, governments</td>
                    <td className="border border-orange-200 p-2 text-sm">Very limited</td>
                  </tr>
                  <tr>
                    <td className="border border-orange-200 p-2 text-sm font-medium">Credit Cards</td>
                    <td className="border border-orange-200 p-2 text-sm">Full ID required</td>
                    <td className="border border-orange-200 p-2 text-sm">Visible to payment networks, merchants</td>
                    <td className="border border-orange-200 p-2 text-sm">Virtually none</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="border border-orange-200 p-2 text-sm font-medium">Mobile Money</td>
                    <td className="border border-orange-200 p-2 text-sm">Phone number at minimum</td>
                    <td className="border border-orange-200 p-2 text-sm">Visible to provider</td>
                    <td className="border border-orange-200 p-2 text-sm">Very limited</td>
                  </tr>
                  <tr>
                    <td className="border border-orange-200 p-2 text-sm font-medium">Bitcoin (Basic)</td>
                    <td className="border border-orange-200 p-2 text-sm">Pseudonymous</td>
                    <td className="border border-orange-200 p-2 text-sm">Public on blockchain</td>
                    <td className="border border-orange-200 p-2 text-sm">Limited without techniques</td>
                  </tr>
                  <tr className="bg-gray-50">
                    <td className="border border-orange-200 p-2 text-sm font-medium">Bitcoin (Enhanced)</td>
                    <td className="border border-orange-200 p-2 text-sm">Pseudonymous</td>
                    <td className="border border-orange-200 p-2 text-sm">Public but obfuscated</td>
                    <td className="border border-orange-200 p-2 text-sm">Multiple effective techniques</td>
                  </tr>
                  <tr>
                    <td className="border border-orange-200 p-2 text-sm font-medium">CBDCs</td>
                    <td className="border border-orange-200 p-2 text-sm">Full ID typically required</td>
                    <td className="border border-orange-200 p-2 text-sm">Visible to government</td>
                    <td className="border border-orange-200 p-2 text-sm">Depends on implementation</td>
                  </tr>
                </tbody>
              </table>
            </div>
            
            <div className="bg-amber-50 p-4 rounded-lg mt-4">
              <h5 className="font-medium text-amber-800">Key Takeaways</h5>
              <ul className="mt-2 space-y-1 text-sm">
                <li className="flex items-start">
                  <span className="text-amber-500 mr-2">•</span>
                  <span>Bitcoin offers a degree of privacy through pseudonymity, unlike traditional financial systems that require full identity disclosure.</span>
                </li>
                <li className="flex items-start">
                  <span className="text-amber-500 mr-2">•</span>
                  <span>With proper techniques, Bitcoin privacy can be significantly enhanced, though it requires knowledge and careful usage.</span>
                </li>
                <li className="flex items-start">
                  <span className="text-amber-500 mr-2">•</span>
                  <span>No digital money system currently matches the privacy of physical cash transactions.</span>
                </li>
                <li className="flex items-start">
                  <span className="text-amber-500 mr-2">•</span>
                  <span>Privacy is not just for those with "something to hide" - it's a fundamental aspect of human dignity and freedom.</span>
                </li>
              </ul>
            </div>
            
            <div className="mt-6">
              <Button 
                onClick={handleNextStep}
                className="w-full bg-orange-600 hover:bg-orange-700"
              >
                Complete Module
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}