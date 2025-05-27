import { useState, useEffect } from 'react';
import { GitFork, Check, X, Info, ArrowRight, AlertTriangle } from 'lucide-react';

interface ForkSimulatorProps {
  onComplete: () => void;
}

interface ForkScenario {
  id: number;
  title: string;
  description: string;
  options: {
    id: string;
    type: 'soft' | 'hard' | 'neither';
    text: string;
    consequences: string[];
  }[];
  completed: boolean;
  selectedOption: string | null;
}

export default function ForkSimulator({ onComplete }: ForkSimulatorProps) {
  const [scenarios, setScenarios] = useState<ForkScenario[]>([
    {
      id: 1,
      title: "Block Size Increase",
      description: "The community is debating increasing the maximum block size from 1MB to 8MB to allow more transactions per block. This would require all nodes to recognize larger blocks as valid.",
      options: [
        {
          id: "soft-fork-1",
          type: "soft",
          text: "Implement as a soft fork by introducing a new transaction format that fits more transactions within the existing 1MB limit",
          consequences: [
            "Older nodes continue to validate blocks but don't understand the new transaction format",
            "Network capacity increases but not as much as a direct block size increase",
            "Community remains unified on a single blockchain"
          ]
        },
        {
          id: "hard-fork-1",
          type: "hard",
          text: "Implement as a hard fork by directly increasing the maximum block size to 8MB",
          consequences: [
            "Older nodes reject the larger blocks as invalid",
            "The network splits, with some users following the original rules",
            "A new cryptocurrency (Bitcoin Cash) is created from the split",
            "Transaction capacity increases significantly on the new chain"
          ]
        }
      ],
      completed: false,
      selectedOption: null
    },
    {
      id: 2,
      title: "Transaction Signature Segregation",
      description: "Developers propose moving transaction signatures to a separate structure to save space and fix transaction malleability. This can be implemented without breaking compatibility with existing rules.",
      options: [
        {
          id: "soft-fork-2",
          type: "soft",
          text: "Implement as a soft fork by making signature data a separate witness structure that older nodes don't validate",
          consequences: [
            "Older nodes still validate blocks but are unaware of the new signature structure",
            "All nodes remain on the same blockchain",
            "Allows for second-layer solutions like Lightning Network",
            "Increases effective block capacity without changing the 1MB base size"
          ]
        },
        {
          id: "hard-fork-2",
          type: "hard",
          text: "Implement as a hard fork by requiring all nodes to understand and validate the new signature structure",
          consequences: [
            "Forces all users to upgrade their software",
            "Creates a potential chain split if not everyone upgrades",
            "Could lead to network fragmentation and user confusion",
            "Provides no significant advantage over the soft fork approach in this case"
          ]
        }
      ],
      completed: false,
      selectedOption: null
    },
    {
      id: 3,
      title: "New Cryptographic Signature Scheme",
      description: "Developers want to introduce Schnorr signatures to replace the current ECDSA signature scheme, allowing for more efficient multi-signature transactions and enhanced privacy.",
      options: [
        {
          id: "neither-3",
          type: "neither",
          text: "Make no changes to the protocol and maintain the current signature scheme",
          consequences: [
            "No disruption to the network",
            "Miss opportunity for improved efficiency and privacy",
            "Development of certain advanced features remains more difficult",
            "Status quo is maintained"
          ]
        },
        {
          id: "soft-fork-3",
          type: "soft",
          text: "Implement as a soft fork by introducing a new transaction version that supports Schnorr signatures",
          consequences: [
            "Older nodes continue functioning without modification",
            "New privacy and efficiency features become available to upgraded users",
            "Gradual adoption without forcing anyone to upgrade",
            "Minimal risk of chain splits while enabling innovation"
          ]
        }
      ],
      completed: false,
      selectedOption: null
    },
    {
      id: 4,
      title: "Proof-of-Work Algorithm Change",
      description: "A group within the community wants to change Bitcoin's mining algorithm from SHA-256 to a different algorithm to make mining more accessible to those without specialized hardware.",
      options: [
        {
          id: "hard-fork-4",
          type: "hard",
          text: "Implement as a hard fork by switching to a new proof-of-work algorithm",
          consequences: [
            "Existing mining hardware becomes obsolete for the new chain",
            "The network splits into two separate cryptocurrencies",
            "Mining becomes temporarily more accessible on the new chain",
            "Security implications as mining power is redistributed"
          ]
        },
        {
          id: "neither-4",
          type: "neither",
          text: "Maintain the current SHA-256 algorithm and focus on layer-two solutions instead",
          consequences: [
            "Network security remains backed by extensive SHA-256 mining infrastructure",
            "Mining continues to require specialized hardware",
            "No chain split occurs, preserving network effects",
            "Community remains focused on a single Bitcoin implementation"
          ]
        }
      ],
      completed: false,
      selectedOption: null
    }
  ]);
  
  const [currentScenarioIndex, setCurrentScenarioIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [showResults, setShowResults] = useState(false);
  const [feedback, setFeedback] = useState<string>('');
  const [completed, setCompleted] = useState(false);
  const [showInfo, setShowInfo] = useState(false);
  
  // Get current scenario
  const currentScenario = scenarios[currentScenarioIndex];
  
  // Handle option selection
  const selectOption = (optionId: string) => {
    if (showResults) return;
    
    setSelectedOption(optionId);
  };
  
  // Handle submit decision
  const submitDecision = () => {
    if (!selectedOption) return;
    
    // Update scenarios state
    setScenarios(prev => {
      const newScenarios = [...prev];
      newScenarios[currentScenarioIndex] = {
        ...newScenarios[currentScenarioIndex],
        completed: true,
        selectedOption
      };
      return newScenarios;
    });
    
    // Show results
    setShowResults(true);
    
    // Generate feedback
    const option = currentScenario.options.find(opt => opt.id === selectedOption);
    if (option) {
      if (currentScenario.id === 1 && option.type === 'hard') {
        setFeedback("This approach was taken by Bitcoin Cash in 2017, creating a permanent split from Bitcoin. While it increased transaction capacity, it divided the community and resources.");
      } else if (currentScenario.id === 2 && option.type === 'soft') {
        setFeedback("This is how SegWit was implemented in 2017. As a soft fork, it successfully upgraded Bitcoin without forcing a chain split, demonstrating the power of backward-compatible changes.");
      } else if (currentScenario.id === 3 && option.type === 'soft') {
        setFeedback("This approach was taken with the Taproot upgrade in 2021, which introduced Schnorr signatures through a soft fork, maintaining network unity while enabling new capabilities.");
      } else if (currentScenario.id === 4 && option.type === 'hard') {
        setFeedback("This approach was taken by Bitcoin Gold in 2017, which changed the mining algorithm but gained limited adoption and faces ongoing security challenges compared to Bitcoin.");
      } else {
        setFeedback("This approach would likely face challenges gaining consensus among Bitcoin's diverse stakeholders. Consider the trade-offs between innovation and stability.");
      }
    }
  };
  
  // Move to next scenario
  const nextScenario = () => {
    if (currentScenarioIndex < scenarios.length - 1) {
      setCurrentScenarioIndex(currentScenarioIndex + 1);
      setSelectedOption(null);
      setShowResults(false);
      setFeedback('');
    } else {
      // All scenarios completed
      setCompleted(true);
      setTimeout(onComplete, 2000);
    }
  };
  
  return (
    <div className="bg-black text-gray-100 p-6 rounded-lg border border-amber-900/30">
      <div className="mb-6">
        <div className="flex justify-between items-start mb-4">
          <h2 className="text-2xl font-bold text-amber-500">Path of the Fork</h2>
          
          <button 
            onClick={() => setShowInfo(!showInfo)} 
            className="text-xs p-2 bg-amber-900/20 rounded-full hover:bg-amber-900/30"
          >
            <Info className="h-4 w-4 text-amber-400" />
          </button>
        </div>
        
        {showInfo && (
          <div className="mb-4 bg-amber-900/10 border border-amber-900/30 rounded-lg p-4 text-sm">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h3 className="font-medium text-amber-400 mb-2">Soft Forks</h3>
                <p className="text-gray-300">
                  Soft forks add new rules that restrict what was previously valid. They are backward compatible, 
                  meaning non-upgraded nodes still accept blocks from upgraded nodes, though they might not 
                  understand all the new features.
                </p>
                <p className="text-gray-300 mt-2">
                  Examples: SegWit, P2SH, Taproot
                </p>
              </div>
              
              <div>
                <h3 className="font-medium text-amber-400 mb-2">Hard Forks</h3>
                <p className="text-gray-300">
                  Hard forks loosen rules or add rules incompatible with previous versions. They are not backward compatible, 
                  creating a permanent split in the blockchain if not all users upgrade. They can result in two separate cryptocurrencies.
                </p>
                <p className="text-gray-300 mt-2">
                  Examples: Bitcoin Cash, Bitcoin Gold
                </p>
              </div>
            </div>
          </div>
        )}
        
        <p className="text-gray-300 mb-4">
          Navigate different fork scenarios in Bitcoin's development. For each proposal, choose whether to implement it 
          as a soft fork, hard fork, or maintain the status quo, then see the consequences of your decision.
        </p>
        
        {/* Progress bar */}
        <div className="mb-6">
          <div className="flex justify-between text-xs text-gray-500 mb-1">
            <span>Scenario {currentScenarioIndex + 1} of {scenarios.length}</span>
            <span>{Math.round(((scenarios.filter(s => s.completed).length) / scenarios.length) * 100)}% Complete</span>
          </div>
          <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
            <div 
              className="h-full bg-amber-600 transition-all"
              style={{ width: `${((scenarios.filter(s => s.completed).length) / scenarios.length) * 100}%` }}
            ></div>
          </div>
        </div>
        
        {/* Current scenario */}
        <div className="bg-gray-900/50 border border-gray-800 rounded-lg p-5 mb-6">
          <h3 className="text-xl font-medium text-amber-400 mb-3 flex items-center">
            <GitFork className="h-5 w-5 mr-2" />
            {currentScenario.title}
          </h3>
          
          <p className="text-gray-300 mb-6">
            {currentScenario.description}
          </p>
          
          <div className="space-y-4">
            {currentScenario.options.map((option) => (
              <div 
                key={option.id}
                className={`p-4 border rounded-lg cursor-pointer transition-all ${
                  showResults && selectedOption === option.id
                    ? 'border-amber-500 bg-amber-900/20'
                    : selectedOption === option.id
                      ? 'border-amber-500 bg-amber-900/10'
                      : 'border-gray-700 bg-black/30 hover:border-gray-600'
                }`}
                onClick={() => selectOption(option.id)}
              >
                <div className="flex items-start">
                  <div className={`h-5 w-5 rounded-full mr-3 flex-shrink-0 flex items-center justify-center mt-0.5 ${
                    selectedOption === option.id
                      ? 'bg-amber-500 text-black'
                      : 'border border-gray-600'
                  }`}>
                    {selectedOption === option.id && <Check className="h-3 w-3" />}
                  </div>
                  
                  <div>
                    <div className="flex items-center mb-2">
                      <span className="text-gray-200 font-medium">{option.text}</span>
                      {showResults && (
                        <span className={`ml-3 text-xs px-2 py-0.5 rounded ${
                          option.type === 'soft' 
                            ? 'bg-blue-900/30 text-blue-300' 
                            : option.type === 'hard'
                              ? 'bg-red-900/30 text-red-300'
                              : 'bg-gray-700 text-gray-300'
                        }`}>
                          {option.type === 'soft' 
                            ? 'Soft Fork' 
                            : option.type === 'hard' 
                              ? 'Hard Fork' 
                              : 'No Fork'}
                        </span>
                      )}
                    </div>
                    
                    {showResults && selectedOption === option.id && (
                      <div className="mt-3 space-y-2">
                        <h4 className="text-sm font-medium text-amber-400">Consequences:</h4>
                        <ul className="list-disc ml-5 space-y-1">
                          {option.consequences.map((consequence, idx) => (
                            <li key={idx} className="text-sm text-gray-300">
                              {consequence}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Feedback */}
        {showResults && (
          <div className="bg-amber-900/10 border border-amber-900/30 rounded-lg p-4 mb-6">
            <h4 className="font-medium text-amber-400 mb-2 flex items-center">
              <Info className="h-4 w-4 mr-2" />
              Historical Context
            </h4>
            <p className="text-gray-300 text-sm">
              {feedback}
            </p>
          </div>
        )}
        
        {/* Action buttons */}
        <div className="flex justify-center">
          {!showResults ? (
            <button
              onClick={submitDecision}
              disabled={!selectedOption}
              className={`px-6 py-2 rounded-lg font-medium ${
                !selectedOption
                  ? 'bg-gray-700 text-gray-500 cursor-not-allowed'
                  : 'bg-amber-600 text-white hover:bg-amber-700'
              }`}
            >
              Implement Decision
            </button>
          ) : (
            <button
              onClick={nextScenario}
              className="px-6 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 flex items-center"
            >
              {currentScenarioIndex < scenarios.length - 1 ? (
                <>Next Scenario <ArrowRight className="ml-2 h-4 w-4" /></>
              ) : (
                <>Complete Challenge</>
              )}
            </button>
          )}
        </div>
      </div>
      
      {completed && (
        <div className="bg-green-900/20 border border-green-700 rounded-lg p-4 text-center">
          <h3 className="text-green-400 text-lg font-medium mb-2">Challenge Complete!</h3>
          <p className="text-gray-300">
            Congratulations! You've navigated the complex decision-making process of Bitcoin forks. 
            You now understand the difference between soft forks and hard forks, and the significant 
            technical and social considerations that go into protocol changes.
          </p>
        </div>
      )}
    </div>
  );
}