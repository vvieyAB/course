import { useState, useEffect, useRef } from 'react';
import { Network, Check, X, ArrowRight, Shield, RefreshCw } from 'lucide-react';
import { bioluminescentTheme } from '@/lib/realm-themes';

interface ConsensusSimulatorProps {
  onComplete: () => void;
}

interface Node {
  id: number;
  name: string;
  honest: boolean;
  mining: boolean;
  blocks: number;
  lastBlockTime: number;
}

interface Block {
  id: number;
  miner: number;
  timestamp: number;
  honest: boolean;
}

export default function ConsensusSimulator({ onComplete }: ConsensusSimulatorProps) {
  const [nodes, setNodes] = useState<Node[]>([
    { id: 1, name: 'Alice', honest: true, mining: true, blocks: 0, lastBlockTime: 0 },
    { id: 2, name: 'Bob', honest: true, mining: true, blocks: 0, lastBlockTime: 0 },
    { id: 3, name: 'Charlie', honest: true, mining: true, blocks: 0, lastBlockTime: 0 },
    { id: 4, name: 'Dave', honest: true, mining: true, blocks: 0, lastBlockTime: 0 },
    { id: 5, name: 'Eve', honest: false, mining: true, blocks: 0, lastBlockTime: 0 }
  ]);
  
  const [blocks, setBlocks] = useState<Block[]>([]);
  const [simulation, setSimulation] = useState({
    running: false,
    completed: false,
    round: 0,
    message: '',
    honestBlocksPercentage: 0
  });
  
  const simulationInterval = useRef<NodeJS.Timeout | null>(null);
  
  // Toggle node honest/dishonest status
  const toggleNodeHonesty = (id: number) => {
    if (simulation.running) return;
    
    setNodes(nodes.map(node => 
      node.id === id ? { ...node, honest: !node.honest } : node
    ));
  };
  
  // Toggle node mining status
  const toggleNodeMining = (id: number) => {
    if (simulation.running) return;
    
    setNodes(nodes.map(node => 
      node.id === id ? { ...node, mining: !node.mining } : node
    ));
  };
  
  // Start the consensus simulation
  const startSimulation = () => {
    setSimulation({
      ...simulation,
      running: true,
      completed: false,
      round: 0,
      message: 'Simulation started. Mining blocks...',
      honestBlocksPercentage: 0
    });
    
    // Reset blocks and node stats
    setBlocks([]);
    setNodes(nodes.map(node => ({ ...node, blocks: 0, lastBlockTime: 0 })));
  };
  
  // Calculate the difficulty based on honest/dishonest nodes
  const getNodeDifficulty = (honest: boolean) => {
    // Honest nodes have normal difficulty (higher number = more difficult)
    // Dishonest nodes have a disadvantage (can cheat but less effective)
    return honest ? 5 : 7;
  };
  
  // Simulate a mining round
  const mineBlocks = () => {
    // Get active miners
    const activeMiners = nodes.filter(node => node.mining);
    if (activeMiners.length === 0) return;
    
    // Chance for each miner to find a block based on honest/dishonest status
    activeMiners.forEach(miner => {
      const difficulty = getNodeDifficulty(miner.honest);
      const foundBlock = Math.random() * 20 < (1 / difficulty);
      
      if (foundBlock) {
        // Create new block
        const newBlock: Block = {
          id: blocks.length + 1,
          miner: miner.id,
          timestamp: Date.now(),
          honest: miner.honest
        };
        
        setBlocks(prevBlocks => [...prevBlocks, newBlock]);
        
        // Update miner stats
        setNodes(prevNodes => prevNodes.map(node => 
          node.id === miner.id
            ? { ...node, blocks: node.blocks + 1, lastBlockTime: Date.now() }
            : node
        ));
      }
    });
  };
  
  // Calculate the honest vs dishonest block percentage
  const calculateBlockStats = () => {
    if (blocks.length === 0) return 0;
    
    const honestBlocks = blocks.filter(block => block.honest).length;
    return Math.round((honestBlocks / blocks.length) * 100);
  };
  
  // Stop simulation
  const stopSimulation = () => {
    if (simulationInterval.current) {
      clearInterval(simulationInterval.current);
      simulationInterval.current = null;
    }
    
    const honestPercentage = calculateBlockStats();
    
    setSimulation({
      ...simulation,
      running: false,
      completed: true,
      message: `Simulation complete. ${honestPercentage}% of blocks were honest.`,
      honestBlocksPercentage: honestPercentage
    });
    
    // Complete the challenge if honest blocks win
    if (honestPercentage > 50) {
      setTimeout(onComplete, 2000);
    }
  };
  
  // Run simulation
  useEffect(() => {
    if (simulation.running && !simulationInterval.current) {
      // Initial mining round
      mineBlocks();
      
      // Set up interval for mining rounds
      simulationInterval.current = setInterval(() => {
        setSimulation(prev => ({
          ...prev,
          round: prev.round + 1
        }));
        
        mineBlocks();
        
        // Stop after 10 rounds
        if (simulation.round >= 9) {
          stopSimulation();
        }
      }, 1000);
    }
    
    return () => {
      if (simulationInterval.current) {
        clearInterval(simulationInterval.current);
        simulationInterval.current = null;
      }
    };
  }, [simulation.running, simulation.round]);
  
  return (
    <div className="py-6">
      <div className="mb-8 p-6 rounded-lg" style={{ backgroundColor: 'rgba(8, 28, 36, 0.6)' }}>
        <h3 className="text-lg font-semibold mb-2" style={{ color: bioluminescentTheme.colors.primary }}>
          Consensus Mechanism Challenge
        </h3>
        <p className="text-gray-300 mb-4">
          Bitcoin uses Proof-of-Work consensus to determine which transactions are valid without requiring 
          central authority. Experience how this mechanism ensures that honest nodes maintain the integrity 
          of the blockchain even when some participants try to cheat.
        </p>
        
        <div className="space-y-6">
          {/* Network nodes panel */}
          <div className="bg-black/30 p-4 rounded-md">
            <h4 className="text-sm font-semibold mb-3" style={{ color: bioluminescentTheme.colors.secondary }}>
              Network Participants:
            </h4>
            
            <div className="space-y-3">
              {nodes.map((node) => (
                <div
                  key={node.id}
                  className={`p-3 rounded-md transition-all ${
                    !node.mining ? 'opacity-50' : 'opacity-100'
                  }`}
                  style={{ 
                    backgroundColor: node.honest ? 'rgba(6, 214, 160, 0.1)' : 'rgba(239, 68, 68, 0.1)',
                    borderLeft: `3px solid ${node.honest ? bioluminescentTheme.colors.primary : '#ef4444'}`
                  }}
                >
                  <div className="flex justify-between items-center">
                    <div className="flex items-center">
                      <Shield className={`h-4 w-4 mr-2 ${node.honest ? 'text-green-400' : 'text-red-400'}`} />
                      <span className="text-sm font-medium text-gray-200">
                        Node {node.id}: {node.name}
                      </span>
                      <span 
                        className="ml-2 px-2 py-0.5 text-xs rounded-full"
                        style={{
                          backgroundColor: node.honest ? 'rgba(6, 214, 160, 0.2)' : 'rgba(239, 68, 68, 0.2)',
                          color: node.honest ? bioluminescentTheme.colors.primary : '#f87171'
                        }}
                      >
                        {node.honest ? 'Honest' : 'Dishonest'}
                      </span>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      {!simulation.running && (
                        <>
                          <button
                            onClick={() => toggleNodeHonesty(node.id)}
                            className="text-xs px-2 py-1 rounded"
                            style={{ 
                              backgroundColor: 'rgba(148, 163, 184, 0.2)',
                              color: '#cbd5e1'
                            }}
                          >
                            Make {node.honest ? 'Dishonest' : 'Honest'}
                          </button>
                          
                          <button
                            onClick={() => toggleNodeMining(node.id)}
                            className="text-xs px-2 py-1 rounded"
                            style={{ 
                              backgroundColor: node.mining ? 'rgba(239, 68, 68, 0.2)' : 'rgba(6, 214, 160, 0.2)',
                              color: node.mining ? '#f87171' : bioluminescentTheme.colors.primary
                            }}
                          >
                            {node.mining ? 'Stop Mining' : 'Start Mining'}
                          </button>
                        </>
                      )}
                      
                      <div className="text-xs text-gray-400">
                        Blocks: {node.blocks}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Simulation controls */}
          <div className="bg-black/20 p-4 rounded-md">
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-sm font-semibold" style={{ color: bioluminescentTheme.colors.secondary }}>
                Consensus Simulation:
              </h4>
              
              {!simulation.running && !simulation.completed && (
                <button
                  onClick={startSimulation}
                  disabled={nodes.filter(n => n.mining).length === 0}
                  className="px-4 py-2 rounded text-white font-medium flex items-center"
                  style={{ 
                    backgroundColor: bioluminescentTheme.colors.primary,
                    opacity: nodes.filter(n => n.mining).length === 0 ? 0.7 : 1
                  }}
                >
                  <Network className="mr-2 h-4 w-4" />
                  Start Simulation
                </button>
              )}
              
              {simulation.running && (
                <div className="text-sm" style={{ color: bioluminescentTheme.colors.secondary }}>
                  Round: {simulation.round + 1}/10
                </div>
              )}
              
              {simulation.completed && !simulation.running && (
                <button
                  onClick={startSimulation}
                  className="px-4 py-2 rounded text-white font-medium flex items-center"
                  style={{ backgroundColor: bioluminescentTheme.colors.primary }}
                >
                  <RefreshCw className="mr-2 h-4 w-4" />
                  Run Again
                </button>
              )}
            </div>
            
            {(simulation.running || simulation.completed) && (
              <div className="space-y-4">
                {/* Progress bar for honest vs dishonest blocks */}
                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span style={{ color: bioluminescentTheme.colors.secondary }}>
                      Honest Blocks: {blocks.filter(b => b.honest).length}
                    </span>
                    <span className="text-red-400">
                      Dishonest Blocks: {blocks.filter(b => !b.honest).length}
                    </span>
                  </div>
                  
                  <div className="h-4 bg-black/40 rounded-full overflow-hidden">
                    <div 
                      className="h-full rounded-full transition-all duration-500"
                      style={{ 
                        width: `${calculateBlockStats()}%`,
                        backgroundColor: bioluminescentTheme.colors.primary
                      }}
                    ></div>
                  </div>
                  
                  <div className="text-center text-xs mt-1" style={{ color: bioluminescentTheme.colors.accent2 }}>
                    {calculateBlockStats()}% Honest
                  </div>
                </div>
                
                {/* Recent blocks */}
                <div>
                  <h5 className="text-xs font-medium mb-2" style={{ color: bioluminescentTheme.colors.secondary }}>
                    Recent Blocks:
                  </h5>
                  
                  <div className="grid grid-cols-10 gap-1">
                    {blocks.slice(-10).map((block) => {
                      const miner = nodes.find(n => n.id === block.miner);
                      return (
                        <div
                          key={block.id}
                          className="aspect-square rounded flex items-center justify-center relative group"
                          style={{ 
                            backgroundColor: block.honest ? 'rgba(6, 214, 160, 0.2)' : 'rgba(239, 68, 68, 0.2)',
                          }}
                          title={`Block ${block.id} mined by ${miner?.name || 'Unknown'} (${block.honest ? 'Honest' : 'Dishonest'})`}
                        >
                          <span className="text-xs" style={{ color: block.honest ? bioluminescentTheme.colors.primary : '#f87171' }}>
                            {block.id}
                          </span>
                          
                          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 bg-black/70 flex items-center justify-center rounded transition-opacity">
                            <div className="text-[10px] text-center" style={{ color: block.honest ? bioluminescentTheme.colors.secondary : '#f87171' }}>
                              {miner?.name || 'Unknown'}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}
            
            {!simulation.running && !simulation.completed && (
              <div className="text-center text-gray-500 py-4">
                Adjust network participants and click "Start Simulation" to begin.
              </div>
            )}
          </div>
        </div>
        
        {simulation.message && (
          <div 
            className={`mt-6 p-3 rounded-md ${
              simulation.completed && simulation.honestBlocksPercentage > 50 ? 'bg-green-900/30' : 
              simulation.completed && simulation.honestBlocksPercentage <= 50 ? 'bg-red-900/30' : 
              'bg-blue-900/30'
            }`}
            style={{ 
              borderLeft: `4px solid ${
                simulation.completed && simulation.honestBlocksPercentage > 50 ? '#10b981' :
                simulation.completed && simulation.honestBlocksPercentage <= 50 ? '#ef4444' :
                '#3b82f6'
              }`,
            }}
          >
            <p className={
              simulation.completed && simulation.honestBlocksPercentage > 50 ? 'text-green-400' :
              simulation.completed && simulation.honestBlocksPercentage <= 50 ? 'text-red-400' :
              'text-blue-400'
            }>
              {simulation.message}
              
              {simulation.completed && simulation.honestBlocksPercentage > 50 && (
                <span className="block mt-1">
                  Success! The honest nodes have maintained control of the blockchain.
                </span>
              )}
              
              {simulation.completed && simulation.honestBlocksPercentage <= 50 && (
                <span className="block mt-1">
                  The dishonest nodes have gained too much influence. Try again with more honest miners.
                </span>
              )}
            </p>
          </div>
        )}
      </div>
      
      {simulation.completed && simulation.honestBlocksPercentage > 50 && (
        <div 
          className="text-center p-4 rounded-lg border"
          style={{ 
            backgroundColor: 'rgba(6, 214, 160, 0.1)',
            borderColor: `${bioluminescentTheme.colors.primary}40` 
          }}
        >
          <h3 className="text-lg font-semibold mb-2" style={{ color: bioluminescentTheme.colors.primary }}>
            Challenge Complete!
          </h3>
          <p className="text-gray-300">
            Congratulations! You've witnessed how Bitcoin's Proof-of-Work consensus mechanism ensures 
            that as long as the majority of mining power is honest, the integrity of the blockchain is maintained.
            This is how Bitcoin achieves decentralized consensus without requiring trust in any single entity.
          </p>
        </div>
      )}
    </div>
  );
}