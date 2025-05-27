import { useState, useEffect } from 'react';
import { Network, ShieldCheck, X, CheckCircle, AlertTriangle, RefreshCw } from 'lucide-react';

interface ConsensusSimulatorProps {
  onComplete: () => void;
}

interface Node {
  id: number;
  name: string;
  honest: boolean;
  active: boolean;
  chain: Transaction[];
  rejectedTxs: string[];
}

interface Transaction {
  id: string;
  sender: string;
  recipient: string;
  amount: number;
  valid: boolean;
  confirmed: boolean;
  doubleSpend?: boolean;
  spentInputs?: string[];
}

export default function ConsensusSimulator({ onComplete }: ConsensusSimulatorProps) {
  const [nodes, setNodes] = useState<Node[]>([
    { id: 1, name: 'Tokyo', honest: true, active: true, chain: [], rejectedTxs: [] },
    { id: 2, name: 'London', honest: true, active: true, chain: [], rejectedTxs: [] },
    { id: 3, name: 'New York', honest: true, active: true, chain: [], rejectedTxs: [] },
    { id: 4, name: 'Singapore', honest: true, active: true, chain: [], rejectedTxs: [] },
    { id: 5, name: 'Malicious Node', honest: false, active: true, chain: [], rejectedTxs: [] }
  ]);
  
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [pendingTransactions, setPendingTransactions] = useState<Transaction[]>([]);
  const [running, setRunning] = useState(false);
  const [completed, setCompleted] = useState(false);
  const [round, setRound] = useState(0);
  const [simulationSpeed, setSimulationSpeed] = useState(1500); // ms per round
  const [userInputs, setUserInputs] = useState<{[key: string]: boolean}>({});
  
  // Initial transactions setup
  useEffect(() => {
    const initialTransactions: Transaction[] = [
      {
        id: 'tx1',
        sender: 'Alice',
        recipient: 'Bob',
        amount: 5,
        valid: true,
        confirmed: false,
        spentInputs: ['utxo1']
      },
      {
        id: 'tx2',
        sender: 'Alice',
        recipient: 'Charlie',
        amount: 5,
        valid: true,
        confirmed: false,
        doubleSpend: true,
        spentInputs: ['utxo1'] // Same input as tx1
      },
      {
        id: 'tx3',
        sender: 'Dave',
        recipient: 'Eve',
        amount: 3,
        valid: true,
        confirmed: false,
        spentInputs: ['utxo2']
      },
      {
        id: 'tx4',
        sender: 'Bob',
        recipient: 'Dave',
        amount: 2,
        valid: true,
        confirmed: false,
        spentInputs: ['utxo3']
      },
      {
        id: 'tx5',
        sender: 'Charlie',
        recipient: 'Alice',
        amount: 7,
        valid: true,
        confirmed: false,
        spentInputs: ['utxo4']
      }
    ];
    
    setPendingTransactions(initialTransactions);
    
    const initialInputs: {[key: string]: boolean} = {};
    initialTransactions.forEach(tx => {
      initialInputs[tx.id] = false;
    });
    setUserInputs(initialInputs);
  }, []);
  
  // Toggle node honesty
  const toggleNodeHonesty = (id: number) => {
    if (running) return;
    
    setNodes(nodes.map(node => 
      node.id === id ? { ...node, honest: !node.honest } : node
    ));
  };
  
  // Toggle node active status
  const toggleNodeActive = (id: number) => {
    if (running) return;
    
    setNodes(nodes.map(node => 
      node.id === id ? { ...node, active: !node.active } : node
    ));
  };
  
  // Handle user input about transaction validity
  const handleTransactionInput = (txId: string, isValid: boolean) => {
    setUserInputs(prev => ({
      ...prev,
      [txId]: isValid
    }));
  };
  
  // Check if transaction is detected as valid
  const transactionIsValid = (tx: Transaction): boolean => {
    // Double spend check
    if (tx.doubleSpend) {
      // For double spends, we consider them valid if user has marked them as valid
      // This is to simulate the user understanding double-spend attacks
      return userInputs[tx.id] === true; 
    }
    
    return tx.valid;
  };
  
  // Start simulation
  const startSimulation = () => {
    if (Object.values(userInputs).some(input => input === false)) {
      alert("Please check all transactions first");
      return;
    }
    
    setRunning(true);
    setRound(0);
    
    // Reset nodes
    setNodes(nodes.map(node => ({
      ...node,
      chain: [],
      rejectedTxs: []
    })));
    
    // Reset transactions
    setTransactions([]);
    
    // Process first round immediately
    processRound();
  };
  
  // Process one round of consensus
  const processRound = () => {
    if (round >= 5) {
      // End simulation after 5 rounds
      setRunning(false);
      validateResults();
      return;
    }
    
    // Each active node processes pending transactions
    const updatedNodes = [...nodes];
    const confirmedTransactions: string[] = [];
    const doubleSpends: string[] = [];
    
    updatedNodes.forEach((node, nodeIndex) => {
      if (!node.active) return;
      
      pendingTransactions.forEach(tx => {
        const isValid = node.honest ? transactionIsValid(tx) : true; // Malicious nodes accept everything
        
        // Check if this tx uses inputs that were already used in this node's chain
        const spentInputsConflict = tx.spentInputs?.some(input => 
          node.chain.some(chainTx => 
            chainTx.spentInputs?.includes(input) && chainTx.id !== tx.id
          )
        );
        
        if (isValid && !spentInputsConflict && !node.chain.some(t => t.id === tx.id) && !node.rejectedTxs.includes(tx.id)) {
          // Add to node's chain
          updatedNodes[nodeIndex].chain.push({
            ...tx,
            confirmed: true
          });
          
          // Track confirmed transactions
          if (!confirmedTransactions.includes(tx.id)) {
            confirmedTransactions.push(tx.id);
          }
        } else if (!isValid || spentInputsConflict) {
          // Reject the transaction
          if (!updatedNodes[nodeIndex].rejectedTxs.includes(tx.id)) {
            updatedNodes[nodeIndex].rejectedTxs.push(tx.id);
          }
          
          // Track double spends
          if (tx.doubleSpend && !doubleSpends.includes(tx.id)) {
            doubleSpends.push(tx.id);
          }
        }
      });
    });
    
    // Update transactions with confirmed status
    const updatedTransactions = pendingTransactions.map(tx => ({
      ...tx,
      confirmed: confirmedTransactions.includes(tx.id)
    }));
    
    setNodes(updatedNodes);
    setTransactions(prev => [...prev, ...updatedTransactions.filter(tx => !prev.some(t => t.id === tx.id))]);
    setRound(round + 1);
    
    // Schedule next round
    if (round < 4) {
      setTimeout(processRound, simulationSpeed);
    } else {
      setTimeout(() => {
        setRunning(false);
        validateResults();
      }, simulationSpeed);
    }
  };
  
  // Validate user's understanding
  const validateResults = () => {
    let correctAnswers = 0;
    
    pendingTransactions.forEach(tx => {
      const expectedValid = !tx.doubleSpend;
      if (userInputs[tx.id] === expectedValid) {
        correctAnswers++;
      }
    });
    
    // Success if more than 60% correct
    const success = correctAnswers / pendingTransactions.length >= 0.6;
    
    if (success) {
      setCompleted(true);
      setTimeout(onComplete, 2000);
    }
  };
  
  return (
    <div className="bg-black text-gray-100 p-6 rounded-lg border border-orange-900/30">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-orange-500 mb-4">Bitcoin Consensus Simulator</h2>
        <p className="text-gray-300 mb-6">
          Observe how Bitcoin maintains consensus across a distributed network of nodes. 
          Identify valid transactions and double-spend attempts before running the simulation.
        </p>
        
        {/* Transaction validation controls */}
        <div className="bg-gray-900 p-4 rounded-lg mb-6">
          <h3 className="text-orange-400 text-lg font-medium mb-3">
            Verify Transactions
          </h3>
          <p className="text-gray-400 text-sm mb-4">
            Examine each transaction and mark whether you think it's valid or invalid.
            Check carefully for double-spend attempts (same inputs used multiple times).
          </p>
          
          <div className="space-y-4">
            {pendingTransactions.map(tx => (
              <div key={tx.id} className="bg-black/40 p-3 rounded-lg border border-gray-800">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <div className="text-orange-300 font-medium">{tx.id}</div>
                    <div className="text-sm text-gray-400">
                      {tx.sender} sends {tx.amount} BTC to {tx.recipient}
                    </div>
                    <div className="text-xs text-gray-500 mt-1">
                      Input: {tx.spentInputs?.join(', ')}
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <button
                      onClick={() => handleTransactionInput(tx.id, true)}
                      className={`px-3 py-1 rounded-full text-xs flex items-center ${
                        userInputs[tx.id] === true 
                          ? 'bg-green-900/50 text-green-300 border border-green-700' 
                          : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
                      }`}
                      disabled={running || completed}
                    >
                      <CheckCircle className="w-3 h-3 mr-1" />
                      Valid
                    </button>
                    
                    <button
                      onClick={() => handleTransactionInput(tx.id, false)}
                      className={`px-3 py-1 rounded-full text-xs flex items-center ${
                        userInputs[tx.id] === false 
                          ? 'bg-red-900/50 text-red-300 border border-red-700' 
                          : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
                      }`}
                      disabled={running || completed}
                    >
                      <X className="w-3 h-3 mr-1" />
                      Invalid
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-6 flex justify-between">
            <div className="text-sm text-gray-400">
              {Object.values(userInputs).filter(Boolean).length} of {pendingTransactions.length} transactions verified
            </div>
            
            <button
              onClick={startSimulation}
              disabled={running || completed || Object.values(userInputs).some(input => input === false)}
              className={`px-4 py-2 rounded text-white font-medium flex items-center ${
                running || completed || Object.values(userInputs).some(input => input === false)
                  ? 'bg-gray-700 cursor-not-allowed'
                  : 'bg-orange-600 hover:bg-orange-700'
              }`}
            >
              <Network className="mr-2 h-4 w-4" />
              Run Consensus Simulation
            </button>
          </div>
        </div>
        
        {/* Network Visualization */}
        <div className="bg-gray-900 p-4 rounded-lg mb-6">
          <h3 className="text-orange-400 text-lg font-medium mb-3">
            Network State
          </h3>
          
          {running && (
            <div className="bg-blue-900/20 text-blue-300 border border-blue-800/40 px-3 py-2 rounded mb-4 flex items-center">
              <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
              Simulation round {round}/5 - Nodes are validating transactions...
            </div>
          )}
          
          {completed && (
            <div className="bg-green-900/20 text-green-300 border border-green-800/40 px-3 py-2 rounded mb-4 flex items-center">
              <CheckCircle className="h-4 w-4 mr-2" />
              Simulation complete! Good job on identifying valid and invalid transactions.
            </div>
          )}
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {nodes.map(node => (
              <div 
                key={node.id} 
                className={`border rounded-lg overflow-hidden ${
                  !node.active 
                    ? 'border-gray-700 opacity-40' 
                    : node.honest 
                      ? 'border-green-700/30' 
                      : 'border-red-700/30'
                }`}
              >
                <div className={`px-3 py-2 flex justify-between items-center ${
                  node.honest ? 'bg-green-900/20' : 'bg-red-900/20'
                }`}>
                  <div className="flex items-center">
                    {node.honest ? (
                      <ShieldCheck className="h-4 w-4 mr-2 text-green-400" />
                    ) : (
                      <AlertTriangle className="h-4 w-4 mr-2 text-red-400" />
                    )}
                    <span className={`font-medium ${node.honest ? 'text-green-300' : 'text-red-300'}`}>
                      {node.name}
                    </span>
                  </div>
                  
                  {!running && !completed && (
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => toggleNodeHonesty(node.id)}
                        className="text-xs px-2 py-0.5 rounded bg-gray-800 hover:bg-gray-700"
                      >
                        Make {node.honest ? 'Dishonest' : 'Honest'}
                      </button>
                      
                      <button
                        onClick={() => toggleNodeActive(node.id)}
                        className="text-xs px-2 py-0.5 rounded bg-gray-800 hover:bg-gray-700"
                      >
                        {node.active ? 'Deactivate' : 'Activate'}
                      </button>
                    </div>
                  )}
                </div>
                
                <div className="p-3 bg-black/30">
                  <div className="text-xs text-gray-400 mb-1">Transactions in chain:</div>
                  
                  {node.chain.length === 0 ? (
                    <div className="text-xs text-gray-500 italic">No transactions yet</div>
                  ) : (
                    <div className="space-y-1">
                      {node.chain.map(tx => (
                        <div key={tx.id} className="text-xs flex justify-between items-center bg-black/20 px-2 py-1 rounded">
                          <span className="text-gray-300">{tx.id}: {tx.sender} → {tx.recipient}</span>
                          <span className="text-orange-300">{tx.amount} BTC</span>
                        </div>
                      ))}
                    </div>
                  )}
                  
                  {node.rejectedTxs.length > 0 && (
                    <div className="mt-2">
                      <div className="text-xs text-gray-400 mb-1">Rejected transactions:</div>
                      <div className="text-xs text-red-300">{node.rejectedTxs.join(', ')}</div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {completed && (
        <div className="bg-green-900/20 border border-green-700 rounded-lg p-4 text-center">
          <h3 className="text-green-400 text-lg font-medium mb-2">Challenge Complete!</h3>
          <p className="text-gray-300">
            Congratulations! You've successfully identified valid and invalid transactions,
            and observed how the Bitcoin network reaches consensus across multiple nodes.
          </p>
        </div>
      )}
    </div>
  );
}