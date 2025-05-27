import { useState, useEffect } from 'react';
import { HardDrive, Cpu, Check, Timer, Hash } from 'lucide-react';

interface MiningSimulatorProps {
  onComplete: () => void;
}

interface Block {
  id: number;
  nonce: number;
  data: string;
  prevHash: string;
  hash: string;
  difficulty: number;
  mined: boolean;
  minedAt?: number;
}

export default function MiningSimulator({ onComplete }: MiningSimulatorProps) {
  const [mining, setMining] = useState(false);
  const [hashPower, setHashPower] = useState(10); // Hashes per second
  const [difficulty, setDifficulty] = useState(2); // Number of leading zeros
  const [nonce, setNonce] = useState(0);
  const [currentBlock, setCurrentBlock] = useState<Block>({
    id: 1,
    nonce: 0,
    data: "First transaction block",
    prevHash: "0000000000000000000000000000000000000000000000000000000000000000",
    hash: "",
    difficulty: 2,
    mined: false
  });
  const [blockChain, setBlockChain] = useState<Block[]>([]);
  const [hashCount, setHashCount] = useState(0);
  const [miningInterval, setMiningInterval] = useState<NodeJS.Timeout | null>(null);
  const [completed, setCompleted] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);
  
  // Create simplified sha256 hash (for demonstration)
  const hash = (data: string): string => {
    let hash = 0;
    for (let i = 0; i < data.length; i++) {
      const char = data.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash; // Convert to 32bit integer
    }
    return Math.abs(hash).toString(16).padStart(64, '0');
  };
  
  // Check if a hash meets the difficulty requirement
  const meetsTarget = (hash: string, difficulty: number): boolean => {
    const targetPrefix = Array(difficulty).fill('0').join('');
    return hash.startsWith(targetPrefix);
  };
  
  // Setup new block
  const setupBlock = (id: number, prevHash: string) => {
    const data = `Block ${id} with ${Math.floor(Math.random() * 10) + 1} transactions`;
    setCurrentBlock({
      id,
      nonce: 0,
      data,
      prevHash,
      hash: hash(`${prevHash}${data}0`),
      difficulty,
      mined: false
    });
    setNonce(0);
    setHashCount(0);
  };
  
  // Start mining process
  const startMining = () => {
    setMining(true);
    let currentNonce = nonce;
    let totalHashes = hashCount;
    
    const interval = setInterval(() => {
      let foundBlock = false;
      const hashes: string[] = [];
      
      // Process X hashes per update based on hash power
      for (let i = 0; i < hashPower && !foundBlock; i++) {
        currentNonce++;
        totalHashes++;
        
        const newHash = hash(`${currentBlock.prevHash}${currentBlock.data}${currentNonce}`);
        hashes.push(newHash);
        
        if (meetsTarget(newHash, difficulty)) {
          const minedBlock = {
            ...currentBlock,
            nonce: currentNonce,
            hash: newHash,
            mined: true,
            minedAt: Date.now()
          };
          
          setBlockChain(prev => [...prev, minedBlock]);
          
          // If we've mined 3 blocks, complete the challenge
          if (blockChain.length >= 2) { // Current one will be the third
            setMining(false);
            setCompleted(true);
            clearInterval(interval);
            setTimeout(onComplete, 2000);
          } else {
            // Setup next block
            setupBlock(currentBlock.id + 1, newHash);
          }
          
          foundBlock = true;
        }
      }
      
      if (!foundBlock) {
        setNonce(currentNonce);
        setHashCount(totalHashes);
        setCurrentBlock(prev => ({
          ...prev,
          nonce: currentNonce,
          hash: hashes[hashes.length - 1] // Show the last hash tried
        }));
      }
    }, 100);
    
    setMiningInterval(interval);
  };
  
  // Stop mining
  const stopMining = () => {
    setMining(false);
    if (miningInterval) {
      clearInterval(miningInterval);
      setMiningInterval(null);
    }
  };
  
  // Change hash power
  const adjustHashPower = (value: number) => {
    if (!mining) {
      setHashPower(Math.max(1, Math.min(100, value)));
    }
  };
  
  // Change difficulty
  const adjustDifficulty = (value: number) => {
    if (!mining) {
      setDifficulty(Math.max(1, Math.min(5, value)));
      setCurrentBlock(prev => ({
        ...prev,
        difficulty: value
      }));
    }
  };
  
  // Cleanup interval on unmount
  useEffect(() => {
    return () => {
      if (miningInterval) {
        clearInterval(miningInterval);
      }
    };
  }, [miningInterval]);
  
  return (
    <div className="bg-black text-gray-100 p-6 rounded-lg border border-orange-900/30">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-orange-500 mb-4">Bitcoin Mining Simulator</h2>
        <p className="text-gray-300 mb-4">
          Experience how Bitcoin miners solve complex mathematical puzzles to create new blocks.
          This simulation demonstrates the process of finding a hash that meets a specific difficulty target.
        </p>
        
        {/* Controls */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div className="bg-gray-900 p-4 rounded-lg">
            <h3 className="text-orange-400 text-lg font-medium mb-2 flex items-center">
              <Cpu className="h-5 w-5 mr-2" />
              Mining Settings
            </h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm text-gray-400 mb-1">Hash Power: {hashPower} H/s</label>
                <input 
                  type="range" 
                  min="1" 
                  max="100" 
                  value={hashPower} 
                  onChange={(e) => adjustHashPower(parseInt(e.target.value))} 
                  disabled={mining}
                  className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer disabled:opacity-50"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-1">Difficulty: {difficulty} (Leading zeros)</label>
                <input 
                  type="range" 
                  min="1" 
                  max="5" 
                  value={difficulty} 
                  onChange={(e) => adjustDifficulty(parseInt(e.target.value))} 
                  disabled={mining}
                  className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer disabled:opacity-50"
                />
              </div>
              <div className="flex justify-between items-center pt-2">
                <div className="text-sm text-gray-400">Total Hashes: {hashCount}</div>
                
                {!mining ? (
                  <button 
                    onClick={startMining} 
                    className="px-4 py-2 bg-orange-600 text-white rounded-md hover:bg-orange-700 transition-colors"
                    disabled={completed}
                  >
                    Start Mining
                  </button>
                ) : (
                  <button 
                    onClick={stopMining} 
                    className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition-colors"
                  >
                    Stop Mining
                  </button>
                )}
              </div>
            </div>
          </div>
          
          <div className="bg-gray-900 p-4 rounded-lg">
            <h3 className="text-orange-400 text-lg font-medium mb-2 flex items-center">
              <Hash className="h-5 w-5 mr-2" />
              Current Block
            </h3>
            <div className="space-y-2 text-sm">
              <div><span className="text-gray-500">Block ID:</span> <span className="text-orange-300">{currentBlock.id}</span></div>
              <div><span className="text-gray-500">Data:</span> <span className="text-gray-300">{currentBlock.data}</span></div>
              <div className="truncate"><span className="text-gray-500">Previous Hash:</span> <span className="text-blue-400 font-mono text-xs">{currentBlock.prevHash}</span></div>
              <div className="truncate"><span className="text-gray-500">Current Hash:</span> <span className="text-green-400 font-mono text-xs">{currentBlock.hash}</span></div>
              <div><span className="text-gray-500">Nonce:</span> <span className="text-orange-300">{currentBlock.nonce}</span></div>
              <div><span className="text-gray-500">Target:</span> <span className="text-purple-400 font-mono">{Array(difficulty).fill('0').join('')}...</span></div>
              
              <div className="pt-2">
                {mining && (
                  <div className="flex items-center text-yellow-500">
                    <Timer className="h-4 w-4 mr-1 animate-pulse" />
                    <span>Mining in progress...</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        
        {/* Blockchain visualization */}
        {blockChain.length > 0 && (
          <div className="bg-gray-900 p-4 rounded-lg mb-6">
            <h3 className="text-orange-400 text-lg font-medium mb-3 flex items-center">
              <HardDrive className="h-5 w-5 mr-2" />
              Blockchain
            </h3>
            <div className="space-y-4">
              {blockChain.map((block, index) => (
                <div key={block.id} className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4 pb-4 border-b border-gray-800">
                  <div className="flex-shrink-0 bg-orange-900/30 text-orange-400 px-3 py-1 rounded-full text-sm">
                    Block {block.id}
                  </div>
                  <div className="flex-grow">
                    <div className="text-xs text-gray-400">{block.data}</div>
                    <div className="font-mono text-xs text-green-400 truncate">{block.hash}</div>
                  </div>
                  <div className="flex-shrink-0 text-gray-400 text-xs">
                    Nonce: {block.nonce}
                  </div>
                  <div className="flex-shrink-0">
                    <Check className="h-5 w-5 text-green-500" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        
        {/* Learn more section */}
        <div className="mt-6">
          <button
            onClick={() => setShowExplanation(!showExplanation)}
            className="text-orange-400 underline text-sm hover:text-orange-300"
          >
            {showExplanation ? 'Hide explanation' : 'Learn more about Bitcoin mining'}
          </button>
          
          {showExplanation && (
            <div className="mt-4 bg-gray-900/50 border border-gray-800 p-4 rounded-lg text-sm text-gray-300">
              <h4 className="text-orange-400 font-medium mb-2">How Bitcoin Mining Works</h4>
              <p className="mb-2">
                Bitcoin mining is the process of adding new transactions to the Bitcoin blockchain. Miners use 
                computational power to solve complex mathematical puzzles, and the first to solve it gets to 
                add a new block and receive a reward.
              </p>
              <p className="mb-2">
                <span className="text-orange-400 font-medium">Proof-of-Work:</span> Miners must find a value (nonce) 
                that, when combined with the block data and previous block's hash, produces a new hash with a specific 
                number of leading zeros (the difficulty target). This process requires significant computational work,
                hence "proof-of-work."
              </p>
              <p className="mb-2">
                <span className="text-orange-400 font-medium">Difficulty Adjustment:</span> Bitcoin automatically 
                adjusts the difficulty every 2,016 blocks (approximately two weeks) to maintain a consistent 
                block time of about 10 minutes, regardless of how much mining power is on the network.
              </p>
              <p>
                <span className="text-orange-400 font-medium">Mining Rewards:</span> Miners receive newly created 
                bitcoins (the block subsidy) plus transaction fees for their work. The block subsidy halves approximately 
                every four years, creating Bitcoin's decreasing issuance schedule.
              </p>
            </div>
          )}
        </div>
      </div>
      
      {completed && (
        <div className="bg-green-900/20 border border-green-700 rounded-lg p-4 text-center">
          <h3 className="text-green-400 text-lg font-medium mb-2">Challenge Complete!</h3>
          <p className="text-gray-300">
            Congratulations! You've successfully mined multiple blocks and experienced the proof-of-work 
            mining process firsthand.
          </p>
        </div>
      )}
    </div>
  );
}