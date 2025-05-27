import { useState, useEffect } from 'react';
import { Users, Code, ArrowRight, User, Terminal, Database, Globe, Check, X, Info } from 'lucide-react';

interface GovernanceSimulatorProps {
  onComplete: () => void;
}

interface Stakeholder {
  id: string;
  role: 'developer' | 'miner' | 'node-operator' | 'user';
  name: string;
  description: string;
  avatar: string;
  priorities: {
    decentralization: number; // 1-10
    security: number; // 1-10
    scalability: number; // 1-10
    privacy: number; // 1-10
    usability: number; // 1-10
  };
  stance: 'support' | 'neutral' | 'oppose' | null;
}

interface Proposal {
  id: string;
  title: string;
  description: string;
  technicalDetails: string;
  pros: string[];
  cons: string[];
  impact: {
    decentralization: number; // -5 to +5
    security: number; // -5 to +5
    scalability: number; // -5 to +5
    privacy: number; // -5 to +5
    usability: number; // -5 to +5
  };
  activationThreshold: {
    developers: number; // percent needed
    miners: number;
    nodeOperators: number;
    users: number;
  };
  developersSupport: number;
  minersSupport: number;
  nodeOperatorsSupport: number;
  usersSupport: number;
  result: null | 'accepted' | 'rejected';
}

export default function GovernanceSimulator({ onComplete }: GovernanceSimulatorProps) {
  const [stakeholders, setStakeholders] = useState<Stakeholder[]>([
    {
      id: 'dev1',
      role: 'developer',
      name: 'Elena Chen',
      description: 'Core developer focused on protocol security and technical excellence',
      avatar: '👩‍💻',
      priorities: {
        decentralization: 8,
        security: 10,
        scalability: 6,
        privacy: 7,
        usability: 5
      },
      stance: null
    },
    {
      id: 'dev2',
      role: 'developer',
      name: 'Marcus Wright',
      description: 'Lightning Network developer prioritizing scalability solutions',
      avatar: '👨‍💻',
      priorities: {
        decentralization: 7,
        security: 8,
        scalability: 10,
        privacy: 6,
        usability: 8
      },
      stance: null
    },
    {
      id: 'miner1',
      role: 'miner',
      name: 'Northern Hashpower',
      description: 'Large mining operation using renewable energy, concerned about profitability',
      avatar: '⛏️',
      priorities: {
        decentralization: 5,
        security: 8,
        scalability: 9,
        privacy: 6,
        usability: 7
      },
      stance: null
    },
    {
      id: 'miner2',
      role: 'miner',
      name: 'Global Mining Coalition',
      description: 'Consortium of smaller miners advocating for mining decentralization',
      avatar: '🏭',
      priorities: {
        decentralization: 10,
        security: 8,
        scalability: 7,
        privacy: 5,
        usability: 6
      },
      stance: null
    },
    {
      id: 'node1',
      role: 'node-operator',
      name: 'Sovereign Node Project',
      description: 'Non-profit running nodes to strengthen the network, prioritizes decentralization',
      avatar: '📡',
      priorities: {
        decentralization: 10,
        security: 9,
        scalability: 4,
        privacy: 8,
        usability: 5
      },
      stance: null
    },
    {
      id: 'node2',
      role: 'node-operator',
      name: 'Enterprise Solutions',
      description: 'Business providing node infrastructure to companies, focused on stability',
      avatar: '🖥️',
      priorities: {
        decentralization: 6,
        security: 10,
        scalability: 8,
        privacy: 7,
        usability: 8
      },
      stance: null
    },
    {
      id: 'user1',
      role: 'user',
      name: 'Community Alliance',
      description: 'Grassroots organization of Bitcoin users advocating for privacy and sovereignty',
      avatar: '👥',
      priorities: {
        decentralization: 9,
        security: 8,
        scalability: 6,
        privacy: 10,
        usability: 7
      },
      stance: null
    },
    {
      id: 'user2',
      role: 'user',
      name: 'Merchant Association',
      description: 'Coalition of businesses accepting Bitcoin, focused on usability and adoption',
      avatar: '🏪',
      priorities: {
        decentralization: 6,
        security: 8,
        scalability: 9,
        privacy: 5,
        usability: 10
      },
      stance: null
    }
  ]);
  
  const [proposals, setProposals] = useState<Proposal[]>([
    {
      id: 'proposal1',
      title: 'Transaction Batching Enhancement',
      description: 'Improve signature verification for batched transactions to enhance throughput for businesses and payment processors.',
      technicalDetails: 'Modify the signature verification process to optimize batch validation, reducing CPU cycles needed to verify multiple transactions from the same sender.',
      pros: [
        'Increases transaction throughput without changing block size',
        'Particularly helpful for businesses processing many payments',
        'Reduces load on nodes during peak network usage',
        'No consensus changes required'
      ],
      cons: [
        'Primarily benefits larger transaction senders',
        'Requires complex code changes with potential for bugs',
        'Could marginally incentivize centralization of payments',
        'Limited impact on individual user experience'
      ],
      impact: {
        decentralization: -1,
        security: 0,
        scalability: 4,
        privacy: 0,
        usability: 3
      },
      activationThreshold: {
        developers: 70,
        miners: 60,
        nodeOperators: 60,
        users: 50
      },
      developersSupport: 0,
      minersSupport: 0,
      nodeOperatorsSupport: 0,
      usersSupport: 0,
      result: null
    },
    {
      id: 'proposal2',
      title: 'Enhanced Privacy Protocol',
      description: 'Implement a new transaction type with improved privacy features to make Bitcoin transactions more fungible.',
      technicalDetails: 'Introduce confidential transactions that hide transaction amounts while still allowing validation of balance conservation, combined with a coinjoin-like mixing protocol.',
      pros: [
        'Significantly improves transaction privacy and fungibility',
        'Makes Bitcoin more resistant to surveillance and censorship',
        'Addresses a longstanding limitation of the protocol',
        'Privacy features remain optional for those who prefer transparency'
      ],
      cons: [
        'Increases transaction size and validation resource requirements',
        'Complex cryptography introduces new security assumptions',
        'May face regulatory challenges in some jurisdictions',
        'Could reduce transparency desired by some users'
      ],
      impact: {
        decentralization: 0,
        security: -1,
        scalability: -2,
        privacy: 5,
        usability: 1
      },
      activationThreshold: {
        developers: 80,
        miners: 75,
        nodeOperators: 75,
        users: 60
      },
      developersSupport: 0,
      minersSupport: 0,
      nodeOperatorsSupport: 0,
      usersSupport: 0,
      result: null
    },
    {
      id: 'proposal3',
      title: 'Block Size Gradual Increase',
      description: 'Implement a predictable schedule of small block size increases over time to accommodate growing network usage.',
      technicalDetails: 'Increase the maximum block size by 10% every 2 years for the next decade, starting with an increase from 1MB to 1.1MB, with an activation grace period for nodes to upgrade.',
      pros: [
        'Provides a modest capacity increase to handle more transactions',
        'Gradual approach gives node operators time to adapt',
        'Helps reduce fee pressure during peak usage',
        'Provides predictability for network planning'
      ],
      cons: [
        'Increases resource requirements for running full nodes',
        'May encourage bloating the blockchain with low-value transactions',
        'Could reduce incentives for layer-2 scaling solutions',
        'Contentious topic that could divide the community'
      ],
      impact: {
        decentralization: -3,
        security: -1,
        scalability: 4,
        privacy: 0,
        usability: 3
      },
      activationThreshold: {
        developers: 75,
        miners: 90,
        nodeOperators: 80,
        users: 60
      },
      developersSupport: 0,
      minersSupport: 0,
      nodeOperatorsSupport: 0,
      usersSupport: 0,
      result: null
    }
  ]);
  
  const [currentProposalIndex, setCurrentProposalIndex] = useState(0);
  const [showTechnicalDetails, setShowTechnicalDetails] = useState(false);
  const [showStakeholderDetails, setShowStakeholderDetails] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'proposal' | 'stakeholders' | 'results'>('proposal');
  const [completed, setCompleted] = useState(false);
  const [round, setRound] = useState(1);
  const [showInfoModal, setShowInfoModal] = useState(false);
  
  // Current proposal
  const currentProposal = proposals[currentProposalIndex];
  
  // Filter stakeholders by role
  const developers = stakeholders.filter(s => s.role === 'developer');
  const miners = stakeholders.filter(s => s.role === 'miner');
  const nodeOperators = stakeholders.filter(s => s.role === 'node-operator');
  const users = stakeholders.filter(s => s.role === 'user');
  
  // Calculate alignment score between stakeholder priorities and proposal impact
  const calculateAlignment = (stakeholder: Stakeholder, proposal: Proposal): number => {
    const { decentralization, security, scalability, privacy, usability } = stakeholder.priorities;
    const impact = proposal.impact;
    
    // Weight the impact by how much the stakeholder cares about each factor
    const alignmentScore = 
      (decentralization * impact.decentralization) +
      (security * impact.security) +
      (scalability * impact.scalability) +
      (privacy * impact.privacy) +
      (usability * impact.usability);
    
    // Normalize the score to a -100 to 100 scale
    return Math.round(alignmentScore / 2.5);
  };
  
  // Determine stakeholder stance based on alignment score
  const determineStance = (alignmentScore: number): 'support' | 'neutral' | 'oppose' => {
    if (alignmentScore > 25) return 'support';
    if (alignmentScore < -25) return 'oppose';
    return 'neutral';
  };
  
  // Set a stakeholder's stance
  const setStakeholderStance = (id: string, stance: 'support' | 'neutral' | 'oppose') => {
    setStakeholders(prevStakeholders => 
      prevStakeholders.map(stakeholder => 
        stakeholder.id === id ? { ...stakeholder, stance } : stakeholder
      )
    );
  };
  
  // Update support percentages based on stakeholder stances
  useEffect(() => {
    // Only calculate if all stakeholders have a stance
    if (stakeholders.every(s => s.stance !== null)) {
      const devSupport = calculateSupportPercentage(developers);
      const minerSupport = calculateSupportPercentage(miners);
      const nodeSupport = calculateSupportPercentage(nodeOperators);
      const userSupport = calculateSupportPercentage(users);
      
      setProposals(prevProposals => {
        const newProposals = [...prevProposals];
        newProposals[currentProposalIndex] = {
          ...newProposals[currentProposalIndex],
          developersSupport: devSupport,
          minersSupport: minerSupport,
          nodeOperatorsSupport: nodeSupport,
          usersSupport: userSupport
        };
        return newProposals;
      });
    }
  }, [stakeholders, currentProposalIndex, developers, miners, nodeOperators, users]);
  
  // Calculate support percentage for a group of stakeholders
  const calculateSupportPercentage = (stakeholderGroup: Stakeholder[]): number => {
    if (stakeholderGroup.length === 0) return 0;
    
    const supportCount = stakeholderGroup.filter(s => s.stance === 'support').length;
    return Math.round((supportCount / stakeholderGroup.length) * 100);
  };
  
  // Determine if the proposal passes based on activation thresholds
  const doesProposalPass = (proposal: Proposal): boolean => {
    return (
      proposal.developersSupport >= proposal.activationThreshold.developers &&
      proposal.minersSupport >= proposal.activationThreshold.miners &&
      proposal.nodeOperatorsSupport >= proposal.activationThreshold.nodeOperators &&
      proposal.usersSupport >= proposal.activationThreshold.users
    );
  };
  
  // Simulate stakeholder decision automatically (using calculated alignment)
  const simulateStakeholderDecisions = () => {
    const updatedStakeholders = stakeholders.map(stakeholder => {
      const alignmentScore = calculateAlignment(stakeholder, currentProposal);
      const stance = determineStance(alignmentScore);
      return {
        ...stakeholder,
        stance
      };
    });
    
    setStakeholders(updatedStakeholders);
    setActiveTab('results');
  };
  
  // Get colored class based on value (-5 to +5)
  const getImpactColorClass = (value: number): string => {
    if (value > 3) return 'text-green-400';
    if (value > 0) return 'text-green-300';
    if (value === 0) return 'text-gray-400';
    if (value > -3) return 'text-red-300';
    return 'text-red-400';
  };
  
  // Get percentage bar color based on value
  const getSupportBarColor = (percentage: number, threshold: number): string => {
    if (percentage >= threshold) return 'bg-green-500';
    if (percentage >= threshold * 0.75) return 'bg-yellow-500';
    return 'bg-red-500';
  };
  
  // Finalize the current proposal
  const finalizeProposal = () => {
    const passes = doesProposalPass(currentProposal);
    
    setProposals(prevProposals => {
      const newProposals = [...prevProposals];
      newProposals[currentProposalIndex] = {
        ...newProposals[currentProposalIndex],
        result: passes ? 'accepted' : 'rejected'
      };
      return newProposals;
    });
    
    // Progress to next round or complete challenge
    if (currentProposalIndex < proposals.length - 1) {
      setTimeout(() => {
        setCurrentProposalIndex(currentProposalIndex + 1);
        resetForNextProposal();
      }, 2000);
    } else {
      // All proposals processed
      setCompleted(true);
      setTimeout(onComplete, 2000);
    }
  };
  
  // Reset state for next proposal
  const resetForNextProposal = () => {
    setStakeholders(prevStakeholders => 
      prevStakeholders.map(stakeholder => ({
        ...stakeholder,
        stance: null
      }))
    );
    setActiveTab('proposal');
    setShowTechnicalDetails(false);
    setShowStakeholderDetails(null);
    setRound(round + 1);
  };
  
  return (
    <div className="bg-black text-gray-100 p-6 rounded-lg border border-amber-900/30">
      <div className="mb-6">
        <div className="flex justify-between items-start mb-4">
          <h2 className="text-2xl font-bold text-amber-500">Bitcoin Governance Council</h2>
          
          <button 
            onClick={() => setShowInfoModal(!showInfoModal)} 
            className="text-xs p-2 bg-amber-900/20 rounded-full hover:bg-amber-900/30"
          >
            <Info className="h-4 w-4 text-amber-400" />
          </button>
        </div>
        
        {showInfoModal && (
          <div className="mb-4 bg-amber-900/10 border border-amber-900/30 rounded-lg p-4 text-sm">
            <h3 className="font-medium text-amber-400 mb-2">How Bitcoin Governance Works</h3>
            <p className="text-gray-300 mb-2">
              Bitcoin has no formal governance structure or central authority. Instead, it operates through rough consensus 
              among various stakeholders, each with different priorities and powers.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-2">
              <div>
                <h4 className="font-medium text-amber-300 flex items-center">
                  <Code className="h-4 w-4 mr-1" />
                  Developers
                </h4>
                <p className="text-gray-400 text-xs">
                  Write and review code, propose improvements, but cannot force changes on users.
                </p>
              </div>
              <div>
                <h4 className="font-medium text-amber-300 flex items-center">
                  <Terminal className="h-4 w-4 mr-1" />
                  Miners
                </h4>
                <p className="text-gray-400 text-xs">
                  Secure the network, process transactions, and signal support for proposed changes.
                </p>
              </div>
              <div>
                <h4 className="font-medium text-amber-300 flex items-center">
                  <Database className="h-4 w-4 mr-1" />
                  Node Operators
                </h4>
                <p className="text-gray-400 text-xs">
                  Validate transactions and enforce consensus rules by choosing which software to run.
                </p>
              </div>
              <div>
                <h4 className="font-medium text-amber-300 flex items-center">
                  <User className="h-4 w-4 mr-1" />
                  Users
                </h4>
                <p className="text-gray-400 text-xs">
                  Ultimately determine Bitcoin's value and direction through economic activity and software choices.
                </p>
              </div>
            </div>
          </div>
        )}
        
        <div className="bg-gray-900/50 border border-gray-800 rounded-lg p-4 mb-6">
          <div className="flex justify-between items-center mb-2">
            <div className="flex items-center">
              <span className="bg-amber-600 text-white text-xs font-medium rounded-full h-6 w-6 flex items-center justify-center mr-2">
                {currentProposalIndex + 1}
              </span>
              <h3 className="font-medium text-gray-200">Round {round}: {currentProposal.title}</h3>
            </div>
            
            <div className="flex space-x-2">
              <button
                className={`px-3 py-1 text-xs rounded-lg transition-colors ${
                  activeTab === 'proposal' 
                    ? 'bg-amber-600 text-white' 
                    : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
                }`}
                onClick={() => setActiveTab('proposal')}
              >
                Proposal
              </button>
              
              <button
                className={`px-3 py-1 text-xs rounded-lg transition-colors ${
                  activeTab === 'stakeholders' 
                    ? 'bg-amber-600 text-white' 
                    : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
                }`}
                onClick={() => setActiveTab('stakeholders')}
              >
                Stakeholders
              </button>
              
              <button
                className={`px-3 py-1 text-xs rounded-lg transition-colors ${
                  activeTab === 'results' 
                    ? 'bg-amber-600 text-white' 
                    : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
                }`}
                onClick={() => setActiveTab('results')}
                disabled={stakeholders.some(s => s.stance === null)}
              >
                Results
              </button>
            </div>
          </div>
          
          {/* Proposal Tab */}
          {activeTab === 'proposal' && (
            <div className="space-y-4">
              <div className="bg-black/30 border border-gray-800 rounded-lg p-4">
                <p className="text-gray-300 mb-4">
                  {currentProposal.description}
                </p>
                
                <button
                  onClick={() => setShowTechnicalDetails(!showTechnicalDetails)}
                  className="text-amber-400 text-sm flex items-center hover:text-amber-300"
                >
                  {showTechnicalDetails ? 'Hide' : 'Show'} Technical Details
                  <Code className="h-4 w-4 ml-1" />
                </button>
                
                {showTechnicalDetails && (
                  <div className="mt-3 p-3 bg-gray-900 border border-gray-800 rounded-lg">
                    <div className="font-mono text-xs text-gray-300">
                      {currentProposal.technicalDetails}
                    </div>
                  </div>
                )}
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-black/30 border border-gray-800 rounded-lg p-4">
                  <h4 className="font-medium text-green-400 mb-2">Potential Benefits</h4>
                  <ul className="list-disc ml-5 space-y-1">
                    {currentProposal.pros.map((pro, index) => (
                      <li key={index} className="text-sm text-gray-300">{pro}</li>
                    ))}
                  </ul>
                </div>
                
                <div className="bg-black/30 border border-gray-800 rounded-lg p-4">
                  <h4 className="font-medium text-red-400 mb-2">Potential Drawbacks</h4>
                  <ul className="list-disc ml-5 space-y-1">
                    {currentProposal.cons.map((con, index) => (
                      <li key={index} className="text-sm text-gray-300">{con}</li>
                    ))}
                  </ul>
                </div>
              </div>
              
              <div className="bg-black/30 border border-gray-800 rounded-lg p-4">
                <h4 className="font-medium text-amber-400 mb-3">Impact Assessment</h4>
                
                <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                  <div className="text-center">
                    <div className="text-xs text-gray-400 mb-1">Decentralization</div>
                    <div className={`text-lg font-medium ${getImpactColorClass(currentProposal.impact.decentralization)}`}>
                      {currentProposal.impact.decentralization > 0 ? '+' : ''}
                      {currentProposal.impact.decentralization}
                    </div>
                  </div>
                  
                  <div className="text-center">
                    <div className="text-xs text-gray-400 mb-1">Security</div>
                    <div className={`text-lg font-medium ${getImpactColorClass(currentProposal.impact.security)}`}>
                      {currentProposal.impact.security > 0 ? '+' : ''}
                      {currentProposal.impact.security}
                    </div>
                  </div>
                  
                  <div className="text-center">
                    <div className="text-xs text-gray-400 mb-1">Scalability</div>
                    <div className={`text-lg font-medium ${getImpactColorClass(currentProposal.impact.scalability)}`}>
                      {currentProposal.impact.scalability > 0 ? '+' : ''}
                      {currentProposal.impact.scalability}
                    </div>
                  </div>
                  
                  <div className="text-center">
                    <div className="text-xs text-gray-400 mb-1">Privacy</div>
                    <div className={`text-lg font-medium ${getImpactColorClass(currentProposal.impact.privacy)}`}>
                      {currentProposal.impact.privacy > 0 ? '+' : ''}
                      {currentProposal.impact.privacy}
                    </div>
                  </div>
                  
                  <div className="text-center">
                    <div className="text-xs text-gray-400 mb-1">Usability</div>
                    <div className={`text-lg font-medium ${getImpactColorClass(currentProposal.impact.usability)}`}>
                      {currentProposal.impact.usability > 0 ? '+' : ''}
                      {currentProposal.impact.usability}
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-black/30 border border-gray-800 rounded-lg p-4">
                <h4 className="font-medium text-amber-400 mb-3">Activation Requirements</h4>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  <div>
                    <div className="text-xs text-gray-400 mb-1">Developers</div>
                    <div className="text-lg font-medium text-amber-300">{currentProposal.activationThreshold.developers}%</div>
                  </div>
                  
                  <div>
                    <div className="text-xs text-gray-400 mb-1">Miners</div>
                    <div className="text-lg font-medium text-amber-300">{currentProposal.activationThreshold.miners}%</div>
                  </div>
                  
                  <div>
                    <div className="text-xs text-gray-400 mb-1">Node Operators</div>
                    <div className="text-lg font-medium text-amber-300">{currentProposal.activationThreshold.nodeOperators}%</div>
                  </div>
                  
                  <div>
                    <div className="text-xs text-gray-400 mb-1">Users</div>
                    <div className="text-lg font-medium text-amber-300">{currentProposal.activationThreshold.users}%</div>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {/* Stakeholders Tab */}
          {activeTab === 'stakeholders' && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 gap-4">
                <div>
                  <h4 className="font-medium text-amber-400 mb-2 flex items-center">
                    <Code className="h-4 w-4 mr-1" />
                    Developers
                  </h4>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {developers.map((dev) => (
                      <div 
                        key={dev.id}
                        className={`bg-black/30 border rounded-lg p-3 cursor-pointer transition-colors ${
                          dev.stance === 'support'
                            ? 'border-green-500 bg-green-900/10'
                            : dev.stance === 'oppose'
                              ? 'border-red-500 bg-red-900/10'
                              : dev.stance === 'neutral'
                                ? 'border-yellow-500 bg-yellow-900/10'
                                : 'border-gray-700 hover:border-amber-700'
                        }`}
                        onClick={() => setShowStakeholderDetails(dev.id === showStakeholderDetails ? null : dev.id)}
                      >
                        <div className="flex justify-between">
                          <div className="flex items-center">
                            <div className="text-2xl mr-3">{dev.avatar}</div>
                            <div>
                              <div className="font-medium text-gray-200">{dev.name}</div>
                              <div className="text-xs text-gray-400">{dev.description}</div>
                            </div>
                          </div>
                          
                          {dev.stance && (
                            <div className={`h-6 w-6 rounded-full flex items-center justify-center ${
                              dev.stance === 'support'
                                ? 'bg-green-500 text-black'
                                : dev.stance === 'oppose'
                                  ? 'bg-red-500 text-black'
                                  : 'bg-yellow-500 text-black'
                            }`}>
                              {dev.stance === 'support' ? (
                                <Check className="h-4 w-4" />
                              ) : dev.stance === 'oppose' ? (
                                <X className="h-4 w-4" />
                              ) : (
                                <div className="h-2 w-2 bg-black rounded-full" />
                              )}
                            </div>
                          )}
                        </div>
                        
                        {showStakeholderDetails === dev.id && (
                          <div className="mt-3 pt-3 border-t border-gray-800">
                            <h5 className="text-sm font-medium text-amber-400 mb-2">Priorities</h5>
                            
                            <div className="space-y-2">
                              <div>
                                <div className="flex justify-between text-xs mb-1">
                                  <span className="text-gray-400">Decentralization</span>
                                  <span className="text-gray-300">{dev.priorities.decentralization}/10</span>
                                </div>
                                <div className="h-1.5 bg-gray-800 rounded-full overflow-hidden">
                                  <div 
                                    className="h-full bg-blue-500"
                                    style={{ width: `${dev.priorities.decentralization * 10}%` }}
                                  ></div>
                                </div>
                              </div>
                              
                              <div>
                                <div className="flex justify-between text-xs mb-1">
                                  <span className="text-gray-400">Security</span>
                                  <span className="text-gray-300">{dev.priorities.security}/10</span>
                                </div>
                                <div className="h-1.5 bg-gray-800 rounded-full overflow-hidden">
                                  <div 
                                    className="h-full bg-green-500"
                                    style={{ width: `${dev.priorities.security * 10}%` }}
                                  ></div>
                                </div>
                              </div>
                              
                              <div>
                                <div className="flex justify-between text-xs mb-1">
                                  <span className="text-gray-400">Scalability</span>
                                  <span className="text-gray-300">{dev.priorities.scalability}/10</span>
                                </div>
                                <div className="h-1.5 bg-gray-800 rounded-full overflow-hidden">
                                  <div 
                                    className="h-full bg-purple-500"
                                    style={{ width: `${dev.priorities.scalability * 10}%` }}
                                  ></div>
                                </div>
                              </div>
                              
                              <div>
                                <div className="flex justify-between text-xs mb-1">
                                  <span className="text-gray-400">Privacy</span>
                                  <span className="text-gray-300">{dev.priorities.privacy}/10</span>
                                </div>
                                <div className="h-1.5 bg-gray-800 rounded-full overflow-hidden">
                                  <div 
                                    className="h-full bg-yellow-500"
                                    style={{ width: `${dev.priorities.privacy * 10}%` }}
                                  ></div>
                                </div>
                              </div>
                              
                              <div>
                                <div className="flex justify-between text-xs mb-1">
                                  <span className="text-gray-400">Usability</span>
                                  <span className="text-gray-300">{dev.priorities.usability}/10</span>
                                </div>
                                <div className="h-1.5 bg-gray-800 rounded-full overflow-hidden">
                                  <div 
                                    className="h-full bg-red-500"
                                    style={{ width: `${dev.priorities.usability * 10}%` }}
                                  ></div>
                                </div>
                              </div>
                            </div>
                            
                            <div className="mt-3 flex justify-between">
                              <div>
                                <div className="text-xs text-gray-400 mb-1">Alignment Score</div>
                                <div className={`font-medium ${
                                  calculateAlignment(dev, currentProposal) > 0 
                                    ? 'text-green-400' 
                                    : calculateAlignment(dev, currentProposal) < 0 
                                      ? 'text-red-400' 
                                      : 'text-gray-400'
                                }`}>
                                  {calculateAlignment(dev, currentProposal) > 0 ? '+' : ''}
                                  {calculateAlignment(dev, currentProposal)}
                                </div>
                              </div>
                              
                              <div className="flex space-x-2">
                                <button
                                  className={`px-2 py-1 rounded-lg text-xs ${
                                    dev.stance === 'support'
                                      ? 'bg-green-500 text-black'
                                      : 'bg-green-900/20 text-green-400 hover:bg-green-900/30'
                                  }`}
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    setStakeholderStance(dev.id, 'support');
                                  }}
                                >
                                  Support
                                </button>
                                
                                <button
                                  className={`px-2 py-1 rounded-lg text-xs ${
                                    dev.stance === 'neutral'
                                      ? 'bg-yellow-500 text-black'
                                      : 'bg-yellow-900/20 text-yellow-400 hover:bg-yellow-900/30'
                                  }`}
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    setStakeholderStance(dev.id, 'neutral');
                                  }}
                                >
                                  Neutral
                                </button>
                                
                                <button
                                  className={`px-2 py-1 rounded-lg text-xs ${
                                    dev.stance === 'oppose'
                                      ? 'bg-red-500 text-black'
                                      : 'bg-red-900/20 text-red-400 hover:bg-red-900/30'
                                  }`}
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    setStakeholderStance(dev.id, 'oppose');
                                  }}
                                >
                                  Oppose
                                </button>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h4 className="font-medium text-amber-400 mb-2 flex items-center">
                    <Terminal className="h-4 w-4 mr-1" />
                    Miners
                  </h4>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {miners.map((miner) => (
                      <div 
                        key={miner.id}
                        className={`bg-black/30 border rounded-lg p-3 cursor-pointer transition-colors ${
                          miner.stance === 'support'
                            ? 'border-green-500 bg-green-900/10'
                            : miner.stance === 'oppose'
                              ? 'border-red-500 bg-red-900/10'
                              : miner.stance === 'neutral'
                                ? 'border-yellow-500 bg-yellow-900/10'
                                : 'border-gray-700 hover:border-amber-700'
                        }`}
                        onClick={() => setShowStakeholderDetails(miner.id === showStakeholderDetails ? null : miner.id)}
                      >
                        <div className="flex justify-between">
                          <div className="flex items-center">
                            <div className="text-2xl mr-3">{miner.avatar}</div>
                            <div>
                              <div className="font-medium text-gray-200">{miner.name}</div>
                              <div className="text-xs text-gray-400">{miner.description}</div>
                            </div>
                          </div>
                          
                          {miner.stance && (
                            <div className={`h-6 w-6 rounded-full flex items-center justify-center ${
                              miner.stance === 'support'
                                ? 'bg-green-500 text-black'
                                : miner.stance === 'oppose'
                                  ? 'bg-red-500 text-black'
                                  : 'bg-yellow-500 text-black'
                            }`}>
                              {miner.stance === 'support' ? (
                                <Check className="h-4 w-4" />
                              ) : miner.stance === 'oppose' ? (
                                <X className="h-4 w-4" />
                              ) : (
                                <div className="h-2 w-2 bg-black rounded-full" />
                              )}
                            </div>
                          )}
                        </div>
                        
                        {showStakeholderDetails === miner.id && (
                          <div className="mt-3 pt-3 border-t border-gray-800">
                            <h5 className="text-sm font-medium text-amber-400 mb-2">Priorities</h5>
                            
                            <div className="space-y-2">
                              <div>
                                <div className="flex justify-between text-xs mb-1">
                                  <span className="text-gray-400">Decentralization</span>
                                  <span className="text-gray-300">{miner.priorities.decentralization}/10</span>
                                </div>
                                <div className="h-1.5 bg-gray-800 rounded-full overflow-hidden">
                                  <div 
                                    className="h-full bg-blue-500"
                                    style={{ width: `${miner.priorities.decentralization * 10}%` }}
                                  ></div>
                                </div>
                              </div>
                              
                              <div>
                                <div className="flex justify-between text-xs mb-1">
                                  <span className="text-gray-400">Security</span>
                                  <span className="text-gray-300">{miner.priorities.security}/10</span>
                                </div>
                                <div className="h-1.5 bg-gray-800 rounded-full overflow-hidden">
                                  <div 
                                    className="h-full bg-green-500"
                                    style={{ width: `${miner.priorities.security * 10}%` }}
                                  ></div>
                                </div>
                              </div>
                              
                              <div>
                                <div className="flex justify-between text-xs mb-1">
                                  <span className="text-gray-400">Scalability</span>
                                  <span className="text-gray-300">{miner.priorities.scalability}/10</span>
                                </div>
                                <div className="h-1.5 bg-gray-800 rounded-full overflow-hidden">
                                  <div 
                                    className="h-full bg-purple-500"
                                    style={{ width: `${miner.priorities.scalability * 10}%` }}
                                  ></div>
                                </div>
                              </div>
                              
                              <div>
                                <div className="flex justify-between text-xs mb-1">
                                  <span className="text-gray-400">Privacy</span>
                                  <span className="text-gray-300">{miner.priorities.privacy}/10</span>
                                </div>
                                <div className="h-1.5 bg-gray-800 rounded-full overflow-hidden">
                                  <div 
                                    className="h-full bg-yellow-500"
                                    style={{ width: `${miner.priorities.privacy * 10}%` }}
                                  ></div>
                                </div>
                              </div>
                              
                              <div>
                                <div className="flex justify-between text-xs mb-1">
                                  <span className="text-gray-400">Usability</span>
                                  <span className="text-gray-300">{miner.priorities.usability}/10</span>
                                </div>
                                <div className="h-1.5 bg-gray-800 rounded-full overflow-hidden">
                                  <div 
                                    className="h-full bg-red-500"
                                    style={{ width: `${miner.priorities.usability * 10}%` }}
                                  ></div>
                                </div>
                              </div>
                            </div>
                            
                            <div className="mt-3 flex justify-between">
                              <div>
                                <div className="text-xs text-gray-400 mb-1">Alignment Score</div>
                                <div className={`font-medium ${
                                  calculateAlignment(miner, currentProposal) > 0 
                                    ? 'text-green-400' 
                                    : calculateAlignment(miner, currentProposal) < 0 
                                      ? 'text-red-400' 
                                      : 'text-gray-400'
                                }`}>
                                  {calculateAlignment(miner, currentProposal) > 0 ? '+' : ''}
                                  {calculateAlignment(miner, currentProposal)}
                                </div>
                              </div>
                              
                              <div className="flex space-x-2">
                                <button
                                  className={`px-2 py-1 rounded-lg text-xs ${
                                    miner.stance === 'support'
                                      ? 'bg-green-500 text-black'
                                      : 'bg-green-900/20 text-green-400 hover:bg-green-900/30'
                                  }`}
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    setStakeholderStance(miner.id, 'support');
                                  }}
                                >
                                  Support
                                </button>
                                
                                <button
                                  className={`px-2 py-1 rounded-lg text-xs ${
                                    miner.stance === 'neutral'
                                      ? 'bg-yellow-500 text-black'
                                      : 'bg-yellow-900/20 text-yellow-400 hover:bg-yellow-900/30'
                                  }`}
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    setStakeholderStance(miner.id, 'neutral');
                                  }}
                                >
                                  Neutral
                                </button>
                                
                                <button
                                  className={`px-2 py-1 rounded-lg text-xs ${
                                    miner.stance === 'oppose'
                                      ? 'bg-red-500 text-black'
                                      : 'bg-red-900/20 text-red-400 hover:bg-red-900/30'
                                  }`}
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    setStakeholderStance(miner.id, 'oppose');
                                  }}
                                >
                                  Oppose
                                </button>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h4 className="font-medium text-amber-400 mb-2 flex items-center">
                    <Database className="h-4 w-4 mr-1" />
                    Node Operators
                  </h4>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {nodeOperators.map((node) => (
                      <div 
                        key={node.id}
                        className={`bg-black/30 border rounded-lg p-3 cursor-pointer transition-colors ${
                          node.stance === 'support'
                            ? 'border-green-500 bg-green-900/10'
                            : node.stance === 'oppose'
                              ? 'border-red-500 bg-red-900/10'
                              : node.stance === 'neutral'
                                ? 'border-yellow-500 bg-yellow-900/10'
                                : 'border-gray-700 hover:border-amber-700'
                        }`}
                        onClick={() => setShowStakeholderDetails(node.id === showStakeholderDetails ? null : node.id)}
                      >
                        <div className="flex justify-between">
                          <div className="flex items-center">
                            <div className="text-2xl mr-3">{node.avatar}</div>
                            <div>
                              <div className="font-medium text-gray-200">{node.name}</div>
                              <div className="text-xs text-gray-400">{node.description}</div>
                            </div>
                          </div>
                          
                          {node.stance && (
                            <div className={`h-6 w-6 rounded-full flex items-center justify-center ${
                              node.stance === 'support'
                                ? 'bg-green-500 text-black'
                                : node.stance === 'oppose'
                                  ? 'bg-red-500 text-black'
                                  : 'bg-yellow-500 text-black'
                            }`}>
                              {node.stance === 'support' ? (
                                <Check className="h-4 w-4" />
                              ) : node.stance === 'oppose' ? (
                                <X className="h-4 w-4" />
                              ) : (
                                <div className="h-2 w-2 bg-black rounded-full" />
                              )}
                            </div>
                          )}
                        </div>
                        
                        {showStakeholderDetails === node.id && (
                          <div className="mt-3 pt-3 border-t border-gray-800">
                            <h5 className="text-sm font-medium text-amber-400 mb-2">Priorities</h5>
                            
                            <div className="space-y-2">
                              <div>
                                <div className="flex justify-between text-xs mb-1">
                                  <span className="text-gray-400">Decentralization</span>
                                  <span className="text-gray-300">{node.priorities.decentralization}/10</span>
                                </div>
                                <div className="h-1.5 bg-gray-800 rounded-full overflow-hidden">
                                  <div 
                                    className="h-full bg-blue-500"
                                    style={{ width: `${node.priorities.decentralization * 10}%` }}
                                  ></div>
                                </div>
                              </div>
                              
                              <div>
                                <div className="flex justify-between text-xs mb-1">
                                  <span className="text-gray-400">Security</span>
                                  <span className="text-gray-300">{node.priorities.security}/10</span>
                                </div>
                                <div className="h-1.5 bg-gray-800 rounded-full overflow-hidden">
                                  <div 
                                    className="h-full bg-green-500"
                                    style={{ width: `${node.priorities.security * 10}%` }}
                                  ></div>
                                </div>
                              </div>
                              
                              <div>
                                <div className="flex justify-between text-xs mb-1">
                                  <span className="text-gray-400">Scalability</span>
                                  <span className="text-gray-300">{node.priorities.scalability}/10</span>
                                </div>
                                <div className="h-1.5 bg-gray-800 rounded-full overflow-hidden">
                                  <div 
                                    className="h-full bg-purple-500"
                                    style={{ width: `${node.priorities.scalability * 10}%` }}
                                  ></div>
                                </div>
                              </div>
                              
                              <div>
                                <div className="flex justify-between text-xs mb-1">
                                  <span className="text-gray-400">Privacy</span>
                                  <span className="text-gray-300">{node.priorities.privacy}/10</span>
                                </div>
                                <div className="h-1.5 bg-gray-800 rounded-full overflow-hidden">
                                  <div 
                                    className="h-full bg-yellow-500"
                                    style={{ width: `${node.priorities.privacy * 10}%` }}
                                  ></div>
                                </div>
                              </div>
                              
                              <div>
                                <div className="flex justify-between text-xs mb-1">
                                  <span className="text-gray-400">Usability</span>
                                  <span className="text-gray-300">{node.priorities.usability}/10</span>
                                </div>
                                <div className="h-1.5 bg-gray-800 rounded-full overflow-hidden">
                                  <div 
                                    className="h-full bg-red-500"
                                    style={{ width: `${node.priorities.usability * 10}%` }}
                                  ></div>
                                </div>
                              </div>
                            </div>
                            
                            <div className="mt-3 flex justify-between">
                              <div>
                                <div className="text-xs text-gray-400 mb-1">Alignment Score</div>
                                <div className={`font-medium ${
                                  calculateAlignment(node, currentProposal) > 0 
                                    ? 'text-green-400' 
                                    : calculateAlignment(node, currentProposal) < 0 
                                      ? 'text-red-400' 
                                      : 'text-gray-400'
                                }`}>
                                  {calculateAlignment(node, currentProposal) > 0 ? '+' : ''}
                                  {calculateAlignment(node, currentProposal)}
                                </div>
                              </div>
                              
                              <div className="flex space-x-2">
                                <button
                                  className={`px-2 py-1 rounded-lg text-xs ${
                                    node.stance === 'support'
                                      ? 'bg-green-500 text-black'
                                      : 'bg-green-900/20 text-green-400 hover:bg-green-900/30'
                                  }`}
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    setStakeholderStance(node.id, 'support');
                                  }}
                                >
                                  Support
                                </button>
                                
                                <button
                                  className={`px-2 py-1 rounded-lg text-xs ${
                                    node.stance === 'neutral'
                                      ? 'bg-yellow-500 text-black'
                                      : 'bg-yellow-900/20 text-yellow-400 hover:bg-yellow-900/30'
                                  }`}
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    setStakeholderStance(node.id, 'neutral');
                                  }}
                                >
                                  Neutral
                                </button>
                                
                                <button
                                  className={`px-2 py-1 rounded-lg text-xs ${
                                    node.stance === 'oppose'
                                      ? 'bg-red-500 text-black'
                                      : 'bg-red-900/20 text-red-400 hover:bg-red-900/30'
                                  }`}
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    setStakeholderStance(node.id, 'oppose');
                                  }}
                                >
                                  Oppose
                                </button>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h4 className="font-medium text-amber-400 mb-2 flex items-center">
                    <User className="h-4 w-4 mr-1" />
                    Users
                  </h4>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {users.map((user) => (
                      <div 
                        key={user.id}
                        className={`bg-black/30 border rounded-lg p-3 cursor-pointer transition-colors ${
                          user.stance === 'support'
                            ? 'border-green-500 bg-green-900/10'
                            : user.stance === 'oppose'
                              ? 'border-red-500 bg-red-900/10'
                              : user.stance === 'neutral'
                                ? 'border-yellow-500 bg-yellow-900/10'
                                : 'border-gray-700 hover:border-amber-700'
                        }`}
                        onClick={() => setShowStakeholderDetails(user.id === showStakeholderDetails ? null : user.id)}
                      >
                        <div className="flex justify-between">
                          <div className="flex items-center">
                            <div className="text-2xl mr-3">{user.avatar}</div>
                            <div>
                              <div className="font-medium text-gray-200">{user.name}</div>
                              <div className="text-xs text-gray-400">{user.description}</div>
                            </div>
                          </div>
                          
                          {user.stance && (
                            <div className={`h-6 w-6 rounded-full flex items-center justify-center ${
                              user.stance === 'support'
                                ? 'bg-green-500 text-black'
                                : user.stance === 'oppose'
                                  ? 'bg-red-500 text-black'
                                  : 'bg-yellow-500 text-black'
                            }`}>
                              {user.stance === 'support' ? (
                                <Check className="h-4 w-4" />
                              ) : user.stance === 'oppose' ? (
                                <X className="h-4 w-4" />
                              ) : (
                                <div className="h-2 w-2 bg-black rounded-full" />
                              )}
                            </div>
                          )}
                        </div>
                        
                        {showStakeholderDetails === user.id && (
                          <div className="mt-3 pt-3 border-t border-gray-800">
                            <h5 className="text-sm font-medium text-amber-400 mb-2">Priorities</h5>
                            
                            <div className="space-y-2">
                              <div>
                                <div className="flex justify-between text-xs mb-1">
                                  <span className="text-gray-400">Decentralization</span>
                                  <span className="text-gray-300">{user.priorities.decentralization}/10</span>
                                </div>
                                <div className="h-1.5 bg-gray-800 rounded-full overflow-hidden">
                                  <div 
                                    className="h-full bg-blue-500"
                                    style={{ width: `${user.priorities.decentralization * 10}%` }}
                                  ></div>
                                </div>
                              </div>
                              
                              <div>
                                <div className="flex justify-between text-xs mb-1">
                                  <span className="text-gray-400">Security</span>
                                  <span className="text-gray-300">{user.priorities.security}/10</span>
                                </div>
                                <div className="h-1.5 bg-gray-800 rounded-full overflow-hidden">
                                  <div 
                                    className="h-full bg-green-500"
                                    style={{ width: `${user.priorities.security * 10}%` }}
                                  ></div>
                                </div>
                              </div>
                              
                              <div>
                                <div className="flex justify-between text-xs mb-1">
                                  <span className="text-gray-400">Scalability</span>
                                  <span className="text-gray-300">{user.priorities.scalability}/10</span>
                                </div>
                                <div className="h-1.5 bg-gray-800 rounded-full overflow-hidden">
                                  <div 
                                    className="h-full bg-purple-500"
                                    style={{ width: `${user.priorities.scalability * 10}%` }}
                                  ></div>
                                </div>
                              </div>
                              
                              <div>
                                <div className="flex justify-between text-xs mb-1">
                                  <span className="text-gray-400">Privacy</span>
                                  <span className="text-gray-300">{user.priorities.privacy}/10</span>
                                </div>
                                <div className="h-1.5 bg-gray-800 rounded-full overflow-hidden">
                                  <div 
                                    className="h-full bg-yellow-500"
                                    style={{ width: `${user.priorities.privacy * 10}%` }}
                                  ></div>
                                </div>
                              </div>
                              
                              <div>
                                <div className="flex justify-between text-xs mb-1">
                                  <span className="text-gray-400">Usability</span>
                                  <span className="text-gray-300">{user.priorities.usability}/10</span>
                                </div>
                                <div className="h-1.5 bg-gray-800 rounded-full overflow-hidden">
                                  <div 
                                    className="h-full bg-red-500"
                                    style={{ width: `${user.priorities.usability * 10}%` }}
                                  ></div>
                                </div>
                              </div>
                            </div>
                            
                            <div className="mt-3 flex justify-between">
                              <div>
                                <div className="text-xs text-gray-400 mb-1">Alignment Score</div>
                                <div className={`font-medium ${
                                  calculateAlignment(user, currentProposal) > 0 
                                    ? 'text-green-400' 
                                    : calculateAlignment(user, currentProposal) < 0 
                                      ? 'text-red-400' 
                                      : 'text-gray-400'
                                }`}>
                                  {calculateAlignment(user, currentProposal) > 0 ? '+' : ''}
                                  {calculateAlignment(user, currentProposal)}
                                </div>
                              </div>
                              
                              <div className="flex space-x-2">
                                <button
                                  className={`px-2 py-1 rounded-lg text-xs ${
                                    user.stance === 'support'
                                      ? 'bg-green-500 text-black'
                                      : 'bg-green-900/20 text-green-400 hover:bg-green-900/30'
                                  }`}
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    setStakeholderStance(user.id, 'support');
                                  }}
                                >
                                  Support
                                </button>
                                
                                <button
                                  className={`px-2 py-1 rounded-lg text-xs ${
                                    user.stance === 'neutral'
                                      ? 'bg-yellow-500 text-black'
                                      : 'bg-yellow-900/20 text-yellow-400 hover:bg-yellow-900/30'
                                  }`}
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    setStakeholderStance(user.id, 'neutral');
                                  }}
                                >
                                  Neutral
                                </button>
                                
                                <button
                                  className={`px-2 py-1 rounded-lg text-xs ${
                                    user.stance === 'oppose'
                                      ? 'bg-red-500 text-black'
                                      : 'bg-red-900/20 text-red-400 hover:bg-red-900/30'
                                  }`}
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    setStakeholderStance(user.id, 'oppose');
                                  }}
                                >
                                  Oppose
                                </button>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {/* Results Tab */}
          {activeTab === 'results' && stakeholders.every(s => s.stance !== null) && (
            <div className="space-y-4">
              <div className="bg-black/30 border border-gray-800 rounded-lg p-4">
                <h4 className="font-medium text-amber-400 mb-3">Activation Thresholds</h4>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-400">Developers</span>
                      <span className="text-gray-300">
                        {currentProposal.developersSupport}% / {currentProposal.activationThreshold.developers}% needed
                      </span>
                    </div>
                    <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
                      <div 
                        className={`h-full ${getSupportBarColor(currentProposal.developersSupport, currentProposal.activationThreshold.developers)}`}
                        style={{ width: `${currentProposal.developersSupport}%` }}
                      ></div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-400">Miners</span>
                      <span className="text-gray-300">
                        {currentProposal.minersSupport}% / {currentProposal.activationThreshold.miners}% needed
                      </span>
                    </div>
                    <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
                      <div 
                        className={`h-full ${getSupportBarColor(currentProposal.minersSupport, currentProposal.activationThreshold.miners)}`}
                        style={{ width: `${currentProposal.minersSupport}%` }}
                      ></div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-400">Node Operators</span>
                      <span className="text-gray-300">
                        {currentProposal.nodeOperatorsSupport}% / {currentProposal.activationThreshold.nodeOperators}% needed
                      </span>
                    </div>
                    <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
                      <div 
                        className={`h-full ${getSupportBarColor(currentProposal.nodeOperatorsSupport, currentProposal.activationThreshold.nodeOperators)}`}
                        style={{ width: `${currentProposal.nodeOperatorsSupport}%` }}
                      ></div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-400">Users</span>
                      <span className="text-gray-300">
                        {currentProposal.usersSupport}% / {currentProposal.activationThreshold.users}% needed
                      </span>
                    </div>
                    <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
                      <div 
                        className={`h-full ${getSupportBarColor(currentProposal.usersSupport, currentProposal.activationThreshold.users)}`}
                        style={{ width: `${currentProposal.usersSupport}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-black/30 border border-gray-800 rounded-lg p-4">
                <h4 className="font-medium text-amber-400 mb-3">Result</h4>
                
                {currentProposal.result ? (
                  <div className={`p-4 rounded-lg ${
                    currentProposal.result === 'accepted'
                      ? 'bg-green-900/20 border border-green-700'
                      : 'bg-red-900/20 border border-red-700'
                  }`}>
                    <div className="flex items-center mb-2">
                      {currentProposal.result === 'accepted' ? (
                        <>
                          <Check className="h-5 w-5 text-green-400 mr-2" />
                          <h5 className="font-medium text-green-400">Proposal Accepted</h5>
                        </>
                      ) : (
                        <>
                          <X className="h-5 w-5 text-red-400 mr-2" />
                          <h5 className="font-medium text-red-400">Proposal Rejected</h5>
                        </>
                      )}
                    </div>
                    
                    <p className="text-gray-300 text-sm">
                      {currentProposal.result === 'accepted'
                        ? "The proposal has reached the required thresholds for activation and will be implemented."
                        : "The proposal failed to reach the required thresholds and will not be implemented."
                      }
                    </p>
                  </div>
                ) : (
                  <div className="flex flex-col items-center">
                    <p className="text-gray-300 mb-4">
                      {doesProposalPass(currentProposal)
                        ? "This proposal has reached all activation thresholds and can be accepted."
                        : "This proposal has not reached all required activation thresholds."
                      }
                    </p>
                    
                    <button
                      onClick={finalizeProposal}
                      className="px-4 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700"
                    >
                      Finalize Decision
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
        
        {/* Action buttons */}
        <div className="flex justify-center mt-6">
          {activeTab === 'stakeholders' && stakeholders.some(s => s.stance === null) && (
            <button
              onClick={simulateStakeholderDecisions}
              className="px-6 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 flex items-center"
            >
              Simulate Stakeholder Decisions
              <ArrowRight className="ml-2 h-4 w-4" />
            </button>
          )}
          
          {currentProposal.result && currentProposalIndex < proposals.length - 1 && (
            <button
              onClick={() => {
                setCurrentProposalIndex(currentProposalIndex + 1);
                resetForNextProposal();
              }}
              className="px-6 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 flex items-center"
            >
              Next Proposal
              <ArrowRight className="ml-2 h-4 w-4" />
            </button>
          )}
        </div>
      </div>
      
      {completed && (
        <div className="bg-green-900/20 border border-green-700 rounded-lg p-4 text-center">
          <h3 className="text-green-400 text-lg font-medium mb-2">Challenge Complete!</h3>
          <p className="text-gray-300">
            Congratulations! You've experienced Bitcoin's unique governance process where various stakeholders 
            with different priorities influence protocol changes through rough consensus. You now understand 
            how this decentralized approach protects Bitcoin from centralized control while allowing it to evolve.
          </p>
        </div>
      )}
    </div>
  );
}