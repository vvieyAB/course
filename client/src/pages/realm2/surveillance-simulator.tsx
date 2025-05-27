import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface SurveillanceSimulatorProps {
  onComplete: () => void;
}

export default function SurveillanceSimulator({ onComplete }: SurveillanceSimulatorProps) {
  const [stage, setStage] = useState(1);
  const [userScore, setUserScore] = useState(850);
  const [completed, setCompleted] = useState(false);
  const [transactions, setTransactions] = useState<string[]>([]);
  
  useEffect(() => {
    if (stage >= 4 && !completed) {
      setCompleted(true);
      setTimeout(() => {
        onComplete();
      }, 2000);
    }
  }, [stage, completed, onComplete]);

  const addTransaction = (transaction: string, scoreChange: number) => {
    setTransactions(prev => [transaction, ...prev]);
    setUserScore(score => Math.max(300, Math.min(900, score + scoreChange)));
    setTimeout(() => {
      setStage(s => s + 1);
    }, 1500);
  };

  return (
    <div className="mt-4 mb-8">

      {/* 🔒 Educational Content Section */}
      <div className="bg-black/20 border border-purple-900 rounded-lg p-6 mb-8">
        <h2 className="text-xl font-semibold text-purple-400 mb-4">Understanding Financial Surveillance in The Citadel</h2>

        <p className="text-gray-300 mb-4">
          In surveillance-based financial systems, every transaction is logged, scored, and analyzed. The **Citizen Trust Score** becomes a gatekeeper — determining your access to healthcare, education, travel, and communication.
        </p>

        <p className="text-gray-300 mb-4">
          You live under constant evaluation. Helping a friend, buying unapproved medicine, or even attending a community meeting could lower your score. The system rewards obedience and punishes privacy.
        </p>

        <p className="text-gray-300 mb-4">
          Unlike cash, which once allowed people to act freely, today's systems track everything. Bitcoin, especially when used over privacy-preserving networks like Lightning, offers an alternative. It's not controlled by any government, can't be arbitrarily frozen, and doesn't judge your actions.
        </p>

        <p className="text-gray-300">
          As you enter this simulation, consider: Should all your spending be visible? Should every act of care or curiosity be subject to approval?
        </p>
      </div>

      {/* Simulation UI Begins */}
      <div className="flex flex-col md:flex-row gap-6">
        {/* Left panel: Surveillance Dashboard */}
        <div className="flex-1 bg-black/30 border border-purple-900 rounded-lg p-4">
          <h3 className="text-lg font-semibold text-purple-400 mb-4">Citadel Surveillance Dashboard</h3>
          
          <div className="mb-6">
            <p className="text-sm text-gray-300 mb-2">Citizen Trust Score</p>
            <div className="h-4 bg-gray-800 rounded-full overflow-hidden">
              <motion.div 
                className={`h-full rounded-full ${
                  userScore > 700 ? 'bg-green-500' : 
                  userScore > 500 ? 'bg-yellow-500' : 'bg-red-500'
                }`}
                initial={{ width: '85%' }}
                animate={{ width: `${userScore / 10}%` }}
                transition={{ duration: 0.8 }}
              />
            </div>
            <div className="flex justify-between mt-1">
              <span className="text-xs text-gray-400">Restricted</span>
              <span className="text-xs text-gray-400">Score: {userScore}</span>
              <span className="text-xs text-gray-400">Privileged</span>
            </div>
          </div>
          
          <div>
            <p className="text-sm text-gray-300 mb-2">Recent Activities</p>
            <div className="border border-purple-900/50 rounded bg-black/40 h-64 overflow-y-auto p-2">
              {transactions.length === 0 ? (
                <p className="text-xs text-gray-500 italic">No recent activities to display</p>
              ) : (
                <ul className="space-y-2">
                  {transactions.map((transaction, index) => (
                    <motion.li 
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5 }}
                      className="text-xs text-gray-300 border-b border-purple-900/30 pb-2"
                    >
                      {transaction}
                    </motion.li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>
        
        {/* Right panel: Interaction */}
        <div className="flex-1 bg-black/30 border border-purple-900 rounded-lg p-4">
          <h3 className="text-lg font-semibold text-purple-400 mb-4">Make Decisions</h3>
          
          {stage === 1 && (
            <div>
              <p className="text-gray-300 mb-4">You need to purchase medicine for a relative. Choose your payment method:</p>
              <div className="space-y-3">
                <button 
                  onClick={() => addTransaction("✓ Purchased medicine at City Pharmacy using Central Bank Digital ID", 20)}
                  className="w-full py-2 px-4 bg-purple-900/50 hover:bg-purple-900/70 text-white rounded-md transition-colors text-left"
                >
                  Use official Citadel payment system (Fully tracked)
                </button>
                <button 
                  onClick={() => addTransaction("⚠ Used anonymous payment method at unauthorized vendor", -120)}
                  className="w-full py-2 px-4 bg-purple-900/50 hover:bg-purple-900/70 text-white rounded-md transition-colors text-left"
                >
                  Use alternative payment method (Attempt privacy)
                </button>
              </div>
            </div>
          )}
          
          {stage === 2 && (
            <div>
              <p className="text-gray-300 mb-4">You've been invited to a gathering discussing financial alternatives. Do you:</p>
              <div className="space-y-3">
                <button 
                  onClick={() => addTransaction("⚠ Attended unauthorized financial education meeting", -150)}
                  className="w-full py-2 px-4 bg-purple-900/50 hover:bg-purple-900/70 text-white rounded-md transition-colors text-left"
                >
                  Attend the meeting (High surveillance risk)
                </button>
                <button 
                  onClick={() => addTransaction("✓ Declined invitation to suspicious gathering", 50)}
                  className="w-full py-2 px-4 bg-purple-900/50 hover:bg-purple-900/70 text-white rounded-md transition-colors text-left"
                >
                  Decline and report the invitation (Approved behavior)
                </button>
              </div>
            </div>
          )}
          
          {stage === 3 && (
            <div>
              <p className="text-gray-300 mb-4">A friend requests financial help outside the official system. Do you:</p>
              <div className="space-y-3">
                <button 
                  onClick={() => addTransaction("✓ Filed proper assistance request through Citizen Aid Program", 40)}
                  className="w-full py-2 px-4 bg-purple-900/50 hover:bg-purple-900/70 text-white rounded-md transition-colors text-left"
                >
                  Suggest they apply through official Citadel aid programs
                </button>
                <button 
                  onClick={() => addTransaction("⚠ Conducted unauthorized peer-to-peer value transfer", -100)}
                  className="w-full py-2 px-4 bg-purple-900/50 hover:bg-purple-900/70 text-white rounded-md transition-colors text-left"
                >
                  Help them privately (Violates financial regulations)
                </button>
              </div>
            </div>
          )}
          
          {stage >= 4 && (
            <div>
              <div className="bg-purple-900/30 border border-purple-500/50 rounded-lg p-4 mb-4">
                <h4 className="text-lg font-medium text-purple-300 mb-2">Simulation Complete</h4>
                <p className="text-gray-300">
                  You've experienced how financial surveillance affects daily life in the Citadel. Every transaction, every decision has been tracked and scored according to the system's values.
                </p>
                
                <div className="mt-4">
                  <p className="text-gray-400 mb-2">Your final status:</p>
                  <p className={`font-medium ${
                    userScore > 700 ? 'text-green-400' : 
                    userScore > 500 ? 'text-yellow-400' : 'text-red-400'
                  }`}>
                    {userScore > 700 ? 'Privileged Citizen (High Access)' : 
                     userScore > 500 ? 'Standard Citizen (Limited Access)' : 'Restricted Citizen (Monitored Status)'}
                  </p>
                </div>
              </div>
              
              <p className="text-gray-300 mb-4">
                This simulation demonstrates how centralized monetary systems can be used as tools for surveillance and control. Bitcoin was designed specifically to create a form of money that couldn't be controlled or censored by any central authority.
              </p>
              
              {!completed && (
                <button
                  onClick={onComplete}
                  className="w-full py-2 px-4 bg-purple-600 hover:bg-purple-700 text-white rounded-md transition-colors"
                >
                  Complete Mission
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
