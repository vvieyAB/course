import { useState, useEffect } from 'react';
import { GitMerge, Check, RefreshCw, Hash } from 'lucide-react';
import { bioluminescentTheme } from '@/lib/realm-themes';

interface MerkleTreeSimulatorProps {
  onComplete: () => void;
}

interface TreeNode {
  hash: string;
  isLeaf: boolean;
  left?: TreeNode;
  right?: TreeNode;
  data?: string;
  highlight?: boolean;
}

export default function MerkleTreeSimulator({ onComplete }: MerkleTreeSimulatorProps) {
  const [transactions, setTransactions] = useState([
    { id: 1, data: 'Alice sends 1 BTC to Bob', included: true },
    { id: 2, data: 'Bob sends 0.5 BTC to Charlie', included: true },
    { id: 3, data: 'Dave sends 2 BTC to Alice', included: true },
    { id: 4, data: 'Charlie sends 0.2 BTC to Dave', included: true }
  ]);
  const [merkleRoot, setMerkleRoot] = useState('');
  const [merkleTree, setMerkleTree] = useState<TreeNode | null>(null);
  const [verification, setVerification] = useState({
    status: '',
    message: '',
    complete: false
  });
  const [isGenerating, setIsGenerating] = useState(false);
  
  // Simple hash function (for demo purposes only)
  const generateHash = (text: string) => {
    // This is a simplified hash function for demo purposes only
    // DO NOT use this for actual cryptography
    let hash = 0;
    for (let i = 0; i < text.length; i++) {
      const char = text.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash; // Convert to 32bit integer
    }
    
    // Convert to hex-like string (shorter than a real hash for display purposes)
    return Math.abs(hash).toString(16).padStart(6, '0');
  };
  
  // Generate Merkle Tree from transactions
  const buildMerkleTree = () => {
    setIsGenerating(true);
    
    // Get included transactions only
    const includedTxs = transactions.filter(tx => tx.included);
    if (includedTxs.length === 0) {
      setMerkleTree(null);
      setMerkleRoot('');
      setIsGenerating(false);
      return;
    }
    
    // Create leaf nodes from transactions
    let nodes: TreeNode[] = includedTxs.map(tx => ({
      hash: generateHash(tx.data),
      isLeaf: true,
      data: tx.data,
      highlight: false
    }));
    
    // If odd number of transactions, duplicate the last one
    if (nodes.length % 2 !== 0) {
      nodes.push({ ...nodes[nodes.length - 1] });
    }
    
    // Build the tree bottom-up
    while (nodes.length > 1) {
      const newLevel: TreeNode[] = [];
      
      for (let i = 0; i < nodes.length; i += 2) {
        const leftNode = nodes[i];
        const rightNode = nodes[i + 1];
        const combinedHash = generateHash(leftNode.hash + rightNode.hash);
        
        newLevel.push({
          hash: combinedHash,
          isLeaf: false,
          left: leftNode,
          right: rightNode,
          highlight: false,
          data: leftNode.data + "+" + rightNode.data
        });
      }
      
      nodes = newLevel;
    }
    
    // Set the merkle root and tree
    setTimeout(() => {
      setMerkleTree(nodes[0]);      setMerkleRoot(nodes[0].hash);
      setIsGenerating(false);
    }, 800);
  };
  
  // Verify a transaction in the Merkle Tree
  const verifyTransaction = (txIndex: number) => {
    if (!merkleTree) return;
    
    setVerification({
      status: 'verifying',
      message: `Verifying transaction: ${transactions[txIndex].data}...`,
      complete: false
    });
    
    // Simulate verification process
    setTimeout(() => {
      setVerification({
        status: 'success',
        message: `Transaction verified! It's included in block with Merkle root: ${merkleRoot}`,
        complete: true
      });
      
      // Complete the challenge after verification
      setTimeout(onComplete, 2000);
    }, 1500);
  };
  
  // Toggle transaction inclusion
  const toggleTransaction = (id: number) => {
    setTransactions(transactions.map(tx => 
      tx.id === id ? { ...tx, included: !tx.included } : tx
    ));
  };
  
  // Rebuild tree when transactions change
  useEffect(() => {
    if (transactions.some(tx => tx.included)) {
      buildMerkleTree();
    } else {
      setMerkleTree(null);
      setMerkleRoot('');
    }
  }, [transactions]);
  
  return (
    <div className="py-6">
      <div className="mb-8 p-6 rounded-lg" style={{ backgroundColor: 'rgba(8, 28, 36, 0.6)' }}>
        <h3 className="text-lg font-semibold mb-2" style={{ color: bioluminescentTheme.colors.primary }}>
          Merkle Tree Challenge
        </h3>
        <p className="text-gray-300 mb-4">
          Merkle trees allow Bitcoin to efficiently and securely organize transaction data. This structure makes it possible 
          to verify if a transaction is included in a block without downloading the entire blockchain.
        </p>
        
        <div className="space-y-6">
          {/* Transactions panel */}
          <div className="bg-black/30 p-4 rounded-md">
            <h4 className="text-sm font-semibold mb-3" style={{ color: bioluminescentTheme.colors.secondary }}>
              Transactions in Block:
            </h4>
            
            <div className="grid gap-3">
              {transactions.map((tx) => (
                <div
                  key={tx.id}
                  className={`p-3 rounded-md flex items-center justify-between transition-all ${
                    tx.included ? 'opacity-100' : 'opacity-50'
                  }`}
                  style={{ 
                    backgroundColor: tx.included ? 'rgba(6, 214, 160, 0.1)' : 'rgba(6, 214, 160, 0.05)',
                    borderLeft: tx.included ? `3px solid ${bioluminescentTheme.colors.primary}` : '3px solid transparent'
                  }}
                >
                  <div>
                    <div className="flex items-center">
                      <Hash className="h-4 w-4 mr-2" style={{ color: bioluminescentTheme.colors.accent1 }} />
                      <span className="text-sm text-gray-300">TX{tx.id}: {tx.data}</span>
                    </div>
                    
                    {tx.included && (
                      <div className="mt-1 text-xs font-mono" style={{ color: bioluminescentTheme.colors.accent2 }}>
                        Hash: {generateHash(tx.data)}
                      </div>
                    )}
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => toggleTransaction(tx.id)}
                      className="text-xs px-2 py-1 rounded"
                      style={{ 
                        backgroundColor: tx.included ? 'rgba(239, 68, 68, 0.2)' : 'rgba(6, 214, 160, 0.2)',
                        color: tx.included ? '#f87171' : bioluminescentTheme.colors.primary
                      }}
                    >
                      {tx.included ? 'Remove' : 'Include'}
                    </button>
                    
                    {tx.included && !verification.complete && (
                      <button
                        onClick={() => verifyTransaction(tx.id - 1)}
                        className="text-xs px-2 py-1 rounded"
                        style={{ 
                          backgroundColor: 'rgba(6, 214, 160, 0.2)',
                          color: bioluminescentTheme.colors.primary
                        }}
                      >
                        Verify
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Tree visualization */}
          <div className="bg-black/20 p-4 rounded-md">
            <div className="flex justify-between items-center mb-3">
              <h4 className="text-sm font-semibold" style={{ color: bioluminescentTheme.colors.secondary }}>
                Merkle Tree Structure:
              </h4>
              
              <button
                onClick={buildMerkleTree}
                disabled={!transactions.some(tx => tx.included) || isGenerating}
                className="px-3 py-1 text-xs rounded text-white font-medium flex items-center"
                style={{ 
                  backgroundColor: bioluminescentTheme.colors.primary,
                  opacity: (!transactions.some(tx => tx.included) || isGenerating) ? 0.7 : 1
                }}
              >
                {isGenerating ? (
                  <>
                    <RefreshCw className="mr-1 h-3 w-3 animate-spin" />
                    Generating...
                  </>
                ) : (
                  <>
                    <GitMerge className="mr-1 h-3 w-3" />
                    Rebuild Tree
                  </>
                )}
              </button>
            </div>
            
            {merkleTree ? (
              <div className="p-3 bg-black/30 rounded-md">
                <div className="text-center">
                  <div className="inline-block px-4 py-2 rounded-md mb-3" 
                    style={{ 
                      backgroundColor: 'rgba(6, 214, 160, 0.2)',
                      border: `1px solid ${bioluminescentTheme.colors.primary}`
                    }}
                  >
                    <div className="text-xs" style={{ color: bioluminescentTheme.colors.secondary }}>
                      Merkle Root
                    </div>
                    <div className="font-mono text-sm" style={{ color: bioluminescentTheme.colors.primary }}>
                      {merkleRoot}
                    </div>
                  </div>
                  
                  <div className="text-xs text-gray-400 mt-2 mb-4">
                    This is added to the block header, allowing efficient verification of any transaction in the block.
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
                    {transactions.filter(tx => tx.included).map((tx) => (
                      <div
                        key={tx.id}
                        className="p-2 text-xs font-mono rounded bg-black/20"
                        style={{ color: bioluminescentTheme.colors.accent2 }}
                      >
                        Leaf: {generateHash(tx.data)}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <div className="p-6 text-center text-gray-500 bg-black/20 rounded-md">
                {transactions.some(tx => tx.included)
                  ? "Generating tree..."
                  : "Include some transactions to generate the Merkle tree"}
              </div>
            )}
          </div>
        </div>
        
        {verification.status && (
          <div 
            className={`mt-6 p-3 rounded-md ${
              verification.status === 'success' ? 'bg-green-900/30' : 
              verification.status === 'error' ? 'bg-red-900/30' : 'bg-blue-900/30'
            }`}
            style={{ 
              borderLeft: `4px solid ${
                verification.status === 'success' ? '#10b981' : 
                verification.status === 'error' ? '#ef4444' : '#3b82f6'
              }`,
            }}
          >
            <p className={
              verification.status === 'success' ? 'text-green-400' : 
              verification.status === 'error' ? 'text-red-400' : 'text-blue-400'
            }>
              {verification.message}
            </p>
          </div>
        )}
      </div>
      
      {verification.complete && (
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
            Well done! You've experienced how Merkle trees enable efficient verification of data in Bitcoin.
            This technology allows lightweight clients to verify transactions without downloading the entire blockchain.
          </p>
        </div>
      )}
    </div>
  );
}