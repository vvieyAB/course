import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

interface LightningNetworkSimulatorProps {
  onComplete: () => void;
}

// Mock network nodes
const initialNodes = [
  { id: 1, name: "Your Node", type: "user", balance: 1000000, color: "#9333ea" },
  { id: 2, name: "Merchant A", type: "merchant", balance: 5000000, color: "#059669" },
  { id: 3, name: "Routing Node 1", type: "router", balance: 10000000, color: "#2563eb" },
  { id: 4, name: "Routing Node 2", type: "router", balance: 8000000, color: "#2563eb" },
  { id: 5, name: "Merchant B", type: "merchant", balance: 3000000, color: "#059669" },
  { id: 6, name: "Exchange", type: "exchange", balance: 50000000, color: "#d97706" }
];

// Mock channel connections
const initialChannels = [
  { source: 1, target: 3, capacity: 1000000, fee: 1 },
  { source: 3, target: 2, capacity: 3000000, fee: 2 },
  { source: 3, target: 4, capacity: 5000000, fee: 1 },
  { source: 4, target: 5, capacity: 2000000, fee: 3 },
  { source: 4, target: 6, capacity: 10000000, fee: 2 },
  { source: 3, target: 6, capacity: 8000000, fee: 1 }
];

export default function LightningNetworkSimulator({ onComplete }: LightningNetworkSimulatorProps) {
  const [nodes, setNodes] = useState(initialNodes);
  const [channels, setChannels] = useState(initialChannels);
  const [view, setView] = useState<'network' | 'privacy' | 'comparison'>('network');
  const [selectedNode, setSelectedNode] = useState<number | null>(1); // Start with user node selected
  const [paymentAmount, setPaymentAmount] = useState(50000);
  const [paymentTarget, setPaymentTarget] = useState(2); // Default to Merchant A
  const [paymentStatus, setPaymentStatus] = useState<'idle' | 'routing' | 'success' | 'failed'>('idle');
  const [paymentRoute, setPaymentRoute] = useState<number[]>([]);
  const [step, setStep] = useState(1);
  const [completed, setCompleted] = useState(false);
  
  // Canvas for visualization
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  // Draw the network visualization
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Set canvas dimensions
    canvas.width = canvas.clientWidth;
    canvas.height = canvas.clientHeight;
    
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Position nodes in a circle
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const radius = Math.min(centerX, centerY) * 0.7;
    
    const nodePositions = nodes.map((node, i) => {
      const angle = (i * 2 * Math.PI) / nodes.length;
      return {
        id: node.id,
        x: centerX + radius * Math.cos(angle),
        y: centerY + radius * Math.sin(angle)
      };
    });
    
    // Draw channels (connections)
    channels.forEach(channel => {
      const source = nodePositions.find(n => n.id === channel.source);
      const target = nodePositions.find(n => n.id === channel.target);
      
      if (!source || !target) return;
      
      ctx.beginPath();
      
      // Determine if this channel is part of the active payment route
      const isPartOfRoute = 
        paymentRoute.includes(channel.source) && 
        paymentRoute.includes(channel.target) &&
        Math.abs(paymentRoute.indexOf(channel.source) - paymentRoute.indexOf(channel.target)) === 1;
      
      // Style based on status
      if (isPartOfRoute) {
        ctx.strokeStyle = '#fbbf24';
        ctx.lineWidth = 3;
        
        // Animated dashes for routes
        if (paymentStatus === 'routing') {
          ctx.setLineDash([5, 5]);
          ctx.lineDashOffset = -((Date.now() / 100) % 10);
        } else {
          ctx.setLineDash([]);
        }
      } else {
        ctx.strokeStyle = '#4b5563';
        ctx.lineWidth = 1;
        ctx.setLineDash([]);
      }
      
      ctx.moveTo(source.x, source.y);
      ctx.lineTo(target.x, target.y);
      ctx.stroke();
      
      // Draw capacity indicator
      const midX = (source.x + target.x) / 2;
      const midY = (source.y + target.y) / 2;
      
      if (!isPartOfRoute) {
        ctx.fillStyle = '#4b5563';
        ctx.font = '10px sans-serif';
        ctx.fillText(`${(channel.capacity / 1000000).toFixed(2)} BTC`, midX, midY);
      }
    });
    
    // Draw nodes
    nodePositions.forEach(pos => {
      const node = nodes.find(n => n.id === pos.id);
      if (!node) return;
      
      ctx.beginPath();
      const isSelected = selectedNode === node.id;
      const isPartOfRoute = paymentRoute.includes(node.id);
      
      // Node circle
      ctx.fillStyle = isPartOfRoute ? '#fbbf24' : node.color;
      ctx.strokeStyle = isSelected ? '#ffffff' : 'transparent';
      ctx.lineWidth = isSelected ? 2 : 0;
      
      // Pulse animation for nodes in payment route
      let nodeRadius = 15;
      if (isPartOfRoute && paymentStatus === 'routing') {
        const pulsePhase = ((Date.now() % 2000) / 2000) * Math.PI * 2;
        nodeRadius = 15 + Math.sin(pulsePhase) * 5;
      }
      
      ctx.arc(pos.x, pos.y, nodeRadius, 0, Math.PI * 2);
      ctx.fill();
      if (isSelected) ctx.stroke();
      
      // Node label
      ctx.fillStyle = '#ffffff';
      ctx.font = '12px sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(node.name, pos.x, pos.y - 25);
    });
    
    // Animation loop
    if (paymentStatus === 'routing') {
      requestAnimationFrame(() => {
        // Force re-render to animate
        setNodes([...nodes]);
      });
    }
  }, [nodes, channels, selectedNode, paymentRoute, paymentStatus]);
  
  // Handle making a payment
  const handleMakePayment = () => {
    if (paymentStatus !== 'idle') return;
    
    // Simple path finding (in reality this would use more complex algorithms)
    const findPath = (start: number, end: number): number[] => {
      // For this simulation, we'll use a predefined path for demonstration
      if (start === 1 && end === 2) return [1, 3, 2]; // Your Node -> Routing Node 1 -> Merchant A
      if (start === 1 && end === 5) return [1, 3, 4, 5]; // Your Node -> Routing Node 1 -> Routing Node 2 -> Merchant B
      if (start === 1 && end === 6) return [1, 3, 6]; // Your Node -> Routing Node 1 -> Exchange
      
      // Fallback path
      return [start, end];
    };
    
    const route = findPath(1, paymentTarget);
    setPaymentRoute(route);
    setPaymentStatus('routing');
    
    // Simulate routing delay then success
    setTimeout(() => {
      setPaymentStatus('success');
      
      // Reset after showing success
      setTimeout(() => {
        setPaymentStatus('idle');
        setPaymentRoute([]);
        
        // Advance to next step if this is the first payment
        if (step === 1) {
          setStep(2);
          setView('privacy');
        }
      }, 2000);
    }, 3000);
  };
  
  // Handle completing the simulator
  const handleComplete = () => {
    if (!completed) {
      setCompleted(true);
      setTimeout(() => {
        onComplete();
      }, 1000);
    }
  };
  
  // Next step handler
  const handleNextStep = () => {
    if (step < 3) {
      setStep(step + 1);
      // Switch view based on step
      if (step === 1) {
        setView('privacy');
      } else if (step === 2) {
        setView('comparison');
      }
    } else if (!completed) {
      handleComplete();
    }
  };
  
  return (
    <div className="mt-4 mb-8">
      <div className="bg-black/30 border border-purple-900 rounded-lg p-6 mb-6">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-semibold text-purple-400">
            Lightning Network Explorer
          </h3>
          
          <div className="flex space-x-2">
            <button 
              onClick={() => setView('network')}
              className={`px-3 py-1.5 text-sm rounded-md transition-colors ${
                view === 'network' ? 'bg-purple-600 text-white' : 'bg-purple-900/30 text-gray-300 hover:bg-purple-900/50'
              }`}
            >
              Network
            </button>
            <button 
              onClick={() => setView('privacy')}
              className={`px-3 py-1.5 text-sm rounded-md transition-colors ${
                view === 'privacy' ? 'bg-purple-600 text-white' : 'bg-purple-900/30 text-gray-300 hover:bg-purple-900/50'
              }`}
            >
              Privacy Features
            </button>
            <button 
              onClick={() => setView('comparison')}
              className={`px-3 py-1.5 text-sm rounded-md transition-colors ${
                view === 'comparison' ? 'bg-purple-600 text-white' : 'bg-purple-900/30 text-gray-300 hover:bg-purple-900/50'
              }`}
            >
              Layer Comparison
            </button>
          </div>
        </div>
        
        {/* Guidance based on current step */}
        <motion.div 
          key={`guidance-${step}-${view}`}
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3 }}
          className="bg-purple-900/20 border border-purple-800/50 rounded-lg p-4 mb-4"
        >
          {step === 1 && view === 'network' && (
            <div className="text-gray-300">
              <h4 className="text-lg font-medium text-purple-300 mb-2">Making Lightning Payments</h4>
              <p>Explore the Lightning Network - a second layer protocol built on top of Bitcoin that enables instant, low-fee transactions through a network of payment channels. Make a payment to experience how transactions route through the network.</p>
            </div>
          )}
          
          {view === 'privacy' && (
            <div className="text-gray-300">
              <h4 className="text-lg font-medium text-purple-300 mb-2">Enhanced Privacy</h4>
              <p>Lightning Network transactions provide better privacy than on-chain Bitcoin transactions since only the channel open/close operations are recorded on the blockchain. Individual payments within channels aren't publicly visible.</p>
            </div>
          )}
          
          {view === 'comparison' && (
            <div className="text-gray-300">
              <h4 className="text-lg font-medium text-purple-300 mb-2">Multi-Layer Privacy</h4>
              <p>Bitcoin's layered approach combines a transparent and verifiable base layer with more private higher layers. This creates a balance between necessary transparency for verification and practical privacy for everyday use.</p>
            </div>
          )}
        </motion.div>
        
        {/* Network Visualization View */}
        {view === 'network' && (
          <div>
            <div className="bg-black/40 border border-purple-900/50 rounded-lg overflow-hidden mb-6">
              <div className="p-4">
                <canvas 
                  ref={canvasRef} 
                  className="w-full h-64 md:h-80"
                ></canvas>
                
                {paymentStatus === 'success' && (
                  <div className="bg-green-900/30 border border-green-800/50 rounded-lg p-3 mt-4">
                    <p className="text-green-400 font-medium">Payment successful!</p>
                    <p className="text-sm text-gray-300">
                      Your payment of {(paymentAmount / 1000000).toFixed(6)} BTC was routed through {paymentRoute.length - 2} intermediary nodes to reach its destination.
                    </p>
                  </div>
                )}
              </div>
              
              <div className="border-t border-purple-900/50 p-4 bg-black/20">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm text-gray-400 mb-1">Payment Amount (sats)</label>
                    <input
                      type="range"
                      min="10000"
                      max="1000000"
                      step="10000"
                      value={paymentAmount}
                      onChange={(e) => setPaymentAmount(Number(e.target.value))}
                      disabled={paymentStatus !== 'idle'}
                      className="w-full h-2 bg-purple-900/50 rounded-lg appearance-none cursor-pointer"
                    />
                    <div className="flex justify-between text-xs text-gray-400 mt-1">
                      <span>10,000 sats</span>
                      <span>{(paymentAmount / 1000000).toFixed(3)} BTC</span>
                      <span>1,000,000 sats</span>
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm text-gray-400 mb-1">Destination</label>
                    <select
                      value={paymentTarget}
                      onChange={(e) => setPaymentTarget(Number(e.target.value))}
                      disabled={paymentStatus !== 'idle'}
                      className="w-full px-3 py-2 bg-black/60 border border-purple-900/50 rounded-md text-gray-300 text-sm focus:border-purple-500 focus:outline-none"
                    >
                      <option value={2}>Merchant A</option>
                      <option value={5}>Merchant B</option>
                      <option value={6}>Exchange</option>
                    </select>
                  </div>
                  
                  <div className="flex items-end">
                    <button
                      onClick={handleMakePayment}
                      disabled={paymentStatus !== 'idle'}
                      className={`w-full px-4 py-2 rounded-md transition-colors ${
                        paymentStatus === 'idle'
                          ? 'bg-purple-600 hover:bg-purple-700 text-white'
                          : 'bg-purple-900/30 text-gray-500 cursor-not-allowed'
                      }`}
                    >
                      {paymentStatus === 'idle' 
                        ? 'Make Payment' 
                        : paymentStatus === 'routing' 
                          ? 'Routing...' 
                          : paymentStatus === 'success' 
                            ? 'Payment Sent' 
                            : 'Failed'}
                    </button>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-purple-900/20 border border-purple-800/50 rounded-lg p-4 mb-6">
              <h4 className="text-lg font-medium text-purple-300 mb-2">How Lightning Works</h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-black/40 p-3 rounded border border-purple-900/30">
                  <h5 className="text-sm font-medium text-purple-300 mb-2">1. Payment Channels</h5>
                  <p className="text-xs text-gray-300">
                    Users open payment channels with a Bitcoin transaction. These channels allow unlimited transactions between parties without touching the blockchain.
                  </p>
                </div>
                
                <div className="bg-black/40 p-3 rounded border border-purple-900/30">
                  <h5 className="text-sm font-medium text-purple-300 mb-2">2. Routing Payments</h5>
                  <p className="text-xs text-gray-300">
                    Payments can be routed through multiple channels, allowing you to pay anyone in the network even without a direct channel.
                  </p>
                </div>
                
                <div className="bg-black/40 p-3 rounded border border-purple-900/30">
                  <h5 className="text-sm font-medium text-purple-300 mb-2">3. Final Settlement</h5>
                  <p className="text-xs text-gray-300">
                    Channels can be closed at any time with a final on-chain transaction that reflects the current balance between the parties.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
        
        {/* Privacy Features View */}
        {view === 'privacy' && (
          <div>
            <div className="bg-black/40 border border-purple-900/50 rounded-lg p-4 mb-6">
              <h4 className="text-md font-medium text-purple-300 mb-3">Lightning's Privacy Advantages</h4>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="bg-black/30 p-4 rounded border border-purple-900/30">
                  <h5 className="text-sm font-medium text-purple-300 mb-3">Off-Chain Transactions</h5>
                  <p className="text-sm text-gray-300 mb-2">
                    Most Lightning transactions happen off the Bitcoin blockchain, making them:
                  </p>
                  <ul className="list-disc pl-5 space-y-1 text-sm text-gray-300">
                    <li>Not publicly visible in blockchain explorers</li>
                    <li>Not permanently recorded in Bitcoin's public ledger</li>
                    <li>Not subject to the same chain analysis techniques</li>
                  </ul>
                  <p className="text-xs text-gray-400 mt-3 italic">
                    Only channel opening and closing transactions appear on-chain
                  </p>
                </div>
                
                <div className="bg-black/30 p-4 rounded border border-purple-900/30">
                  <h5 className="text-sm font-medium text-purple-300 mb-3">Onion Routing</h5>
                  <p className="text-sm text-gray-300 mb-2">
                    Lightning uses onion routing (similar to Tor) so that:
                  </p>
                  <ul className="list-disc pl-5 space-y-1 text-sm text-gray-300">
                    <li>Each node only knows its immediate predecessor and successor</li>
                    <li>Intermediate nodes don't know the payment's origin or destination</li>
                    <li>Payment paths are encrypted in multiple layers (hence "onion")</li>
                  </ul>
                  <p className="text-xs text-gray-400 mt-3 italic">
                    This creates a high level of privacy for both sender and receiver
                  </p>
                </div>
                
                <div className="bg-black/30 p-4 rounded border border-purple-900/30 md:col-span-2">
                  <h5 className="text-sm font-medium text-purple-300 mb-3">Privacy Demo: Path Tracing</h5>
                  <p className="text-sm text-gray-300 mb-4">
                    In this visualization, observe what information is visible to different participants in a Lightning payment:
                  </p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-black/40 p-3 rounded border border-purple-900/20">
                      <h6 className="text-xs font-medium text-purple-200 mb-2">Routing Node Perspective</h6>
                      <p className="text-xs text-gray-400">
                        A routing node only sees:
                      </p>
                      <ul className="list-disc pl-4 mt-1 text-xs text-gray-400">
                        <li>Immediate previous hop</li>
                        <li>Immediate next hop</li>
                        <li>Amount minus fees</li>
                      </ul>
                      <p className="text-xs text-green-400 mt-2">
                        ✓ Cannot determine original sender
                      </p>
                      <p className="text-xs text-green-400">
                        ✓ Cannot determine final recipient
                      </p>
                    </div>
                    
                    <div className="bg-black/40 p-3 rounded border border-purple-900/20">
                      <h6 className="text-xs font-medium text-purple-200 mb-2">Blockchain Observer Perspective</h6>
                      <p className="text-xs text-gray-400">
                        Someone watching the blockchain sees:
                      </p>
                      <ul className="list-disc pl-4 mt-1 text-xs text-gray-400">
                        <li>Channel open transactions</li>
                        <li>Channel close transactions</li>
                        <li>Channel capacities</li>
                      </ul>
                      <p className="text-xs text-green-400 mt-2">
                        ✓ Cannot see individual payments
                      </p>
                      <p className="text-xs text-green-400">
                        ✓ Cannot determine payment paths
                      </p>
                    </div>
                    
                    <div className="bg-black/40 p-3 rounded border border-purple-900/20">
                      <h6 className="text-xs font-medium text-purple-200 mb-2">Merchant Perspective</h6>
                      <p className="text-xs text-gray-400">
                        A merchant receiving payment sees:
                      </p>
                      <ul className="list-disc pl-4 mt-1 text-xs text-gray-400">
                        <li>Payment amount received</li>
                        <li>Payment request/invoice details</li>
                        <li>Immediate previous hop</li>
                      </ul>
                      <p className="text-xs text-green-400 mt-2">
                        ✓ Cannot determine original sender
                      </p>
                      <p className="text-xs text-green-400">
                        ✓ Cannot see customer's other transactions
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        
        {/* Layer Comparison View */}
        {view === 'comparison' && (
          <div>
            <div className="bg-black/40 border border-purple-900/50 rounded-lg p-4 mb-6">
              <h4 className="text-md font-medium text-purple-300 mb-4">Bitcoin's Layered Privacy Model</h4>
              
              <div className="relative overflow-x-auto mb-6">
                <table className="w-full text-left border-separate border-spacing-0">
                  <thead>
                    <tr>
                      <th className="p-3 bg-black/60 text-xs font-medium text-purple-300 uppercase sticky left-0">Feature</th>
                      <th className="p-3 bg-black/60 text-xs font-medium text-purple-300 uppercase">Base Layer (Bitcoin)</th>
                      <th className="p-3 bg-black/60 text-xs font-medium text-purple-300 uppercase">Layer 2 (Lightning)</th>
                      <th className="p-3 bg-black/60 text-xs font-medium text-purple-300 uppercase">CBDC Comparison</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-purple-900/30">
                    <tr>
                      <td className="p-3 bg-black/40 text-sm text-gray-300 sticky left-0 font-medium">Transaction Visibility</td>
                      <td className="p-3 text-sm text-gray-300">Fully public, all details visible</td>
                      <td className="p-3 text-sm text-gray-300">Private, off-chain, details hidden</td>
                      <td className="p-3 text-sm text-gray-300">Selective privacy, authority has full visibility</td>
                    </tr>
                    <tr>
                      <td className="p-3 bg-black/40 text-sm text-gray-300 sticky left-0 font-medium">Identity Model</td>
                      <td className="p-3 text-sm text-gray-300">Pseudonymous addresses</td>
                      <td className="p-3 text-sm text-gray-300">Enhanced pseudonymity with routing</td>
                      <td className="p-3 text-sm text-gray-300">Full identity tracking by default</td>
                    </tr>
                    <tr>
                      <td className="p-3 bg-black/40 text-sm text-gray-300 sticky left-0 font-medium">Censorship Resistance</td>
                      <td className="p-3 text-sm text-gray-300">High (decentralized consensus)</td>
                      <td className="p-3 text-sm text-gray-300">Moderate (depends on pathfinding)</td>
                      <td className="p-3 text-sm text-gray-300">None (centrally controlled)</td>
                    </tr>
                    <tr>
                      <td className="p-3 bg-black/40 text-sm text-gray-300 sticky left-0 font-medium">Data Collection</td>
                      <td className="p-3 text-sm text-gray-300">Public blockchain data</td>
                      <td className="p-3 text-sm text-gray-300">Limited to channel partners</td>
                      <td className="p-3 text-sm text-gray-300">Comprehensive data collection</td>
                    </tr>
                    <tr>
                      <td className="p-3 bg-black/40 text-sm text-gray-300 sticky left-0 font-medium">Transaction Speed</td>
                      <td className="p-3 text-sm text-gray-300">~10 minutes (on average)</td>
                      <td className="p-3 text-sm text-gray-300">Near-instant</td>
                      <td className="p-3 text-sm text-gray-300">Near-instant</td>
                    </tr>
                    <tr>
                      <td className="p-3 bg-black/40 text-sm text-gray-300 sticky left-0 font-medium">Privacy Control</td>
                      <td className="p-3 text-sm text-gray-300">User-managed</td>
                      <td className="p-3 text-sm text-gray-300">User-managed, enhanced</td>
                      <td className="p-3 text-sm text-gray-300">Authority-controlled</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              
              <div className="bg-purple-900/20 border border-purple-800/50 rounded-lg p-4">
                <h5 className="text-sm font-medium text-purple-300 mb-2">The Best of Both Worlds</h5>
                <p className="text-sm text-gray-300">
                  Bitcoin's multi-layer approach solves the privacy-transparency dilemma by providing:
                </p>
                <ul className="list-disc pl-5 mt-2 space-y-1 text-sm text-gray-300">
                  <li>A transparent, verifiable base layer for settlement and consensus</li>
                  <li>Privacy-enhanced higher layers for everyday transactions</li>
                  <li>User choice in which layer to use based on needs</li>
                  <li>Decentralization and trust minimization throughout</li>
                </ul>
                <p className="text-sm text-gray-300 mt-3">
                  This creates a financial system that combines the best aspects of transparency (for verification and trust) with privacy (for personal freedom and security).
                </p>
              </div>
            </div>
          </div>
        )}
        
        {/* Navigation Controls */}
        <div className="flex justify-between">
          <div className="text-sm text-gray-400">
            Step {step} of 3
          </div>
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