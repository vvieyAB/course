import { useState, useEffect } from 'react';
import { Clock, Code, ArrowRight, Check, ChevronRight, ChevronDown, Users, Info, X } from 'lucide-react';

interface HistoricalForksSimulatorProps {
  onComplete: () => void;
}

interface ForkEvent {
  id: string;
  name: string;
  date: string;
  type: 'soft' | 'hard';
  description: string;
  supporters: {
    name: string;
    position: string;
    quote: string;
  }[];
  opposers: {
    name: string;
    position: string;
    quote: string;
  }[];
  technicalDetails: {
    title: string;
    content: string;
  }[];
  outcomes: string[];
  lessons: string[];
  questions: {
    question: string;
    options: string[];
    correctIndex: number;
    explanation: string;
  }[];
}

export default function HistoricalForksSimulator({ onComplete }: HistoricalForksSimulatorProps) {
  const [forks] = useState<ForkEvent[]>([
    {
      id: 'bch',
      name: 'Bitcoin Cash',
      date: 'August 1, 2017',
      type: 'hard',
      description: 'Bitcoin Cash emerged from the block size debate that divided the Bitcoin community. Proponents wanted to increase the block size limit to allow more transactions per block, while opponents worried this would harm decentralization by making it more expensive to run full nodes.',
      supporters: [
        {
          name: 'Roger Ver',
          position: 'Investor & Businessman',
          quote: "Bitcoin Cash is the true Bitcoin as described in the original white paper. It restores the vision of Bitcoin as peer-to-peer electronic cash that can be used for daily transactions."
        },
        {
          name: 'Jihan Wu',
          position: 'Bitmain Co-founder',
          quote: "Larger blocks are necessary for Bitcoin to scale as a payment system and serve the unbanked population globally."
        }
      ],
      opposers: [
        {
          name: 'Adam Back',
          position: 'Blockstream CEO',
          quote: "Increasing the block size would centralize Bitcoin by making it harder for individuals to run full nodes, undermining its fundamental value proposition."
        },
        {
          name: 'Jimmy Song',
          position: 'Bitcoin Developer',
          quote: "On-chain scaling through bigger blocks is a short-term solution that doesn't solve the fundamental scaling challenge and sacrifices decentralization."
        }
      ],
      technicalDetails: [
        {
          title: 'Block Size',
          content: 'Bitcoin Cash initially increased the block size from 1MB to 8MB, later increasing it further to 32MB.'
        },
        {
          title: 'Replay Protection',
          content: 'Bitcoin Cash implemented replay protection to prevent transactions on one chain from being valid on the other chain, protecting users from accidentally spending coins on both chains.'
        },
        {
          title: 'Difficulty Adjustment',
          content: 'Bitcoin Cash modified the difficulty adjustment algorithm to handle fluctuations in mining power after the fork.'
        }
      ],
      outcomes: [
        'Created a permanent split in the Bitcoin community and ecosystem',
        'Established a separate cryptocurrency with its own development path',
        'Demonstrated the difficulty of reaching consensus in decentralized systems',
        'Highlighted the tension between different visions for Bitcoin\'s future'
      ],
      lessons: [
        'Hard forks can permanently split communities when there are fundamental disagreements about direction',
        'Technical debates often mask deeper philosophical differences about a project\'s purpose',
        'Network effects strongly favor the incumbent in blockchain splits',
        'Having multiple implementations of a protocol can lead to innovation but also fragmentation'
      ],
      questions: [
        {
          question: "What was the primary technical change implemented by Bitcoin Cash?",
          options: [
            "Implementing the Lightning Network",
            "Increasing the block size limit",
            "Changing to a different Proof-of-Work algorithm",
            "Adding smart contract functionality"
          ],
          correctIndex: 1,
          explanation: "Bitcoin Cash increased the block size limit from 1MB to 8MB (later 32MB) to allow more transactions per block and reduce fees."
        },
        {
          question: "What type of fork was Bitcoin Cash?",
          options: [
            "Soft fork",
            "Hard fork",
            "Temporary fork",
            "Code fork only (no blockchain split)"
          ],
          correctIndex: 1,
          explanation: "Bitcoin Cash was a hard fork because it relaxed the rules of Bitcoin, creating blocks that the original Bitcoin network would reject as invalid."
        }
      ]
    },
    {
      id: 'segwit',
      name: 'SegWit (Segregated Witness)',
      date: 'August 24, 2017',
      type: 'soft',
      description: 'Segregated Witness (SegWit) was proposed as a solution to transaction malleability and as a way to increase block capacity without increasing the block size limit. It was implemented as a soft fork, meaning it was backward compatible with existing Bitcoin software.',
      supporters: [
        {
          name: 'Pieter Wuille',
          position: 'Bitcoin Core Developer',
          quote: "SegWit solves multiple problems at once: it fixes transaction malleability, slightly increases capacity, and enables second-layer solutions like Lightning Network."
        },
        {
          name: 'Eric Lombrozo',
          position: 'Co-CEO Ciphrex',
          quote: "SegWit is a carefully engineered upgrade that maintains Bitcoin's security and decentralization while enabling future scaling solutions."
        }
      ],
      opposers: [
        {
          name: 'Craig Wright',
          position: 'Researcher',
          quote: "SegWit fundamentally changes Bitcoin and doesn't solve the core scaling issue. It's a complex solution that introduces new risks."
        },
        {
          name: 'Jeff Garzik',
          position: 'Bitcoin Developer',
          quote: "SegWit is an overly complex solution that still doesn't provide the on-chain scaling that Bitcoin needs to grow globally."
        }
      ],
      technicalDetails: [
        {
          title: 'Signature Separation',
          content: 'SegWit moves the signature data ("witness" data) from the transaction to a separate structure, fixing transaction malleability.'
        },
        {
          title: 'Capacity Increase',
          content: 'By separating witness data, SegWit effectively increases block capacity to about 2-4MB, depending on transaction types, while maintaining the 1MB base block size.'
        },
        {
          title: 'Backward Compatibility',
          content: 'SegWit was implemented as a soft fork, meaning older nodes still accept blocks from SegWit nodes, maintaining compatibility with the existing network.'
        }
      ],
      outcomes: [
        'Fixed the transaction malleability problem that prevented certain second-layer solutions',
        'Enabled the development of the Lightning Network for faster, cheaper payments',
        'Increased effective block capacity without forcing a community split',
        'Demonstrated that significant protocol upgrades could be achieved through soft forks'
      ],
      lessons: [
        'Soft forks can implement substantial protocol changes while maintaining network unity',
        'Technical solutions that respect diverse stakeholder concerns are more likely to succeed',
        'Fixing fundamental protocol issues can enable new innovations and scaling approaches',
        'Community coordination and education are essential for successful protocol upgrades'
      ],
      questions: [
        {
          question: "What problem did SegWit solve that was crucial for Lightning Network?",
          options: [
            "Block size limitations",
            "High transaction fees",
            "Transaction malleability",
            "Mining centralization"
          ],
          correctIndex: 2,
          explanation: "SegWit fixed transaction malleability, which was preventing reliable implementation of second-layer solutions like Lightning Network that depend on unconfirmed transactions."
        },
        {
          question: "How did SegWit increase Bitcoin's capacity?",
          options: [
            "By increasing the base block size limit to 2MB",
            "By moving signature data outside the traditional block structure",
            "By compressing transaction data",
            "By requiring fewer confirmations for transactions"
          ],
          correctIndex: 1,
          explanation: "SegWit increased capacity by moving signature (witness) data outside the traditional transaction structure, allowing more transactions to fit within the 1MB base block size limit."
        }
      ]
    },
    {
      id: 'taproot',
      name: 'Taproot',
      date: 'November 14, 2021',
      type: 'soft',
      description: 'Taproot was a significant upgrade to Bitcoin that enhanced privacy, scalability, and smart contract capabilities. It was implemented through a soft fork after achieving broad consensus within the Bitcoin community.',
      supporters: [
        {
          name: 'Pieter Wuille',
          position: 'Bitcoin Core Developer',
          quote: "Taproot is one of the most significant technical upgrades to Bitcoin since SegWit, offering improved privacy, efficiency, and smart contract capabilities."
        },
        {
          name: 'Tim Ruffing',
          position: 'Cryptographer',
          quote: "Schnorr signatures are more efficient and enable key aggregation, making complex multi-signature transactions more private and less resource-intensive."
        }
      ],
      opposers: [
        {
          name: 'Luke Dashjr',
          position: 'Bitcoin Core Developer',
          quote: "While I support Taproot technically, I had concerns about the activation method and timeline, which didn't allow enough time for proper user review."
        },
        {
          name: 'Anonymous Users',
          position: 'Privacy Advocates',
          quote: "Some privacy-focused users worried that the standardization of certain transactions might make chain analysis easier in some scenarios."
        }
      ],
      technicalDetails: [
        {
          title: 'Schnorr Signatures',
          content: 'Taproot introduced Schnorr signatures, which are more efficient and secure than the previous ECDSA signatures and enable key and signature aggregation.'
        },
        {
          title: 'MAST (Merkelized Abstract Syntax Trees)',
          content: "Taproot includes MAST, which allows complex spending conditions to be hidden until they're used, enhancing privacy and reducing transaction size."
        },
        {
          title: 'Tapscript',
          content: "Taproot introduced an enhanced version of Bitcoin's scripting language, enabling more flexible and efficient smart contracts."
        }
      ],
      outcomes: [
        'Enhanced privacy for complex transactions by making them look similar to simple ones',
        'Improved efficiency with smaller transaction sizes and lower fees',
        'Enabled more sophisticated smart contracts on Bitcoin',
        'Demonstrated a successful soft fork deployment with broad community consensus'
      ],
      lessons: [
        'Technical improvements that benefit many different use cases are more likely to achieve consensus',
        'Privacy enhancements can be implemented without compromising Bitcoin\'s security model',
        'Soft forks can deliver substantial protocol improvements while maintaining compatibility',
        'Patient, methodical development and testing leads to higher-quality protocol upgrades'
      ],
      questions: [
        {
          question: "What cryptographic improvement did Taproot introduce to Bitcoin?",
          options: [
            "Zero-knowledge proofs",
            "Homomorphic encryption",
            "Schnorr signatures",
            "Quantum-resistant cryptography"
          ],
          correctIndex: 2,
          explanation: "Taproot introduced Schnorr signatures, which are more efficient than ECDSA signatures and enable key aggregation for multi-signature transactions, improving both privacy and efficiency."
        },
        {
          question: "How does Taproot improve privacy for complex Bitcoin transactions?",
          options: [
            "By encrypting transaction data",
            "By mixing coins between users",
            "By making complex transactions look similar to simple ones",
            "By hiding transaction amounts"
          ],
          correctIndex: 2,
          explanation: "Taproot improves privacy by allowing complex transactions (like multi-signature or timelock transactions) to look like simple single-signature transactions on the blockchain when the cooperative path is taken."
        }
      ]
    }
  ]);
  
  const [currentForkIndex, setCurrentForkIndex] = useState(0);
  const [currentFork, setCurrentFork] = useState<ForkEvent>(forks[0]);
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    description: true,
    debate: false,
    technical: false,
    outcomes: false,
    quiz: false
  });
  const [quizAnswers, setQuizAnswers] = useState<Record<number, number | null>>({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [completed, setCompleted] = useState(false);
  
  // Update current fork when index changes
  useEffect(() => {
    setCurrentFork(forks[currentForkIndex]);
    // Reset state for new fork
    setExpandedSections({
      description: true,
      debate: false,
      technical: false,
      outcomes: false,
      quiz: false
    });
    setQuizAnswers({});
    setQuizSubmitted(false);
  }, [currentForkIndex, forks]);
  
  // Toggle section expansion
  const toggleSection = (section: string) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };
  
  // Handle quiz answer selection
  const selectAnswer = (questionIndex: number, answerIndex: number) => {
    if (quizSubmitted) return;
    
    setQuizAnswers(prev => ({
      ...prev,
      [questionIndex]: answerIndex
    }));
  };
  
  // Check if all questions have been answered
  const allQuestionsAnswered = () => {
    return currentFork.questions.every((_, index) => quizAnswers[index] !== undefined);
  };
  
  // Submit quiz answers
  const submitQuiz = () => {
    let correctAnswers = 0;
    
    currentFork.questions.forEach((question, index) => {
      if (quizAnswers[index] === question.correctIndex) {
        correctAnswers++;
      }
    });
    
    setScore(correctAnswers);
    setQuizSubmitted(true);
    
    // If this is the last fork and quiz is complete, mark the entire challenge as completed
    if (currentForkIndex === forks.length - 1 && correctAnswers / currentFork.questions.length >= 0.5) {
      setTimeout(() => {
        setCompleted(true);
        setTimeout(onComplete, 2000);
      }, 1500);
    }
  };
  
  // Move to the next fork
  const nextFork = () => {
    if (currentForkIndex < forks.length - 1) {
      setCurrentForkIndex(currentForkIndex + 1);
    } else {
      // All forks completed
      setCompleted(true);
      setTimeout(onComplete, 2000);
    }
  };
  
  return (
    <div className="bg-black text-gray-100 p-6 rounded-lg border border-amber-900/30">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-amber-500 mb-1">Time Traveler: Bitcoin Fork History</h2>
        <p className="text-sm text-gray-400 mb-4">Journey with Asha through pivotal moments in Bitcoin's evolution</p>
        
        {/* Progress indicators */}
        <div className="flex justify-between items-center mb-6">
          <div className="flex space-x-2">
            {forks.map((fork, index) => (
              <div 
                key={fork.id}
                className={`w-2 h-2 rounded-full ${
                  index < currentForkIndex 
                    ? 'bg-green-500' 
                    : index === currentForkIndex 
                      ? 'bg-amber-500' 
                      : 'bg-gray-600'
                }`}
              />
            ))}
          </div>
          
          <div className="text-xs text-gray-400">
            {currentForkIndex + 1} of {forks.length}
          </div>
        </div>
        
        {/* Fork header */}
        <div className="bg-amber-900/20 border border-amber-800/30 rounded-lg p-4 mb-4">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-xl font-medium text-amber-400">{currentFork.name}</h3>
              <div className="flex items-center mt-1">
                <Clock className="h-4 w-4 text-gray-400 mr-2" />
                <span className="text-sm text-gray-400">{currentFork.date}</span>
                <span className={`ml-3 text-xs px-2 py-0.5 rounded ${
                  currentFork.type === 'soft' 
                    ? 'bg-blue-900/30 text-blue-300' 
                    : 'bg-red-900/30 text-red-300'
                }`}>
                  {currentFork.type === 'soft' ? 'Soft Fork' : 'Hard Fork'}
                </span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Description section */}
        <div className="bg-gray-900/50 border border-gray-800 rounded-lg mb-4 overflow-hidden">
          <button 
            className="w-full px-4 py-3 flex justify-between items-center border-b border-gray-800"
            onClick={() => toggleSection('description')}
          >
            <span className="font-medium text-amber-300">Background & Description</span>
            {expandedSections.description ? <ChevronDown className="h-5 w-5" /> : <ChevronRight className="h-5 w-5" />}
          </button>
          
          {expandedSections.description && (
            <div className="p-4">
              <p className="text-gray-300 text-sm">
                {currentFork.description}
              </p>
            </div>
          )}
        </div>
        
        {/* Debate section */}
        <div className="bg-gray-900/50 border border-gray-800 rounded-lg mb-4 overflow-hidden">
          <button 
            className="w-full px-4 py-3 flex justify-between items-center border-b border-gray-800"
            onClick={() => toggleSection('debate')}
          >
            <span className="font-medium text-amber-300">Community Debate</span>
            {expandedSections.debate ? <ChevronDown className="h-5 w-5" /> : <ChevronRight className="h-5 w-5" />}
          </button>
          
          {expandedSections.debate && (
            <div className="p-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-medium text-green-400 mb-3 flex items-center">
                    <Users className="h-4 w-4 mr-2" />
                    Supporters
                  </h4>
                  
                  <div className="space-y-4">
                    {currentFork.supporters.map((supporter, index) => (
                      <div key={index} className="bg-black/30 border border-gray-800 rounded-lg p-3">
                        <div className="font-medium text-gray-200 mb-1">{supporter.name}</div>
                        <div className="text-xs text-gray-400 mb-2">{supporter.position}</div>
                        <div className="text-sm text-gray-300 italic">"{supporter.quote}"</div>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h4 className="font-medium text-red-400 mb-3 flex items-center">
                    <Users className="h-4 w-4 mr-2" />
                    Opposing Views
                  </h4>
                  
                  <div className="space-y-4">
                    {currentFork.opposers.map((opposer, index) => (
                      <div key={index} className="bg-black/30 border border-gray-800 rounded-lg p-3">
                        <div className="font-medium text-gray-200 mb-1">{opposer.name}</div>
                        <div className="text-xs text-gray-400 mb-2">{opposer.position}</div>
                        <div className="text-sm text-gray-300 italic">"{opposer.quote}"</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
        
        {/* Technical details section */}
        <div className="bg-gray-900/50 border border-gray-800 rounded-lg mb-4 overflow-hidden">
          <button 
            className="w-full px-4 py-3 flex justify-between items-center border-b border-gray-800"
            onClick={() => toggleSection('technical')}
          >
            <span className="font-medium text-amber-300">Technical Details</span>
            {expandedSections.technical ? <ChevronDown className="h-5 w-5" /> : <ChevronRight className="h-5 w-5" />}
          </button>
          
          {expandedSections.technical && (
            <div className="p-4">
              <div className="space-y-4">
                {currentFork.technicalDetails.map((detail, index) => (
                  <div key={index}>
                    <h4 className="font-medium text-blue-400 mb-1 flex items-center">
                      <Code className="h-4 w-4 mr-2" />
                      {detail.title}
                    </h4>
                    <p className="text-sm text-gray-300 ml-6">
                      {detail.content}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
        
        {/* Outcomes section */}
        <div className="bg-gray-900/50 border border-gray-800 rounded-lg mb-4 overflow-hidden">
          <button 
            className="w-full px-4 py-3 flex justify-between items-center border-b border-gray-800"
            onClick={() => toggleSection('outcomes')}
          >
            <span className="font-medium text-amber-300">Outcomes & Lessons</span>
            {expandedSections.outcomes ? <ChevronDown className="h-5 w-5" /> : <ChevronRight className="h-5 w-5" />}
          </button>
          
          {expandedSections.outcomes && (
            <div className="p-4">
              <h4 className="font-medium text-purple-400 mb-2">Historical Outcomes</h4>
              <ul className="list-disc ml-5 space-y-1 mb-4">
                {currentFork.outcomes.map((outcome, index) => (
                  <li key={index} className="text-sm text-gray-300">{outcome}</li>
                ))}
              </ul>
              
              <h4 className="font-medium text-purple-400 mb-2">Key Lessons</h4>
              <ul className="list-disc ml-5 space-y-1">
                {currentFork.lessons.map((lesson, index) => (
                  <li key={index} className="text-sm text-gray-300">{lesson}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
        
        {/* Quiz section */}
        <div className="bg-gray-900/50 border border-gray-800 rounded-lg mb-6 overflow-hidden">
          <button 
            className="w-full px-4 py-3 flex justify-between items-center border-b border-gray-800"
            onClick={() => toggleSection('quiz')}
          >
            <span className="font-medium text-amber-300">Knowledge Check</span>
            {expandedSections.quiz ? <ChevronDown className="h-5 w-5" /> : <ChevronRight className="h-5 w-5" />}
          </button>
          
          {expandedSections.quiz && (
            <div className="p-4">
              <p className="text-sm text-gray-400 mb-4">
                Test your understanding of the {currentFork.name} fork by answering these questions:
              </p>
              
              <div className="space-y-6">
                {currentFork.questions.map((question, qIndex) => (
                  <div key={qIndex} className="bg-black/30 border border-gray-800 rounded-lg p-4">
                    <h4 className="font-medium text-gray-200 mb-3">{qIndex + 1}. {question.question}</h4>
                    
                    <div className="space-y-2 mb-4">
                      {question.options.map((option, oIndex) => (
                        <div 
                          key={oIndex}
                          className={`p-3 border rounded-lg cursor-pointer transition-all ${
                            quizSubmitted && oIndex === question.correctIndex
                              ? 'border-green-500 bg-green-900/20'
                              : quizSubmitted && quizAnswers[qIndex] === oIndex && oIndex !== question.correctIndex
                                ? 'border-red-500 bg-red-900/20'
                                : quizAnswers[qIndex] === oIndex
                                  ? 'border-amber-500 bg-amber-900/20'
                                  : 'border-gray-700 bg-black/30 hover:border-gray-600'
                          }`}
                          onClick={() => selectAnswer(qIndex, oIndex)}
                        >
                          <div className="flex items-center">
                            <div className={`h-5 w-5 rounded-full mr-3 flex-shrink-0 flex items-center justify-center 
                              ${quizSubmitted && oIndex === question.correctIndex
                                ? 'bg-green-500 text-black'
                                : quizSubmitted && quizAnswers[qIndex] === oIndex && oIndex !== question.correctIndex
                                  ? 'bg-red-500 text-black'
                                  : quizAnswers[qIndex] === oIndex
                                    ? 'bg-amber-500 text-black'
                                    : 'border border-gray-600'
                              }`}>
                              {quizSubmitted ? (
                                oIndex === question.correctIndex ? (
                                  <Check className="h-3 w-3" />
                                ) : quizAnswers[qIndex] === oIndex ? (
                                  <X className="h-3 w-3" />
                                ) : null
                              ) : (
                                quizAnswers[qIndex] === oIndex && <div className="h-2 w-2 bg-black rounded-full"></div>
                              )}
                            </div>
                            
                            <span className="text-gray-300">{option}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                    
                    {quizSubmitted && (
                      <div className="bg-gray-900/50 border border-gray-800 rounded-lg p-3">
                        <div className="flex items-start">
                          <Info className="h-5 w-5 text-amber-400 mr-2 flex-shrink-0 mt-0.5" />
                          <p className="text-sm text-gray-300">
                            {question.explanation}
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
              
              {!quizSubmitted ? (
                <div className="mt-6 flex justify-center">
                  <button
                    onClick={submitQuiz}
                    disabled={!allQuestionsAnswered()}
                    className={`px-6 py-2 rounded-lg font-medium ${
                      !allQuestionsAnswered()
                        ? 'bg-gray-700 text-gray-500 cursor-not-allowed'
                        : 'bg-amber-600 text-white hover:bg-amber-700'
                    }`}
                  >
                    Submit Answers
                  </button>
                </div>
              ) : (
                <div className="mt-6 bg-amber-900/20 border border-amber-800/30 rounded-lg p-4 text-center">
                  <h4 className="font-medium text-amber-400 mb-2">Quiz Result</h4>
                  <p className="text-gray-300">
                    You scored {score}/{currentFork.questions.length}!
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
        
        {/* Navigation button */}
        <div className="flex justify-center">
          <button
            onClick={nextFork}
            disabled={!quizSubmitted && expandedSections.quiz}
            className={`px-6 py-2 rounded-lg font-medium flex items-center ${
              !quizSubmitted && expandedSections.quiz
                ? 'bg-gray-700 text-gray-500 cursor-not-allowed'
                : 'bg-amber-600 text-white hover:bg-amber-700'
            }`}
          >
            {currentForkIndex < forks.length - 1 ? (
              <>Continue to Next Fork <ArrowRight className="ml-2 h-4 w-4" /></>
            ) : (
              <>Complete Journey</>
            )}
          </button>
        </div>
      </div>
      
      {completed && (
        <div className="bg-green-900/20 border border-green-700 rounded-lg p-4 text-center">
          <h3 className="text-green-400 text-lg font-medium mb-2">Challenge Complete!</h3>
          <p className="text-gray-300">
            Congratulations! You've journeyed through key moments in Bitcoin's history, learning about 
            crucial forks that shaped its evolution. This knowledge gives you valuable context for understanding 
            how Bitcoin's governance works and how the community navigates changes to the protocol.
          </p>
        </div>
      )}
    </div>
  );
}