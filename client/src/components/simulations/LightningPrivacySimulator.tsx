import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';

export interface LightningPrivacySimulatorProps {
  data?: any;
  onComplete?: () => void;
}

export function LightningPrivacySimulator({ 
  data,
  onComplete 
}: LightningPrivacySimulatorProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 4;
  const [paymentSent, setPaymentSent] = useState(false);
  
  const handleNextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    } else {
      if (onComplete) {
        onComplete();
      }
    }
  };
  
  const sendPayment = () => {
    setPaymentSent(true);
    // In a real app, this would initiate a Lightning payment
    setTimeout(() => {
      handleNextStep();
    }, 1500);
  };
  
  const progress = Math.round((currentStep / totalSteps) * 100);
  
  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden">
      <div className="bg-yellow-600 p-4 text-white">
        <h3 className="text-xl font-bold">Lightning Network Privacy</h3>
        <div className="mt-2">
          <Progress value={progress} className="h-2" />
          <p className="text-xs mt-1 text-yellow-100">Step {currentStep} of {totalSteps}</p>
        </div>
      </div>
      
      <div className="p-6">
        {currentStep === 1 && (
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-yellow-800">Understanding the Lightning Network</h4>
            
            <p className="text-gray-700">
              The Lightning Network is a "Layer 2" payment protocol built on top of Bitcoin. It enables 
              fast, low-cost transactions with enhanced privacy features compared to on-chain Bitcoin transactions.
            </p>
            
            <div className="bg-gradient-to-r from-yellow-50 to-amber-50 p-4 rounded-lg">
              <h5 className="font-medium text-yellow-800 mb-2">How Lightning Works</h5>
              
              <div className="relative">
                <div className="border-l-2 border-dashed border-yellow-300 absolute h-full left-4 top-0"></div>
                <ul className="space-y-4 relative">
                  <li className="ml-10 relative">
                    <div className="absolute -left-6 w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center">
                      <div className="text-yellow-600 font-bold">1</div>
                    </div>
                    <p className="font-medium text-yellow-800">Payment Channels</p>
                    <p className="text-sm text-gray-600">
                      Two users create a payment channel by locking funds in a multi-signature Bitcoin transaction.
                    </p>
                  </li>
                  
                  <li className="ml-10 relative">
                    <div className="absolute -left-6 w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center">
                      <div className="text-yellow-600 font-bold">2</div>
                    </div>
                    <p className="font-medium text-yellow-800">Off-Chain Transactions</p>
                    <p className="text-sm text-gray-600">
                      Users can then transact instantly by exchanging signed messages, without publishing to the Bitcoin blockchain.
                    </p>
                  </li>
                  
                  <li className="ml-10 relative">
                    <div className="absolute -left-6 w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center">
                      <div className="text-yellow-600 font-bold">3</div>
                    </div>
                    <p className="font-medium text-yellow-800">Channel Network</p>
                    <p className="text-sm text-gray-600">
                      Payments can be routed through multiple channels, allowing users to send money to anyone on the network.
                    </p>
                  </li>
                  
                  <li className="ml-10 relative">
                    <div className="absolute -left-6 w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center">
                      <div className="text-yellow-600 font-bold">4</div>
                    </div>
                    <p className="font-medium text-yellow-800">Settlement</p>
                    <p className="text-sm text-gray-600">
                      When finished, users can close the channel, publishing a final settlement transaction to the blockchain.
                    </p>
                  </li>
                </ul>
              </div>
            </div>
            
            <div className="mt-6">
              <Button 
                onClick={handleNextStep}
                className="w-full bg-yellow-600 hover:bg-yellow-700"
              >
                Learn About Lightning Privacy
              </Button>
            </div>
          </div>
        )}
        
        {currentStep === 2 && (
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-yellow-800">Lightning Network Privacy Benefits</h4>
            
            <p className="text-gray-700">
              While Bitcoin transactions are recorded on a public blockchain, Lightning Network offers several privacy advantages:
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              <div className="bg-green-50 border border-green-100 p-4 rounded-lg">
                <h5 className="font-medium text-green-800 mb-2">Off-Chain Transactions</h5>
                <p className="text-sm text-gray-600">
                  Most Lightning transactions never appear on the Bitcoin blockchain, leaving no public record of individual payments.
                </p>
              </div>
              
              <div className="bg-green-50 border border-green-100 p-4 rounded-lg">
                <h5 className="font-medium text-green-800 mb-2">Onion Routing</h5>
                <p className="text-sm text-gray-600">
                  Lightning uses onion routing (similar to Tor), where each node only knows its predecessor and successor, not the entire path.
                </p>
              </div>
              
              <div className="bg-green-50 border border-green-100 p-4 rounded-lg">
                <h5 className="font-medium text-green-800 mb-2">Payment Obfuscation</h5>
                <p className="text-sm text-gray-600">
                  Lightning's multi-hop payments make it difficult to determine who the original sender and final receiver are.
                </p>
              </div>
              
              <div className="bg-green-50 border border-green-100 p-4 rounded-lg">
                <h5 className="font-medium text-green-800 mb-2">Minimal Footprint</h5>
                <p className="text-sm text-gray-600">
                  Only two blockchain transactions (open & close) are needed for thousands of Lightning payments, reducing on-chain exposure.
                </p>
              </div>
            </div>
            
            <div className="bg-yellow-50 p-4 rounded-lg mt-4">
              <h5 className="font-medium text-yellow-800 mb-2">Comparison to On-Chain Bitcoin</h5>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse text-sm">
                  <thead>
                    <tr className="bg-yellow-100">
                      <th className="border border-yellow-200 p-2 text-left">Feature</th>
                      <th className="border border-yellow-200 p-2 text-left">On-Chain Bitcoin</th>
                      <th className="border border-yellow-200 p-2 text-left">Lightning Network</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-yellow-200 p-2 font-medium">Transaction Visibility</td>
                      <td className="border border-yellow-200 p-2">Publicly visible to all</td>
                      <td className="border border-yellow-200 p-2">Known only to participants in the route</td>
                    </tr>
                    <tr className="bg-gray-50">
                      <td className="border border-yellow-200 p-2 font-medium">Amount Visibility</td>
                      <td className="border border-yellow-200 p-2">Amounts publicly visible</td>
                      <td className="border border-yellow-200 p-2">Only visible to direct channel partners</td>
                    </tr>
                    <tr>
                      <td className="border border-yellow-200 p-2 font-medium">Transaction History</td>
                      <td className="border border-yellow-200 p-2">Permanent public record</td>
                      <td className="border border-yellow-200 p-2">No permanent public record</td>
                    </tr>
                    <tr className="bg-gray-50">
                      <td className="border border-yellow-200 p-2 font-medium">Chain Analysis</td>
                      <td className="border border-yellow-200 p-2">Susceptible to chain analysis</td>
                      <td className="border border-yellow-200 p-2">Highly resistant to chain analysis</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            
            <div className="mt-6">
              <Button 
                onClick={handleNextStep}
                className="w-full bg-yellow-600 hover:bg-yellow-700"
              >
                Try Lightning Payment
              </Button>
            </div>
          </div>
        )}
        
        {currentStep === 3 && (
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-yellow-800">Lightning Payment Simulation</h4>
            
            <p className="text-gray-700">
              Experience how a Lightning payment works through a multi-hop route, preserving privacy for both sender and receiver.
            </p>
            
            <div className="bg-blue-50 p-4 rounded-lg">
              <h5 className="font-medium text-blue-800 mb-2">Payment Scenario</h5>
              <p className="text-sm text-gray-600">
                You want to make a private payment to a merchant. Your payment will route through three Lightning nodes, 
                using onion encryption so that no single node knows both the sender and receiver.
              </p>
            </div>
            
            <div className="border border-gray-200 rounded-lg p-4 mt-6">
              <div className="flex items-center justify-between mb-4">
                <div className="text-center">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                  <p className="text-xs mt-1 font-medium">You</p>
                  <p className="text-xs text-gray-500">Sender</p>
                </div>
                
                {/* Route Visualization */}
                <div className="flex-1 px-2 flex items-center">
                  <div className="h-0.5 bg-gray-300 w-full relative">
                    {paymentSent && (
                      <div className="absolute top-0 left-0 h-full bg-yellow-500 transition-all duration-1000" style={{width: '100%'}}></div>
                    )}
                  </div>
                </div>
                
                <div className="text-center">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                    </svg>
                  </div>
                  <p className="text-xs mt-1 font-medium">Merchant</p>
                  <p className="text-xs text-gray-500">Receiver</p>
                </div>
              </div>
              
              <div className="bg-gray-50 p-3 rounded text-sm">
                <h6 className="font-medium text-gray-700 mb-1">Transaction Details:</h6>
                <div className="grid grid-cols-2 gap-x-4 gap-y-1">
                  <div className="text-gray-500">Amount:</div>
                  <div className="font-medium">10,000 sats (~$5)</div>
                  <div className="text-gray-500">Fee:</div>
                  <div className="font-medium">1 sat (0.01%)</div>
                  <div className="text-gray-500">Intermediate nodes:</div>
                  <div className="font-medium">3 nodes</div>
                  <div className="text-gray-500">Privacy level:</div>
                  <div className="font-medium">High (onion-routed)</div>
                </div>
              </div>
              
              <div className="mt-6">
                <Button 
                  onClick={sendPayment}
                  className="w-full bg-yellow-600 hover:bg-yellow-700"
                  disabled={paymentSent}
                >
                  {paymentSent ? 'Payment in Progress...' : 'Send Lightning Payment'}
                </Button>
              </div>
            </div>
          </div>
        )}
        
        {currentStep === 4 && (
          <div className="space-y-4">
            <div className="border border-green-300 bg-green-50 p-4 rounded-lg">
              <div className="flex items-center">
                <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div className="ml-3">
                  <h5 className="font-semibold text-green-800">Payment Complete!</h5>
                  <p className="text-sm text-green-700">Your Lightning payment was successfully delivered.</p>
                </div>
              </div>
            </div>
            
            <div className="bg-yellow-50 p-4 rounded-lg">
              <h4 className="text-lg font-semibold text-yellow-800 mb-3">Privacy Analysis</h4>
              
              <div className="space-y-3">
                <div>
                  <h5 className="font-medium text-yellow-800">What Each Party Knows:</h5>
                  <ul className="mt-1 space-y-1 pl-5 list-disc text-sm text-gray-700">
                    <li><strong>You (sender):</strong> Know you sent 10,000 sats to the merchant and the identity of the first routing node.</li>
                    <li><strong>First routing node:</strong> Knows your identity, but not the final destination. Just the next node in the path.</li>
                    <li><strong>Middle nodes:</strong> Know only the previous and next node in the route, not the sender or receiver.</li>
                    <li><strong>Last routing node:</strong> Knows the merchant's identity but not yours.</li>
                    <li><strong>Merchant (receiver):</strong> Knows they received 10,000 sats but cannot identify you as the sender.</li>
                  </ul>
                </div>
                
                <div>
                  <h5 className="font-medium text-yellow-800">Privacy Benefits Demonstrated:</h5>
                  <ul className="mt-1 space-y-1 pl-5 list-disc text-sm text-gray-700">
                    <li>No public blockchain record of your specific payment</li>
                    <li>Onion routing prevented any node from knowing the full payment path</li>
                    <li>Transaction amount was only visible to direct participants</li>
                    <li>With proper node selection, sender and receiver connection is obscured</li>
                  </ul>
                </div>
                
                <div className="bg-amber-50 p-3 rounded border border-amber-100">
                  <h5 className="font-medium text-amber-800">Important Note:</h5>
                  <p className="text-sm text-amber-700 mt-1">
                    Lightning privacy is still dependent on proper implementation and usage. Some privacy concessions may 
                    be necessary when initially funding channels, and care should be taken when selecting which nodes to connect to.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="bg-blue-50 p-4 rounded-lg">
              <h5 className="font-medium text-blue-800">Reflection Questions</h5>
              <ul className="mt-2 space-y-2 pl-5 list-disc text-sm text-gray-700">
                <li>How does the Lightning Network's privacy compare to traditional banking systems?</li>
                <li>What privacy trade-offs exist between on-chain Bitcoin transactions and Lightning payments?</li>
                <li>How might enhanced payment privacy benefit individuals in countries with authoritarian governments?</li>
              </ul>
            </div>
            
            <div className="mt-6">
              <Button 
                onClick={handleNextStep}
                className="w-full bg-yellow-600 hover:bg-yellow-700"
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