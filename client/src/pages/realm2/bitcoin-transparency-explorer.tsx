import React, { useState } from 'react';
import { motion } from 'framer-motion';

const BitcoinFreedomExplorer = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [transactionStatus, setTransactionStatus] = useState('ready');
  const [transactionAmount, setTransactionAmount] = useState(0.1);
  const [selectedBlock, setSelectedBlock] = useState<number | null>(null);

  // Mock blockchain data
  const mockBlocks = [
    { id: 1, height: 785421, transactions: 2453, timestamp: '2023-05-15 14:01:22' },
    { id: 2, height: 785422, transactions: 1983, timestamp: '2023-05-15 14:13:45' },
    { id: 3, height: 785423, transactions: 2178, timestamp: '2023-05-15 14:25:16' },
  ];

  const comparisonData = {
    surveillance: [
      "All transactions monitored 24/7",
      "Funds can be frozen remotely",
      "Mandatory identity linking",
      "Transaction limits & restrictions",
      "Approval required for payments"
    ],
    bitcoin: [
      "Pseudonymous transactions",
      "Complete control of your funds",
      "No account freezes possible",
      "Global borderless payments",
      "No permission needed"
    ]
  };

  const handleSendBitcoin = () => {
    setTransactionStatus('broadcasting');
    setTimeout(() => {
      setTransactionStatus('confirmed');
      setSelectedBlock(785424);
    }, 2000);
  };

  return (
    <div className="bg-[#0f172a] text-[#e2e8f0] min-h-screen">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <header className="text-center py-10">
          <div className="w-24 h-24 mx-auto mb-6 text-[#f7931a]">
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C17.53 2 22 6.47 22 12C22 17.53 17.53 22 12 22C6.47 22 2 17.53 2 12C2 6.47 6.47 2 12 2M15 16L9 12L15 8V16Z"/>
            </svg>
          </div>
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-[#f7931a] to-[#ff9e2c] text-transparent bg-clip-text">
            Bitcoin: Your Financial Freedom Tool
          </h1>
          <p className="text-xl text-[#94a3b8] max-w-3xl mx-auto">
            Escape financial surveillance and take control of your money with Bitcoin's revolutionary technology
          </p>
        </header>

        <nav className="flex border-b border-[#2d3748] mb-8">
          {['overview', 'comparison', 'simulator', 'blocks'].map(tab => (
            <button 
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-3 font-medium capitalize ${
                activeTab === tab 
                  ? 'text-[#f7931a] border-b-2 border-[#f7931a]' 
                  : 'text-[#94a3b8] hover:text-[#f7931a]'
              }`}
            >
              {tab}
            </button>
          ))}
        </nav>

        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-8"
          >
            <div className="bg-[#1e293b] rounded-xl p-6 shadow-lg">
              <h2 className="text-2xl font-bold mb-4 text-[#f7931a]">Why Bitcoin Matters</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="border-l-4 border-red-500 p-4">
                  <h3 className="text-lg font-semibold mb-3 text-red-400">Traditional Banking</h3>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2">
                      <svg className="w-5 h-5 text-red-500 flex-shrink-0" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 2C17.53 2 22 6.47 22 12C22 17.53 17.53 22 12 22C6.47 22 2 17.53 2 12C2 6.47 6.47 2 12 2M15.59 7L12 10.59L8.41 7L7 8.41L10.59 12L7 15.59L8.41 17L12 13.41L15.59 17L17 15.59L13.41 12L17 8.41L15.59 7Z"/>
                      </svg>
                      <span>Banks can freeze your accounts</span>
                    </li>
                    {/* Add more list items */}
                  </ul>
                </div>
                <div className="border-l-4 border-[#f7931a] p-4">
                  <h3 className="text-lg font-semibold mb-3 text-[#f7931a]">Bitcoin Advantages</h3>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2">
                      <svg className="w-5 h-5 text-[#f7931a] flex-shrink-0" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M21 7L9 19L3.5 13.5L4.91 12.09L9 16.17L19.59 5.59L21 7Z"/>
                      </svg>
                      <span>Complete control of your money</span>
                    </li>
                    {/* Add more list items */}
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-[#1e293b] rounded-xl p-6 shadow-lg">
              <h2 className="text-2xl font-bold mb-4 text-[#f7931a]">Key Features</h2>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="p-4 border border-[#2d3748] rounded-lg">
                  <h3 className="font-semibold text-[#f7931a]">Decentralized</h3>
                  <p className="text-sm mt-2">No central authority controls the network</p>
                </div>
                {/* Add more feature cards */}
              </div>
            </div>
          </motion.div>
        )}

        {/* Transaction Simulator Tab */}
        {activeTab === 'simulator' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-[#1e293b] rounded-xl p-6 shadow-lg"
          >
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-[#0f172a]/60 p-5 rounded-lg">
                <h3 className="text-lg font-semibold mb-4">Send Bitcoin</h3>
                <input 
                  type="number"
                  value={transactionAmount}
                  onChange={(e) => setTransactionAmount(parseFloat(e.target.value))}
                  className="w-full mb-4 p-2 bg-[#1e293b] rounded-md"
                  placeholder="Amount in BTC"
                />
                <button 
                  onClick={handleSendBitcoin}
                  className="w-full py-2 bg-[#f7931a] hover:bg-[#e07908] rounded-md font-bold"
                >
                  {transactionStatus === 'ready' ? 'Send Bitcoin' : 'Processing...'}
                </button>
              </div>
              
              <div className="bg-[#0f172a]/60 p-5 rounded-lg text-center">
                <div className="w-24 h-24 mx-auto mb-4 text-[#f7931a]">
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2C17.53 2 22 6.47 22 12C22 17.53 17.53 22 12 22C6.47 22 2 17.53 2 12C2 6.47 6.47 2 12 2M15 16L9 12L15 8V16Z"/>
                  </svg>
                </div>
                <div className="text-lg mb-6">
                  {transactionStatus === 'confirmed' 
                    ? 'Transaction Confirmed!'
                    : 'Broadcasting to Network...'}
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Blockchain Explorer Tab */}
        {activeTab === 'blocks' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-[#1e293b] rounded-xl p-6 shadow-lg"
          >
            <h2 className="text-2xl font-bold mb-6 text-[#f7931a]">Blockchain Explorer</h2>
            <div className="grid gap-4">
              {mockBlocks.map(block => (
                <div key={block.id} className="p-4 bg-[#0f172a]/60 rounded-lg border border-[#2d3748]">
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="font-semibold text-[#f7931a]">Block #{block.height}</h3>
                      <p className="text-sm text-[#94a3b8]">{block.timestamp}</p>
                    </div>
                    <span className="text-sm bg-[#1e293b] px-3 py-1 rounded-full">
                      {block.transactions} transactions
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default BitcoinFreedomExplorer;