import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface PrivacyBalanceSimulatorProps {
  onComplete: () => void;
}

export default function PrivacyBalanceSimulator({ onComplete }: PrivacyBalanceSimulatorProps) {
  const [privacyLevel, setPrivacyLevel] = useState(50);
  const [crime, setCrime] = useState(50);
  const [freedom, setFreedom] = useState(50);
  const [efficiency, setEfficiency] = useState(50);
  const [stage, setStage] = useState(1);
  const [completed, setCompleted] = useState(false);
  
  // Update metrics based on privacy level
  useEffect(() => {
    // Crime is lower with less privacy, but not linearly
    setCrime(Math.max(20, 100 - privacyLevel * 0.8));
    
    // Freedom increases with more privacy
    setFreedom(privacyLevel);
    
    // Efficiency is highest at moderate privacy levels (bell curve)
    const efficiencyScore = 100 - Math.abs(privacyLevel - 50) * 1.2;
    setEfficiency(Math.max(30, efficiencyScore));
  }, [privacyLevel]);
  
  const handlePrivacyChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPrivacyLevel(Number(event.target.value));
  };
  
  const handleNextStage = () => {
    if (stage < 3) {
      setStage(stage + 1);
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
          {stage === 1 ? "Privacy Balance Simulator" : 
           stage === 2 ? "Real-World Privacy Applications" : 
           "System Design Principles"}
        </h3>
        
        {stage === 1 && (
          <>
            <p className="text-gray-300 mb-6">
              Adjust the privacy level slider to see how different privacy settings affect society. 
              In a financial system, finding the right balance is crucial.
            </p>
            
            <div className="mb-8">
              <label className="block text-gray-300 mb-2">Privacy Level: {privacyLevel}%</label>
              <input
                type="range"
                min="0"
                max="100"
                value={privacyLevel}
                onChange={handlePrivacyChange}
                className="w-full h-2 bg-purple-900/50 rounded-lg appearance-none cursor-pointer"
              />
              <div className="flex justify-between text-xs text-gray-400 mt-1">
                <span>Complete Surveillance</span>
                <span>Balanced Privacy</span>
                <span>Total Privacy</span>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div className="bg-black/40 border border-purple-900/50 rounded-lg p-4">
                <h4 className="font-medium text-purple-300 mb-2">Financial Crime</h4>
                <div className="h-4 bg-gray-800 rounded-full overflow-hidden">
                  <motion.div 
                    className={`h-full rounded-full ${crime > 70 ? 'bg-red-500' : crime > 40 ? 'bg-yellow-500' : 'bg-green-500'}`}
                    initial={{ width: '50%' }}
                    animate={{ width: `${crime}%` }}
                    transition={{ duration: 0.5 }}
                  />
                </div>
                <p className="text-sm text-gray-400 mt-2">
                  {crime > 70 ? 'High levels of financial crime and fraud' : 
                   crime > 40 ? 'Moderate financial crime concerns' : 
                   'Low levels of detectable financial crime'}
                </p>
              </div>
              
              <div className="bg-black/40 border border-purple-900/50 rounded-lg p-4">
                <h4 className="font-medium text-purple-300 mb-2">Financial Freedom</h4>
                <div className="h-4 bg-gray-800 rounded-full overflow-hidden">
                  <motion.div 
                    className={`h-full rounded-full ${freedom < 30 ? 'bg-red-500' : freedom < 60 ? 'bg-yellow-500' : 'bg-green-500'}`}
                    initial={{ width: '50%' }}
                    animate={{ width: `${freedom}%` }}
                    transition={{ duration: 0.5 }}
                  />
                </div>
                <p className="text-sm text-gray-400 mt-2">
                  {freedom < 30 ? 'Highly restricted financial autonomy' : 
                   freedom < 60 ? 'Limited financial freedom' : 
                   'High degree of financial sovereignty'}
                </p>
              </div>
              
              <div className="bg-black/40 border border-purple-900/50 rounded-lg p-4">
                <h4 className="font-medium text-purple-300 mb-2">System Efficiency</h4>
                <div className="h-4 bg-gray-800 rounded-full overflow-hidden">
                  <motion.div 
                    className={`h-full rounded-full ${efficiency < 40 ? 'bg-red-500' : efficiency < 70 ? 'bg-yellow-500' : 'bg-green-500'}`}
                    initial={{ width: '50%' }}
                    animate={{ width: `${efficiency}%` }}
                    transition={{ duration: 0.5 }}
                  />
                </div>
                <p className="text-sm text-gray-400 mt-2">
                  {efficiency < 40 ? 'Inefficient payment and settlement systems' : 
                   efficiency < 70 ? 'Moderately efficient financial operations' : 
                   'Highly efficient payment and verification systems'}
                </p>
              </div>
            </div>
            
            <div className="bg-purple-900/20 border border-purple-800/50 rounded-lg p-4 mb-6">
              <h4 className="text-lg font-medium text-purple-300 mb-2">Current System Assessment</h4>
              <p className="text-gray-300">
                {privacyLevel < 20 ? 
                  "This level of surveillance creates a financial police state where citizens have no financial autonomy and all transactions require permission." : 
                 privacyLevel < 40 ? 
                  "This system prioritizes control over freedom, allowing authorities extensive visibility into financial activities with few privacy protections." :
                 privacyLevel < 60 ? 
                  "A balanced approach that allows for crime prevention while maintaining reasonable privacy for everyday transactions." :
                 privacyLevel < 80 ? 
                  "This system prioritizes individual privacy with limited oversight, enabling financial sovereignty but potentially complicating law enforcement." :
                  "Complete financial privacy with minimal regulation, maximizing individual sovereignty but potentially enabling criminal activity."}
              </p>
            </div>
          </>
        )}
        
        {stage === 2 && (
          <>
            <p className="text-gray-300 mb-6">
              Now let's examine real-world applications of different privacy models in financial systems.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div className="bg-black/40 border border-purple-900/50 rounded-lg p-4">
                <h4 className="font-medium text-purple-300 mb-3">Low Privacy Systems</h4>
                <ul className="list-disc pl-5 space-y-2 text-gray-300">
                  <li>Traditional banking systems where all transactions are tracked</li>
                  <li>Proposed Central Bank Digital Currencies with identity requirements</li>
                  <li>Social credit systems tying financial behavior to services access</li>
                  <li>Full KYC/AML for all transactions regardless of size</li>
                </ul>
              </div>
              
              <div className="bg-black/40 border border-purple-900/50 rounded-lg p-4">
                <h4 className="font-medium text-purple-300 mb-3">High Privacy Systems</h4>
                <ul className="list-disc pl-5 space-y-2 text-gray-300">
                  <li>Cash transactions for day-to-day purchases</li>
                  <li>Bitcoin with proper privacy practices (unique addresses, mixing)</li>
                  <li>Privacy-focused cryptocurrencies (Monero, Zcash)</li>
                  <li>Lightning Network payments with encrypted routing</li>
                </ul>
              </div>
            </div>
            
            <div className="bg-purple-900/20 border border-purple-800/50 rounded-lg p-4 mb-6">
              <h4 className="text-lg font-medium text-purple-300 mb-2">Bitcoin's Approach</h4>
              <p className="text-gray-300 mb-3">
                Bitcoin offers a unique privacy model: 
              </p>
              <ul className="list-disc pl-5 space-y-1 text-gray-300">
                <li>Public blockchain with pseudonymous addressing</li>
                <li>No built-in identity requirements</li>
                <li>Transparent verification with personal privacy</li>
                <li>Self-sovereign control over privacy level</li>
              </ul>
            </div>
          </>
        )}
        
        {stage === 3 && (
          <>
            <p className="text-gray-300 mb-6">
              Based on our exploration, let's identify key principles for designing financial systems that respect privacy while enabling necessary oversight.
            </p>
            
            <div className="grid grid-cols-1 gap-4 mb-6">
              <div className="bg-black/40 border border-purple-900/50 rounded-lg p-4">
                <h4 className="font-medium text-purple-300 mb-2">Privacy by Design</h4>
                <p className="text-gray-300">
                  Privacy should be the default setting, with users choosing to reveal information rather than having to opt out of surveillance.
                </p>
              </div>
              
              <div className="bg-black/40 border border-purple-900/50 rounded-lg p-4">
                <h4 className="font-medium text-purple-300 mb-2">Proportional Verification</h4>
                <p className="text-gray-300">
                  The level of identity verification should be proportional to the risk and size of transaction, not universal for all financial activity.
                </p>
              </div>
              
              <div className="bg-black/40 border border-purple-900/50 rounded-lg p-4">
                <h4 className="font-medium text-purple-300 mb-2">User-Controlled Data</h4>
                <p className="text-gray-300">
                  Individuals should control their financial data, choosing when and with whom to share it, rather than corporations or governments deciding.
                </p>
              </div>
              
              <div className="bg-black/40 border border-purple-900/50 rounded-lg p-4">
                <h4 className="font-medium text-purple-300 mb-2">Permissionless Innovation</h4>
                <p className="text-gray-300">
                  Financial systems should allow innovation without requiring approval from central authorities, enabling experimentation and advancement.
                </p>
              </div>
            </div>
            
            <div className="bg-purple-900/20 border border-purple-800/50 rounded-lg p-4 mb-6">
              <h4 className="text-lg font-medium text-purple-300 mb-2">Conclusion</h4>
              <p className="text-gray-300">
                Financial privacy isn't about hiding criminal activity—it's about maintaining the human right to conduct your affairs without constant surveillance. Bitcoin's approach offers a unique balance that puts privacy control in the hands of users while maintaining a transparent and verifiable system.
              </p>
            </div>
          </>
        )}
        
        <div className="flex justify-end">
          <button
            onClick={handleNextStage}
            className="px-5 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors"
          >
            {stage < 3 ? "Continue" : "Complete Challenge"}
          </button>
        </div>
      </div>
    </div>
  );
}