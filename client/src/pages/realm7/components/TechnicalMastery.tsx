import React, { useState } from 'react';
import { AlertTriangle, Check, Code, Database, FileCheck, Key, Lock, Terminal, X, ArrowRight, Server, Cpu, BarChart, Hexagon } from 'lucide-react';

interface TechnicalMasteryProps {
  onComplete: () => void;
}

interface Question {
  id: string;
  text: string;
  area: 'cryptography' | 'protocol' | 'script' | 'layer2' | 'network';
  difficulty: 'medium' | 'hard';
  options: {
    id: string;
    text: string;
    isCorrect: boolean;
  }[];
  explanation: string;
  codeExample?: string;
  selectedOption: string | null;
  isCorrect: boolean | null;
}

export default function TechnicalMastery({ onComplete }: TechnicalMasteryProps) {
  // Define technical questions spanning all realms
  const [questions, setQuestions] = useState<Question[]>([
    // Cryptography
    {
      id: 'crypto1',
      text: "In Bitcoin's elliptic curve digital signature algorithm (ECDSA), what information is used to verify that a transaction was authorized by the owner of an address?",
      area: 'cryptography',
      difficulty: 'medium',
      options: [
        {
          id: 'crypto1a',
          text: "The transaction signature, the public key, and the transaction data",
          isCorrect: true
        },
        {
          id: 'crypto1b',
          text: "The private key and transaction hash",
          isCorrect: false
        },
        {
          id: 'crypto1c',
          text: "The Bitcoin address and the transaction amount",
          isCorrect: false
        },
        {
          id: 'crypto1d',
          text: "The password and username of the wallet account",
          isCorrect: false
        }
      ],
      explanation: "ECDSA verification uses the transaction signature (created with the private key), the transaction data that was signed, and the signer's public key. The verification algorithm mathematically confirms that only the corresponding private key could have produced the signature, without exposing the private key itself.",
      codeExample: `
// Pseudocode for ECDSA verification
function verifySignature(publicKey, signature, transactionData) {
  // 1. Compute the hash of the transaction data
  let messageHash = sha256(transactionData)
  
  // 2. Extract r and s values from signature
  let [r, s] = signature
  
  // 3. Perform elliptic curve operations
  let point = ecMultiply(ecBasePoint, messageHash)
  let pubKeyPoint = ecMultiply(publicKey, s)
  let result = ecAdd(point, pubKeyPoint)
  
  // 4. If result matches r, signature is valid
  return result == r
}
      `,
      selectedOption: null,
      isCorrect: null
    },
    {
      id: 'crypto2',
      text: "What is the significance of the 'nonce' in a Bitcoin block header?",
      area: 'cryptography',
      difficulty: 'medium',
      options: [
        {
          id: 'crypto2a',
          text: "It's the value miners modify to try to produce a block hash below the target difficulty",
          isCorrect: true
        },
        {
          id: 'crypto2b',
          text: "It uniquely identifies each transaction in the block",
          isCorrect: false
        },
        {
          id: 'crypto2c',
          text: "It's a timestamp that prevents block reordering",
          isCorrect: false
        },
        {
          id: 'crypto2d',
          text: "It stores the Merkle root of all previous blocks",
          isCorrect: false
        }
      ],
      explanation: "The nonce (number used once) is the field miners increment while attempting to find a valid block. By changing the nonce and rehashing the block header, miners try to find a hash that's below the target difficulty. This is the core of the proof-of-work system that secures Bitcoin.",
      codeExample: `
// Pseudocode for mining process
function mineBlock(blockHeader, targetDifficulty) {
  let nonce = 0
  
  while (true) {
    // Insert current nonce into block header
    blockHeader.nonce = nonce
    
    // Hash the full block header
    let blockHash = sha256(sha256(blockHeader))
    
    // Check if hash is below target difficulty
    if (blockHash < targetDifficulty) {
      return { nonce, blockHash }
    }
    
    // Try next nonce value
    nonce++
  }
}
      `,
      selectedOption: null,
      isCorrect: null
    },
    
    // Protocol
    {
      id: 'protocol1',
      text: "When a transaction is spending a P2PKH (Pay to Public Key Hash) output, what structure must be provided in the scriptSig to unlock the funds?",
      area: 'protocol',
      difficulty: 'hard',
      options: [
        {
          id: 'protocol1a',
          text: "A signature and a public key that hashes to match the public key hash",
          isCorrect: true
        },
        {
          id: 'protocol1b',
          text: "The private key corresponding to the public key hash",
          isCorrect: false
        },
        {
          id: 'protocol1c',
          text: "Only the signature from the private key",
          isCorrect: false
        },
        {
          id: 'protocol1d',
          text: "A Bitcoin address and the signature",
          isCorrect: false
        }
      ],
      explanation: "A P2PKH scriptSig must contain both a valid signature and the full public key that, when hashed, matches the public key hash specified in the output. The script execution involves pushing these values onto the stack, then verifying both that the signature is valid for the transaction and that the public key hashes to the expected value.",
      codeExample: `
// P2PKH Script Execution

// scriptPubKey (in the output being spent)
OP_DUP
OP_HASH160
<pubKeyHash>  // This is the Bitcoin address without the version byte and checksum
OP_EQUALVERIFY
OP_CHECKSIG

// scriptSig (provided by the spender)
<signature>
<publicKey>

// Execution stack (combined scripts)
<signature> <publicKey> OP_DUP OP_HASH160 <pubKeyHash> OP_EQUALVERIFY OP_CHECKSIG

// After execution, if both the signature is valid for the transaction
// and the hash of the public key matches the pubKeyHash, 
// the result is TRUE and the funds can be spent
      `,
      selectedOption: null,
      isCorrect: null
    },
    {
      id: 'protocol2',
      text: "What happens in a 'block reorg' and why is the 6-confirmation guideline important?",
      area: 'protocol',
      difficulty: 'hard',
      options: [
        {
          id: 'protocol2a',
          text: "Some blocks are replaced when a competing chain with more accumulated proof-of-work is found; 6 confirmations makes reorganization exponentially less likely",
          isCorrect: true
        },
        {
          id: 'protocol2b',
          text: "Miners reorganize transactions within a block; 6 confirmations means all miners have verified the transactions",
          isCorrect: false
        },
        {
          id: 'protocol2c',
          text: "The network reorganizes mining pools; 6 confirmations ensures no pool has over 51% of hashpower",
          isCorrect: false
        },
        {
          id: 'protocol2d',
          text: "The Bitcoin core developers reorganize the blockchain; 6 confirmations provides time for developer review",
          isCorrect: false
        }
      ],
      explanation: "A block reorganization occurs when a competing chain with greater cumulative proof-of-work is discovered, causing nodes to switch to it and 'orphan' previously accepted blocks. Transactions in orphaned blocks return to the mempool if still valid. With each additional confirmation, the probability of a transaction being reversed decreases exponentially, with 6 confirmations making a reversal extremely unlikely under normal network conditions.",
      selectedOption: null,
      isCorrect: null
    },
    
    // Script
    {
      id: 'script1',
      text: "Which Bitcoin script opcode would be required to implement a time-locked transaction that can only be spent after a certain block height?",
      area: 'script',
      difficulty: 'hard',
      options: [
        {
          id: 'script1a',
          text: "OP_CHECKLOCKTIMEVERIFY",
          isCorrect: true
        },
        {
          id: 'script1b',
          text: "OP_TIMEWAIT",
          isCorrect: false
        },
        {
          id: 'script1c',
          text: "OP_BLOCKTIMELOCK",
          isCorrect: false
        },
        {
          id: 'script1d',
          text: "OP_CHECKTIME",
          isCorrect: false
        }
      ],
      explanation: "OP_CHECKLOCKTIMEVERIFY (also known as CLTV or previously as BIP65) allows a script to check if the earliest time or block height has been reached when attempting to spend an output. If the current block height is less than the specified value, the script fails, making the output unspendable until the specified time.",
      codeExample: `
// Time-locked script that can't be spent until block 700,000

// scriptPubKey
<700000> OP_CHECKLOCKTIMEVERIFY OP_DROP
OP_DUP OP_HASH160 <pubKeyHash> OP_EQUALVERIFY OP_CHECKSIG

// This combines a timelock with a standard P2PKH script
// The transaction spending this output must also have its nLockTime field
// set to at least 700000, and OP_CHECKLOCKTIMEVERIFY will verify this
      `,
      selectedOption: null,
      isCorrect: null
    },
    {
      id: 'script2',
      text: "What is the purpose of the 'OP_RETURN' opcode in Bitcoin script?",
      area: 'script',
      difficulty: 'medium',
      options: [
        {
          id: 'script2a',
          text: "To create an unspendable output that can store a small amount of arbitrary data on the blockchain",
          isCorrect: true
        },
        {
          id: 'script2b',
          text: "To return bitcoins to the previous owner if a condition fails",
          isCorrect: false
        },
        {
          id: 'script2c',
          text: "To terminate a script with an error and invalidate the transaction",
          isCorrect: false
        },
        {
          id: 'script2d',
          text: "To call a function in a smart contract and return its value",
          isCorrect: false
        }
      ],
      explanation: "OP_RETURN immediately marks a transaction output as unspendable and allows up to 80 bytes of arbitrary data to be included after it. This provides a standardized way to store small amounts of data in the blockchain (such as document hashes, timestamps, or messages) without creating unspendable 'fake addresses' that bloat the UTXO set.",
      codeExample: `
// Example OP_RETURN data storage

// scriptPubKey
OP_RETURN <data up to 80 bytes>

// The data could be anything, for example:
OP_RETURN 0x48656c6c6f20776f726c6421  // "Hello world!" in hex

// This output is provably unspendable, so nodes don't need to
// track it in their UTXO set, which helps avoid blockchain bloat
      `,
      selectedOption: null,
      isCorrect: null
    },
    
    // Layer2
    {
      id: 'layer1',
      text: "In a Lightning Network channel, what happens if one party tries to broadcast an outdated channel state to the blockchain?",
      area: 'layer2',
      difficulty: 'hard',
      options: [
        {
          id: 'layer1a',
          text: "The counterparty can use their justice transaction and penalty key to claim all funds in the channel",
          isCorrect: true
        },
        {
          id: 'layer1b',
          text: "The Lightning Network automatically rejects the outdated state",
          isCorrect: false
        },
        {
          id: 'layer1c',
          text: "The network waits for majority consensus from other Lightning nodes",
          isCorrect: false
        },
        {
          id: 'layer1d',
          text: "Bitcoin miners will reject the transaction as invalid",
          isCorrect: false
        }
      ],
      explanation: "Lightning Network uses a penalty mechanism to prevent channel state cheating. Each time the channel state updates, both parties exchange penalty keys for the previous state. If someone broadcasts an outdated state, their counterparty has a timeframe to prove it's outdated by using the relevant penalty key, allowing them to claim all funds in the channel as punishment for the attempted fraud.",
      selectedOption: null,
      isCorrect: null
    },
    {
      id: 'layer2',
      text: "Which of these statements about Lightning Network routing is correct?",
      area: 'layer2',
      difficulty: 'medium',
      options: [
        {
          id: 'layer2a',
          text: "Each hop in a Lightning payment route cannot determine the payment's final destination or its origin",
          isCorrect: true
        },
        {
          id: 'layer2b',
          text: "All Lightning nodes must know the complete network topology to route payments",
          isCorrect: false
        },
        {
          id: 'layer2c',
          text: "Lightning payments must travel through centralized hub nodes",
          isCorrect: false
        },
        {
          id: 'layer2d',
          text: "Routing fees are fixed across the entire network",
          isCorrect: false
        }
      ],
      explanation: "Lightning Network uses onion routing, similar to Tor. Each hop in the payment route can only decrypt its own instructions, which include forwarding information for the next hop but no details about the payment's final destination or origin. This preserves privacy while still allowing successful routing across multiple payment channels.",
      selectedOption: null,
      isCorrect: null
    },
    
    // Network
    {
      id: 'network1',
      text: "Which statement correctly describes Bitcoin's mempool?",
      area: 'network',
      difficulty: 'medium',
      options: [
        {
          id: 'network1a',
          text: "It's a local node's collection of unconfirmed valid transactions waiting to be included in blocks",
          isCorrect: true
        },
        {
          id: 'network1b',
          text: "It's a centralized database of all Bitcoin transactions maintained by miners",
          isCorrect: false
        },
        {
          id: 'network1c',
          text: "It's a backup of the blockchain stored on specialized memory pool servers",
          isCorrect: false
        },
        {
          id: 'network1d',
          text: "It's a pool of mining resources shared between cooperating miners",
          isCorrect: false
        }
      ],
      explanation: "The mempool (memory pool) is specific to each individual Bitcoin node and contains valid unconfirmed transactions that the node has received and verified but haven't yet been included in a block. Mempools can vary between nodes based on their capacity settings, eviction policies, and network connectivity.",
      selectedOption: null,
      isCorrect: null
    },
    {
      id: 'network2',
      text: "What is the purpose of Simplified Payment Verification (SPV) in Bitcoin?",
      area: 'network',
      difficulty: 'medium',
      options: [
        {
          id: 'network2a',
          text: "To allow lightweight clients to verify transactions without downloading the entire blockchain",
          isCorrect: true
        },
        {
          id: 'network2b',
          text: "To simplify the process of making Bitcoin payments for non-technical users",
          isCorrect: false
        },
        {
          id: 'network2c',
          text: "To reduce the transaction fees by simplifying the transaction structure",
          isCorrect: false
        },
        {
          id: 'network2d',
          text: "To verify that miners have correctly validated all transactions",
          isCorrect: false
        }
      ],
      explanation: "SPV (described in the original Bitcoin whitepaper) allows lightweight clients to verify that a transaction is included in a block without downloading and validating the entire blockchain. This works by checking the transaction against block headers and using Merkle proofs, requiring significantly less storage and computational resources than running a full node.",
      codeExample: `
// Simplified pseudocode for SPV verification

function verifyTransaction(transaction, blockHeader, merkleProof) {
  // 1. Verify the block header has sufficient proof-of-work
  let blockHash = sha256(sha256(blockHeader))
  if (blockHash > targetDifficulty) {
    return false // Invalid block
  }
  
  // 2. Compute the transaction hash
  let txHash = sha256(sha256(transaction))
  
  // 3. Verify the merkle proof links this transaction to the block's merkle root
  let calculatedRoot = computeMerkleRoot(txHash, merkleProof)
  
  // 4. Check if calculated root matches the merkle root in the block header
  return calculatedRoot === blockHeader.merkleRoot
}
      `,
      selectedOption: null,
      isCorrect: null
    },
  ]);
  
  // Component state
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [currentArea, setCurrentArea] = useState<string | null>(null);
  const [filteredQuestions, setFilteredQuestions] = useState(questions);
  const [showCodeExample, setShowCodeExample] = useState(false);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [completed, setCompleted] = useState(false);
  const [showResults, setShowResults] = useState(false);
  
  // Apply area filter when it changes
  React.useEffect(() => {
    if (currentArea === null) {
      setFilteredQuestions(questions);
    } else {
      setFilteredQuestions(questions.filter(q => q.area === currentArea));
    }
    setCurrentQuestionIndex(0);
  }, [currentArea, questions]);
  
  // Get current question
  const currentQuestion = filteredQuestions[currentQuestionIndex];
  
  // Handle selecting an answer
  const selectAnswer = (questionId: string, optionId: string) => {
    const updatedQuestions = questions.map(q => {
      if (q.id === questionId) {
        const selectedOption = q.options.find(o => o.id === optionId);
        return {
          ...q,
          selectedOption: optionId,
          isCorrect: selectedOption ? selectedOption.isCorrect : false
        };
      }
      return q;
    });
    
    setQuestions(updatedQuestions);
    
    // Update filtered questions too
    if (currentArea === null) {
      setFilteredQuestions(updatedQuestions);
    } else {
      setFilteredQuestions(updatedQuestions.filter(q => q.area === currentArea));
    }
    
    // Calculate correct answers
    const correct = updatedQuestions.filter(q => q.isCorrect).length;
    setCorrectAnswers(correct);
  };
  
  // Navigate to previous question
  const prevQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
      setShowCodeExample(false);
    }
  };
  
  // Navigate to next question
  const nextQuestion = () => {
    if (currentQuestionIndex < filteredQuestions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setShowCodeExample(false);
    } else {
      // Reached the end of questions
      setShowResults(true);
    }
  };
  
  // Get area icon
  const getAreaIcon = (area: string) => {
    switch (area) {
      case 'cryptography':
        return <Key className="h-5 w-5" />;
      case 'protocol':
        return <Database className="h-5 w-5" />;
      case 'script':
        return <Code className="h-5 w-5" />;
      case 'layer2':
        return <Hexagon className="h-5 w-5" />;
      case 'network':
        return <Server className="h-5 w-5" />;
      default:
        return <Terminal className="h-5 w-5" />;
    }
  };
  
  // Get difficulty color
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'medium':
        return 'bg-yellow-900/30 text-yellow-400';
      case 'hard':
        return 'bg-red-900/30 text-red-400';
      default:
        return 'bg-blue-900/30 text-blue-400';
    }
  };
  
  // Complete the mastery challenge
  const completeChallenge = () => {
    setCompleted(true);
    setTimeout(onComplete, 2000);
  };
  
  // Get area stats
  const getAreaStats = (area: string) => {
    const areaQuestions = questions.filter(q => q.area === area);
    const answered = areaQuestions.filter(q => q.selectedOption !== null).length;
    const correct = areaQuestions.filter(q => q.isCorrect).length;
    const total = areaQuestions.length;
    
    return {
      answered,
      correct,
      total,
      percent: answered > 0 ? Math.round((correct / answered) * 100) : 0
    };
  };
  
  return (
    <div className="space-y-6">
      {/* Technical areas */}
      <div className="flex flex-wrap gap-2 pb-4 border-b border-gray-800">
        <button
          onClick={() => setCurrentArea(null)}
          className={`flex items-center px-3 py-1.5 rounded-lg whitespace-nowrap text-sm transition-colors ${
            currentArea === null
              ? 'bg-purple-900/30 text-purple-400 border border-purple-800'
              : 'bg-gray-800/50 text-gray-400 border border-gray-800 hover:bg-gray-800'
          }`}
        >
          <Terminal className="h-4 w-4 mr-2" />
          All Areas
        </button>
        
        <button
          onClick={() => setCurrentArea('cryptography')}
          className={`flex items-center px-3 py-1.5 rounded-lg whitespace-nowrap text-sm transition-colors ${
            currentArea === 'cryptography'
              ? 'bg-blue-900/30 text-blue-400 border border-blue-800'
              : 'bg-gray-800/50 text-gray-400 border border-gray-800 hover:bg-gray-800'
          }`}
        >
          <Key className="h-4 w-4 mr-2" />
          Cryptography
        </button>
        
        <button
          onClick={() => setCurrentArea('protocol')}
          className={`flex items-center px-3 py-1.5 rounded-lg whitespace-nowrap text-sm transition-colors ${
            currentArea === 'protocol'
              ? 'bg-green-900/30 text-green-400 border border-green-800'
              : 'bg-gray-800/50 text-gray-400 border border-gray-800 hover:bg-gray-800'
          }`}
        >
          <Database className="h-4 w-4 mr-2" />
          Protocol
        </button>
        
        <button
          onClick={() => setCurrentArea('script')}
          className={`flex items-center px-3 py-1.5 rounded-lg whitespace-nowrap text-sm transition-colors ${
            currentArea === 'script'
              ? 'bg-yellow-900/30 text-yellow-400 border border-yellow-800'
              : 'bg-gray-800/50 text-gray-400 border border-gray-800 hover:bg-gray-800'
          }`}
        >
          <Code className="h-4 w-4 mr-2" />
          Script
        </button>
        
        <button
          onClick={() => setCurrentArea('layer2')}
          className={`flex items-center px-3 py-1.5 rounded-lg whitespace-nowrap text-sm transition-colors ${
            currentArea === 'layer2'
              ? 'bg-red-900/30 text-red-400 border border-red-800'
              : 'bg-gray-800/50 text-gray-400 border border-gray-800 hover:bg-gray-800'
          }`}
        >
          <Hexagon className="h-4 w-4 mr-2" />
          Layer 2
        </button>
        
        <button
          onClick={() => setCurrentArea('network')}
          className={`flex items-center px-3 py-1.5 rounded-lg whitespace-nowrap text-sm transition-colors ${
            currentArea === 'network'
              ? 'bg-cyan-900/30 text-cyan-400 border border-cyan-800'
              : 'bg-gray-800/50 text-gray-400 border border-gray-800 hover:bg-gray-800'
          }`}
        >
          <Server className="h-4 w-4 mr-2" />
          Network
        </button>
      </div>
      
      {!showResults && (
        <>
          {/* Progress indicator */}
          <div className="mb-4">
            <div className="flex justify-between text-xs text-gray-500 mb-1">
              <span>Question {currentQuestionIndex + 1} of {filteredQuestions.length}</span>
              <span>{Math.round(((currentQuestionIndex) / filteredQuestions.length) * 100)}% Complete</span>
            </div>
            <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
              <div 
                className="h-full bg-purple-600 transition-all duration-300"
                style={{ width: `${(currentQuestionIndex / filteredQuestions.length) * 100}%` }}
              ></div>
            </div>
          </div>
          
          {/* Question card */}
          <div className="bg-gray-900/50 border border-gray-800 rounded-lg overflow-hidden">
            <div className="p-4 border-b border-gray-800 bg-gray-900/70">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className={`
                    p-2 rounded-lg mr-3
                    ${currentQuestion.area === 'cryptography' ? 'bg-blue-900/30 text-blue-400' : ''}
                    ${currentQuestion.area === 'protocol' ? 'bg-green-900/30 text-green-400' : ''}
                    ${currentQuestion.area === 'script' ? 'bg-yellow-900/30 text-yellow-400' : ''}
                    ${currentQuestion.area === 'layer2' ? 'bg-red-900/30 text-red-400' : ''}
                    ${currentQuestion.area === 'network' ? 'bg-cyan-900/30 text-cyan-400' : ''}
                  `}>
                    {getAreaIcon(currentQuestion.area)}
                  </div>
                  <div>
                    <div className="text-sm text-gray-400 capitalize">{currentQuestion.area}</div>
                    <div className="flex items-center">
                      <div className={`text-xs px-2 py-0.5 rounded mr-2 ${getDifficultyColor(currentQuestion.difficulty)}`}>
                        {currentQuestion.difficulty}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="p-5">
              <h3 className="text-lg font-medium text-gray-200 mb-6">
                {currentQuestion.text}
              </h3>
              
              <div className="space-y-3 mb-6">
                {currentQuestion.options.map((option) => {
                  let optionClass = '';
                  
                  if (currentQuestion.selectedOption !== null) {
                    if (option.isCorrect) {
                      optionClass = 'border-green-500 bg-green-900/20';
                    } else if (currentQuestion.selectedOption === option.id) {
                      optionClass = 'border-red-500 bg-red-900/20';
                    } else {
                      optionClass = 'border-gray-700 bg-black/30';
                    }
                  } else {
                    optionClass = 'border-gray-700 bg-black/30 hover:border-gray-600';
                  }
                  
                  return (
                    <div
                      key={option.id}
                      className={`p-4 border rounded-lg cursor-pointer transition-all ${optionClass}`}
                      onClick={() => !currentQuestion.selectedOption && selectAnswer(currentQuestion.id, option.id)}
                    >
                      <div className="flex items-start">
                        <div className={`h-5 w-5 rounded-full mr-3 flex-shrink-0 flex items-center justify-center mt-0.5 ${
                          currentQuestion.selectedOption === option.id
                            ? option.isCorrect
                              ? 'bg-green-500 text-white'
                              : 'bg-red-500 text-white'
                            : option.isCorrect && currentQuestion.selectedOption !== null
                              ? 'bg-green-500 text-white'
                              : 'border border-gray-600'
                        }`}>
                          {currentQuestion.selectedOption !== null && (
                            option.isCorrect
                              ? <Check className="h-3 w-3" />
                              : currentQuestion.selectedOption === option.id
                                ? <X className="h-3 w-3" />
                                : null
                          )}
                        </div>
                        
                        <span className="text-gray-300">{option.text}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
              
              {currentQuestion.selectedOption !== null && (
                <div className="space-y-4">
                  <div className={`p-4 rounded-lg ${
                    currentQuestion.isCorrect
                      ? 'bg-green-900/20 border border-green-700'
                      : 'bg-red-900/20 border border-red-700'
                  }`}>
                    <p className={`font-medium mb-1 ${
                      currentQuestion.isCorrect ? 'text-green-400' : 'text-red-400'
                    }`}>
                      {currentQuestion.isCorrect ? 'Correct!' : 'Not quite right.'}
                    </p>
                    <p className="text-sm text-gray-300">
                      {currentQuestion.explanation}
                    </p>
                  </div>
                  
                  {currentQuestion.codeExample && (
                    <div>
                      <button
                        onClick={() => setShowCodeExample(!showCodeExample)}
                        className="flex items-center text-sm text-purple-400 hover:text-purple-300"
                      >
                        <Code className="h-4 w-4 mr-1" />
                        {showCodeExample ? 'Hide Code Example' : 'Show Code Example'}
                      </button>
                      
                      {showCodeExample && (
                        <div className="mt-3 p-4 bg-gray-950 border border-gray-800 rounded-lg overflow-x-auto">
                          <pre className="text-xs text-gray-300 font-mono">
                            {currentQuestion.codeExample}
                          </pre>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              )}
              
              <div className="flex justify-between mt-6">
                <button
                  onClick={prevQuestion}
                  disabled={currentQuestionIndex === 0}
                  className={`px-4 py-2 rounded-lg transition-colors ${
                    currentQuestionIndex === 0
                      ? 'bg-gray-800 text-gray-600 cursor-not-allowed'
                      : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                  }`}
                >
                  Previous
                </button>
                
                <button
                  onClick={nextQuestion}
                  disabled={currentQuestion.selectedOption === null}
                  className={`px-4 py-2 rounded-lg transition-colors ${
                    currentQuestion.selectedOption === null
                      ? 'bg-gray-700 text-gray-500 cursor-not-allowed'
                      : 'bg-purple-600 text-white hover:bg-purple-700'
                  }`}
                >
                  {currentQuestionIndex < filteredQuestions.length - 1 ? 'Next Question' : 'View Results'}
                </button>
              </div>
            </div>
          </div>
        </>
      )}
      
      {/* Results view */}
      {showResults && (
        <div className="space-y-6">
          <div className="bg-gray-900/50 border border-gray-800 rounded-lg p-6">
            <h3 className="text-xl font-semibold text-purple-400 mb-6 text-center">Technical Mastery Results</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="bg-gray-900/70 border border-gray-800 rounded-lg p-4 flex flex-col items-center">
                <div className="text-4xl font-bold mb-2" style={{ 
                  color: (correctAnswers / questions.length) >= 0.7 
                    ? '#10b981' 
                    : (correctAnswers / questions.length) >= 0.5 
                      ? '#f59e0b' 
                      : '#ef4444' 
                }}>
                  {correctAnswers}/{questions.length}
                </div>
                <div className="text-gray-400 mb-2">Correct Answers</div>
                <div className="w-full h-2 bg-gray-800 rounded-full overflow-hidden">
                  <div 
                    className="h-full transition-all duration-300"
                    style={{ 
                      width: `${(correctAnswers / questions.length) * 100}%`,
                      backgroundColor: (correctAnswers / questions.length) >= 0.7 
                        ? '#10b981' 
                        : (correctAnswers / questions.length) >= 0.5 
                          ? '#f59e0b' 
                          : '#ef4444'
                    }}
                  ></div>
                </div>
                <div className="mt-4 text-center">
                  {(correctAnswers / questions.length) >= 0.7 ? (
                    <div className="text-green-400">Strong technical understanding!</div>
                  ) : (correctAnswers / questions.length) >= 0.5 ? (
                    <div className="text-yellow-400">Good foundation, room to grow</div>
                  ) : (
                    <div className="text-red-400">Technical areas need more study</div>
                  )}
                </div>
              </div>
              
              <div className="bg-gray-900/70 border border-gray-800 rounded-lg p-4">
                <h4 className="font-medium text-gray-300 mb-3">Performance by Topic</h4>
                
                <div className="space-y-4">
                  {['cryptography', 'protocol', 'script', 'layer2', 'network'].map((area) => (
                    <div key={area} className="space-y-1">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          {getAreaIcon(area)}
                          <span className="text-sm text-gray-300 ml-2 capitalize">{area}</span>
                        </div>
                        <div className="text-sm">
                          <span className={getAreaStats(area).correct === getAreaStats(area).answered 
                            ? 'text-green-400' 
                            : getAreaStats(area).correct > 0 
                              ? 'text-yellow-400' 
                              : 'text-red-400'
                          }>
                            {getAreaStats(area).correct}
                          </span>
                          <span className="text-gray-500">/{getAreaStats(area).answered}</span>
                        </div>
                      </div>
                      <div className="h-1.5 bg-gray-800 rounded-full overflow-hidden">
                        <div 
                          className="h-full transition-all duration-300"
                          style={{ 
                            width: `${getAreaStats(area).percent}%`,
                            backgroundColor: getAreaStats(area).percent >= 70 
                              ? '#10b981' 
                              : getAreaStats(area).percent >= 50 
                                ? '#f59e0b' 
                                : '#ef4444'
                          }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="bg-gray-900/70 border border-gray-800 rounded-lg p-4 mb-6">
              <h4 className="font-medium text-gray-300 mb-3">Technical Assessment</h4>
              
              <div className="space-y-3">
                {(correctAnswers / questions.length) >= 0.7 ? (
                  <>
                    <p className="text-gray-300">
                      You've demonstrated a strong technical understanding of Bitcoin's inner workings! 
                      Your knowledge spans multiple technical domains, from cryptographic primitives to 
                      protocol design and second-layer solutions.
                    </p>
                    <p className="text-green-400">
                      You're well-equipped to understand complex Bitcoin concepts and potentially contribute 
                      to Bitcoin's technical ecosystem.
                    </p>
                  </>
                ) : (correctAnswers / questions.length) >= 0.5 ? (
                  <>
                    <p className="text-gray-300">
                      You have a solid foundation in Bitcoin's technical aspects, but there are still 
                      areas where deeper understanding would be beneficial. Consider focusing on the topics 
                      where your performance was lower.
                    </p>
                    <p className="text-yellow-400">
                      With some additional study in specific areas, you'll develop a more comprehensive 
                      technical understanding.
                    </p>
                  </>
                ) : (
                  <>
                    <div className="flex items-start mb-3">
                      <AlertTriangle className="h-5 w-5 text-red-400 mr-2 flex-shrink-0 mt-0.5" />
                      <p className="text-gray-300">
                        The technical aspects of Bitcoin require further study. Don't be discouraged - 
                        these are complex topics that take time to fully grasp! Consider revisiting the 
                        fundamental technical concepts from the Realm of Origins, The Forest of Sparks, 
                        and The Mountain Forge.
                      </p>
                    </div>
                    <p className="text-red-400">
                      Focus on building a stronger foundation in the basics before tackling more advanced 
                      technical concepts.
                    </p>
                  </>
                )}
              </div>
            </div>
            
            <div className="flex justify-center">
              <button
                onClick={completeChallenge}
                className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors flex items-center"
              >
                Continue Your Journey
                <ArrowRight className="ml-2 h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      )}
      
      {/* Completion message */}
      {completed && (
        <div className="bg-green-900/20 border border-green-700 rounded-lg p-4 text-center">
          <h3 className="text-green-400 text-lg font-medium mb-2">Technical Challenge Complete!</h3>
          <p className="text-gray-300">
            You've completed the technical mastery assessment. Whether you're a Bitcoin expert or still learning,
            this feedback will help guide your ongoing Bitcoin education journey.
          </p>
        </div>
      )}
    </div>
  );
}